import React, { FC, useState } from "react";
import categories from "../../data/category.json";
import Image from "next/image";
import Link from "next/link";
import Box from "@mui/material/Box";
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
import mobileNavStyles from "../../styles/Home.module.scss";

type Anchor = "left";

const LogInButton = styled(Button)<ButtonProps>(() => ({
  color: "#000",
  backgroundColor: "hsl(50, 100%, 54%)",
  fontWeight: 700,
  height: "2em",
  width: "10em",
  "&:hover": {
    backgroundColor: "hsl(50, 100%, 45%)",
  },
}));

const NavbarMobileContent: FC = () => {
  const [state, setState] = useState({
    left: false,
  });

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

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <div>
        <div onClick={toggleDrawer(anchor, false)}>
          <IconContext.Provider
            value={{ className: mobileNavStyles["close-nav-icon"] }}
          >
            <IoCloseCircle />
          </IconContext.Provider>
        </div>

        <div className={mobileNavStyles["navbar-mobile-content-header"]}>
          <p> Accounts &amp; Lists</p>
          <Link href="/" passHref>
            <LogInButton onClick={toggleDrawer(anchor, false)}>
              Log In
            </LogInButton>
          </Link>
        </div>

        <div className={mobileNavStyles["mobile-nav-page-links"]}>
          <Link href="/" passHref>
            <div
              className={mobileNavStyles["mobile-nav-location"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <IconContext.Provider
                value={{
                  className: mobileNavStyles["mobile-nav-location-icon"],
                }}
              >
                <IoLocationSharp />
              </IconContext.Provider>
              <p>Deliver to Philippines</p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div
              className={mobileNavStyles["mobile-nav-search"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <IconContext.Provider
                value={{ className: mobileNavStyles["mobile-nav-search-icon"] }}
              >
                <ImSearch />
              </IconContext.Provider>
              <p>Search Products</p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div
              className={mobileNavStyles["mobile-nav-orders"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div className={mobileNavStyles["mobile-nav-orders-image"]}>
                <Image
                  src="/assets/EmptyOrder.png"
                  alt="Box Logo"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p>Returns &amp; Orders</p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div
              className={mobileNavStyles["mobile-nav-favorites"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div>
                <IconContext.Provider
                  value={{
                    className: mobileNavStyles["mobile-nav-favorites-icon"],
                  }}
                >
                  <BsHeartFill />
                </IconContext.Provider>
                <p className={mobileNavStyles["mobile-nav-favorites-count"]}>
                  0
                </p>
              </div>
              <p>Favorites</p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div
              className={mobileNavStyles["mobile-nav-cart"]}
              onClick={toggleDrawer(anchor, false)}
            >
              <div>
                <div className={mobileNavStyles["mobile-nav-cart-image"]}>
                  <Image
                    src="/assets/BlackCart.png"
                    alt="cart"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <p className={mobileNavStyles["mobile-nav-cart-count"]}>0</p>
              </div>
              <p>Cart</p>
            </div>
          </Link>
        </div>

        <Divider className={mobileNavStyles["mobile-nav-divider"]} />

        <div className={mobileNavStyles["mobile-nav-category-links"]}>
          <h1>Shop</h1>

          <Link href="/">
            <a onClick={toggleDrawer(anchor, false)}>all</a>
          </Link>
          {categories.map((category, i) => {
            return (
              <Link href="/" key={i}>
                <a onClick={toggleDrawer(anchor, false)}>{category}</a>
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
            className={mobileNavStyles["hamburger-icon-wrapper"]}
          >
            <IconContext.Provider
              value={{ className: mobileNavStyles["hamburger-icon"] }}
            >
              <IconButton size="large">
                <GiHamburgerMenu />
              </IconButton>
            </IconContext.Provider>
          </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </>
  );
};

export default NavbarMobileContent;
