import type { NextPage } from "next";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebase";
import homeStyles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const user = useContext(AuthContext);

  //Sign Out
  const signOutAccount = async () => {
    await signOut(auth);
  };

  return (
    <div>
      {!user ? (
        <>
          <h1>You are logged out</h1>
          <Link href="/login">
            <a>Click here to login</a>
          </Link>
        </>
      ) : (
        <>
          <button onClick={signOutAccount}>Sign Out</button>
          {user.email === null ? (
            <h1>Welcome Anonymous!</h1>
          ) : (
            <h1>Welcome {user.email}!</h1>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
