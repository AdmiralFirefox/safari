import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const CheckoutItemsButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(50, 100%, 54%)",
  fontWeight: "700",
  "&:hover": {
    backgroundColor: "hsl(50, 100%, 45%)",
  },
}));

const CheckoutButton: FC = ({ children }) => {
  return (
    <CheckoutItemsButton variant="contained">{children}</CheckoutItemsButton>
  );
};

export default CheckoutButton;
