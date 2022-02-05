import { FC, ChangeEvent, KeyboardEvent } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import Image from "next/image";
import Rating from "@mui/material/Rating";
import UpdateQuantityButton from "../Button/UpdateQuantityButton";
import CancelButton from "../Button/CancelButton";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../styles/modal/UpdateQuantityModal.module.scss";

interface UpdateQuantityModalProps {
  itemTitle: string;
  active: boolean;
  closeQuantityModal: () => void;
  itemCategory: string;
  itemImage: string;
  itemRating: number;
  itemPrice: number;
  quantityValue: number | undefined;
  updateItemQuantity: () => void;
  disabledButton: boolean;
  handleQuantityChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const UpdateQuantityModal: FC<UpdateQuantityModalProps> = ({
  itemTitle,
  active,
  closeQuantityModal,
  itemCategory,
  itemImage,
  itemRating,
  itemPrice,
  handleQuantityChange,
  quantityValue,
  updateItemQuantity,
  disabledButton,
}) => {
  const size: Size = useWindowSize();
  const isMobile = size.width! < 736;

  //Input only numbers
  const handleKeyPressChange = (event: KeyboardEvent<HTMLDivElement>) => {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {active && (
          <>
            <motion.div
              key="quantitymodalbackdrop"
              className={styles["quantity-modal-backdrop"]}
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
              onClick={closeQuantityModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              key="editquantitymodal"
              className={styles["quantity-modal"]}
              style={{ maxHeight: `calc(${size.height!}px - 5vh)` }}
              initial={{
                opacity: 0,
                top: isMobile ? "2%" : "45%",
              }}
              animate={{ opacity: 1, top: isMobile ? "5%" : "50%" }}
              exit={{ opacity: 0, top: isMobile ? "2%" : "45%" }}
              transition={{
                duration: 0.3,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              <div className={styles["quantity-modal-header"]}>
                <p>Update Quantity</p>
              </div>

              <div className={styles["quantity-modal-content"]}>
                <p className={styles["quantity-modal-item-category"]}>
                  {itemCategory}
                </p>

                <div className={styles["quantity-modal-item-image"]}>
                  <Image
                    src={itemImage}
                    alt="Product Item"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <p className={styles["quantity-modal-item-title"]}>
                  {itemTitle}
                </p>

                <Rating
                  name="Product Ratings"
                  value={itemRating}
                  precision={0.5}
                  sx={{ margin: "0.3em 0em" }}
                  size="small"
                  readOnly
                />

                <p className={styles["quantity-modal-item-price"]}>
                  ${itemPrice.toFixed(2)}
                </p>

                <Paper
                  sx={{
                    p: "0.5em",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "min(100%, 19em)",
                    margin: "1em 0em",
                    background: "#EAEDED",
                    boxShadow: "none",
                  }}
                >
                  <InputBase
                    sx={{ ml: 1, flex: 1, color: "#000", fontWeight: "700" }}
                    placeholder="Enter Quantity"
                    inputProps={{ "aria-label": "Enter Quantity" }}
                    onChange={handleQuantityChange}
                    defaultValue={quantityValue}
                    onKeyPress={handleKeyPressChange}
                  />
                </Paper>

                <div className={styles["quantity-modal-button-wrapper"]}>
                  <UpdateQuantityButton
                    onButtonClick={updateItemQuantity}
                    disabledButton={disabledButton}
                  >
                    Update
                  </UpdateQuantityButton>
                  <CancelButton onButtonClick={closeQuantityModal}>
                    Cancel
                  </CancelButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default UpdateQuantityModal;
