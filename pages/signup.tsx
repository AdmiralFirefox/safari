import type { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp: NextPage = () => {
  const router = useRouter();
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

  useEffect(() => {
    if (user) {
      router.push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div>
      {!user ? (
        <>
          <h1>Sign Up</h1>
          <h2>Email</h2>
          <input ref={emailRef} type="email" placeholder="email" />
          <h2>Password</h2>
          <input ref={passwordRef} type="password" placeholder="password" />
          <button onClick={createAccount} type="button">
            Sign Up
          </button>

          <h1>Already have an Account?</h1>
          <Link href="/login">
            <a>Click Here to Login</a>
          </Link>
        </>
      ) : null}
    </div>
  );
};

export default SignUp;
