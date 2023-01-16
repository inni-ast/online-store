import { PRODUCT } from "../pages/product";
import { localStorageUtil } from "./localStorage";
import { header } from "../pages/header";
import { BuyWindow } from "./buyWindow";
import { App } from "../pages/app/index-app";
import { BASKET } from "../pages/basket";
import { SET } from "./data";
import { MainPage } from "../pages/main";

document.onclick = function (event: Event) {
  const target = event.target as HTMLElement;

  if (target.classList.contains("btn__product")) {
    const id = Number(target.getAttribute("data-id"));
    if (id) {
      PRODUCT.getProduct(id);
    }
  }
  if (target.classList.contains("product__slides-small")) {
    const srcSmall = target.getAttribute("src") as string;
    const bigPhoto = document.querySelector(
      ".product__slides-big"
    ) as HTMLImageElement;
    const srcBig = bigPhoto.getAttribute("src") as string;

    target.setAttribute("src", srcBig);
    bigPhoto.setAttribute("src", srcSmall);
  }
  if (target.classList.contains("card__btnB")) {
    const id = target.getAttribute("data-id");
    const price = target.getAttribute("data-price");

    if (id && price) {
      const products = localStorageUtil.getFromLS("products");

      if (products.length === 0) {
        const { pushProduct } = localStorageUtil.putProducts(+id, +price);
        if (pushProduct) {
          header.addProduct(+price);
        }
      } else {
        const index = products.findIndex((el: SET) => el.id === +id);

        if (index === -1) {
          products.push({ id: +id, price: +price, count: 1 });
          localStorage.setItem("products", JSON.stringify(products));
          header.addProduct(+price);
        }
      }
    }
    App.renderNewPage("basket");
    BuyWindow.renderBuyWindow();
  }
  if (target.classList.contains("summary__button")) {
    BuyWindow.renderBuyWindow();
  }
  if (target.classList.contains("form-buy_close")) {
    BuyWindow.closeBuyWindow();
  }

  if (target.classList.contains("basket-item__plus")) {
    const id = target.getAttribute("data-prodId");

    if (id) {
      BASKET.addProduct(+id);
    }
  }
  if (target.classList.contains("basket-item__minus")) {
    const id = target.getAttribute("data-prodId");

    if (id) {
      BASKET.removeProduct(+id);
    }
  }
  if (target.classList.contains("card__btn")) {
    const id = target.getAttribute("data-id");
    const price = target.getAttribute("data-price");

    if (id && price) {
      if (target.classList.contains("card__btn")) {
        const { pushProduct } = localStorageUtil.putProducts(+id, +price);

        if (pushProduct) {
          target.classList.add("active-btn");
          target.innerHTML = MainPage.TextObject.dropFromCard;
          header.addProduct(+price);
        } else {
          target.classList.remove("active-btn");
          target.innerHTML = MainPage.TextObject.addToCard;
        }
      }
    }
  }
};
