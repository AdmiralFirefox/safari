import { useEffect } from "react";
import type { NextPage } from "next";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { Product } from "../types/Product/Product";
import { ProductResults } from "../types/Results/ProductResults";
import { useRouter } from "next/router";
import Axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { clearCart } from "../features/Cart/CartSlice";

const fetchDataItems = async (sessionId: string | string[] | undefined) => {
  return await Axios.get(`/api/checkout/${sessionId}`);
};

const Results: NextPage = () => {
  const router = useRouter();
  const sessionId = router.query.session_id;

  const cart = useAppSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useAppDispatch();

  const {
    data: products,
    isLoading,
    isError,
  }: UseQueryResult<ProductResults, Error> = useQuery<ProductResults, Error>(
    ["products", sessionId],
    () => fetchDataItems(sessionId),
    {
      staleTime: Infinity,
      enabled: Boolean(sessionId),
    }
  );

  //Total Items in the Cart
  const getTotalItems = () => {
    return products?.data.line_items.data.reduce(
      (accumulator, item) => accumulator + item.quantity!,
      0
    );
  };

  //Total Price of all the items in the cart
  const getTotalPrice = () => {
    return products?.data.line_items.data.reduce(
      (accumulator, item) =>
        accumulator + item.quantity! * (item.price.unit_amount / 100),
      0
    );
  };

  // If checkout was successful, added items to orders
  useEffect(() => {
    if (products?.data.payment_intent.status) {
      cart.map((item) => {
        return addDoc(collection(db, "orders"), {
          createdAt: serverTimestamp(),
          title: item.title,
          description: item.description,
          image: item.image,
          price: item.price,
          rating: item.rating.rate,
          quantity: item.quantity,
          subtotal: item.quantity! * item.price,
        });
      });

      //Clearing Cart when payment is successful
      setTimeout(() => dispatch(clearCart()), 100);
    }
  }, [cart, dispatch, products?.data.payment_intent.status]);

  //When the payment status is loading
  if (isLoading) {
    return <h1>Almost there...</h1>;
  }

  //When the payment status errors
  if (isError) {
    return <h1>Something went wrong...</h1>;
  }

  return (
    <div>
      {products?.data.line_items.data.map((product) => {
        return (
          <div key={product.id}>
            <p>{product.description}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Price: ${(product.price.unit_amount / 100).toFixed(2)}</p>
            <p>
              Subtotal: $
              {((product.price.unit_amount / 100) * product.quantity).toFixed(
                2
              )}
            </p>
          </div>
        );
      })}

      {isLoading ? null : (
        <h1>
          Total &#40;{getTotalItems()} items&#41;: $
          {getTotalPrice()!.toFixed(2)}
        </h1>
      )}
    </div>
  );
};

export default Results;
