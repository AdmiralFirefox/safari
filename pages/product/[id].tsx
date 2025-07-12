import { useState, useContext, ChangeEvent } from "react";
import type { NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { AuthContext } from "../../context/AuthContext";
import { Product } from "../../types/Product/Product";
import { ProductItem } from "../../types/Product/ProductItem";
import Divider from "@mui/material/Divider";
import Rating from "@mui/material/Rating";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import ItemQuantityButton from "../../components/Button/ItemQuantityButton";
import AddtoCartButton from "../../components/Button/AddtoCartButton";
import FavoriteButton from "../../components/Button/FavoriteButton";
import { useAppDispatch } from "../../app/reduxhooks";
import { addProductQuantity } from "../../features/Cart/CartSlice";
import styles from "../../styles/pages/Product.module.scss";

type ContextProps = {
  params: {
    id: number;
  };
};

const ProductPage: NextPage<ProductItem> = ({ product }) => {
  const [productQuantity, setProductQuantity] = useState(1);

  const user = useContext(AuthContext);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const incrementProductQuantity = () => {
    if (productQuantity >= 50) {
      setProductQuantity(50);
    } else {
      setProductQuantity((prevQuantityCount) => prevQuantityCount + 1);
    }
  };

  const decrementProductQuantity = () => {
    if (productQuantity <= 0) {
      setProductQuantity(0);
    } else {
      setProductQuantity((prevQuantityCount) => prevQuantityCount - 1);
    }
  };

  //Handling Quantity Changes
  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    let { value, min, max } = e.target;
    let numValue = Number(value);

    numValue = Math.max(
      Number(min),
      Math.min(Number(max), Number(value.replace(/\D/, "")))
    );

    setProductQuantity(numValue);
  };

  return (
    <div className={styles["product-wrapper"]}>
      <div className={styles["product-image-wrapper"]}>
        <div className={styles["product-image-content"]}>
          <Image
            src={product.image}
            alt="Product Image"
            className={styles["product-image"]}
            priority
            fill
            sizes="100vw"
          />
        </div>
        <FavoriteButton product={product} />
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
            <ItemQuantityButton
              onButtonClick={incrementProductQuantity}
              disabledButton={productQuantity >= 50}
            >
              <AddIcon />
            </ItemQuantityButton>

            <input
              type="text"
              onChange={handleQuantityChange}
              value={productQuantity}
              min="0"
              max="50"
            />

            <ItemQuantityButton
              onButtonClick={decrementProductQuantity}
              disabledButton={productQuantity <= 1}
            >
              <RemoveIcon />
            </ItemQuantityButton>
          </div>
          <div className={styles["add-to-cart-button-wrapper"]}>
            <AddtoCartButton
              onButtonClick={() =>
                user
                  ? dispatch(
                      addProductQuantity({
                        ...product,
                        quantity: productQuantity,
                      })
                    )
                  : router.push("/login")
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;

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
