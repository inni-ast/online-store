import { SET } from "./data";

export function preloadImages(array: Array<SET>) {
  array.forEach((el) => {
    const img = new Image();
    img.src = el["thumbnail"];
  });
}
export function preloadImagesProduct(array: Array<SET>) {
  array.forEach((el) => {
    console.log(el.images);
    const array = el.images;
    for (let i = 0; i < array.length; i++) {
      const img = new Image();
      img.src = array[i];
    }
  });
}
