import { SET } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";

export class Header {
  totalPrice: number;
  basket: number;
  basketEl: HTMLElement;
  priceEl: HTMLElement;

  constructor() {
    this.totalPrice = productsStore.reduce(
      (total: number, amount: SET) => amount.price + total,
      0
    );
    this.basket = productsStore.length;
    this.basketEl = document.querySelector(".basket__num") as HTMLElement;
    this.priceEl = document.querySelector(".price__total") as HTMLElement;
  }

  run() {
    this.basket = productsStore.length;
    this.basketEl.textContent = String(productsStore.length);
    console.log(this.totalPrice);
    this.totalPrice = productsStore.reduce(
      (total: number, amount: SET) => amount.price + total,
      0
    );
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
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
  removePrice(price: number) {
    this.totalPrice -= price;
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    return this.totalPrice;
  }
}
// получаем массив товаров из корзины
export const productsStore = localStorageUtil.getProducts();
export const dataStore = localStorageUtil.getData();
export const header = new Header();
// количество товаров в корзине
productsStore.length;
