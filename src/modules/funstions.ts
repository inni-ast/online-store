import { SET } from "./data";
export function preloadImages(array: Array<SET>) {
  array.forEach((el) => {
    const img = new Image();
    img.src = el["thumbnail"];
  });
}
