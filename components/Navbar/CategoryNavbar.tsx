import { FC } from "react";
import Link from "next/link";
import categories from "../../data/category.json";
import styles from "../../styles/navbar/CategoryNavbar.module.scss";

const CategoryNavbar: FC = () => {
  return (
    <div className={styles["category-nav-wrapper"]}>
      <Link href="/">
        <a>all</a>
      </Link>
      {categories.map((category, i) => {
        return (
          <Link key={i} href={`/category/${category}`}>
            <a>{category}</a>
          </Link>
        );
      })}
    </div>
  );
};

export default CategoryNavbar;
