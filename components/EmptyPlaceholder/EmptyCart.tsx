import { FC } from "react";
import Image from "next/image";
import emptyCartStyles from "../../styles/Home.module.scss";

const EmptyCart: FC = () => {
  return (
    <div className={emptyCartStyles["empty-cart-placeholder-wrapper"]}>
      <div className={emptyCartStyles["empty-cart-placeholder"]}>
        <div>
          <Image
            src="/assets/EmptyCart.png"
            alt="Cart"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>
        <div className={emptyCartStyles["empty-cart-placeholder-content"]}>
          <h1>Your Safari Cart is Empty!</h1>
          <p>Shop today&apos;s deal!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
