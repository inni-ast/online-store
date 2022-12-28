import { SET } from "./data";
class LocalStorageUtil {
  keyName: string;
  data: string;

  constructor() {
    this.keyName = "products"; // это будет id товара
    this.data = "data";
  }
  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);

    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
  // getData() {
  //   const dataLocalStorage = localStorage.getItem(this.data);
  //   // const priceLocalStorage = localStorage.getItem(this.keyPrice);
  //   if (dataLocalStorage !== null) {
  //     return JSON.parse(dataLocalStorage);
  //   }
  //   return [];
  // }
  putProducts(id: number, price: number) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.findIndex((el: SET) => el.id === id);

    if (index === -1) {
      products.push({ id, price });
      pushProduct = true;
    } else {
      pushProduct = false;
      products.splice(index, 1);
    }
    console.log(products);
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {
      pushProduct,
      products,
    };
  }
}
export const localStorageUtil = new LocalStorageUtil();
