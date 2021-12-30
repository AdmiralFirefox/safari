import { FC, useContext, useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockedBody";
import { AuthContext } from "../../context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { BsHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CategoryNavbar from "./CategoryNavbar";
import NavbarMobileContent from "./NavbarMobileContent";
import ProfileDropdown from "./ProfileDropdown";
import LocationModal from "../Modal/LocationModal";
import { SelectChangeEvent } from "@mui/material/Select";
import mainNavStyles from "../../styles/Home.module.scss";

const MainNavbar: FC = () => {
  const user = useContext(AuthContext);
  const dropDownRef = useRef(null);

  const [locationModal, setLocationModal] = useState(false);
  const [lockBody, setLockBody] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [country, setCountry] = useState("United States");

  const handleCountryChange = (e: SelectChangeEvent) => {
    setCountry(e.target.value);
  };

  //Open Profile Dropdown
  const openProfileDropDown = () => {
    setProfileDropDown(true);
  };

  //Close Profile Dropdown
  const closeProfileDropDown = () => {
    setProfileDropDown(false);
  };

  //Open Location Modal
  const openLocationModal = () => {
    setLocationModal(true);
    setLockBody(true);
  };

  //Close Location Modal
  const closeLocationModal = () => {
    setLocationModal(false);
    setLockBody(false);
  };

  //Storing Country State in Local Storage
  useEffect(() => {
    const json = localStorage.getItem("country") as string;
    const saveCountry = JSON.parse(json);

    if (saveCountry) {
      setCountry(saveCountry);
    }
  }, []);

  useEffect(() => {
    const json = JSON.stringify(country);
    localStorage.setItem("country", json);
  }, [country]);

  useOnClickOutside(dropDownRef, closeProfileDropDown);
  useLockedBody(lockBody);

  const userSignedIn = () => {
    if (!user) {
      return (
        <Link href="/login" passHref>
          <div className={mainNavStyles["sign-in-text-link"]}>
            <p className={mainNavStyles["sign-in-text-signin"]}>Sign In,</p>
            <p className={mainNavStyles["sign-in-text-accounts"]}>
              Accounts &amp; Lists
            </p>
          </div>
        </Link>
      );
    } else {
      return (
        <>
          {user.photoURL === null ? (
            <div className={mainNavStyles["user-profile-anonymous-wrapper"]}>
              <div
                className={mainNavStyles["user-profile-anonymous"]}
                onClick={openProfileDropDown}
              >
                <Image
                  src="/assets/AnonymousUser.png"
                  alt="Anonymous user"
                  width={70}
                  height={70}
                  objectFit="contain"
                />
              </div>
              <ProfileDropdown
                profileDropDown={profileDropDown}
                dropDownRef={dropDownRef}
                closeProfileDropDown={closeProfileDropDown}
              />
            </div>
          ) : (
            <div className={mainNavStyles["user-profile-display-wrapper"]}>
              <div
                className={mainNavStyles["user-profile-display"]}
                onClick={openProfileDropDown}
              >
                <Image
                  src={user.photoURL}
                  alt="User Photo"
                  width={65}
                  height={65}
                  objectFit="contain"
                />
              </div>
              <ProfileDropdown
                profileDropDown={profileDropDown}
                dropDownRef={dropDownRef}
                closeProfileDropDown={closeProfileDropDown}
              />
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div className={mainNavStyles["main-nav-wrapper"]}>
        <div className={mainNavStyles["nav-left-side"]}>
          <NavbarMobileContent
            country={country}
            openLocationModal={openLocationModal}
          />

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

          <div
            className={mainNavStyles["deliver-location"]}
            onClick={openLocationModal}
          >
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
                {country}
              </p>
            </div>
          </div>
        </div>

        <LocationModal
          closeLocationModal={closeLocationModal}
          locationModal={locationModal}
          handleCountryChange={handleCountryChange}
        />

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

          {userSignedIn()}

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
