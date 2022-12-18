import { SET, DATA } from "../modules/data";

export class MainPage {
  private container: HTMLElement;
  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
  };
  constructor(id: string) {
    this.container = document.createElement("div");
    this.container.id = id;
  }
  private createTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerText = text;
    return headerTitle;
  }
  private createCard(data: Array<SET>) {
    const itemsContainer = document.createElement("div");

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
