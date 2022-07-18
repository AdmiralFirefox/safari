import { ChangeEvent, useState, useContext } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../context/AuthContext";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { SearchProductProps } from "../types/SearchProduct/SearchProduct";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AddtoCartButton from "../components/Button/AddtoCartButton";
import Fuse from "fuse.js";
import { addItemToCart } from "../features/Cart/CartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/Favorites/FavoritesSlice";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { Product } from "../types/Product/Product";
import styles from "../styles/pages/SearchProduct.module.scss";

const SearchProduct: NextPage<SearchProductProps> = ({ searchProducts }) => {
  const user = useContext(AuthContext);
  const router = useRouter();
  const [searchProduct, setSearchProduct] = useState("");

  const fuse = new Fuse(searchProducts, {
    keys: ["title", "price", "category"],
    includeScore: true,
    threshold: 0.3,
  });

  const results = fuse.search(searchProduct);

  const productResults = results.map((result) => result.item);

  const favorites = useAppSelector(
    (state: { favorites: Product[] }) => state.favorites
  );
  const dispatch = useAppDispatch();

  const favoriteID = favorites.map((favorite) => favorite.id);

  const handleSearchProductChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchProduct(e.target.value);
  };

  return (
    <>
      <div className={styles["searchproduct-page-container"]}>
        <div className={styles["search-product-input"]}>
          <Paper
            sx={{
              p: "0.5em",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "min(85%, 30em)",
              background: "#EAEDED",
              boxShadow: "none",
            }}
          >
            <InputBase
              placeholder="Search Products"
              inputProps={{ "aria-label": "search products" }}
              sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
              onChange={handleSearchProductChange}
            />
          </Paper>
        </div>

        <div className={styles["search-product-results-text"]}>
          {productResults.length !== 0 || searchProduct !== "" ? (
            <p>
              {productResults.length} Search Results for: &ldquo;{searchProduct}
              &rdquo;
            </p>
          ) : null}
        </div>

        <div className={styles["search-products-wrapper"]}>
          {productResults.map((product) => {
            return (
              <div key={product.id} className={styles["search-product-item"]}>
                <div>
                  <div className={styles["search-product-item-category"]}>
                    <p>{product.category}</p>
                    {favoriteID.includes(product.id) && user ? (
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromFavorites(product.id))
                        }
                      >
                        <FavoriteIcon
                          fontSize="large"
                          sx={{ color: "#fd5da8" }}
                        />
                      </IconButton>
                    ) : !user ? (
                      <IconButton onClick={() => router.push("/login")}>
                        <FavoriteBorderIcon
                          fontSize="large"
                          sx={{ color: "#fd5da8" }}
                        />
                      </IconButton>
                    ) : (
                      <IconButton
                        onClick={() => dispatch(addToFavorites(product))}
                      >
                        <FavoriteBorderIcon
                          fontSize="large"
                          sx={{ color: "#fd5da8" }}
                        />
                      </IconButton>
                    )}
                  </div>
                  <Link href={`/product/${product.id}`} passHref>
                    <div className={styles["search-product-item-image"]}>
                      <Image
                        src={product.image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                        unoptimized={true}
                      />
                    </div>
                  </Link>
                  <p className={styles["search-product-item-title"]}>
                    {product.title}
                  </p>
                  <Rating
                    name="Product Ratings"
                    value={product.rating.rate}
                    precision={0.5}
                    sx={{ margin: "0.5em 0em" }}
                    size="small"
                    readOnly
                  />
                  <p className={styles["search-product-item-price"]}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <AddtoCartButton
                    onButtonClick={() =>
                      user
                        ? dispatch(addItemToCart(product))
                        : router.push("/login")
                    }
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

export default SearchProduct;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const searchProducts = await res.json();

  return {
    props: {
      searchProducts,
    },
    revalidate: 60,
  };
};
