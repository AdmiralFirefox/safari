import { useState } from "react";
import { GetStaticProps } from "next";
import type { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import HomeSlider from "../components/Slider/HomeSlider";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import { SelectChangeEvent } from "@mui/material/Select";
import { ProductsProps } from "../types/Products/Products";
import Rating from "@mui/material/Rating";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import IconButton from "@mui/material/IconButton";
import AddtoCartButton from "../components/Button/AddtoCartButton";
import Footer from "../components/Footer/Footer";
import homeStyles from "../styles/Home.module.scss";

const Home: NextPage<ProductsProps> = ({ products }) => {
  const [sortProducts, setSortProducts] = useState("default");

  const handleSortProductChange = (e: SelectChangeEvent) => {
    setSortProducts(e.target.value);
  };

  return (
    <>
      <HomeSlider />
      <div className={homeStyles["home-content-wrapper"]}>
        <div className={homeStyles["home-sort-products"]}>
          <SortDropdown
            sortProducts={sortProducts}
            handleSortProductChange={handleSortProductChange}
          />
        </div>

        <div className={homeStyles["home-products"]}>
          {products.slice(0, 8).map((product) => {
            return (
              <div key={product.id} className={homeStyles["home-product-item"]}>
                <div>
                  <div className={homeStyles["home-product-item-category"]}>
                    <p>{product.category}</p>
                    <IconButton>
                      <FavoriteBorderIcon fontSize="large" />
                    </IconButton>
                  </div>
                  <Link href="/" passHref>
                    <div className={homeStyles["home-product-item-image"]}>
                      <Image
                        src={product.image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </Link>
                  <p className={homeStyles["home-product-item-title"]}>
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
                  <p className={homeStyles["home-product-item-price"]}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <AddtoCartButton />
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

        <div className={homeStyles["home-products"]}>
          {products.slice(8, 16).map((product) => {
            return (
              <div key={product.id} className={homeStyles["home-product-item"]}>
                <div>
                  <div className={homeStyles["home-product-item-category"]}>
                    <p>{product.category}</p>
                    <IconButton>
                      <FavoriteBorderIcon fontSize="large" />
                    </IconButton>
                  </div>
                  <Link href="/" passHref>
                    <div className={homeStyles["home-product-item-image"]}>
                      <Image
                        src={product.image}
                        alt=""
                        layout="fill"
                        objectFit="contain"
                      />
                    </div>
                  </Link>
                  <p className={homeStyles["home-product-item-title"]}>
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
                  <p className={homeStyles["home-product-item-price"]}>
                    ${product.price.toFixed(2)}
                  </p>
                </div>
                <div>
                  <AddtoCartButton />
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

        <div className={homeStyles["home-products-last-batch-wrapper"]}>
          <div className={homeStyles["home-products-last-batch"]}>
            {products.slice(16, 20).map((product) => {
              return (
                <div
                  key={product.id}
                  className={homeStyles["home-product-item"]}
                >
                  <div>
                    <div className={homeStyles["home-product-item-category"]}>
                      <p>{product.category}</p>
                      <IconButton>
                        <FavoriteBorderIcon fontSize="large" />
                      </IconButton>
                    </div>
                    <Link href="/" passHref>
                      <div className={homeStyles["home-product-item-image"]}>
                        <Image
                          src={product.image}
                          alt=""
                          layout="fill"
                          objectFit="contain"
                        />
                      </div>
                    </Link>
                    <p className={homeStyles["home-product-item-title"]}>
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
                    <p className={homeStyles["home-product-item-price"]}>
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <AddtoCartButton />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className={homeStyles["home-footer-wrapper"]}>
        <Footer />
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
    revalidate: 60,
  };
};
