import { FC } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import ClearCartButton from "../Button/ClearCartButton";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";
import clearCartModalStyles from "../../styles/Home.module.scss";

interface ClearCartModalProps {
  clearCartModal: boolean;
  closeClearCartModal: () => void;
  onCartClear: () => void;
}

const CancelClearCartButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(213, 24%, 28%)",
  marginLeft: "1.5em",
  "&:hover": {
    backgroundColor: "hsl(213, 24%, 35%)",
  },
}));

const ClearCartModal: FC<ClearCartModalProps> = ({
  clearCartModal,
  closeClearCartModal,
  onCartClear,
}) => {
  const size: Size = useWindowSize();

  return (
    <>
      <AnimatePresence initial={false}>
        {clearCartModal && (
          <>
            <motion.div
              key="clearcartmodalbackdrop"
              className={clearCartModalStyles["clear-cart-modal-backdrop"]}
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
              onClick={closeClearCartModal}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            <motion.div
              key="clearcartmodal"
              className={clearCartModalStyles["clear-cart-modal-wrapper"]}
              initial={{ top: "45%", opacity: 0 }}
              animate={{ top: "50%", opacity: 1 }}
              exit={{ top: "45%", opacity: 0 }}
              transition={{
                duration: 0.3,
                type: "spring",
                damping: 10,
                stiffness: 100,
              }}
            >
              <div className={clearCartModalStyles["clear-cart-modal"]}>
                <p>Are you sure you want to clear all items in your Cart?</p>

                <div
                  className={
                    clearCartModalStyles["clear-cart-modal-button-wrapper"]
                  }
                >
                  <ClearCartButton onButtonClick={onCartClear}>
                    Yes
                  </ClearCartButton>
                  <CancelClearCartButton
                    variant="contained"
                    onClick={closeClearCartModal}
                  >
                    No
                  </CancelClearCartButton>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ClearCartModal;
