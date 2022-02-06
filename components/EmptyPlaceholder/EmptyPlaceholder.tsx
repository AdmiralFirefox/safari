import { FC } from "react";
import Image from "next/image";
import styles from "../../styles/emptyplaceholder/EmptyPlaceholder.module.scss";

interface EmptyPlaceholderProps {
  title: string;
  subtitle: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
}

const EmptyPlaceholder: FC<EmptyPlaceholderProps> = ({
  title,
  subtitle,
  image,
  imageWidth,
  imageHeight,
}) => {
  return (
    <div className={styles["empty-placeholder-wrapper"]}>
      <div className={styles["empty-placeholder"]}>
        <div>
          <Image
            src={image}
            alt="Empty Placeholder Image"
            width={imageWidth}
            height={imageHeight}
            objectFit="contain"
          />
        </div>
        <div className={styles["empty-placeholder-content"]}>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
      </div>
    </div>
  );
};

export default EmptyPlaceholder;
