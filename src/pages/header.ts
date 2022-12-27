import { localStorageUtil } from "../modules/localStorage";
export class Header {
  totalPrice: number;
  basket: number;
  basketEl: HTMLElement;
  priceEl: HTMLElement;

  constructor() {
    this.totalPrice = 0;
    this.basket = productsStore.length;
    this.basketEl = document.querySelector(".basket__num") as HTMLElement;
    this.priceEl = document.querySelector(".price__total") as HTMLElement;
  }

  run() {
    this.basket = productsStore.length;
    this.basketEl.textContent = String(productsStore.length);
    console.log(this.basket);
    this.priceEl.textContent = `${String(this.totalPrice)} $`;
    return this.basket;
  }

  getNumOfProducts() {
    return this.basket;
  }

  addProduct() {
    console.log(this.basket);
    this.basket = this.basket + 1;
    this.basketEl.textContent = String(this.basket);
    console.log(this.basket);
    return this.basket;
    // this.priceEl.textContent
  }
  removeProduct() {
    console.log(this.basket);
    this.basket = this.basket - 1;
    this.basketEl.textContent = String(this.basket);
    console.log(this.basket);
    return this.basket;
    // this.priceEl.textContent
  }
  // get totalPrice() {
  //   return this.totalPrice;
  // }

  // set totalPrice(price: number) {
  //   this.totalPrice = price;
  // }
}
// получаем массив товаров из корзины
const productsStore = localStorageUtil.getProducts();
export const header = new Header();
// количество товаров в корзине
productsStore.length;
