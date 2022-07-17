import { FC } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import styles from "../../styles/loading/AuthLoading.module.scss";

const AuthLoading: FC = () => {
  const size: Size = useWindowSize();

  return (
    <div
      className={styles["auth-loading-wrapper"]}
      style={{ height: `calc(${size.height}px - 5vh)` }}
    >
      <Image
        src="/assets/SafariLogoDark.png"
        alt="Web Logo"
        width={200}
        height={70}
        objectFit="cover"
      />
      <CircularProgress
        size={45}
        sx={{ color: "hsl(36, 100%, 60%)", marginTop: "1.6em" }}
      />
    </div>
  );
};

export default AuthLoading;
