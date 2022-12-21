import { Page } from "../../core/templates/page";
import { MainPage } from "../main";
import { Header } from "../header";
import { Basket } from "../basket";
import { Product } from "../product";
import { ErrorPage, ErrorTypes } from "../error";

export const enum PagesId {
  MainPage = "main-container",
  Basket = "basket",
  Product = "products",
}
export class App {
  private static container = document.querySelector(".main") as HTMLElement;
  private initialPage: MainPage;
  header: Header;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = "";
    let page: Page | null = null;

    if (idPage === PagesId.MainPage) {
      page = new MainPage("div", idPage, "main__container");
    } else if (idPage === PagesId.Basket) {
      page = new Basket("div", idPage, "basket");
    } else if (idPage === PagesId.Product) {
      page = new Product("div", idPage, "products");
    } else {
      page = new ErrorPage(
        "div",
        "error-page",
        "error-page",
        ErrorTypes.NotFound
      );
    }
    if (page) {
      const pageHTML = page.render();
      App.container.append(pageHTML);
    }
  }
  constructor() {
    this.header = new Header();
    this.initialPage = new MainPage("div", "main-container", "main__container");
  }
  private routeChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }
  run() {
    App.renderNewPage("main-container");
    this.header.run();
    this.routeChange();
  }
}
