import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const QuantityButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#ffc266",
  "&:hover": {
    backgroundColor: "hsl(36, 100%, 60%)",
  },
}));

interface ItemQuantityButtonProps {
  onButtonClick: () => void;
}

const ItemQuantityButton: FC<ItemQuantityButtonProps> = ({
  children,
  onButtonClick,
}) => {
  return (
    <QuantityButton variant="contained" onClick={onButtonClick}>
      {children}
    </QuantityButton>
  );
};

export default ItemQuantityButton;
