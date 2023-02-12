import { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { Product } from "../types/Product/Product";
import { ProductResults } from "../types/Results/ProductResults";
import Axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { clearCart } from "../features/Cart/CartSlice";
import dayjs from "dayjs";
import UserButton from "../components/Button/UserButton";
const EmptyPlaceholder = dynamic(
  () => import("../components/EmptyPlaceholder/EmptyPlaceholder")
);
const Loading = dynamic(() => import("../components/Loading/Loading"));
import styles from "../styles/pages/Results.module.scss";

const fetchDataItems = async (sessionId: string | string[] | undefined) => {
  return await Axios.get(`/api/checkout/${sessionId}`);
};

const Results: NextPage = () => {
  const user = useContext(AuthContext);
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
          owner: user!.uid,
        });
      });

      //Clearing Cart when payment is successful
      setTimeout(() => dispatch(clearCart()), 100);
    }
  }, [cart, dispatch, products?.data.payment_intent.status, user]);

  //When the payment status is loading
  if (isLoading) {
    return <Loading title="Confirming your Payment..." />;
  }

  //When the payment status errors
  if (isError) {
    return (
      <EmptyPlaceholder
        image="/assets/EmptyCart.png"
        title="Something unexpected happened!"
        subtitle="Please try again later..."
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  return (
    <>
      <div className={styles["result-product-wrapper"]}>
        <div className={styles["result-product-container"]}>
          {products?.data.line_items.data.map((product) => {
            return (
              <div key={product.id} className={styles["result-product"]}>
                <p className={styles["result-date"]}>
                  {dayjs(product.price.created * 1000).format(
                    "MM/DD/YYYY, h:mm:ss a"
                  )}
                </p>
                <p className={styles["result-description"]}>
                  {product.description}
                </p>
                <div className={styles["result-product-amount-info"]}>
                  <p>Quantity: {product.quantity}</p>
                  <p>Price: ${(product.price.unit_amount / 100).toFixed(2)}</p>
                  <p>
                    Subtotal: $
                    {(
                      (product.price.unit_amount / 100) *
                      product.quantity
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles["result-grand-total-wrapper"]}>
        <div className={styles["result-grand-total-content"]}>
          {products?.data.line_items.data.map((item) => item.quantity) ===
          undefined ? null : (
            <p>
              Total &#40;{getTotalItems()} items&#41;: $
              {getTotalPrice()!.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className={styles["cart-cleared-info-wrapper"]}>
        <div className={styles["cart-cleared-info-content"]}>
          <div>
            <p>Cart Cleared</p>
            <Image
              src="/assets/EmptyCart.png"
              alt=""
              width={75}
              height={75}
              style={{
                maxWidth: "100%",
                height: "auto",
                objectFit: "contain",
              }}
            />
          </div>
          <UserButton changeRoute={() => router.push("/orders")}>
            Go to My Orders
          </UserButton>
        </div>
      </div>
    </>
  );
};

export default Results;
