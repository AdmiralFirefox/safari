import { useState, useContext, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import AccountButton from "../components/Button/AccountButton";
import styles from "../styles/pages/SignUp.module.scss";

const SignUp: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Create Account
  const createAccount = async () => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      setLoading(false);
    } catch (error) {
      console.error(error);
      alert(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadingInfo = (): JSX.Element => {
    if (loading) {
      return (
        <CircularProgress size={45} sx={{ color: "#000", marginTop: "1em" }} />
      );
    } else {
      return (
        <div className={styles["signup-button-wrapper"]}>
          <AccountButton onButtonClick={createAccount}>
            Create Account
          </AccountButton>
        </div>
      );
    }
  };

  return (
    <div>
      {!user ? (
        <>
          <div className={styles["signup-web-logo"]}>
            <Image
              src="/assets/SafariLogoDark.png"
              alt="Web Logo"
              width={200}
              height={70}
              objectFit="cover"
            />
          </div>

          <div className={styles["signup-wrapper"]}>
            <div className={styles["signup-content"]}>
              <h1 className={styles["signup-title"]}>Sign Up</h1>

              <p className={styles["signup-form-label"]}>Email</p>
              <Paper
                sx={{
                  p: "0.5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  background: "#EAEDED",
                  boxShadow: "none",
                }}
              >
                <InputBase
                  inputRef={emailRef}
                  type="email"
                  placeholder="Enter Email"
                  inputProps={{ "aria-label": "email" }}
                  sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                />
              </Paper>

              <p className={styles["signup-form-label"]}>Password</p>
              <Paper
                sx={{
                  p: "0.5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  background: "#EAEDED",
                  boxShadow: "none",
                }}
              >
                <InputBase
                  inputRef={passwordRef}
                  type="password"
                  placeholder="Enter Password"
                  inputProps={{ "aria-label": "password" }}
                  sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                />
              </Paper>

              <p className={styles["signup-form-label"]}>Confirm Password</p>
              <Paper
                sx={{
                  p: "0.5em",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",
                  background: "#EAEDED",
                  boxShadow: "none",
                }}
              >
                <InputBase
                  inputRef={passwordRef}
                  type="password"
                  placeholder="Enter Password"
                  inputProps={{ "aria-label": "password" }}
                  sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                />
              </Paper>

              <p className={styles["signup-conditions"]}>
                By Logging in, you agree to Safari&apos;s{" "}
                <Link href="/login">
                  <a className={styles["signup-conditions-highlights"]}>
                    Conditions of Use
                  </a>
                </Link>{" "}
                and{" "}
                <Link href="/login">
                  <a className={styles["signup-conditions-highlights"]}>
                    Privacy Notice
                  </a>
                </Link>
              </p>

              {loadingInfo()}

              <div className={styles["login-redirect"]}>
                <p>Already have an Account?</p>
                <Link href="/login">
                  <a>Log In</a>
                </Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SignUp;
