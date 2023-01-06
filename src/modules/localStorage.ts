import { header } from "../pages/header";
import { SET } from "./data";

class LocalStorageUtil {
  keyName: string;
  data: string;
  checked: string;

  constructor() {
    this.keyName = "products";
    this.data = "data";
    this.checked = "checked";
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

    const dataSet = Array.from(new Set(data));
    localStorage.setItem(this.data, JSON.stringify(dataSet));
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
  putProductsToBasket(id: number, price: number, count = 1) {
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
      const elCount = products[index].count;
      const elPrice = products[index].price * elCount;

      if (elCount === 1) {
        pushProduct = false;
        products.splice(index, 1);
        header.removeProduct(+price);
      } else if (elCount > 1) {
        pushProduct = false;
        products.splice(index, 1);
        header.removeManyProduct(elCount, elPrice);
      }
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));
    console.log(products);
    return {
      pushProduct,
      products,
    };
  }

  getChecked() {
    const checkedLocalStorage = localStorage.getItem(this.checked);
    if (checkedLocalStorage !== null) {
      return JSON.parse(checkedLocalStorage);
    }
    return [];
  }
  putChecked(item: string) {
    const check = this.getChecked();
    let pushCheck = false;
    const index = check.findIndex((el: string) => el === item);

    if (index === -1) {
      check.push(item);
      pushCheck = true;
    } else {
      pushCheck = false;
      check.splice(index, 1);
    }
    console.log(check);
    localStorage.setItem(this.checked, JSON.stringify(check));
    return {
      pushCheck,
      check,
    };
  }
}
export const localStorageUtil = new LocalStorageUtil();
