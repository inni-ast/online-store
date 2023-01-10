import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";

export class Header {
  totalPrice: number;
  basket: number;
  basketEl: HTMLElement;
  priceEl: HTMLElement;

  constructor() {
    this.totalPrice = localStorageUtil
      .getProducts()
      .reduce(
        (total: number, amount: StorageProducts) =>
          amount.price * amount.count + total,
        0
      );

    this.basket = localStorageUtil
      .getProducts()
      .reduce(
        (total: number, amount: StorageProducts) => amount.count + total,
        0
      );
    this.basketEl = document.querySelector(".basket__num") as HTMLElement;
    this.priceEl = document.querySelector(".price__total") as HTMLElement;
  }

  run() {
    this.basket = localStorageUtil
      .getProducts()
      .reduce(
        (total: number, amount: StorageProducts) => amount.count + total,
        0
      );
    this.totalPrice = localStorageUtil
      .getProducts()
      .reduce(
        (total: number, amount: StorageProducts) =>
          amount.price * amount.count + total,
        0
      );
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    this.basketEl.textContent = `${String(this.basket)}`;
    return this.basket;
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
    console.log("price" + num);
    return this.totalPrice;
  }
  setNumFromBasket(num: number) {
    this.basket = num;
    this.basketEl.textContent = String(this.basket);
    return this.basket;
  }
}

export const productsStore = localStorageUtil.getProducts();

export const dataStore = localStorageUtil.getData();
export const header = new Header();
