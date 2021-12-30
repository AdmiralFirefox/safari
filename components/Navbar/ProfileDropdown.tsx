import { FC, MutableRefObject, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoCloseCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import dropDownStyles from "../../styles/Home.module.scss";

interface ProfileDropdownProps {
  profileDropDown: boolean;
  dropDownRef: MutableRefObject<null>;
  closeProfileDropDown: () => void;
}

const SignOutButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "	hsl(12, 96%, 35%)",
  fontWeight: 700,
  height: "2.2em",
  width: "10em",
  "&:hover": {
    backgroundColor: "	hsl(12, 96%, 50%)",
  },
}));

const ProfileDropdown: FC<ProfileDropdownProps> = ({
  profileDropDown,
  dropDownRef,
  closeProfileDropDown,
}) => {
  const user = useContext(AuthContext);

  //Sign Out
  const signOutAccount = async () => {
    await signOut(auth);
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {profileDropDown && (
          <motion.div
            key="dropdown"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", damping: 10, stiffness: 100 }}
            ref={dropDownRef}
            className={dropDownStyles["dropdown-wrapper"]}
          >
            <IconContext.Provider
              value={{ className: dropDownStyles["dropdown-close-icon"] }}
            >
              <div onClick={closeProfileDropDown}>
                <IoCloseCircle />
              </div>
            </IconContext.Provider>
            <p>
              Hello, {user!.email!.substring(0, user!.email!.indexOf("@"))}!
            </p>
            <SignOutButton onClick={signOutAccount}>Sign Out</SignOutButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileDropdown;