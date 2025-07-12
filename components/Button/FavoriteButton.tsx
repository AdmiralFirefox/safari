import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRouter } from "next/router";
import { Product } from "../../types/Product/Product";
import { ProductItem } from "../../types/Product/ProductItem";
import { db } from "../../firebase/firebase";
import {
  addDoc,
  collection,
  serverTimestamp,
  getDocs,
  deleteDoc,
  query,
  onSnapshot,
  where,
} from "firebase/firestore";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import CircularProgress from "@mui/material/CircularProgress";

const FavoriteButton = ({ product }: ProductItem) => {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const isFavorite = favoriteTitles.includes(product.title);

  // Add to favorites
  const addToFavorites = async (
    product_id: number,
    product_category: string,
    product_description: string,
    product_image: string,
    product_price: number,
    product_rating: number,
    product_title: string
  ) => {
    const favoritesRef = collection(db, "favorites");

    await addDoc(favoritesRef, {
      id: product_id,
      createdAt: serverTimestamp(),
      category: product_category,
      description: product_description,
      image: product_image,
      price: product_price,
      rating: {
        rate: product_rating,
      },
      title: product_title,
      favorite: true,
    });
  };

  // Delete to favorites
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

  // Load all favorites
  useEffect(() => {
    const q = query(collection(db, "favorites"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const titles = snapshot.docs.map((doc) => doc.data().title);
      setFavoriteTitles(titles);
      setLoading(false);
    });

    // Clean up
    return () => unsubscribe();
  }, []);

  return (
    <>
      {isFavorite && user ? (
        <IconButton onClick={() => deleteFavorite(product)}>
          <FavoriteIcon fontSize="large" sx={{ color: "#fd5da8" }} />
        </IconButton>
      ) : !user ? (
        <IconButton onClick={() => router.push("/login")}>
          <FavoriteBorderIcon fontSize="large" sx={{ color: "#fd5da8" }} />
        </IconButton>
      ) : loading ? (
        <CircularProgress
          size={30}
          sx={{
            color: "hsl(36, 100%, 60%)",
            margin: "0.5em",
          }}
        />
      ) : (
        <IconButton
          onClick={() =>
            addToFavorites(
              product.id,
              product.category,
              product.description,
              product.image,
              product.price,
              product.rating.rate,
              product.title
            )
          }
        >
          <FavoriteBorderIcon fontSize="large" sx={{ color: "#fd5da8" }} />
        </IconButton>
      )}
    </>
  );
};

export default FavoriteButton;
