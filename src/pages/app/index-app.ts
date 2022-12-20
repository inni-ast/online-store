import { Page } from "../../core/templates/page";
import { MainPage } from "../main";
import { Header } from "../header";
import { Basket } from "../basket";
import { Product } from "../product";
import { ErrorPage, ErrorTypes } from "../error";

export const enum PagesId {
  MainPage = "main-page",
  Basket = "basket",
  Product = "products",
}
export class App {
  private static container = document.querySelector(".main") as HTMLDivElement;
  private initialPage: MainPage;
  header: Header;
  static renderNewPage(idPage: string) {
    App.container.innerHTML = "";
    let page: Page | null = null;

    if (idPage === PagesId.MainPage) {
      page = new MainPage(idPage, "main-page", "main");
    } else if (idPage === PagesId.Basket) {
      page = new Basket(idPage, "basket", "basket");
    } else if (idPage === PagesId.Product) {
      page = new Product(idPage, "products", "products");
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
    this.initialPage = new MainPage("main", "main-page", "main");
  }
  private routeChange() {
    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }
  run() {
    App.renderNewPage("main-page");
    this.header.run();
    this.routeChange();
  }
}
