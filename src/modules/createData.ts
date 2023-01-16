import { SET, DATA } from "./data";
import { localStorageUtil } from "./localStorage";

export function createData(data: Array<SET>) {
  data = DATA;
  const checkedCategory = localStorageUtil.getCheckedCategory();
  const checkedBrand = localStorageUtil.getCheckedBrand();
  const input = localStorageUtil.getParams("Search");
  const sortSort = localStorageUtil.getParams("Sort");
  const rangePrice = localStorageUtil.getRangePrice();
  const rangeStock = localStorageUtil.getRangeStock();

  if (checkedCategory.length > 0) {
    data = data.filter((el) => checkedCategory.includes(el.category) === true);
    if (checkedBrand.length > 0) {
      data = data.filter((el) => checkedBrand.includes(el.brand) === true);
    }
  }

  if (checkedBrand.length > 0 && checkedCategory.length === 0) {
    data = data.filter((el) => checkedBrand.includes(el.brand) === true);
  }

  if (input.length > 0) {
    data = data.filter(
      (el) =>
        el.price.toString().toLowerCase().includes(input) ||
        el.discountPercentage.toString().toLowerCase().includes(input) ||
        el.rating.toString().toLowerCase().includes(input) ||
        el.stock.toString().toLowerCase().includes(input) ||
        el.title.toLocaleLowerCase().includes(input) ||
        el.description.toLocaleLowerCase().includes(input) ||
        el.brand.toLocaleLowerCase().includes(input) ||
        el.category.toLocaleLowerCase().includes(input)
    );
  }

  if (sortSort === "PriceUp") {
    data.sort((a: SET, b: SET) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
  } else if (sortSort === "PriceDown") {
    data.sort((a: SET, b: SET) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
  } else if (sortSort === "StockUp") {
    data.sort((a: SET, b: SET) => {
      if (a.stock > b.stock) {
        return 1;
      }
      if (a.stock < b.stock) {
        return -1;
      }
      return 0;
    });
  } else if (sortSort === "StockDown") {
    data.sort((a: SET, b: SET) => {
      if (a.stock < b.stock) {
        return 1;
      }
      if (a.stock > b.stock) {
        return -1;
      }
      return 0;
    });
  }

  if (rangeStock) {
    const setPrice = new Set();
    DATA.map((a: SET): void => {
      setPrice.add(a.stock);
    });

    const setPrice1: Array<number> = [];
    setPrice.forEach((item) => {
      setPrice1.push(Number(item));
    });

    setPrice1.sort((a: number, b: number) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });

    const minVal = setPrice1[+rangeStock[1] - 1];
    const maxVal = setPrice1[+rangeStock[0] - 1];

    data = data.filter((el) => el.stock <= minVal && el.stock >= maxVal);
  }

  if (rangePrice) {
    const setPrice = new Set();
    DATA.map((a: SET): void => {
      setPrice.add(a.price);
    });

    const setPrice1: Array<number> = [];
    setPrice.forEach((item) => {
      setPrice1.push(Number(item));
    });

    setPrice1.sort((a: number, b: number) => {
      if (a < b) {
        return 1;
      }
      if (a > b) {
        return -1;
      }
      return 0;
    });

    const minVal = setPrice1[+rangePrice[1] - 1];
    const maxVal = setPrice1[+rangePrice[0] - 1];

    data = data.filter((el) => el.price <= minVal && el.price >= maxVal);
  }

  return data;
}
