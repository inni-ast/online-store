import { Page } from "../core/templates/page";

export class Basket extends Page {
  static TextObject = {
    mainTitle: "Basket",
    total: "Cart total",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
  }
  render() {
    const title = this.createTitle(Basket.TextObject.mainTitle);
    this.container.append(title);

    return this.container;
  }
}
