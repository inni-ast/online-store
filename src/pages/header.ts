import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";

export class Header {
  totalPrice: number;
  basket: number;
  basketEl: HTMLElement;
  priceEl: HTMLElement;

  constructor() {
    this.totalPrice = this.findProductPrice();
    this.basket = this.findProductCount();
    this.basketEl = document.querySelector(".basket__num") as HTMLElement;
    this.priceEl = document.querySelector(".price__total") as HTMLElement;
  }

  run() {
    this.basket = this.findProductCount();
    this.totalPrice = this.findProductPrice();
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    this.basketEl.textContent = `${String(this.basket)}`;
    return this.basket;
  }

  findProductCount() {
    const product = localStorageUtil
      .getFromLS("products")
      .reduce(
        (total: number, amount: StorageProducts) => amount.count + total,
        0
      );
    return product;
  }

  findProductPrice() {
    const product = localStorageUtil
      .getFromLS("products")
      .reduce(
        (total: number, amount: StorageProducts) =>
          amount.price * amount.count + total,
        0
      );
    return product;
  }

  addPrice(price: number) {
    this.totalPrice += price;
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    return this.totalPrice;
  }
  addProduct(price: number) {
    this.basket = this.basket + 1;
    this.basketEl.textContent = String(this.basket);
    this.addPrice(price);
    return this.basket;
  }
  removeProduct(price: number) {
    this.basket = this.basket - 1;
    this.basketEl.textContent = String(this.basket);
    this.removePrice(price);
    return this.basket;
  }
  removeManyProduct(num: number, price: number) {
    this.basket = this.basket - num;
    this.basketEl.textContent = String(this.basket);
    this.removePrice(price);
    return this.basket;
  }

  removePrice(price: number) {
    this.totalPrice -= price;
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    return this.totalPrice;
  }
  setPriceFromBasket(num: number) {
    this.totalPrice = num;
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    return this.totalPrice;
  }
  setNumFromBasket(num: number) {
    this.basket = num;
    this.basketEl.textContent = String(this.basket);
    return this.basket;
  }
}

export const productsStore = localStorageUtil.getFromLS("products");
export const dataStore = localStorageUtil.getFromLS("data");
export const header = new Header();
