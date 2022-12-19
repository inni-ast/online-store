export abstract class Component {
  protected container: HTMLElement;
  constructor(el: string, nameClass: string) {
    this.container = document.createElement(el);
    this.container.classList.add(nameClass);
  }
  render() {
    return this.container;
  }
}
