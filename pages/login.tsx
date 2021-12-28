import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInAnonymously,
} from "firebase/auth";

const LogIn: NextPage = () => {
  const router = useRouter();
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Sign In
  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  //Sign In with Google
  const signInWithgoogle = async () => {
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
    try {
      await signInAnonymously(auth);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      {!user ? (
        <>
          <h1>Log In</h1>
          <h2>Email</h2>
          <input ref={emailRef} type="email" placeholder="email" />
          <h2>Password</h2>
          <input ref={passwordRef} type="password" placeholder="password" />
          <button onClick={signIn} type="button">
            Log In
          </button>
          <button onClick={signInWithgoogle}>Sign In With Google</button>
          <button onClick={anonymousAccountSignIn}>Sign in Anonymously</button>

          <h1>No Account?</h1>
          <Link href="/signup">
            <a>Click Here to Create New Account</a>
          </Link>
        </>
      ) : null}
    </>
  );
};

export default LogIn;
