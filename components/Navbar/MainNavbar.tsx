import { FC, useContext, useState, useRef, useEffect } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import { useLockedBody } from "../../hooks/useLockedBody";
import { auth, db } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import { signOut } from "firebase/auth";
import Image from "next/image";
import { collection, query, onSnapshot, where } from "firebase/firestore";
import Link from "next/link";
import { IoLocationSharp } from "react-icons/io5";
import { ImSearch } from "react-icons/im";
import { BsHeartFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import CategoryNavbar from "./CategoryNavbar";
import NavbarMobileContent from "./NavbarMobileContent";
import ProfileDropdown from "./ProfileDropdown";
import LocationModal from "../Modal/LocationModal";
import CircularProgress from "@mui/material/CircularProgress";
import { SelectChangeEvent } from "@mui/material/Select";
import { toast, Zoom } from "react-toastify";
import { useAppSelector } from "../../app/reduxhooks";
import { Product } from "../../types/Product/Product";
import styles from "../../styles/navbar/MainNavbar.module.scss";

const MainNavbar: FC = () => {
  const user = useContext(AuthContext);
  const cart = useAppSelector((state: { cart: Product[] }) => state.cart);
  const dropDownRef = useRef(null);

  const [favoriteTitles, setFavoriteTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const [lockBody, setLockBody] = useState(false);
  const [profileDropDown, setProfileDropDown] = useState(false);
  const [country, setCountry] = useState("United States");

  const handleCountryChange = (e: SelectChangeEvent) => {
    setCountry(e.target.value);
    toast.success(`Country selected to ${e.target.value}`, {
      position: "top-center",
      autoClose: 3500,
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

  //Total Items in the Cart
  const getTotalItems = () => {
    return cart.reduce((accumulator, item) => accumulator + item.quantity!, 0);
  };

  // Load all favorites
  useEffect(() => {
    if (user) {
      const q = query(
        collection(db, "favorites"),
        where("owner", "==", user!.uid)
      );

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const titles = snapshot.docs.map((doc) => doc.data().title);
        setFavoriteTitles(titles);
        setLoading(false);
      });

      // Clean up
      return () => unsubscribe();
    }
  }, [user]);

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
        <Link href="/login" passHref legacyBehavior>
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
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
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
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    objectFit: "contain",
                  }}
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
            cartItems={getTotalItems()}
            favoriteItems={user ? favoriteTitles.length : 0}
            loading={loading}
          />

          <Link href="/" passHref legacyBehavior>
            <div className={styles["web-logo"]}>
              <Image
                src="/assets/SafariLogoLight.png"
                alt="Web Logo"
                priority
                fill
                sizes="(max-width: 768px) 100vw,
                (max-width: 1200px) 50vw,
                33vw"
                style={{
                  objectFit: "contain",
                }}
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
          <Link href="/searchproduct" passHref legacyBehavior>
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

          <Link href="/orders" passHref legacyBehavior>
            <div className={styles["orders-text-link"]}>
              <p className={styles["orders-text-link-returns"]}>Returns</p>
              <p className={styles["orders-text-link-orders"]}>&amp; Orders</p>
            </div>
          </Link>

          <Link href="/favorites" passHref legacyBehavior>
            <div className={styles["favorites-link"]}>
              <IconContext.Provider
                value={{ className: styles["favorites-icon"] }}
              >
                <BsHeartFill />
              </IconContext.Provider>
              <div className={styles["favorites-count"]}>
                {loading && user ? (
                  <CircularProgress
                    size={25}
                    sx={{
                      color: "#000",
                      marginTop: "0.25em",
                    }}
                  />
                ) : (
                  <p>{user ? favoriteTitles.length : 0}</p>
                )}
              </div>
            </div>
          </Link>

          <Link href="/cart" passHref legacyBehavior>
            <div className={styles["cart-link"]}>
              <div className={styles["cart-icon"]}>
                <Image
                  src="/assets/WhiteCart.png"
                  alt="White Cart"
                  fill
                  sizes="(max-width: 768px) 100vw,
                  (max-width: 1200px) 50vw,
                  33vw"
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div className={styles["cart-link-count"]}>
                <p>{getTotalItems()}</p>
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
