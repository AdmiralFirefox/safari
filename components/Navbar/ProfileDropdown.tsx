import { FC, MutableRefObject, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { IoCloseCircle } from "react-icons/io5";
import { IconContext } from "react-icons";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Size } from "../../types/WindowSize/WindowSize";
import styles from "../../styles/navbar/ProfileDropdown.module.scss";

interface ProfileDropdownProps {
  profileDropDown: boolean;
  dropDownRef: MutableRefObject<null>;
  closeProfileDropDown: () => void;
  signOutAccount: () => Promise<void>;
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
  signOutAccount,
}) => {
  const user = useContext(AuthContext);
  const size: Size = useWindowSize();

  const backdropVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const dropdownVariants = {
    initial: {
      opacity: 0,
      y: -10,
    },
    animate: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -10,
    },
  };

  const transitions = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };

  return (
    <>
      <AnimatePresence initial={false}>
        {profileDropDown && (
          <>
            <motion.div
              key="locationmodalbackdrop"
              className={styles["profile-dropdown-invisible-backdrop"]}
              onClick={closeProfileDropDown}
              style={{ width: `${size.width}px`, height: `${size.height}px` }}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={backdropVariants}
            />

            <motion.div
              key="dropdown"
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transitions}
              variants={dropdownVariants}
              ref={dropDownRef}
              className={styles["dropdown-wrapper"]}
            >
              <IconContext.Provider
                value={{ className: styles["dropdown-close-icon"] }}
              >
                <div onClick={closeProfileDropDown}>
                  <IoCloseCircle />
                </div>
              </IconContext.Provider>
              {user!.email !== null ? (
                <p>
                  Hello, {user!.email!.substring(0, user!.email!.indexOf("@"))}!
                </p>
              ) : (
                <p>Anonymous</p>
              )}
              <SignOutButton onClick={signOutAccount}>Sign Out</SignOutButton>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileDropdown;
