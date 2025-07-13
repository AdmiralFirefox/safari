import { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { SearchProductProps } from "../types/SearchProduct/SearchProduct";
import Rating from "@mui/material/Rating";
import AddtoCartButton from "../components/Button/AddtoCartButton";
import FavoriteButton from "../components/Button/FavoriteButton";
import Fuse from "fuse.js";
import { addItemToCart } from "../features/Cart/CartSlice";
import { useAppDispatch } from "../app/reduxhooks";
import styles from "../styles/pages/SearchProduct.module.scss";

const SearchProduct: NextPage<SearchProductProps> = ({ searchProducts }) => {
  const [searchProduct, setSearchProduct] = useState("");

  const fuse = new Fuse(searchProducts, {
    keys: ["title", "price", "category"],
    includeScore: true,
    threshold: 0.6,
  });

  const results = fuse.search(searchProduct);

  const productResults = results.map((result) => result.item);
  const dispatch = useAppDispatch();

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
                    <FavoriteButton product={product} />
                  </div>
                  <Link href={`/product/${product.id}`} passHref legacyBehavior>
                    <div className={styles["search-product-item-image"]}>
                      <Image
                        src={product.image}
                        alt=""
                        fill
                        sizes="100vw"
                        style={{
                          objectFit: "contain",
                        }}
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
                    onButtonClick={() => dispatch(addItemToCart(product))}
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
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL_BASE}/products`);
  const searchProducts = await res.json();

  return {
    props: {
      searchProducts,
    },
  };
};
