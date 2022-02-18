import type { NextPage } from "next";
import { GlassMagnifier } from "react-image-magnifiers";
import { Product } from "../../types/Product/Product";
import { ProductItem } from "../../types/Product/ProductItem";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";
import ItemQuantityButton from "../../components/Button/ItemQuantityButton";
import AddtoCartButton from "../../components/Button/AddtoCartButton";
import styles from "../../styles/pages/Product.module.scss";

type ContextProps = {
  params: {
    id: number;
  };
};

const Product: NextPage<ProductItem> = ({ product }) => {
  return (
    <div className={styles["product-wrapper"]}>
      <div className={styles["product-image-wrapper"]}>
        <GlassMagnifier
          className={styles["product-image"]}
          imageSrc={product.image}
          largeImageSrc={product.image}
          allowOverflow={true}
          magnifierSize="45%"
          magnifierBorderSize={3}
          magnifierBorderColor="rgba(255, 255, 255, .5)"
          square={true}
        />
        <IconButton sx={{ marginTop: "0.6em" }}>
          <FavoriteIcon
            fontSize="large"
            sx={{
              color: "#fd5da8",
            }}
          />
        </IconButton>
      </div>
      <div>
        <p className={styles["product-title"]}>{product.title}</p>
        <Rating
          name="Product Ratings"
          value={product.rating.rate}
          precision={0.5}
          size="medium"
          sx={{ margin: "0.5em 0em" }}
          readOnly
        />
        <p className={styles["product-price"]}>
          Price: ${product.price.toFixed(2)}
        </p>
        <Divider
          sx={{
            background: "#232F3E",
            height: "0.5em",
            width: "100%",
            margin: "1em 0em",
          }}
        />
        <p className={styles["product-description-title"]}>Item Description:</p>
        <p className={styles["product-description"]}>{product.description}</p>
        <p className={styles["product-category"]}>
          Category: {product.category}
        </p>
        <Divider
          sx={{
            background: "#232F3E",
            height: "0.5em",
            width: "100%",
            margin: "1em 0em",
          }}
        />
        <div className={styles["product-quantity-wrapper"]}>
          <div>
            <ItemQuantityButton onButtonClick={() => console.log("Updated")}>
              <AddIcon />
            </ItemQuantityButton>
            <Paper
              sx={{
                p: "0.3em",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "6em",
                margin: "0em 1em",
                background: "#EAEDED",
                boxShadow: "none",
              }}
            >
              <InputBase
                placeholder="Input Quantity"
                inputProps={{ "aria-label": "search products" }}
                sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
              />
            </Paper>

            <ItemQuantityButton onButtonClick={() => console.log("Updated")}>
              <RemoveIcon />
            </ItemQuantityButton>
          </div>
          <div className={styles["add-to-cart-button-wrapper"]}>
            <AddtoCartButton
              onButtonClick={() => console.log("Added to Cart")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;

export const getStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((product: Product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps = async (context: ContextProps) => {
  const id = context.params.id;
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  const product = await res.json();

  return {
    props: {
      product,
    },
  };
};
