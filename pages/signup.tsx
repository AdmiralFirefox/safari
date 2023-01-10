import { useState, useContext, useRef, useEffect } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { toast, Zoom } from "react-toastify";
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  //Watching if both passwords inputed are the same
  const password = useRef({});
  password.current = watch("password", "");

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
      toast.success("Created Account Successfully!", {
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
        <div className={styles["signup-button-wrapper"]}>
          <AccountButton>Create Account</AccountButton>
        </div>
      );
    }
  };

  return (
    <div>
      {!user ? (
        <>
          <div className={styles["signup-web-logo"]}>
            <Link href="/">
              <Image
                src="/assets/SafariLogoDark.png"
                alt="Web Logo"
                width={200}
                height={70}
                style={{
                  maxWidth: "100%",
                  height: "auto",
                  objectFit: "cover",
                }}
              />
            </Link>
          </div>

          <div className={styles["signup-wrapper"]}>
            <div className={styles["signup-content"]}>
              <h1 className={styles["signup-title"]}>Sign Up</h1>

              <form onSubmit={handleSubmit(createAccount)}>
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
                  <p role="alert" className={styles["signup-form-alert"]}>
                    {errors.email.message}
                  </p>
                )}

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
                    id="password"
                    aria-invalid={errors.password ? "true" : "false"}
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
                  <p role="alert" className={styles["signup-form-alert"]}>
                    {errors.password.message}
                  </p>
                )}

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
                    id="confirmPassword"
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("confirmPassword", {
                      required: "Please re-enter your password",
                      validate: (value) =>
                        value === password.current || "Passwords do not match",
                    })}
                    type="password"
                    placeholder="Confirm Password"
                    inputProps={{ "aria-label": "password" }}
                    sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                  />
                </Paper>
                {errors.confirmPassword && (
                  <p role="alert" className={styles["signup-form-alert"]}>
                    {errors.confirmPassword.message}
                  </p>
                )}

                <p className={styles["signup-conditions"]}>
                  By Logging in, you agree to Safari&apos;s{" "}
                  <Link
                    href="/login"
                    className={styles["signup-conditions-highlights"]}
                  >
                    Conditions of Use
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/login"
                    className={styles["signup-conditions-highlights"]}
                  >
                    Privacy Notice
                  </Link>
                </p>

                {loadingInfo()}
              </form>

              <div className={styles["login-redirect"]}>
                <p>Already have an Account?</p>
                <Link href="/login">Log In</Link>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default SignUp;
