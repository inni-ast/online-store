import { Page } from "../core/templates/page";
import { DATA } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";
import { header } from "./header";

const overlay = document.getElementById("overlay-modal") as HTMLDivElement;
export class Basket extends Page {
  basketContainer: HTMLElement;
  summaryContainer: HTMLElement;
  buyContainer: HTMLElement;
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
    this.buyContainer = document.createElement("div");
    this.buyContainer.classList.add("basket__buy");
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
          <button class="button summary__button">BUY</button>
      </div>
    `;
    this.summaryContainer.innerHTML = "";
    this.summaryContainer.innerHTML = html;
    this.basketContainer.appendChild(this.summaryContainer);
    return this.basketContainer;
  }
  closeBuyWindow() {
    document.body.classList.remove("lock");
    overlay.classList.remove("active");
    this.buyContainer.classList.remove("active");
    this.buyContainer.innerHTML = "";
  }
  renderBuyWindow() {
    document.body.classList.add("lock");
    overlay.classList.add("active");
    this.buyContainer.classList.add("active");
    this.buyContainer.innerHTML = "";

    const form = document.createElement("form") as HTMLFormElement;

    form.classList.add("form-buy");
    const html = `
      <div class="form-buy_close"> X </div>
      <h4 class="form-buy__title"> Personal details</h4>
      <input type="text" id="buy-name" name="name" required
          placeholder="Name, Surname" class="form-buy__input">
      <input type="number" id="buy-tel" name="tel" required
          placeholder="Phone number" class="form-buy__input">
      <input type="text" id="buy-address" name="address" required
          placeholder="Your address" class="form-buy__input">
      <input type="email" id="buy-email" name="email" required
          placeholder="Your email" class="form-buy__input">
      <div class="form-buy__card form-card">
          <h4 class="form-card__title"> Credit card details</h4>
            <div class="form-card__block">
              <div class="form-card__number">
                  <div class="form-card__image">
                    <img src="#" class="form-card__img">
                  </div>
              <input type="number" id="card-num" name="card-num" required
                  placeholder="Card number" class="form-card__input-number">
              </div>
            <label class="form-card__label">
              VALID:
               <input type="number" id="card-valid" name="card-valid" required placeholder="Data" class="form-card__input-data">
            </label>
            <label class="form-card__label">
              CVV:
               <input type="number" id="card-cvv" name="card-cvv" required placeholder="CVV" class="form-card__input-cvv">
            </label>
           </div>
      </div>
  <button type="submit" class="form-buy__btn">Submit</button>
`;
    form.innerHTML = html;
    this.buyContainer.append(form);
    this.basketContainer.append(this.buyContainer);
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
    this.summaryContainer.innerHTML = "";

    if (productsStore.length !== 0) {
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
    } else {
      this.setAllProductsPrice(sumCatalog);
      header.setPriceFromBasket(sumCatalog);
      header.setNumFromBasket(numInBasket);
      this.basketContainer.innerHTML = `<div class="no-card"> No products in card </div>`;
    }

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

        if (discount !== 0) {
          const currentPrice = Math.round(price - (price / 100) * discount);
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
        const currentPrice = Math.round(price - (price / 100) * discount);
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
          const currentPrice = Math.round(price - (price / 100) * discount);
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
        const currentPrice = Math.round(price - (price / 100) * discount);
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
