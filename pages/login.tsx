import { useState, useContext, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/legacy/image";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import { toast, Zoom } from "react-toastify";
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
import { useForm } from "react-hook-form";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
      toast.success("Signed In Successfully!", {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error(`${error}`, {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  //Sign In with Google
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    auth.useDeviceLanguage();

    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed In Successfully!", {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      toast.error(`${err}`, {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    }
  };

  // Sign in Anonymously
  const anonymousAccountSignIn = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      setLoading(false);
      toast.success("Signed In Successfully!", {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
      toast.error(`${err}`, {
        position: "top-center",
        autoClose: 5000,
        transition: Zoom,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
      });
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
        <div className={styles["circular-wrapper"]}>
          <CircularProgress size={45} sx={{ color: "#000" }} />
        </div>
      );
    } else {
      return (
        <div className={styles["login-button-wrapper"]}>
          <AccountButton>Log In</AccountButton>
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
            <Link href="/">
              <Image
                src="/assets/SafariLogoDark.png"
                alt="Web Logo"
                width={200}
                height={70}
                objectFit="cover"
              />
            </Link>
          </div>

          <div className={styles["login-wrapper"]}>
            <div className={styles["login-content"]}>
              <h1 className={styles["login-title"]}>Log In</h1>

              <form onSubmit={handleSubmit(signIn)}>
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
                    id="email"
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: "required",
                      pattern: {
                        value: /\S+@\S+\.\S+/,
                        message: "Please enter a valid email",
                      },
                    })}
                    placeholder="Enter Email"
                    inputProps={{ "aria-label": "email" }}
                    sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                  />
                </Paper>
                {errors.email && (
                  <p role="alert" className={styles["login-form-alert"]}>
                    {errors.email.message}
                  </p>
                )}

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
                    id="password"
                    aria-invalid={errors.passward ? "true" : "false"}
                    {...register("password", {
                      required: "required",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters",
                      },
                    })}
                    placeholder="Enter Password"
                    inputProps={{ "aria-label": "password" }}
                    sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                  />
                </Paper>
                {errors.password && (
                  <p role="alert" className={styles["login-form-alert"]}>
                    {errors.password.message}
                  </p>
                )}

                <p className={styles["login-conditions"]}>
                  By Logging in, you agree to Safari&apos;s{" "}
                  <Link
                    href="/login"
                    className={styles["login-conditions-highlights"]}
                  >
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/login"
                    className={styles["login-conditions-highlights"]}
                  >
                    Privacy Notice
                  </Link>
                </p>

                {loadingInfo()}
              </form>

              <div className={styles["signup-redirect"]}>
                <p>New to Safari?</p>
                <Link href="/signup">Create Safari Account</Link>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default LogIn;
