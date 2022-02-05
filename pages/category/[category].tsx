import { useState } from "react";
import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { CategoryProps } from "../../types/Category/Category";
import { SelectChangeEvent } from "@mui/material/Select";
import SortDropdown from "../../components/SortDropdown/SortDropdown";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import AddtoCartButton from "../../components/Button/AddtoCartButton";
import Footer from "../../components/Footer/Footer";
import styles from "../../styles/pages/Category.module.scss";

type ContextProps = {
  params: {
    category: string;
  };
};

const Category: NextPage<CategoryProps> = ({ categoryProducts }) => {
  const [sortCategoryProducts, setSortCategoryProducts] = useState("default");
  const router = useRouter();
  const categoryName = router.query.category;

  const sortedCategoryProducts = categoryProducts.sort((a, b) =>
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
      <div>
        <Image
          src="/assets/CategoryBanner.gif"
          alt=""
          width="100%"
          height="10%"
          layout="responsive"
          objectFit="cover"
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
                <div
                  className={styles["category-product-item-category"]}
                >
                  <p>{product.category}</p>
                  <IconButton>
                    <FavoriteBorderIcon fontSize="large" />
                  </IconButton>
                </div>
                <Link href="/" passHref>
                  <div
                    className={styles["category-product-item-image"]}
                  >
                    <Image
                      src={product.image}
                      alt=""
                      layout="fill"
                      objectFit="contain"
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
                <AddtoCartButton onButtonClick={() => console.log("Cliked")} />
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["category-footer-wrapper"]}>
        <Footer />
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
    revalidate: 60,
  };
};
