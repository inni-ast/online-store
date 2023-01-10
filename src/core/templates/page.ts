export abstract class Page {
  protected container: HTMLElement;

  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
  };
  constructor(el: string, id: string, nameClass: string) {
    this.container = document.createElement(el);
    this.container.id = id;
    this.container.classList.add(nameClass);
  }
  protected createTitle(text: string) {
    const headerTitle = document.createElement("h1");
    headerTitle.innerText = text;
    return headerTitle;
  }
  render() {
    return this.container;
  }
}
