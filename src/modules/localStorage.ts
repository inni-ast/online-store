import { header } from "../pages/header";
import { SET } from "./data";

class LocalStorageUtil {
  public Show: string;
  constructor(
    public keyName = "products",
    public data = "data",
    public checkedCategory = "checkedCategory",
    public checkedBrand = "checkedBrand",
    public Search = "Search",
    public Sort = "Sort",
    public RangePrice = "RangePrice",
    public RangeStock = "RangeStock"
  ) {
    this.Show = "Show";
  }

  getFromLS(key: string) {
    const data = localStorage.getItem(key);

    if (data !== null) {
      return JSON.parse(data);
    }
    return [];
  }

  putData(data: Array<SET>) {
    localStorage.removeItem(this.data);
    const pushed = true;

    const dataSet = Array.from(new Set(data));
    localStorage.setItem(this.data, JSON.stringify(dataSet));
    const products = this.getFromLS("data");

    return {
      pushed,
      products,
    };
  }

  putProductsToBasket(id: number, price: number, count = 1) {
    const products = this.getFromLS("products");
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
    const products = this.getFromLS("products");
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
    const products = this.getFromLS("products");

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
    localStorage.setItem(this.checkedCategory, JSON.stringify(check));
    return {
      check,
    };
  }

  getCheckedBrand() {
    const checkedLocalStorage = localStorage.getItem(this.checkedBrand);
    if (checkedLocalStorage !== null) {
      return JSON.parse(checkedLocalStorage);
    }
    return [];
  }

  putCheckedBrand(item: string) {
    const check = this.getCheckedBrand();
    const index = check.findIndex((el: string) => el === item);

    if (index === -1) {
      check.push(item);
    } else {
      check.splice(index, 1);
    }
    localStorage.setItem(this.checkedBrand, JSON.stringify(check));
    return {
      check,
    };
  }

  getParams(key: string) {
    const text = localStorage.getItem(key);

    if (text !== null) {
      return JSON.parse(text);
    }
    return "";
  }

  putSearch(text: string) {
    localStorage.removeItem("Search");

    localStorage.setItem(this.Search, JSON.stringify(text));
    return {
      text,
    };
  }

  putSort(text: string) {
    localStorage.removeItem("Sort");

    localStorage.setItem(this.Sort, JSON.stringify(text));
    return {
      text,
    };
  }

  getShow() {
    const text = localStorage.getItem(this.Show);
    if (text !== null) {
      return JSON.parse(text);
    }
    return "";
  }

  putShow(text: string) {
    localStorage.removeItem("Show");

    localStorage.setItem(this.Show, JSON.stringify(text));
    return {
      text,
    };
  }

  getRangePrice() {
    const text = localStorage.getItem(this.RangePrice);
    if (text !== null) {
      return JSON.parse(text);
    }
    return "";
  }

  putRangePrice(text: string) {
    const MaxMin = this.getRangePrice() || [49, 1];

    if (MaxMin[0] === +text - 1 || MaxMin[0] === +text + 1) {
      MaxMin[0] = +text;
    } else if (MaxMin[1] === +text - 1 || MaxMin[1] === +text + 1) {
      MaxMin[1] = +text;
    }

    MaxMin.sort((a: number, b: number) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });

    localStorage.setItem(this.RangePrice, JSON.stringify(MaxMin));
    return {
      MaxMin,
    };
  }

  getRangeStock() {
    const text = localStorage.getItem(this.RangeStock);
    if (text !== null) {
      return JSON.parse(text);
    }
    return "";
  }

  putRangeStock(text: string) {
    const MaxMin = this.getRangeStock() || [76, 1];

    if (MaxMin[0] === +text - 1 || MaxMin[0] === +text + 1) {
      MaxMin[0] = +text;
    } else if (MaxMin[1] === +text - 1 || MaxMin[1] === +text + 1) {
      MaxMin[1] = +text;
    }

    MaxMin.sort((a: number, b: number) => {
      if (a > b) {
        return -1;
      }
      if (a < b) {
        return 1;
      }
      return 0;
    });

    localStorage.setItem(this.RangeStock, JSON.stringify(MaxMin));
    return {
      MaxMin,
    };
  }
}
export const localStorageUtil = new LocalStorageUtil();
