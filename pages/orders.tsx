import type { NextPage } from "next";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Placeholder from "../components/Placeholder/Placeholder";
import EmptyPlaceholder from "../components/EmptyPlaceholder/EmptyPlaceholder";
import styles from "../styles/pages/Orders.module.scss";

const Orders: NextPage = () => {
  const user = useContext(AuthContext);

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

  return (
    <>
      <EmptyPlaceholder
        image="/assets/EmptyOrder.png"
        title="You have no Orders!"
        subtitle="Buy something in the store to see your Order History."
        imageWidth={150}
        imageHeight={150}
      />
    </>
  );
};

export default Orders;
