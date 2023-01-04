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
    return [];
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
  putProductsFromBasket(id: number, price: number, count = 1) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.findIndex((el: SET) => el.id === id);

    products.splice(index, 1);
    products.push({ id, price, count });
    pushProduct = true;

    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {
      pushProduct,
      products,
    };
  }

  removeProductsFromBasket(id: number, price: number, count: number) {
    console.log("remove", count);
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.findIndex((el: SET) => el.id === id);

    products.splice(index, 1);
    if (count !== 0) {
      products.push({ id, price, count });
      pushProduct = true;
    }
    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {
      pushProduct,
      products,
    };
  }

  putProducts(id: number, price: number, count = 1) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.findIndex((el: SET) => el.id === id);

    if (index === -1) {
      products.push({ id, price, count });
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
