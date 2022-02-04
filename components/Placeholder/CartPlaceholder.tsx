import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import UserButton from "../Button/UserButton";
import cartPlaceholderStyles from "../../styles/Home.module.scss";

const CartPlaceholder: FC = () => {
  const router = useRouter();

  const logInRoute = () => {
    router.push("/login");
  };

  const createAccountRoute = () => {
    router.push("/signup");
  };

  return (
    <div className={cartPlaceholderStyles["cart-placeholder-wrapper"]}>
      <div className={cartPlaceholderStyles["cart-placeholder"]}>
        <div>
          <Image
            src="/assets/EmptyCart.png"
            alt="Cart"
            width={150}
            height={150}
            objectFit="contain"
          />
        </div>
        <div className={cartPlaceholderStyles["cart-placeholder-content"]}>
          <h1>Log In to see your Cart</h1>
          <p>Shop today&apos;s deal!</p>
          <div
            className={cartPlaceholderStyles["cart-placeholder-button-wrapper"]}
          >
            <UserButton changeRoute={logInRoute}>Sign In</UserButton>
            <UserButton changeRoute={createAccountRoute}>
              Create Account
            </UserButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPlaceholder;
