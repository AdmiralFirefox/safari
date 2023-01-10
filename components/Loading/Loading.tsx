import { FC } from "react";
import Image from "next/image";
import styles from "../../styles/loading/Loading.module.scss";

interface LoadingProps {
  title: string;
}

const Loading: FC<LoadingProps> = ({ title }) => {
  return (
    <div className={styles["loading-wrapper"]}>
      <h1>{title}</h1>
      <Image
        src="/assets/DeliveryTruck.gif"
        width={375}
        height={300}
        alt=""
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "contain"
        }} />
    </div>
  );
};

export default Loading;
