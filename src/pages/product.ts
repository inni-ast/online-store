import { Page } from "../core/templates/page";

export class Product extends Page {
  static TextObject = {
    mainTitle: "Product",
    total: "Product total",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
  }
  render() {
    const title = this.createTitle(Product.TextObject.mainTitle);
    this.container.append(title);
    return this.container;
  }
}
