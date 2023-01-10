import { FC } from "react";
import Link from "next/link";
import styles from "../../styles/footer/Footer.module.scss";

const Footer: FC = () => {
  return (
    <footer className={styles["footer-wrapper"]}>
      <div className={styles["footer-links"]}>
        <p>Get to Know Us</p>
        <Link href="/">
          Careeer
        </Link>
        <Link href="/">
          Blog
        </Link>
        <Link href="/">
          About Safari
        </Link>
        <Link href="/">
          Investor Relations
        </Link>
        <Link href="/">
          Safari Devices
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Make Money with Us</p>
        <Link href="/">
          Sell products on Safari
        </Link>
        <Link href="/">
          Sell on Safari Business
        </Link>
        <Link href="/">
          Sell apps on Safari
        </Link>
        <Link href="/">
          Become an Affiliate
        </Link>
        <Link href="/">
          Advertise your Products
        </Link>
        <Link href="/">
          Self-Publish with us
        </Link>
        <Link href="/">
          Host a Safari Hub
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Safari Payment Products</p>
        <Link href="/">
          Safari Business Card
        </Link>
        <Link href="/">
          Shop with points
        </Link>
        <Link href="/">
          Reload Your Balance
        </Link>
        <Link href="/">
          Safari Currency Converter
        </Link>
      </div>
      <div className={styles["footer-links"]}>
        <p>Let Us Help You</p>
        <Link href="/">
          Safari and COVID - 19
        </Link>
        <Link href="/">
          Your Account
        </Link>
        <Link href="/">
          Your Orders
        </Link>
        <Link href="/">
          Shipping Rates &<br />Policies
        </Link>
        <Link href="/">
          Returns<br />& Replacements
        </Link>
        <Link href="/">
          Manage Your<br />Content and Devices
        </Link>
        <Link href="/">
          Safari Assistant
        </Link>
        <Link href="/">
          Help
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
