import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { db } from "../firebase/firebase";
import {
  deleteDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  where,
  getDocs,
} from "firebase/firestore";
import { useAppDispatch } from "../app/reduxhooks";
import { addItemToCart } from "../features/Cart/CartSlice";
import { Product } from "../types/Product/Product";
import AddtoCartButton from "../components/Button/AddtoCartButton";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
const Placeholder = dynamic(
  () => import("../components/Placeholder/Placeholder")
);
const EmptyPlaceholder = dynamic(
  () => import("../components/EmptyPlaceholder/EmptyPlaceholder")
);
import styles from "../styles/pages/Favorites.module.scss";

const Favorites: NextPage = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [loadingFavorites, setLoadingFavorites] = useState(true);

  const user = useContext(AuthContext);
  const dispatch = useAppDispatch();

  const deleteFavorite = async (product: Product) => {
    if (user) {
      const favoritesRef = collection(db, "favorites");
      const q = query(favoritesRef, where("id", "==", product.id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        deleteDoc(doc.ref);
      });
    }
  };

  // Fetch Data from database
  useEffect(() => {
    if (user) {
      try {
        const favoritesRef = collection(db, "favorites");
        const q = query(favoritesRef, orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(q, (snapshot) => {
          const favorites_data = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          setFavorites(favorites_data as unknown as Product[]);
          setLoadingFavorites(false);
        });

        // Clean up function
        return () => unsubscribe();
      } catch (err) {
        console.log(err);
      }
    }
  }, [user]);

  //If the user is not logged in
  if (!user) {
    return (
      <Placeholder
        image="/assets/EmptyFavorites.png"
        title="Log In to see your Favorites"
        subtitle="Shop today's deal"
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  //If favorites is empty
  if (favorites.length === 0 && user && !loadingFavorites) {
    return (
      <EmptyPlaceholder
        image="/assets/EmptyFavorites.png"
        title="You have no Favorites!"
        subtitle="Shop today's deal"
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  if (loadingFavorites) {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      <div className={styles["favorites-page-container"]}>
        <div className={styles["favorites-title"]}>
          <h1>Your Favorites: </h1>
        </div>

        <div className={styles["favorites"]}>
          {favorites.map((item) => {
            return (
              <div key={item.id} className={styles["favorites-item"]}>
                <div>
                  <div className={styles["favorites-item-category"]}>
                    <p>{item.category}</p>
                    <IconButton onClick={() => deleteFavorite(item)}>
                      <FavoriteIcon
                        fontSize="large"
                        sx={{ color: "#fd5da8" }}
                      />
                    </IconButton>
                  </div>
                  <Link href={`/product/${item.id}`} passHref legacyBehavior>
                    <div className={styles["favorites-item-image"]}>
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    </div>
                  </Link>
                  <p className={styles["favorites-item-title"]}>{item.title}</p>
                  <Rating
                    name="Product Ratings"
                    value={item.rating.rate}
                    precision={0.5}
                    sx={{ margin: "0.5em 0em" }}
                    size="small"
                    readOnly
                  />
                  <p className={styles["favorites-item-price"]}>
                    ${item.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <AddtoCartButton
                    onButtonClick={() => dispatch(addItemToCart(item))}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favorites;
