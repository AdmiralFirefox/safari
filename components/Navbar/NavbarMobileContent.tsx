import React, { FC, useState, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import categories from "../../data/category.json";
import { AuthContext } from "../../context/AuthContext";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button, { ButtonProps } from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import { IconButton } from "@mui/material";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLocationSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { IoCloseCircle } from "react-icons/io5";
import { BsHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { styled } from "@mui/material/styles";
import styles from "../../styles/navbar/NavbarMobileContent.module.scss";

type Anchor = "left";

const LogInButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(50, 100%, 54%)",
  fontWeight: 700,
  height: "2.3em",
  width: "10em",
  "&:hover": {
    backgroundColor: "hsl(50, 100%, 45%)",
  },
}));

const SignOutButton = styled(Button)<ButtonProps>(() => ({
  color: "#fff",
  backgroundColor: "	hsl(12, 96%, 35%)",
  fontWeight: 700,
  height: "2.3em",
  width: "10em",
  "&:hover": {
    backgroundColor: "	hsl(12, 96%, 50%)",
  },
}));

interface NavbarMobileProps {
  country: string;
  openLocationModal: () => void;
  cartItems: number;
  favoriteItems: number;
  loading: boolean;
}

const NavbarMobileContent: FC<NavbarMobileProps> = ({
  country,
  openLocationModal,
  cartItems,
  favoriteItems,
  loading,
}) => {
  const user = useContext(AuthContext);
  const router = useRouter();

  const [sidebar, setSideBar] = useState({
    left: false,
  });

  //Sign Out
  const signOutAccount = async () => {
    await signOut(auth);
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setSideBar({ ...sidebar, [anchor]: open });
    };

  const userSignedIn = () => {
    if (!user) {
      return (
        <div className={styles["navbar-mobile-content-header"]}>
          <p> Accounts &amp; Lists</p>
          <LogInButton
            onClick={() => {
              setSideBar({ left: false });
              router.push("/login");
            }}
          >
            Log In
          </LogInButton>
        </div>
      );
    } else {
      return (
        <div className={styles["navbar-mobile-content-header-signin"]}>
          {user.photoURL === null ? (
            <div className={styles["navbar-mobile-content-header-user"]}>
              <div
                className={styles["navbar-mobile-content-header-user-image"]}
              >
                <Image
                  src="/assets/AnonymousUser.png"
                  alt="User Photo"
                  width={51}
                  height={51}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                {user.email !== null ? (
                  <p>{user.email!.substring(0, user.email!.indexOf("@"))}</p>
                ) : (
                  <p>Anonymous</p>
                )}
                <SignOutButton
                  onClick={() => {
                    setSideBar({ left: false });
                    signOutAccount();
                  }}
                >
                  Sign Out
                </SignOutButton>
              </div>
            </div>
          ) : (
            <div className={styles["navbar-mobile-content-header-user"]}>
              <div
                className={styles["navbar-mobile-content-header-user-image"]}
              >
                <Image
                  src={user.photoURL}
                  alt="User Photo"
                  width={48}
                  height={48}
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div>
                <p>{user.email!.substring(0, user.email!.indexOf("@"))}</p>
                <SignOutButton
                  onClick={() => {
                    setSideBar({ left: false });
                    signOutAccount();
                  }}
                >
                  Sign Out
                </SignOutButton>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  const navbarContent = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div onClick={toggleDrawer(anchor, false)}>
          <IconContext.Provider value={{ className: styles["close-nav-icon"] }}>
            <IoCloseCircle />
          </IconContext.Provider>
        </div>

        {userSignedIn()}

        <div className={styles["mobile-nav-page-links"]}>
          <div
            className={styles["mobile-nav-location"]}
            onClick={() => {
              setSideBar({ left: false });
              openLocationModal();
            }}
          >
            <IconContext.Provider
              value={{
                className: styles["mobile-nav-location-icon"],
              }}
            >
              <IoLocationSharp />
            </IconContext.Provider>
            <p>Deliver to {country}</p>
          </div>

          <Link href="/searchproduct" passHref legacyBehavior>
            <div
              className={styles["mobile-nav-search"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <IconContext.Provider
                value={{ className: styles["mobile-nav-search-icon"] }}
              >
                <ImSearch />
              </IconContext.Provider>
              <p>Search Products</p>
            </div>
          </Link>

          <Link href="/orders" passHref legacyBehavior>
            <div
              className={styles["mobile-nav-orders"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div className={styles["mobile-nav-orders-image"]}>
                <Image
                  src="/assets/EmptyOrder.png"
                  alt="Box Logo"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <p>Returns &amp; Orders</p>
            </div>
          </Link>

          <Link href="/favorites" passHref legacyBehavior>
            <div
              className={styles["mobile-nav-favorites"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div>
                <IconContext.Provider
                  value={{
                    className: styles["mobile-nav-favorites-icon"],
                  }}
                >
                  <BsHeartFill />
                </IconContext.Provider>
                <p className={styles["mobile-nav-favorites-count"]}>
                  {loading && user ? (
                    <CircularProgress
                      size={15}
                      sx={{
                        color: "#000",
                        marginTop: "0.25em",
                      }}
                    />
                  ) : (
                    favoriteItems
                  )}
                </p>
              </div>
              <p>Favorites</p>
            </div>
          </Link>

          <Link href="/cart" passHref legacyBehavior>
            <div
              className={styles["mobile-nav-cart"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div>
                <div className={styles["mobile-nav-cart-image"]}>
                  <Image
                    src="/assets/BlackCart.png"
                    alt="cart"
                    fill
                    sizes="(max-width: 768px) 100vw,
                    (max-width: 1200px) 50vw,
                    33vw"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <p className={styles["mobile-nav-cart-count"]}>{cartItems}</p>
              </div>
              <p>Cart</p>
            </div>
          </Link>
        </div>

        <Divider className={styles["mobile-nav-divider"]} />

        <div className={styles["mobile-nav-category-links"]}>
          <h1>Shop</h1>

          <Link href="/" onClick={toggleDrawer(anchor, false)}>
            all
          </Link>
          {categories.map((category, i) => {
            return (
              <Link
                href={`/category/${category}`}
                key={i}
                onClick={toggleDrawer(anchor, false)}
              >
                {category}
              </Link>
            );
          })}
        </div>
      </div>
    </Box>
  );

  return (
    <>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <div
            onClick={toggleDrawer(anchor, true)}
            className={styles["hamburger-icon-wrapper"]}
          >
            <IconContext.Provider
              value={{ className: styles["hamburger-icon"] }}
            >
              <IconButton size="large">
                <GiHamburgerMenu />
              </IconButton>
            </IconContext.Provider>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={sidebar[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {navbarContent(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default NavbarMobileContent;
