import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const CancelEditButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "hsl(12, 96%, 40%)",
  "&:hover": {
    backgroundColor: "hsl(12, 96%, 50%)",
  },
}));

interface CancelButtonProps {
  onButtonClick: () => void;
}

const CancelButton: FC<CancelButtonProps> = ({ children, onButtonClick }) => {
  return (
    <CancelEditButton variant="contained" onClick={onButtonClick}>
      {children}
    </CancelEditButton>
  );
};

export default CancelButton;
