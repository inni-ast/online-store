import { Page } from "../core/templates/page";
import { DATA } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";
import { header } from "./header";
import { App } from "./app/index-app";
import { summaryHTML } from "../modules/renderSummaryHTML";
import { renderBuyWindowHTML } from "../modules/renderBuyWindow";
import { renderItem } from "../modules/renderItemInBasket";

export const overlay = document.getElementById(
  "overlay-modal"
) as HTMLDivElement;
export class Basket extends Page {
  basketContainer: HTMLElement;
  summaryContainer: HTMLElement;
  buyContainer: HTMLElement;
  static TextObject = {
    mainTitle: "Products In Cart",
    total: "Summary",
    stock: "Stock:",
    rating: "Rating:",
    discount: "Discount:",
  };
  constructor(
    el: string,
    id: string,
    nameClass: string,
    public allProductsPrice = 0,
    public isPromoWin = 0,
    public isPromoSh = 0
  ) {
    super(el, id, nameClass);
    this.basketContainer = document.createElement("div");
    this.basketContainer.classList.add("basket__container");
    this.summaryContainer = document.createElement("div");
    this.summaryContainer.classList.add("basket__summary");
    this.buyContainer = document.createElement("div");
    this.buyContainer.classList.add("basket__buy");
  }

  handlerClear() {
    this.basketContainer.innerHTML = "";
    localStorage.removeItem("products");
    header.setNumFromBasket(0);
    header.setPriceFromBasket(0);
  }
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
    const html = summaryHTML(products, price);

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
    const html = renderBuyWindowHTML();

    form.innerHTML = html;
    this.buyContainer.append(form);
    this.basketContainer.append(this.buyContainer);
    return this.basketContainer;
  }
  renderProducts() {
    const productsStore = localStorageUtil
      .getFromLS("products")
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
              .getFromLS("products")
              .find((x: StorageProducts) => x.id === id);

            if (count > stock) {
              count = stock;
              localStorageUtil.putProductsToBasket(id, price, count);
            }

            const p = +count * +price;
            numInBasket += +count;
            htmlCatalog += renderItem(
              num,
              thumbnail,
              title,
              description,
              category,
              brand,
              rating,
              discountPercentage,
              stock,
              id,
              count,
              p
            );
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
      .getFromLS("products")
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
      .getFromLS("products")
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

  //корзина: промокоды
  if (target.classList.contains("summary__input")) {
    if (value === "win") {
      BASKET.addPromoWin();
      BASKET.setPromoWin(15);
    }
    if (value === "sh") {
      BASKET.addPromoSh();
      BASKET.setPromoSh(5);
    }
  }
};

document.onsubmit = function (event: Event) {
  const target = event.target as HTMLInputElement;

  if (target.classList.contains("form-buy")) {
    event.preventDefault();
    alert("Thank you! Your order has been placed");
    setTimeout(() => {
      overlay.innerHTML = "";
      BASKET.handlerClear();
      App.renderNewPage("main-container");
      document.body.classList.remove("lock");
      overlay.classList.remove("active");
    }, 2000);
  }
};

document.onkeyup = function (event: Event) {
  const target = event.target as HTMLInputElement;
  let value = target.value as string;

  //окно покупки: срок действия карты
  if (target.classList.contains("form-card__input-data")) {
    if (value.length === 2 && /0[1-9]|1[1-2]/.test(value)) {
      const v = value.replace(value, (value += "/"));
      target.value = v;
    }
    if (value.length > 5) {
      target.value = value.slice(0, 5);
    }
  }
  //окно покупки: смена логотипа карты
  if (target.classList.contains("form-card__input-number")) {
    if (value.length === 1) {
      const img = document.querySelector(".form-card__img") as HTMLImageElement;
      if (+value === 4) {
        img.src =
          "https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png";
      } else if (+value === 3) {
        img.src = "https://belkart.by/upload/iblock/a5c/press_kit_img_1_1_.png";
      } else if (+value === 5) {
        img.src =
          "https://www.mastercard.hu/content/dam/public/mastercardcom/eu/hu/images/mc-logo-52.svg";
      } else {
        img.src =
          "https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71";
      }
    }
  }
};
