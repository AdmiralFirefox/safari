import { FC } from "react";
import Image from "next/image";
import CircularProgress from "@mui/material/CircularProgress";
import styles from "../../styles/loading/AuthLoading.module.scss";

const AuthLoading: FC = () => {
  return (
    <div className={styles["auth-loading-wrapper"]}>
      <Image
        src="/assets/SafariLogoDark.png"
        alt="Web Logo"
        width={200}
        height={70}
        priority
        style={{
          maxWidth: "100%",
          height: "auto",
          objectFit: "cover",
        }}
      />
      <CircularProgress
        size={45}
        sx={{ color: "hsl(36, 100%, 60%)", marginTop: "1.6em" }}
      />
    </div>
  );
};

export default AuthLoading;
