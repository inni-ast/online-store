import { header } from "../pages/header";
import { SET } from "./data";

class LocalStorageUtil {
  keyName: string;
  data: string;
  checkedCategory: string;
  checkedStore: string;

  constructor() {
    this.keyName = "products";
    this.data = "data";
    this.checkedCategory = "checkedCategory";
    this.checkedStore = "checkedStore";
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

  getCheckedCategory() {
    const checkedLocalStorage = localStorage.getItem(this.checkedCategory);
    if (checkedLocalStorage !== null) {
      return JSON.parse(checkedLocalStorage);
    }
    return [];
  }

  putCheckedCategory(item: string) {
    const check = this.getCheckedCategory();
    const index = check.findIndex((el: string) => el === item);

    if (index === -1) {
      check.push(item);
    } else {
      check.splice(index, 1);
    }
    console.log("LS " + check);
    localStorage.setItem(this.checkedCategory, JSON.stringify(check));
    return {
      check,
    };
  }

  getCheckedStore() {
    const checkedLocalStorage = localStorage.getItem(this.checkedStore);
    if (checkedLocalStorage !== null) {
      return JSON.parse(checkedLocalStorage);
    }
    return [];
  }

  putCheckedStore(item: string) {
    const check = this.getCheckedStore();
    const index = check.findIndex((el: string) => el === item);

    if (index === -1) {
      check.push(item);
    } else {
      check.splice(index, 1);
    }
    console.log("LS " + check);
    localStorage.setItem(this.checkedStore, JSON.stringify(check));
    return {
      check,
    };
  }
}
export const localStorageUtil = new LocalStorageUtil();
