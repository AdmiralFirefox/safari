import { FC, useContext, useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockedBody";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
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
import { toast, Zoom } from "react-toastify";
import styles from "../../styles/navbar/MainNavbar.module.scss";

const MainNavbar: FC = () => {
  const user = useContext(AuthContext);
  const dropDownRef = useRef(null);

  const [locationModal, setLocationModal] = useState(false);
  const [lockBody, setLockBody] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [country, setCountry] = useState("United States");

  const handleCountryChange = (e: SelectChangeEvent) => {
    setCountry(e.target.value);
    toast.success(`Country selected to ${e.target.value}`, {
      position: "top-center",
      autoClose: 5000,
      transition: Zoom,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

  //Open Profile Dropdown
  const openProfileDropDown = () => {
    setProfileDropDown(true);
    setLockBody(true);
  };

  //Close Profile Dropdown
  const closeProfileDropDown = () => {
    setProfileDropDown(false);
    setLockBody(false);
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

  //Sign Out
  const signOutAccount = async () => {
    await signOut(auth);
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
          <div className={styles["sign-in-text-link"]}>
            <p className={styles["sign-in-text-signin"]}>Sign In,</p>
            <p className={styles["sign-in-text-accounts"]}>
              Accounts &amp; Lists
            </p>
          </div>
        </Link>
      );
    } else {
      return (
        <>
          {user.photoURL === null ? (
            <div className={styles["user-profile-anonymous-wrapper"]}>
              <div
                className={styles["user-profile-anonymous"]}
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
                signOutAccount={signOutAccount}
              />
            </div>
          ) : (
            <div className={styles["user-profile-display-wrapper"]}>
              <div
                className={styles["user-profile-display"]}
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
                signOutAccount={signOutAccount}
              />
            </div>
          )}
        </>
      );
    }
  };

  return (
    <>
      <div className={styles["main-nav-wrapper"]}>
        <div className={styles["nav-left-side"]}>
          <NavbarMobileContent
            country={country}
            openLocationModal={openLocationModal}
          />

          <Link href="/" passHref>
            <div className={styles["web-logo"]}>
              <Image
                src="/assets/SafariLogoLight.png"
                alt="Web Logo"
                layout="fill"
                objectFit="contain"
                priority
              />
            </div>
          </Link>

          <div
            className={styles["deliver-location"]}
            onClick={openLocationModal}
          >
            <div>
              <IconContext.Provider
                value={{ className: styles["location-icon"] }}
              >
                <IoLocationSharp />
              </IconContext.Provider>
            </div>
            <div className={styles["location-text"]}>
              <p className={styles["location-text-title"]}>Deliver to</p>
              <p className={styles["location-text-country"]}>{country}</p>
            </div>
          </div>
        </div>

        <LocationModal
          closeLocationModal={closeLocationModal}
          locationModal={locationModal}
          handleCountryChange={handleCountryChange}
        />

        <div className={styles["nav-right-side"]}>
          <Link href="/searchproduct" passHref>
            <div className={styles["search-products"]}>
              <div>
                <IconContext.Provider
                  value={{ className: styles["search-icon"] }}
                >
                  <ImSearch />
                </IconContext.Provider>
              </div>
              <div className={styles["search-products-text"]}>
                <p className={styles["search-products-text-search"]}>Search</p>
                <p className={styles["search-products-text-product"]}>
                  Products
                </p>
              </div>
            </div>
          </Link>

          {userSignedIn()}

          <Link href="/orders" passHref>
            <div className={styles["orders-text-link"]}>
              <p className={styles["orders-text-link-returns"]}>Returns</p>
              <p className={styles["orders-text-link-orders"]}>&amp; Orders</p>
            </div>
          </Link>

          <Link href="/favorites" passHref>
            <div className={styles["favorites-link"]}>
              <IconContext.Provider
                value={{ className: styles["favorites-icon"] }}
              >
                <BsHeartFill />
              </IconContext.Provider>
              <div className={styles["favorites-count"]}>
                <p>0</p>
              </div>
            </div>
          </Link>

          <Link href="/cart" passHref>
            <div className={styles["cart-link"]}>
              <div className={styles["cart-icon"]}>
                <Image
                  src="/assets/WhiteCart.png"
                  alt="White Cart"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <div className={styles["cart-link-count"]}>
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
