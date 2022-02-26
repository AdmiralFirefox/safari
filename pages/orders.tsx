import { useState, useEffect, useContext } from "react";
import type { NextPage } from "next";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import Placeholder from "../components/Placeholder/Placeholder";
import EmptyPlaceholder from "../components/EmptyPlaceholder/EmptyPlaceholder";
import styles from "../styles/pages/Orders.module.scss";

interface OrderProps {
  id: string;
}

const Orders: NextPage = () => {
  const [orders, setOrders] = useState<OrderProps[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const user = useContext(AuthContext);

  //Getting Orders from the collection
  useEffect(() => {
    setLoadingOrders(true);
    const getOrders = async () => {
      const orderData = await getDocs(collection(db, "orders"));
      setOrders(orderData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      setLoadingOrders(false);
    };

    getOrders();
  }, []);

  console.log(orders);

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
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <h1>Orders</h1>
    </>
  );
};

export default Orders;
