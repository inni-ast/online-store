import { Page } from "../core/templates/page";
import { DATA } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";
import { header } from "./header";
export class Basket extends Page {
  basketContainer: HTMLElement;
  summaryContainer: HTMLElement;
  allProductsPrice: number;
  isPromoWin: number;
  isPromoSh: number;
  static TextObject = {
    mainTitle: "Products In Cart",
    total: "Summary",
    stock: "Stock:",
    rating: "Rating:",
    discount: "Discount:",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.basketContainer = document.createElement("div");
    this.basketContainer.classList.add("basket__container");
    this.summaryContainer = document.createElement("div");
    this.summaryContainer.classList.add("basket__summary");
    this.allProductsPrice = 0;
    this.isPromoWin = 0;
    this.isPromoSh = 0;
  }
  // очищает всю корзину
  // handlerClear() {
  //  this.basketContainer.innerHTML = "";
  // }
  getPromoWin() {
    return this.isPromoWin;
  }
  setPromoWin(num: number) {
    this.isPromoWin = num;
  }
  getPromoSh() {
    return this.isPromoSh;
  }
  setPromoSh(num: number) {
    this.isPromoSh = num;
  }
  getAllProductsPrice() {
    return this.allProductsPrice;
  }
  setAllProductsPrice(num: number) {
    this.allProductsPrice = num;
  }
  renderSummary(products: number, price: number) {
    const html = `
      <div class="summary">
          <h3 class="summary__title">SUMMARY</h3>
          <p class="summary__products">Products in cart: ${products} </p>
          <p class="summary__price">Price: ${price} $</p>
          <p class="summary__price-promo hidden"></p>
          <input type="text" placeholder="Enter promo code"
          class="summary__input">
          <div class="summary__sh hidden">
            <p class="summary__sh-promo">Promo 'sh' - 5% </p>
            <button  class="button button-sh">ADD</button>
          </div>
          <div class="summary__win hidden">
          <p class="summary__win-promo">Promo 'win' - 15% </p>
          <button  class="button button-win">ADD</button>
        </div>
          <p class="summary__promo">Promo for test: 'sh', 'win'</p>
          <button  class="button summary__button">BUY</button>
      </div>
    `;
    this.summaryContainer.innerHTML = "";
    this.summaryContainer.innerHTML = html;
    this.basketContainer.appendChild(this.summaryContainer);
    return this.basketContainer;
  }
  renderProducts() {
    const productsStore = localStorageUtil
      .getProducts()
      .map((x: StorageProducts) => x.id);

    let htmlCatalog = "";
    let sumCatalog = 0;
    let num = 1; // счетчик товаров по порядку
    let numInBasket = 0;

    DATA.forEach(
      ({
        id,
        title,
        category,
        price,
        thumbnail,
        stock,
        brand,
        rating,
        description,
        discountPercentage,
      }) => {
        if (productsStore.indexOf(id) !== -1) {
          let { count } = localStorageUtil
            .getProducts()
            .find((x: StorageProducts) => x.id === id);
          console.log(count);

          if (count > stock) {
            count = stock;
            localStorageUtil.putProductsToBasket(id, price, count);
          }

          const p = +count * +price;
          numInBasket += +count;
          htmlCatalog += `
                <div class="basket-item">
                      <div class="basket-item__num">${num}</div>
                      <div class="basket-item__image">
                        <img class="basket-item__img" src=${thumbnail} alt="image ${title}">
                      </div>
                      <div class="basket__about">
                          <p class="basket-item__title">${title}</p>
                          <p class="basket-item__desc">${description}</p>
                          <p class="basket-item__category">Category: ${category}</p>
                            <p class="basket-item__brand">Category: ${brand}</p>
                          <p class="basket-item__rating">Rating: ${rating} </p>
                          <p class="basket-item__percent">Discount:
                        ${discountPercentage} %</p>
                      </div>
                    <div class="basket-item__sale">
                      <div class="basket-item__stock">Stock: ${stock} </div>
                        <div class="basket-item__number" >
                          <button class="basket-item__plus" data-stock=${stock} data-prodId=${id}> +</button>
                            <p class="basket-item__count">${count}</p>
                              <button class="basket-item__minus" data-prodId=${id}> -</button>
                        </div>
                        <div class="basket-item__price">Price: ${p.toLocaleString()} USD</div>
                    </div>
                </div> `;
          sumCatalog += p;
          num++;
        }
      }
    );
    const html = `
        <div class="basket-items" >
            ${htmlCatalog}
        </div>
        `;

    this.basketContainer.innerHTML = "";
    this.basketContainer.innerHTML = html;
    this.setAllProductsPrice(sumCatalog);
    header.setPriceFromBasket(sumCatalog);
    header.setNumFromBasket(numInBasket);
    this.renderSummary(numInBasket, sumCatalog);
    return this.basketContainer;
  }
  addProduct(id: number) {
    const product = localStorageUtil
      .getProducts()
      .find((el: StorageProducts) => el.id === id);
    product["count"]++;

    localStorageUtil.putProductsToBasket(
      product.id,
      product.price,
      product.count
    );

    BASKET.render();
  }
  removeProduct(id: number) {
    const product = localStorageUtil
      .getProducts()
      .find((el: StorageProducts) => el.id === id);

    product["count"]--;
    localStorageUtil.removeProductsFromBasket(
      product.id,
      product.price,
      product.count
    );

    BASKET.render();
  }
  addPromoWin() {
    const divWin = document.querySelector(".summary__win") as HTMLElement;
    const divPrice = document.querySelector(".summary__price") as HTMLElement;
    const divPricePromo = document.querySelector(
      ".summary__price-promo"
    ) as HTMLElement;

    divWin.classList.remove("hidden");
    const btnWin = document.querySelector(".button-win") as HTMLElement;

    btnWin.onclick = function (event: Event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains("add")) {
        (document.querySelector(".summary__input") as HTMLInputElement).value =
          "";
        target.classList.remove("add");
        target.textContent = "ADD";

        divWin.classList.add("hidden");
        BASKET.setPromoWin(0);
        const price = BASKET.getAllProductsPrice();
        const discount = BASKET.getPromoSh() + BASKET.getPromoWin();
        console.log(discount);
        if (discount !== 0) {
          const currentPrice = price - (price / 100) * discount;
          divPrice.style.textDecoration = "line-through";
          divPricePromo.classList.remove("hidden");
          divPricePromo.textContent = `
        Price: ${currentPrice} $ `;
        } else {
          divPrice.style.textDecoration = "none";
          divPricePromo.classList.add("hidden");
          divPricePromo.textContent = "";
        }
      } else {
        target.classList.add("add");
        target.textContent = "DEL";
        const price = BASKET.getAllProductsPrice();
        const discount = BASKET.getPromoSh() + BASKET.getPromoWin();
        const currentPrice = price - (price / 100) * discount;
        divPrice.style.textDecoration = "line-through";
        divPricePromo.classList.remove("hidden");
        divPricePromo.textContent = `
        Price: ${currentPrice} $ `;
      }
    };
  }
  addPromoSh() {
    const divSh = document.querySelector(".summary__sh") as HTMLElement;
    divSh.classList.remove("hidden");
    const divPrice = document.querySelector(".summary__price") as HTMLElement;
    const divPricePromo = document.querySelector(
      ".summary__price-promo"
    ) as HTMLElement;

    const btnSh = document.querySelector(".button-sh") as HTMLElement;

    btnSh.onclick = function (event: Event) {
      const target = event.target as HTMLElement;
      if (target.classList.contains("add")) {
        (document.querySelector(".summary__input") as HTMLInputElement).value =
          "";
        target.classList.remove("add");
        target.textContent = "ADD";

        divSh.classList.add("hidden");
        BASKET.setPromoSh(0);
        const price = BASKET.getAllProductsPrice();
        const discount = BASKET.getPromoSh() + BASKET.getPromoWin();
        if (discount !== 0) {
          const currentPrice = price - (price / 100) * discount;
          divPrice.style.textDecoration = "line-through";
          divPricePromo.classList.remove("hidden");
          divPricePromo.textContent = `
        Price: ${currentPrice} $ `;
        } else {
          divPrice.style.textDecoration = "none";
          divPricePromo.classList.add("hidden");
          divPricePromo.textContent = "";
        }
      } else {
        target.classList.add("add");
        target.textContent = "DEL";
        const price = BASKET.getAllProductsPrice();
        const discount = BASKET.getPromoSh() + BASKET.getPromoWin();
        const currentPrice = price - (price / 100) * discount;
        divPrice.style.textDecoration = "line-through";
        divPricePromo.classList.remove("hidden");
        divPricePromo.textContent = `
        Price: ${currentPrice} $ `;
      }
    };
  }
  render() {
    const products = this.renderProducts() as HTMLElement;
    this.container.append(products);
    return this.container;
  }
}

export const BASKET = new Basket("div", "basket", "basket");
console.log(BASKET.allProductsPrice);

document.oninput = function (event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value as string;
  if (value === "win") {
    BASKET.addPromoWin();
    BASKET.setPromoWin(15);
  }
  if (value === "sh") {
    BASKET.addPromoSh();
    BASKET.setPromoSh(5);
  }
};
