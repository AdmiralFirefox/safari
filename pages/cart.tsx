import { useState, useContext, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { AuthContext } from "../context/AuthContext";
import type { NextPage } from "next";
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeItemFromCart,
  setQuantity,
} from "../features/Cart/CartSlice";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { toast, Zoom } from "react-toastify";
import { useLockedBody } from "../hooks/useLockedBody";
import Rating from "@mui/material/Rating";
import { Product } from "../types/Product/Product";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
const EmptyPlaceholder = dynamic(
  () => import("../components/EmptyPlaceholder/EmptyPlaceholder")
);
const UpdateQuantityModal = dynamic(
  () => import("../components/Modal/UpdateQuantityModal")
);
const ClearCartModal = dynamic(
  () => import("../components/Modal/ClearCartModal")
);
import ClearCartButton from "../components/Button/ClearCartButton";
import ItemQuantityButton from "../components/Button/ItemQuantityButton";
import UpdateQuantityButton from "../components/Button/UpdateQuantityButton";
import CheckoutButton from "../components/Button/CheckoutButton";
import styles from "../styles/pages/Cart.module.scss";

const Cart: NextPage = () => {
  const user = useContext(AuthContext);
  const router = useRouter();
  const cart = useAppSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useAppDispatch();

  const [updateQuantity, setUpdateQuantity] = useState(1);
  const [updateQuantityModal, setUpdateQuantityModal] = useState<
    boolean | number
  >(false);
  const [clearCartModal, setClearCartModal] = useState(false);
  const [lockBody, setLockBody] = useState(false);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  //Handling Quantity Changes
  const handleQuantityChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUpdateQuantity(Number(e.target.value));
  };

  //Open Edit Quantity Modal
  const openQuantityModal = (id: number) => {
    setLockBody(true);
    setUpdateQuantity(0);
    if (updateQuantityModal === id) {
      setUpdateQuantityModal(true);
    }

    setUpdateQuantityModal(id);
  };

  //Close Edit Quantity Modal
  const closeQuantityModal = () => {
    setLockBody(false);
    setUpdateQuantityModal(false);
    setUpdateQuantity(0);
  };

  //Open Clear Cart Modal
  const openClearCartModal = () => {
    setLockBody(true);
    setClearCartModal(true);
  };

  //Close Clear Cart Modal
  const closeClearCartModal = () => {
    setLockBody(false);
    setClearCartModal(false);
  };

  //Total Items in the Cart
  const getTotalItems = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity!, 0);
  };

  //Total Price of all the items in the cart
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity! * item.price,
      0
    );
  };

  useLockedBody(lockBody);

  //Stripe Set-up
  const publishableKey = `${process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY}`;
  const stripePromise = loadStripe(publishableKey);

  const createCheckoutSession = async () => {
    setLoadingCheckout(true);

    if (user) {
      const stripe = await stripePromise;

      //Passing the cart items on the checkout session on the api server
      const checkoutSession = await Axios.post("/api/checkout/session", cart);

      const result = await stripe!.redirectToCheckout({
        sessionId: checkoutSession.data.id,
      });

      if (result.error) {
        console.log(result.error.message);
        toast.error(`${result.error.message}`, {
          position: "top-center",
          autoClose: 5000,
          transition: Zoom,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        });
      }
    }

    setLoadingCheckout(false);
  };

  //If the cart is empty
  if (cart.length === 0) {
    return (
      <EmptyPlaceholder
        image="/assets/EmptyCart.png"
        title="Your Safari Cart is Empty!"
        subtitle="Shop today's deal"
        imageWidth={150}
        imageHeight={150}
      />
    );
  }

  return (
    <>
      <ClearCartModal
        clearCartModal={clearCartModal}
        closeClearCartModal={closeClearCartModal}
        onCartClear={() => {
          dispatch(clearCart());
          closeClearCartModal();
        }}
      />

      <div className={styles["cart-title-container"]}>
        <div className={styles["cart-title"]}>
          <h1>Your Cart:</h1>
          <ClearCartButton onButtonClick={openClearCartModal}>
            Clear Cart
          </ClearCartButton>
        </div>
      </div>

      {cart.map((item) => {
        return (
          <UpdateQuantityModal
            itemTitle={item.title}
            active={updateQuantityModal === item.id}
            key={item.id}
            closeQuantityModal={closeQuantityModal}
            itemCategory={item.category}
            itemImage={item.image}
            itemRating={item.rating.rate}
            itemPrice={item.price}
            handleQuantityChange={handleQuantityChange}
            quantityValue={item.quantity}
            updateItemQuantity={() => {
              dispatch(setQuantity({ ...item, quantity: updateQuantity }));
              closeQuantityModal();
              setUpdateQuantity(0);
            }}
            disabledButton={updateQuantity <= 0 || updateQuantity > 50}
          />
        );
      })}

      <div className={styles["cart-content-wrapper"]}>
        {cart.map((item) => {
          return (
            <div key={item.id} className={styles["cart-content"]}>
              <div className={styles["cart-item-header"]}>
                <div className={styles["cart-item-category"]}>
                  <p>{item.category}</p>
                </div>

                <div
                  className={styles["cart-item-remove-icon"]}
                  onClick={() => dispatch(removeItemFromCart(item.id))}
                >
                  <IconButton>
                    <RemoveCircleIcon
                      sx={{
                        fontSize: "2.5rem",
                        color: "hsl(12, 96%, 40%)",
                        transition: "color 0.5s ease-in-out",
                        "&:hover": {
                          color: "hsl(12, 96%, 50%)",
                        },
                      }}
                    />
                  </IconButton>
                </div>
              </div>

              <div className={styles["cart-item"]}>
                <div className={styles["cart-item-content"]}>
                  <div
                    className={styles["cart-item-image"]}
                    onClick={() => router.push(`/product/${item.id}`)}
                  >
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </div>

                  <div className={styles["cart-item-info"]}>
                    <p className={styles["cart-item-title"]}>{item.title}</p>
                    <Rating
                      name="Product Ratings"
                      value={item.rating.rate}
                      precision={0.5}
                      sx={{ margin: "0.3em 0em" }}
                      size="small"
                      readOnly
                    />
                    <p className={styles["cart-item-price"]}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className={styles["cart-item-quantity"]}>
                    <div>
                      <ItemQuantityButton
                        onButtonClick={() =>
                          dispatch(incrementQuantity(item.id))
                        }
                        disabledButton={item!.quantity! >= 50}
                      >
                        <AddIcon />
                      </ItemQuantityButton>

                      <p>{item.quantity}</p>

                      <ItemQuantityButton
                        onButtonClick={() =>
                          dispatch(decrementQuantity(item.id))
                        }
                        disabledButton={item!.quantity! <= 1}
                      >
                        <RemoveIcon />
                      </ItemQuantityButton>
                    </div>

                    <div>
                      <UpdateQuantityButton
                        onButtonClick={() => openQuantityModal(item.id)}
                      >
                        Edit Quantity
                      </UpdateQuantityButton>
                    </div>
                  </div>

                  <div className={styles["cart-item-subtotal"]}>
                    <p>Subtotal:</p>
                    <p>${(item.quantity! * item.price).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles["cart-grandtotal-wrapper"]}>
        <div className={styles["cart-grandtotal"]}>
          <p>
            Total &#40;{getTotalItems()} items&#41;: $
            {getTotalPrice().toFixed(2)}
          </p>
          {user ? (
            <CheckoutButton
              onButtonClick={createCheckoutSession}
              loadingCheckout={loadingCheckout}
            >
              {loadingCheckout ? "Processing..." : "Proceed to Checkout"}
            </CheckoutButton>
          ) : (
            <CheckoutButton
              onButtonClick={() =>
                router.push("/login") as unknown as Promise<void>
              }
            >
              {"Log In to Checkout"}
            </CheckoutButton>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
