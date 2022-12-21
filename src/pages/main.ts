import { Page } from "../core/templates/page";
import { SET, DATA } from "../modules/data";

export class MainPage extends Page {
  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
    btnPriceUp: "Price Up",
    btnPriceDown: "Price Down",
    btnRatingUp: "Rating Up",
    btnRatingDown: "Rating Down",
  };

  itemsContainer: HTMLElement;
  buttonSortPriceUp: HTMLElement;
  buttonSortPriceDown: HTMLElement;
  buttonSortRatingUp: HTMLElement;
  buttonSortRatingDown: HTMLElement;
  inputSearch: HTMLElement;
  buttonItemsRow: HTMLElement;
  buttonItemsColumn: HTMLElement;
  currentData: Array<SET>;

  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.currentData = [];
    this.itemsContainer = document.createElement("div");
    this.itemsContainer.classList.add("items__cards", "row");

    this.buttonSortPriceUp = document.createElement("button");
    this.buttonSortPriceUp.id = "price-up";
    this.buttonSortPriceUp.classList.add("button");
    this.buttonSortPriceUp.classList.add("button_price-up");
    this.buttonSortPriceUp.textContent = MainPage.TextObject.btnPriceUp;

    this.buttonSortPriceDown = document.createElement("button");
    this.buttonSortPriceDown.id = "price-down";
    this.buttonSortPriceDown.classList.add("button", "button_price-down");
    this.buttonSortPriceDown.textContent = MainPage.TextObject.btnPriceDown;

    this.buttonSortRatingUp = document.createElement("button");
    this.buttonSortRatingUp.id = "rating-up";
    this.buttonSortRatingUp.classList.add("button", "button_rating-up");
    this.buttonSortRatingUp.textContent = MainPage.TextObject.btnRatingUp;

    this.buttonSortRatingDown = document.createElement("button");
    this.buttonSortRatingDown.id = "rating-down";
    this.buttonSortRatingDown.classList.add("button", "button__rating-down");
    this.buttonSortRatingDown.textContent = MainPage.TextObject.btnRatingDown;

    this.inputSearch = document.createElement("input");
    this.inputSearch.setAttribute("type", "text");
    this.inputSearch.setAttribute("placeholder", "Search");
    this.inputSearch.classList.add("input-search");

    this.buttonItemsRow = document.createElement("button");
    this.buttonItemsRow.id = "button-row";
    this.buttonItemsRow.classList.add("button__row", "button");
    this.buttonItemsRow.textContent = "Items row";
    this.buttonItemsColumn = document.createElement("button");
    this.buttonItemsColumn.id = "button-column";
    this.buttonItemsColumn.classList.add("button__column", "button");
    this.buttonItemsColumn.textContent = "Items column";

    this.buttonSortPriceUp.addEventListener("click", this.sort);
    // this.buttonSortPriceDown.addEventListener("click", this.sort);

    this.buttonItemsColumn.addEventListener("click", MainPage.cardsShow);
    this.buttonItemsRow.addEventListener("click", MainPage.cardsShow);
  }
  // private createFilters() { }
  private createSorts() {
    const sortsHeader = document.createElement("div");

    sortsHeader.classList.add("items__sorts");
    sortsHeader.append(
      this.inputSearch,
      this.buttonSortPriceDown,
      this.buttonSortPriceUp,
      this.buttonSortRatingDown,
      this.buttonSortRatingUp,
      this.buttonItemsRow,
      this.buttonItemsColumn
    );
    return sortsHeader;
  }

  private createCards(data: Array<SET>) {
    let itemsHTML = "";

    data.forEach(({ thumbnail, title, brand, price, stock, rating }) => {
      itemsHTML += `
      <div class="cards__item card" data-price=${price} data-rating=${rating}>
      <div class="card__image">
        <img src=${thumbnail} alt="product image" class="card__img">
      </div>
      <div class="card__about">
        <h3 class="card__title">${title}</h3>
        <p class="card__brand">Brand: ${brand}</p>
        <p class="card__price">Price: ${price}</p>
        <p class="card__stock">Stock: ${stock}</p>
      </div>
      <div class="card__act">
        <button class="card__btn"></button>
      </div>
    </div>
      `;
    });
    this.itemsContainer.innerHTML = itemsHTML;
    // for (let i = 0; i < data.length; i++) {
    //   const p = document.createElement("div");
    //   p.classList.add("card");
    //   const divImage = document.createElement("div");
    //   p.classList.add("card__image");

    //   const img = new Image();
    //   img.classList.add("card__img");
    //   img.src = data[i].images[0];
    //   divImage.append(img);
    //   p.append(divImage);
    //   itemsContainer.appendChild(p);
    // }
    return this.itemsContainer;
  }

  sort() {
    const allItems = document.querySelector(".items__cards");

    if (allItems) {
      for (let i = 0; i < allItems.children.length; i++) {
        for (let j = i; j < allItems.children.length; j++) {
          const one = allItems.children[i] as HTMLDivElement;
          const two = allItems.children[j] as HTMLDivElement;
          const attrOne = one.getAttribute("data-price");
          const attrTwo = two.getAttribute("data-price");
          console.log(attrOne, attrTwo);
          if (attrOne && attrTwo) {
            if (+attrOne > +attrTwo) {
              const replaceNode = allItems.replaceChild(two, one);
              if (replaceNode) this.insertAfter(replaceNode, one);
            }
          }
        }
      }
      // this.renderCards();
      // и положить обратно
    }
    return allItems;
  }
  insertAfter(elOne: HTMLElement, refElement: HTMLElement): HTMLElement {
    const element: HTMLElement = (
      refElement.parentNode as HTMLElement
    ).insertBefore(elOne, refElement.nextSibling);
    return element;
  }
  // private renderCards(data) {
  //   const mainItems = document.querySelector("section") as HTMLElement;
  //   mainItems.append(data);
  //   this.container.append(mainItems);
  //   return this.container;
  // }

  static cardsShow() {
    const container = document.querySelector(".items__cards");

    if (container) {
      if (container.classList.contains("column")) {
        container.classList.remove("column");
        container.classList.add("row");
      } else {
        container.classList.remove("row");
        container.classList.add("column");
      }
    }
  }

  render() {
    const title = this.createTitle(MainPage.TextObject.mainTitle);
    const mainItems = document.createElement("section") as HTMLElement;
    const sorts = this.createSorts() as HTMLElement;
    const allCards = this.createCards(DATA) as HTMLElement;

    mainItems.classList.add("main__items");

    this.container.append(title); // будет фильтры
    mainItems.append(sorts); // блок с сортировками
    mainItems.append(allCards); // все товары
    this.container.append(mainItems);

    return this.container;
  }
}

const P = new MainPage("div", "main-container", "main__container");
console.log(P);
