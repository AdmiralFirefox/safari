import { useState, useContext, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import CircularProgress from "@mui/material/CircularProgress";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";
import styles from "../styles/pages/Login.module.scss";
import AccountButton from "../components/Button/AccountButton";
import GoogleSignInButton from "../components/Button/GoogleSignInButton";
import AnonymousSignInButton from "../components/Button/AnonymousSignInButton";

const LogIn: NextPage = () => {
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Sign In
  const signIn = async () => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
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

  //Sign In with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  };

  // Sign in Anonymously
  const anonymousAccountSignIn = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      setLoading(false);
    } catch (err) {
      console.log(err);
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
        <div className={styles["login-button-wrapper"]}>
          <AccountButton onButtonClick={signIn}>Log In</AccountButton>
          <GoogleSignInButton onButtonClick={signInWithGoogle}>
            Sign In with Google
          </GoogleSignInButton>
          <AnonymousSignInButton onButtonClick={anonymousAccountSignIn}>
            Sign In Anonymously
          </AnonymousSignInButton>
        </div>
      );
    }
  };

  return (
    <>
      {!user && (
        <>
          <div className={styles["login-web-logo"]}>
            <Image
              src="/assets/SafariLogoDark.png"
              alt="Web Logo"
              width={200}
              height={70}
              objectFit="cover"
            />
          </div>
          <div className={styles["login-wrapper"]}>
            <div className={styles["login-content"]}>
              <h1 className={styles["login-title"]}>Log In</h1>

              <p className={styles["login-form-label"]}>Email</p>
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

              <p className={styles["login-form-label"]}>Password</p>
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

              <p className={styles["login-conditions"]}>
                By Logging in, you agree to Safari&apos;s{" "}
                <Link href="/login">
                  <a className={styles["login-conditions-highlights"]}>
                    Conditions of Use
                  </a>
                </Link>{" "}
                and{" "}
                <Link href="/login">
                  <a className={styles["login-conditions-highlights"]}>
                    Privacy Notice
                  </a>
                </Link>
              </p>

              {loadingInfo()}

              <div className={styles["signup-redirect"]}>
                <p>New to Safari?</p>
                <Link href="/signup">
                  <a>Create Safari Account</a>
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LogIn;
