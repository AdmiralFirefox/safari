import { useState, useContext } from "react";
import Image from "next/image";
import { AuthContext } from "../context/AuthContext";
import type { NextPage } from "next";
import {
  incrementQuantity,
  decrementQuantity,
  clearCart,
  removeItemFromCart,
} from "../features/Cart/CartSlice";
import { useAppSelector, useAppDispatch } from "../app/reduxhooks";
import { useLockedBody } from "../hooks/useLockedBody";
import Rating from "@mui/material/Rating";
import { Product } from "../types/Product/Product";
import InfoIcon from "@mui/icons-material/Info";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import CartPlaceholder from "../components/Placeholder/CartPlaceholder";
import ClearCartButton from "../components/Button/ClearCartButton";
import ItemQuantityButton from "../components/Button/ItemQuantityButton";
import UpdateQuantityButton from "../components/Button/UpdateQuantityButton";
import CheckoutButton from "../components/Button/CheckoutButton";
import EmptyCart from "../components/EmptyPlaceholder/EmptyCart";
import UpdateQuantityModal from "../components/Modal/UpdateQuantityModal";
import cartStyles from "../styles/Home.module.scss";

const Cart: NextPage = () => {
  const user = useContext(AuthContext);
  const cart = useAppSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useAppDispatch();

  const [updateQuantity, setUpdateQuantity] = useState("");
  const [updateQuantityModal, setUpdateQuantityModal] = useState<
    boolean | number
  >(false);
  const [lockBody, setLockBody] = useState(false);

  //Open Edit Quantity Modal
  const openQuantityModal = (id: number) => {
    setLockBody(true);
    if (updateQuantityModal === id) {
      setUpdateQuantityModal(true);
    }

    setUpdateQuantityModal(id);
  };

  //Close Edit Quantity Modal
  const closeQuantityModal = () => {
    setLockBody(false);
    setUpdateQuantityModal(false);
  };

  //Total Price of all the items in the cart
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity! * item.price,
      0
    );
  };

  useLockedBody(lockBody);

  if (!user) {
    return <CartPlaceholder />;
  }

  if (cart.length === 0 && user) {
    return <EmptyCart />;
  }

  return (
    <>
      <div className={cartStyles["cart-title"]}>
        <h1>Your Cart:</h1>
        <ClearCartButton onButtonClick={() => dispatch(clearCart())}>
          Clear Cart
        </ClearCartButton>
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
          />
        );
      })}

      <div className={cartStyles["cart-content-wrapper"]}>
        {cart.map((item) => {
          return (
            <div key={item.id} className={cartStyles["cart-content"]}>
              <div className={cartStyles["cart-item-category"]}>
                <p>{item.category}</p>
              </div>

              <div className={cartStyles["cart-item"]}>
                <div className={cartStyles["cart-item-content"]}>
                  <div className={cartStyles["cart-item-image"]}>
                    <Image
                      src={item.image}
                      alt=""
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>

                  <div className={cartStyles["cart-item-info-icon"]}>
                    <IconButton>
                      <InfoIcon
                        sx={{
                          color: "#004b91",
                          fontSize: "2.5rem",
                          transition: "color 0.5s ease-in-out",
                          "&:hover": {
                            color: "hsl(209, 100%, 35%)",
                          },
                        }}
                      />
                    </IconButton>
                  </div>

                  <div className={cartStyles["cart-item-info"]}>
                    <p className={cartStyles["cart-item-title"]}>
                      {item.title}
                    </p>
                    <Rating
                      name="Product Ratings"
                      value={item.rating.rate}
                      precision={0.5}
                      sx={{ margin: "0.3em 0em" }}
                      size="small"
                      readOnly
                    />
                    <p className={cartStyles["cart-item-price"]}>
                      ${item.price.toFixed(2)}
                    </p>
                  </div>

                  <div className={cartStyles["cart-item-quantity"]}>
                    <div>
                      <ItemQuantityButton
                        onButtonClick={() =>
                          dispatch(incrementQuantity(item.id))
                        }
                      >
                        <AddIcon sx={{ color: "#000" }} />
                      </ItemQuantityButton>

                      <p>{item.quantity}</p>

                      <ItemQuantityButton
                        onButtonClick={() =>
                          dispatch(decrementQuantity(item.id))
                        }
                      >
                        <RemoveIcon sx={{ color: "#000" }} />
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

                  <div className={cartStyles["cart-item-subtotal"]}>
                    <p>Subtotal:</p>
                    <p>$ {(item.quantity! * item.price).toFixed(2)}</p>
                  </div>
                </div>

                <div
                  className={cartStyles["cart-item-remove-icon"]}
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
            </div>
          );
        })}
      </div>

      <div className={cartStyles["cart-grandtotal-wrapper"]}>
        <div className={cartStyles["cart-grandtotal"]}>
          <p>
            Total &#40;{cart.length} items&#41;: ${getTotalPrice().toFixed(2)}
          </p>
          <CheckoutButton>Proceed to Checkout</CheckoutButton>
        </div>
      </div>
    </>
  );
};

export default Cart;
