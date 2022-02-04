import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const QuantityButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "#ffc266",
  "&:hover": {
    backgroundColor: "hsl(36, 100%, 60%)",
  },
  "&:disabled": {
    color: "#777",
  },
}));

interface ItemQuantityButtonProps {
  onButtonClick: () => void;
  disabledButton?: boolean;
}

const ItemQuantityButton: FC<ItemQuantityButtonProps> = ({
  children,
  onButtonClick,
  disabledButton,
}) => {
  return (
    <QuantityButton
      variant="contained"
      onClick={onButtonClick}
      disabled={disabledButton}
    >
      {children}
    </QuantityButton>
  );
};

export default ItemQuantityButton;
