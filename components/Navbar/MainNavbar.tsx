import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { BsHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CategoryNavbar from "./CategoryNavbar";
import NavbarMobileContent from "./NavbarMobileContent";
import mainNavStyles from "../../styles/Home.module.scss";

const MainNavbar: FC = () => {
  return (
    <>
      <div className={mainNavStyles["main-nav-wrapper"]}>
        <div className={mainNavStyles["nav-left-side"]}>
          <NavbarMobileContent />

          <Link href="/" passHref>
            <div className={mainNavStyles["web-logo"]}>
              <Image
                src="/assets/SafariLogoLight.png"
                alt="Web Logo"
                layout="fill"
                objectFit="contain"
              />
            </div>
          </Link>

          <div className={mainNavStyles["deliver-location"]}>
            <div>
              <IconContext.Provider
                value={{ className: mainNavStyles["location-icon"] }}
              >
                <IoLocationSharp />
              </IconContext.Provider>
            </div>
            <div className={mainNavStyles["location-text"]}>
              <p className={mainNavStyles["location-text-title"]}>Deliver to</p>
              <p className={mainNavStyles["location-text-country"]}>
                Philippines
              </p>
            </div>
          </div>
        </div>

        <div className={mainNavStyles["nav-right-side"]}>
          <Link href="/" passHref>
            <div className={mainNavStyles["search-products"]}>
              <div>
                <IconContext.Provider
                  value={{ className: mainNavStyles["search-icon"] }}
                >
                  <ImSearch />
                </IconContext.Provider>
              </div>
              <div className={mainNavStyles["search-products-text"]}>
                <p className={mainNavStyles["search-products-text-search"]}>
                  Search
                </p>
                <p className={mainNavStyles["search-products-text-product"]}>
                  Products
                </p>
              </div>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={mainNavStyles["sign-in-text-link"]}>
              <p className={mainNavStyles["sign-in-text-signin"]}>Sign In,</p>
              <p className={mainNavStyles["sign-in-text-accounts"]}>
                Accounts &amp; Lists
              </p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={mainNavStyles["orders-text-link"]}>
              <p className={mainNavStyles["orders-text-link-returns"]}>
                Returns
              </p>
              <p className={mainNavStyles["orders-text-link-orders"]}>
                &amp; Orders
              </p>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={mainNavStyles["favorites-link"]}>
              <IconContext.Provider
                value={{ className: mainNavStyles["favorites-icon"] }}
              >
                <BsHeartFill />
              </IconContext.Provider>
              <div className={mainNavStyles["favorites-count"]}>
                <p>0</p>
              </div>
            </div>
          </Link>

          <Link href="/" passHref>
            <div className={mainNavStyles["cart-link"]}>
              <div className={mainNavStyles["cart-icon"]}>
                <Image
                  src="/assets/WhiteCart.png"
                  alt="White Cart"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className={mainNavStyles["cart-link-count"]}>
                <p>0</p>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <CategoryNavbar />
    </>
  );
};

export default MainNavbar;
