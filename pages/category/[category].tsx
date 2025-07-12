import { useState, useContext } from "react";
import type { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { CategoryProps } from "../../types/Category/Category";
import { SelectChangeEvent } from "@mui/material/Select";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import Rating from "@mui/material/Rating";
import AddtoCartButton from "../../components/Button/AddtoCartButton";
import FavoriteButton from "../../components/Button/FavoriteButton";
const Footer = dynamic(() => import("../../components/Footer/Footer"));
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import { useAppDispatch } from "../../app/reduxhooks";
import { addItemToCart } from "../../features/Cart/CartSlice";
import styles from "../../styles/pages/Category.module.scss";

type ContextProps = {
  params: {
    category: string;
  };
};

const Category: NextPage<CategoryProps> = ({ categoryProducts }) => {
  const user = useContext(AuthContext);
  const [sortCategoryProducts, setSortCategoryProducts] = useState("default");

  const size: Size = useWindowSize();

  const router = useRouter();
  const categoryName = router.query.category;

  const dispatch = useAppDispatch();

  const newCategoryProducts: CategoryProps["categoryProducts"] = [];
  const sortedCategoryProducts = newCategoryProducts
    .concat(categoryProducts)
    .sort((a, b) =>
      sortCategoryProducts === "default"
        ? a.id > b.id
          ? 1
          : -1
        : sortCategoryProducts === "price-desc"
        ? b.price > a.price
          ? 1
          : -1
        : sortCategoryProducts === "price-asc"
        ? a.price > b.price
          ? 1
          : -1
        : sortCategoryProducts === "ratings-desc"
        ? b.rating.rate > a.rating.rate
          ? 1
          : -1
        : sortCategoryProducts === "ratings-asc"
        ? a.rating.rate > b.rating.rate
          ? 1
          : -1
        : 0
    );

  const handleSortCategoryProductsChange = (e: SelectChangeEvent) => {
    setSortCategoryProducts(e.target.value);
  };

  return (
    <>
      <div
        className={styles["category-page-container"]}
        style={{ height: `${size.height}px` }}
      >
        <div className={styles["category-page-content"]}>
          <div>
            <Image
              src="/assets/CategoryBanner.png"
              alt=""
              priority
              sizes="100vw"
              width={100}
              height={100}
              style={{
                width: "100%",
                height: "10%",
                objectFit: "cover",
              }}
            />
          </div>

          <div className={styles["category-title"]}>
            <p>{categoryName}</p>
            <div className={styles["category-sort-products"]}>
              <SortDropdown
                sortValue={sortCategoryProducts}
                onChangeValue={handleSortCategoryProductsChange}
              />
            </div>
          </div>

          <div className={styles["category-products"]}>
            {sortedCategoryProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className={styles["category-product-item"]}
                >
                  <div>
                    <div className={styles["category-product-item-category"]}>
                      <p>{product.category}</p>
                      <FavoriteButton product={product} />
                    </div>
                    <Link
                      href={`/product/${product.id}`}
                      passHref
                      legacyBehavior
                    >
                      <div className={styles["category-product-item-image"]}>
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
                    <p className={styles["category-product-item-title"]}>
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
                    <p className={styles["category-product-item-price"]}>
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

        <div className={styles["category-footer"]}>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products/categories");
  const categories: string[] = await res.json();

  const paths = categories.map((category) => {
    return {
      params: { category: category },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: ContextProps) => {
  const category = context.params.category;
  const res = await fetch(
    `https://fakestoreapi.com/products/category/${category}`
  );
  const categoryProducts = await res.json();

  return {
    props: {
      categoryProducts,
    },
  };
};
