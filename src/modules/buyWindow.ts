import { Component } from "../core/templates/components";
import { overlay } from "../pages/basket";
import { renderBuyWindowHTML } from "./renderBuyWindow";
import { BASKET } from "../pages/basket";

export class Buy extends Component {
  constructor(el: string, nameClass: string) {
    super(el, nameClass);
  }
  closeBuyWindow() {
    document.body.classList.remove("lock");
    overlay.classList.remove("active");
    this.container.classList.remove("active");
    this.container.innerHTML = "";
  }
  renderBuyWindow() {
    document.body.classList.add("lock");
    overlay.classList.add("active");
    this.container.classList.add("active");
    this.container.innerHTML = "";

    const form = document.createElement("form") as HTMLFormElement;

    form.classList.add("form-buy");
    const html = renderBuyWindowHTML();

    form.innerHTML = html;
    this.container.append(form);
    BASKET.basketContainer.append(this.container);
    return BASKET.basketContainer;
  }
}

export const BuyWindow = new Buy("div", "basket__buy");
