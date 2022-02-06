import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import UserButton from "../Button/UserButton";
import styles from "../../styles/placeholder/CartPlaceholder.module.scss";

interface PlaceholderProps {
  image: string;
  title: string;
  subtitle: string;
  imageWidth: number;
  imageHeight: number;
}

const Placeholder: FC<PlaceholderProps> = ({
  title,
  subtitle,
  image,
  imageWidth,
  imageHeight,
}) => {
  const router = useRouter();

  const logInRoute = () => {
    router.push("/login");
  };

  const createAccountRoute = () => {
    router.push("/signup");
  };

  return (
    <div className={styles["cart-placeholder-wrapper"]}>
      <div className={styles["cart-placeholder"]}>
        <div>
          <Image
            src={image}
            alt="Cart"
            width={imageWidth}
            height={imageHeight}
            objectFit="contain"
          />
        </div>
        <div className={styles["cart-placeholder-content"]}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles["cart-placeholder-button-wrapper"]}>
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

export default Placeholder;
