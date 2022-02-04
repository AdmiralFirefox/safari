import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const QuantityButton = styled(Button)<ButtonProps>(() => ({
  backgroundColor: "#ffc266",
  "&:hover": {
    backgroundColor: "hsl(36, 100%, 60%)",
  },
}));

const ItemQuantityButton: FC = ({ children }) => {
  return <QuantityButton variant="contained">{children}</QuantityButton>;
};

export default ItemQuantityButton;
