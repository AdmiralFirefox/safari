import { ChangeEvent, useState } from "react";
import type { NextPage } from "next";
import HomeSlider from "../components/Slider/HomeSlider";
import SortDropdown from "../components/SortDropdown/SortDropdown";
import { SelectChangeEvent } from "@mui/material/Select";
import homeStyles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  const [sortProducts, setSortProducts] = useState("default");

  const handleSortProductChange = (e: SelectChangeEvent) => {
    setSortProducts(e.target.value);
  };

  return (
    <>
      <HomeSlider />
      <div className={homeStyles["home-content-wrapper"]}>
        <div className={homeStyles["home-sort-products"]}>
          <SortDropdown
            sortProducts={sortProducts}
            handleSortProductChange={handleSortProductChange}
          />
        </div>
      </div>
    </>
  );
};

export default Home;
