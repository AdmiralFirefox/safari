import { FC } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Button, { ButtonProps } from "@mui/material/Button";

const SignInGoogleButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  width: "100%",
  fontWeight: 700,
  border: "3px solid #000",
  background: "hsl(0, 0%, 100%)",
  padding: "0.7em",
  "&:hover": {
    border: "3px solid #555",
    background: "hsl(0, 0%, 90%)",
  },
}));

interface GoogleSignInButtonProps {
  onButtonClick: () => Promise<void>;
}

const GoogleSignInButton: FC<GoogleSignInButtonProps> = ({
  children,
  onButtonClick,
}) => {
  return (
    <SignInGoogleButton
      variant="outlined"
      startIcon={
        <Image
          src="/assets/GoogleLogo.png"
          alt="Google Logo"
          width={30}
          height={30}
          objectFit="cover"
        />
      }
      onClick={onButtonClick}
    >
      {children}
    </SignInGoogleButton>
  );
};

export default GoogleSignInButton;
