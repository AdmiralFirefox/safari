import { FC } from "react";
import Image from "next/legacy/image";
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
        objectFit="contain"
        alt=""
      />
    </div>
  );
};

export default Loading;
