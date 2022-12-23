export class Header {
  _totalPrice: number;
  _basket: number;
  basketEl: HTMLElement;
  priceEl: HTMLElement;
  constructor(totalPrice = 0, basket = 0) {
    this._totalPrice = totalPrice;
    this._basket = basket;
    this.basketEl = document.querySelector(".basket__num") as HTMLElement;
    this.priceEl = document.querySelector(".price__total") as HTMLElement;
  }
  run() {
    this.basketEl.textContent = String(this._basket);
    this.priceEl.textContent = `${String(this._totalPrice)} $`;
  }
  get basket() {
    return this._basket;
  }
  set basket(num: number) {
    this._basket = num;
  }
  get totalPrice() {
    return this._totalPrice;
  }
  set totalPrice(price: number) {
    this._totalPrice = price;
  }
}
