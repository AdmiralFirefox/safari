import { FC } from "react";
import { styled } from "@mui/material/styles";
import Button, { ButtonProps } from "@mui/material/Button";

const UserAccountButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(50, 100%, 54%)",
  fontWeight: 700,
  "&:hover": {
    backgroundColor: "hsl(50, 100%, 45%)",
  },
}));

interface UserButtonProps {
  changeRoute: () => void;
}

const UserButton: FC<UserButtonProps> = ({ children, changeRoute }) => {
  return (
    <UserAccountButton variant="contained" onClick={changeRoute}>
      {children}
    </UserAccountButton>
  );
};

export default UserButton;
