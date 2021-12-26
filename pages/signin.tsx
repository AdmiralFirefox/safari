import type { NextPage } from "next";
import { useContext, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  signInAnonymously,
} from "firebase/auth";

const SignIn: NextPage = () => {
  const user = useContext(AuthContext);

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  //Create Account
  const createAccount = async () => {
    try {
      await createUserWithEmailAndPassword(
        auth,
        emailRef.current!.value,
        passwordRef.current!.value
      );
      alert("Sign Up Successful!");
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

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

  //Sign Out
  const signOutAccount = async () => {
    await signOut(auth);
  };

  return (
    <div>
      <h1>Firebase Authentication</h1>

      {!user ? (
        <>
          <h2>Email</h2>
          <input ref={emailRef} type="email" placeholder="email" />
          <h2>Password</h2>
          <input ref={passwordRef} type="password" placeholder="password" />
          <button onClick={createAccount} type="button">
            Sign Up
          </button>
          <button onClick={signIn} type="button">
            Sign In
          </button>
          <button onClick={signInWithgoogle}>Sign In With Google</button>
          <button onClick={anonymousAccountSignIn}>Sign in Anonymously</button>
        </>
      ) : (
        <div>
          <button onClick={signOutAccount}>Sign Out</button>
          {user.email === null ? (
            <h1>Welcome Anonymous!</h1>
          ) : (
            <h1>Welcome {user.email}!</h1>
          )}
        </div>
      )}
    </div>
  );
};

export default SignIn;
