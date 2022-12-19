import { Page } from "../core/templates/page";
import { SET, DATA } from "../modules/data";

export class MainPage extends Page {
  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
  }
  private createCard(data: Array<SET>) {
    const itemsContainer = document.createElement("div");

    itemsContainer.classList.add("main__items");
    for (let i = 1; i < data.length; i++) {
      const p = document.createElement("div");

      p.textContent = data[i].category;
      itemsContainer.appendChild(p);
    }
    return itemsContainer;
  }
  render() {
    const title = this.createTitle(MainPage.TextObject.mainTitle);
    this.container.append(title);
    const allCards = this.createCard(DATA) as HTMLElement;
    this.container.append(allCards);
    return this.container;
  }
}
// class Item {
//   constructor() {

//   }
// }
