import { FC } from "react";
import Image from "next/image";
import styles from "../../styles/empty/EmptyCart.module.scss";

const EmptyCart: FC = () => {
  return (
    <div className={styles["empty-cart-placeholder-wrapper"]}>
      <div className={styles["empty-cart-placeholder"]}>
        <div>
          <Image
            src="/assets/EmptyCart.png"
            alt="Cart"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>
        <div className={styles["empty-cart-placeholder-content"]}>
          <h1>Your Safari Cart is Empty!</h1>
          <p>Shop today&apos;s deal!</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyCart;
