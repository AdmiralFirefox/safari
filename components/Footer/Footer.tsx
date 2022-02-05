import { FC } from "react";
import Link from "next/link";
import styles from "../../styles/footer/Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles["footer-wrapper"]}>
      <div className={styles["footer-links"]}>
        <p>Get to Know Us</p>
        <Link href="/">
          <a>Careeer</a>
        </Link>
        <Link href="/">
          <a>Blog</a>
        </Link>
        <Link href="/">
          <a>About Safari</a>
        </Link>
        <Link href="/">
          <a>Investor Relations</a>
        </Link>
        <Link href="/">
          <a>Safari Devices</a>
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Make Money with Us</p>
        <Link href="/">
          <a>Sell products on Safari</a>
        </Link>
        <Link href="/">
          <a>Sell on Safari Business</a>
        </Link>
        <Link href="/">
          <a>Sell apps on Safari</a>
        </Link>
        <Link href="/">
          <a>Become an Affiliate</a>
        </Link>
        <Link href="/">
          <a>Advertise your Products</a>
        </Link>
        <Link href="/">
          <a>Self-Publish with us</a>
        </Link>
        <Link href="/">
          <a>Host a Safari Hub</a>
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Safari Payment Products</p>
        <Link href="/">
          <a>Safari Business Card</a>
        </Link>
        <Link href="/">
          <a>Shop with points</a>
        </Link>
        <Link href="/">
          <a>Reload Your Balance</a>
        </Link>
        <Link href="/">
          <a>Safari Currency Converter</a>
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Let Us Help You</p>
        <Link href="/">
          <a>Safari and COVID - 19</a>
        </Link>
        <Link href="/">
          <a>Your Account</a>
        </Link>
        <Link href="/">
          <a>Your Orders</a>
        </Link>
        <Link href="/">
          <a>
            Shipping Rates &amp;
            <br /> Policies
          </a>
        </Link>
        <Link href="/">
          <a>
            Returns
            <br /> &amp; Replacements
          </a>
        </Link>
        <Link href="/">
          <a>
            Manage Your
            <br /> Content and Devices
          </a>
        </Link>
        <Link href="/">
          <a>Safari Assistant</a>
        </Link>
        <Link href="/">
          <a>Help</a>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
