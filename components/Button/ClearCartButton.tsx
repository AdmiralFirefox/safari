import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const ClearAllItemsButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(12, 96%, 40%)",
  "&:hover": {
    backgroundColor: "hsl(12, 96%, 50%)",
  },
}));

const ClearCartButton: FC = ({ children }) => {
  return (
    <ClearAllItemsButton variant="contained">{children}</ClearAllItemsButton>
  );
};

export default ClearCartButton;
