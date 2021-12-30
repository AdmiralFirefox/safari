import Axios from "axios";

export const countriesInstance = Axios.create({
  baseURL: "https://restcountries.com/v3.1",
});
