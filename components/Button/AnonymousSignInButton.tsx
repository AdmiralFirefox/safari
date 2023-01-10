import { FC } from "react";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import Button, { ButtonProps } from "@mui/material/Button";

const SignInAnonymousButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  width: "100%",
  fontWeight: 700,
  backgroundColor: "hsl(0, 0%, 33%)",
  padding: "0.7em",
  "&:hover": {
    backgroundColor: "hsl(0, 0%, 45%)",
  },
}));

interface AnonymousSignInButtonProps {
  onButtonClick: () => Promise<void>;
}

const AnonymousSignInButton: FC<AnonymousSignInButtonProps> = ({
  children,
  onButtonClick,
}) => {
  return (
    <SignInAnonymousButton
      variant="contained"
      startIcon={
        <Image
          src="/assets/AnonymousIcon.png"
          alt="Google Logo"
          width={30}
          height={30}
          style={{
            maxWidth: "100%",
            height: "auto",
            objectFit: "cover"
          }} />
      }
      onClick={onButtonClick}
    >
      {children}
    </SignInAnonymousButton>
  );
};

export default AnonymousSignInButton;
