import { useState, useContext, ChangeEvent } from "react";
import Image from "next/image";
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
import ClearCartModal from "../components/Modal/ClearCartModal";
import cartStyles from "../styles/Home.module.scss";

const Cart: NextPage = () => {
  const user = useContext(AuthContext);
  const cart = useAppSelector((state: { cart: Product[] }) => state.cart);
  const dispatch = useAppDispatch();

  const [updateQuantity, setUpdateQuantity] = useState(1);
  const [updateQuantityModal, setUpdateQuantityModal] = useState<
    boolean | number
  >(false);
  const [clearCartModal, setClearCartModal] = useState(false);
  const [lockBody, setLockBody] = useState(false);

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

  //Total Price of all the items in the cart
  const getTotalPrice = () => {
    return cart.reduce(
      (accumulator, item) => accumulator + item.quantity! * item.price,
      0
    );
  };

  useLockedBody(lockBody);

  //If the user is not logged in
  if (!user) {
    return <CartPlaceholder />;
  }

  //If the cart is empty
  if (cart.length === 0 && user) {
    return <EmptyCart />;
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

      <div className={cartStyles["cart-title"]}>
        <h1>Your Cart:</h1>
        <ClearCartButton onButtonClick={openClearCartModal}>
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

                  <div className={cartStyles["cart-item-subtotal"]}>
                    <p>Subtotal:</p>
                    <p>${(item.quantity! * item.price).toFixed(2)}</p>
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
