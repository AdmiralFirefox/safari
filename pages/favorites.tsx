import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { addItemToCart } from "../features/Cart/CartSlice";
import { Product } from "../types/Product/Product";
import { removeFromFavorites } from "../features/Favorites/FavoritesSlice";
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
  const user = useContext(AuthContext);

  const favorites = useAppSelector(
    (state: { favorites: Product[] }) => state.favorites
  );
  const dispatch = useAppDispatch();

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
  if (favorites.length === 0 && user) {
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

  return <>
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

                  <IconButton
                    onClick={() => dispatch(removeFromFavorites(item.id))}
                  >
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
                      layout="fill"
                      objectFit="contain"
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
  </>;
};

export default Favorites;
