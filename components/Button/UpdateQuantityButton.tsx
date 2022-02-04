import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const ButtonQuantity = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(213, 24%, 28%)",
  "&:hover": {
    backgroundColor: "hsl(213, 24%, 35%)",
  },
}));

const UpdateQuantityButton: FC = ({ children }) => {
  return <ButtonQuantity variant="contained">{children}</ButtonQuantity>;
};

export default UpdateQuantityButton;
