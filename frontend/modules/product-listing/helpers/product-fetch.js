import { fakeData } from "../_data.js";

// This is fake
export const fetchProducts = (count) => {
  return fakeData.slice(0, count);
};
