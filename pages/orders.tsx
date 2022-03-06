import { useState, useEffect, useContext } from "react";
import Image from "next/image";
import type { NextPage } from "next";
import { db } from "../firebase/firebase";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Rating from "@mui/material/Rating";
import Placeholder from "../components/Placeholder/Placeholder";
import EmptyPlaceholder from "../components/EmptyPlaceholder/EmptyPlaceholder";
import dayjs from "dayjs";
import Loading from "../components/Loading/Loading";
import { OrderProps } from "../types/Orders/Orders";
import styles from "../styles/pages/Orders.module.scss";

const Orders: NextPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const user = useContext(AuthContext);

  //Getting Orders from the collection
  useEffect(() => {
    setLoadingOrders(true);
    if (user) {
      const ordersRef = collection(db, "orders");
      const q = query(
        ordersRef,
        orderBy("createdAt", "desc"),
        where("owner", "==", user!.uid)
      );

      const unsub = onSnapshot(q, (snapshot) => {
        setOrders(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setLoadingOrders(false);
      });

      return () => unsub();
    }
  }, [user]);

  //If the user is not logged in
  if (!user) {
    return (
      <Placeholder
        image="/assets/EmptyOrder.png"
        title="Log in to see your Order History"
        subtitle=""
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  //If the orders are empty
  if (orders.length === 0 && user && !loadingOrders) {
    return (
      <EmptyPlaceholder
        image="/assets/EmptyOrder.png"
        title="You have no Orders!"
        subtitle="Buy something in the store to see your Order History."
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  if (loadingOrders) {
    return <Loading title="Loading your Orders..." />;
  }

  return (
    <>
      <div className={styles["orders-title"]}>
        <h1>Your Orders:</h1>
      </div>

      <div className={styles["orders-wrapper"]}>
        <div className={styles["orders-container"]}>
          {orders.map((order) => {
            return (
              <div key={order.id} className={styles["order-item"]}>
                <p className={styles["order-date"]}>
                  {dayjs(order.createdAt!.seconds * 1000).format(
                    "MMMM D YYYY, h:mm:ss a"
                  )}
                </p>

                <div className={styles["order-info"]}>
                  <div>
                    <Image
                      src={order.image!}
                      alt=""
                      width={150}
                      height={150}
                      objectFit="contain"
                    />
                  </div>
                  <div>
                    <p className={styles["order-title"]}>{order.title}</p>
                    <p className={styles["order-description"]}>
                      {order.description}
                    </p>
                    <Rating
                      name="Ordered Product Ratings"
                      value={order.rating}
                      precision={0.5}
                      sx={{ marginTop: "1em" }}
                      size="small"
                      readOnly
                    />
                  </div>
                </div>

                <div className={styles["amount-info"]}>
                  <p>Quantity: {order.quantity}</p>
                  <p>Price: ${order.price!.toFixed(2)}</p>
                  <p>
                    Subtotal: ${(order.price! * order.quantity!).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Orders;
