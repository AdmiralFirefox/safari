import { useState, useEffect, useContext } from "react";
import { GetStaticProps } from "next";
import dynamic from "next/dynamic";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { AuthContext } from "../context/AuthContext";
import HomeSlider from "../components/Slider/HomeSlider";
const Footer = dynamic(() => import("../components/Footer/Footer"));
import SortDropdown from "../components/SortDropdown/SortDropdown";
import { SelectChangeEvent } from "@mui/material/Select";
import { ProductsProps } from "../types/Products/Products";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import AddtoCartButton from "../components/Button/AddtoCartButton";
import { IoArrowUpCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import { addItemToCart } from "../features/Cart/CartSlice";
import {
  addToFavorites,
  removeFromFavorites,
} from "../features/Favorites/FavoritesSlice";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { Product } from "../types/Product/Product";
import styles from "../styles/pages/Home.module.scss";

const Home: NextPage<ProductsProps> = ({ products }) => {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [sortProducts, setSortProducts] = useState("default");
  const [arrowUp, setArrowUp] = useState(false);

  const favorites = useAppSelector(
    (state: { favorites: Product[] }) => state.favorites
  );
  const dispatch = useAppDispatch();

  const favoriteID = favorites.map((favorite) => favorite.id);

  const newProducts: ProductsProps["products"] = [];
  const sortedProducts = newProducts
    .concat(products)
    .sort((a, b) =>
      sortProducts === "default"
        ? a.id > b.id
          ? 1
          : -1
        : sortProducts === "price-desc"
        ? b.price > a.price
          ? 1
          : -1
        : sortProducts === "price-asc"
        ? a.price > b.price
          ? 1
          : -1
        : sortProducts === "ratings-desc"
        ? b.rating.rate > a.rating.rate
          ? 1
          : -1
        : sortProducts === "ratings-asc"
        ? a.rating.rate > b.rating.rate
          ? 1
          : -1
        : 0
    );

  const handleSortProductChange = (e: SelectChangeEvent) => {
    setSortProducts(e.target.value);
  };

  //Scrolls to the Top of the Page
  const scrollToTopPage = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  //Arrow Appears when scrolling up to the page
  useEffect(() => {
    const fadeArrowUp = () => {
      if (window.scrollY >= 90) {
        setArrowUp(true);
      } else {
        setArrowUp(false);
      }
    };

    window.addEventListener("scroll", fadeArrowUp);

    return () => {
      window.removeEventListener("scroll", fadeArrowUp);
    };
  }, []);

  return (
    <>
      <div className={styles["home-page-container"]}>
        <HomeSlider />
        <div className={styles["home-content-wrapper"]}>
          <div className={styles["home-sort-products"]}>
            <SortDropdown
              sortValue={sortProducts}
              onChangeValue={handleSortProductChange}
            />
          </div>

          <div className={styles["home-products"]}>
            {sortedProducts.slice(0, 8).map((product) => {
              return (
                <div key={product.id} className={styles["home-product-item"]}>
                  <div>
                    <div className={styles["home-product-item-category"]}>
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
                      <div className={styles["home-product-item-image"]}>
                        <Image
                          src={product.image}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                          unoptimized={true}
                          priority
                        />
                      </div>
                    </Link>
                    <p className={styles["home-product-item-title"]}>
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
                    <p className={styles["home-product-item-price"]}>
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

          <div>
            <Image
              src="/assets/AdEcho.jpg"
              alt=""
              width="100%"
              height="20%"
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className={styles["home-products"]}>
            {sortedProducts.slice(8, 16).map((product) => {
              return (
                <div key={product.id} className={styles["home-product-item"]}>
                  <div>
                    <div className={styles["home-product-item-category"]}>
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
                      <div className={styles["home-product-item-image"]}>
                        <Image
                          src={product.image}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                          unoptimized={true}
                          priority
                        />
                      </div>
                    </Link>
                    <p className={styles["home-product-item-title"]}>
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
                    <p className={styles["home-product-item-price"]}>
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

          <div>
            <Image
              src="/assets/AdEnjoy.jpg"
              alt=""
              width="100%"
              height="20%"
              layout="responsive"
              objectFit="cover"
            />
          </div>

          <div className={styles["home-products-last-batch-wrapper"]}>
            <div className={styles["home-products-last-batch"]}>
              {sortedProducts.slice(16, 20).map((product) => {
                return (
                  <div key={product.id} className={styles["home-product-item"]}>
                    <div>
                      <div className={styles["home-product-item-category"]}>
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
                        <div className={styles["home-product-item-image"]}>
                          <Image
                            src={product.image}
                            alt=""
                            layout="fill"
                            objectFit="contain"
                            unoptimized={true}
                            priority
                          />
                        </div>
                      </Link>
                      <p className={styles["home-product-item-title"]}>
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
                      <p className={styles["home-product-item-price"]}>
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
        </div>
      </div>

      <div className={styles["home-footer-container"]}>
        <div className={styles["home-footer-wrapper"]}>
          <Footer />
        </div>
      </div>

      <div onClick={scrollToTopPage}>
        <IconContext.Provider
          value={{
            className: arrowUp
              ? styles["home-scroll-to-top-active"]
              : styles["home-scroll-to-top"],
          }}
        >
          <IoArrowUpCircle />
        </IconContext.Provider>
      </div>
    </>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
