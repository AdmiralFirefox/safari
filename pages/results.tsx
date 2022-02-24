import type { NextPage } from "next";
import { useAppDispatch } from "../app/reduxhooks";
import { clearCart } from "../features/Cart/CartSlice";

const Results: NextPage = () => {
  const dispatch = useAppDispatch();

  //Clearing Cart when payment is successful
  dispatch(clearCart());

  return (
    <div>
      <h1>Payment Successful and Cart Cleared</h1>
    </div>
  );
};

export default Results;
