import { SET } from "./data";
class LocalStorageUtil {
  keyName: string;
  data: string;
  checked: string;

  constructor() {
    this.keyName = "products"; // это id товара
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
