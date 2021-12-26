import { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { UserInfo } from "firebase/auth";
import { auth } from "../firebase/firebase";

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!user) {
        setUser(firebaseUser);
      } else {
        setUser(null);
      }

      if (initializing) {
        setInitializing(false);
      }
    });

    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing)
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
