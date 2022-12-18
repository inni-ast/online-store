import { MainPage } from "../main";
import { Header } from "../header";

export class App {
  private container: HTMLElement;
  private initialPage: MainPage;
  header: Header;
  constructor() {
    this.container = document.body;
    this.header = new Header();
    this.initialPage = new MainPage("main-page");
  }
  run() {
    this.header.run();
    const mainPageHTML = this.initialPage.render();
    this.container.append(mainPageHTML);
  }
}
