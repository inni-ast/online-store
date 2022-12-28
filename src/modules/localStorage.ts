import { SET } from "./data";
class LocalStorageUtil {
  keyName: string;
  data: string;

  constructor() {
    this.keyName = "products"; // это id товара
    this.data = "data";
  }

  getData() {
    const dataLocalStorage = localStorage.getItem(this.data);

    if (dataLocalStorage !== null) {
      return JSON.parse(dataLocalStorage);
    }
  }
  putData(data: Array<SET>) {
    localStorage.removeItem(this.data);
    const pushed = true;
    localStorage.setItem(this.data, JSON.stringify(data));
    const products = this.getData();

    return {
      pushed,
      products,
    };
  }
  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
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
