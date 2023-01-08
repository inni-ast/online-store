import { Page } from "../../core/templates/page";
// import { MainPage } from "../main";
import { Header } from "../header";
import { ErrorPage, ErrorTypes } from "../error";
import { DATA } from "../../modules/data";
import { preloadImages } from "../../modules/funсtions";
import { P } from "../main";
import { BASKET } from "../basket";
import { PRODUCT } from "../product";

export const enum PagesId {
  MainPage = "main-container",
  Basket = "basket",
  Product = "products",
}
export class App {
  private static container = document.querySelector(".main") as HTMLElement;
  // private initialPage: MainPage;
  header: Header;

  static renderNewPage(idPage: string) {
    App.container.innerHTML = "";
    let page: Page | null = null;

    if (idPage === PagesId.MainPage) {
      page = P;
    } else if (idPage === PagesId.Basket) {
      page = BASKET;
    } else if (idPage === PagesId.Product) {
      page = PRODUCT;
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
    // this.initialPage = new MainPage("div", "main-container", "main__container");
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
    preloadImages(DATA);
    // preloadImagesProduct(DATA);
  }
}
