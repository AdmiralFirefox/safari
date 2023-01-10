import { FC } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import UserButton from "../Button/UserButton";
import styles from "../../styles/placeholder/Placeholder.module.scss";

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
    <div className={styles["placeholder-wrapper"]}>
      <div className={styles["placeholder"]}>
        <div>
          <Image
            src={image}
            alt="Placeholder Image"
            width={imageWidth}
            height={imageHeight}
            objectFit="contain"
          />
        </div>
        <div className={styles["placeholder-content"]}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className={styles["placeholder-button-wrapper"]}>
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
