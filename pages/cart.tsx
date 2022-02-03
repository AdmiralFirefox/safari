import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { NextPage } from "next";
import CartPlaceholder from "../components/Placeholder/CartPlaceholder";

const Cart: NextPage = () => {
  const user = useContext(AuthContext);

  if (!user) {
    return <CartPlaceholder />;
  }

  return (
    <div>
      <h1>Cart</h1>
    </div>
  );
};

export default Cart;
