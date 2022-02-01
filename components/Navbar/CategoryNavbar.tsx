import { FC } from "react";
import Link from "next/link";
import categories from "../../data/category.json";
import categoryNavStyles from "../../styles/Home.module.scss";

const CategoryNavbar: FC = () => {
  return (
    <div className={categoryNavStyles["category-nav-wrapper"]}>
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
