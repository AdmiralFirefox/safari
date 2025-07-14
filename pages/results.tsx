import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { AuthContext } from "../context/AuthContext";
import { db } from "../firebase/firebase";
import { collection, addDoc, serverTimestamp, doc } from "firebase/firestore";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { Product } from "../types/Product/Product";
import { ProductResults } from "../types/Results/ProductResults";
import Axios from "axios";
import { useQuery, UseQueryResult } from "react-query";
import { clearCart } from "../features/Cart/CartSlice";
import UserButton from "../components/Button/UserButton";
const EmptyPlaceholder = dynamic(
  () => import("../components/EmptyPlaceholder/EmptyPlaceholder")
);
const Loading = dynamic(() => import("../components/Loading/Loading"));
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../styles/pages/Results.module.scss";

const fetchDataItems = async (sessionId: string | string[] | undefined) => {
  return await Axios.get(`/api/checkout/${sessionId}`);
};

const Results: NextPage = () => {
  const [loadingPurchase, setLoadingPurchase] = useState(false);

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
    if (products?.data.payment_intent.status && cart.length > 0) {
      setLoadingPurchase(true);

      const ordersRef = collection(db, "orders");

      const orderPromises = cart.map(async (item) => {
        const docRef = doc(ordersRef);

        return await addDoc(ordersRef, {
          order_id: docRef.id,
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

      Promise.all(orderPromises)
        .then(() => {
          dispatch(clearCart());
          setLoadingPurchase(false);
        })
        .catch((error) => {
          console.error("Error creating orders:", error);
          setLoadingPurchase(false);
        });
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
      <div className={styles["result-grand-total-wrapper"]}>
        <div className={styles["result-grand-total-content"]}>
          {products?.data.line_items.data.map((item) => item.quantity) ===
          undefined ? null : (
            <p>
              Total Ordered &#40;{getTotalItems()} items&#41;: $
              {getTotalPrice()!.toFixed(2)}
            </p>
          )}
        </div>
      </div>

      <div className={styles["cart-cleared-info-wrapper"]}>
        <div className={styles["cart-cleared-info-content"]}>
          {loadingPurchase ? (
            <div>
              <p>Verifying Purchase...</p>
              <CircularProgress
                size={45}
                sx={{ color: "hsl(36, 100%, 60%)", marginTop: "0.5em" }}
              />
            </div>
          ) : (
            <>
              <div>
                <p>Order Successful and Cart Cleared</p>
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
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Results;
