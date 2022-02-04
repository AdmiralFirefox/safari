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

interface UpdateQuantityButtonProps {
  onButtonClick: () => void;
  disabledButton?: boolean;
}

const UpdateQuantityButton: FC<UpdateQuantityButtonProps> = ({
  children,
  onButtonClick,
  disabledButton,
}) => {
  return (
    <ButtonQuantity
      variant="contained"
      onClick={onButtonClick}
      disabled={disabledButton}
    >
      {children}
    </ButtonQuantity>
  );
};

export default UpdateQuantityButton;
