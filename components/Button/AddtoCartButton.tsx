import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const AddCartButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  width: "100%",
  fontWeight: 700,
  backgroundColor: "hsl(34, 97%, 48%)",
  "&:hover": {
    backgroundColor: "hsl(34, 97%, 55%)",
  },
}));

interface AddtoCartButtonProps {
  onButtonClick: any;
}

const AddtoCartButton: FC<AddtoCartButtonProps> = ({ onButtonClick }) => {
  return (
    <AddCartButton variant="contained" onClick={onButtonClick}>
      Add to Cart
    </AddCartButton>
  );
};

export default AddtoCartButton;
