import { Page } from "../core/templates/page";
import { SET, DATA } from "../modules/data";

export class MainPage extends Page {
  static TextObject = {
    mainTitle: "Main Page",
    total: "Cart total",
    btnPriceUp: "Price Up",
    btnPriceDown: "Price Down",
    btnStockUp: "Stock Up",
    btnStockDown: "Stock Down",
    btnItemsRow: "row",
    btnItemsColumn: "col",
  };
  currentData: Array<SET>;
  static currentDATA = DATA;
  itemsContainer: HTMLElement;
  buttonSortPriceUp: HTMLElement;
  buttonSortPriceDown: HTMLElement;
  buttonSortStockUp: HTMLElement;
  buttonSortStockDown: HTMLElement;
  inputSearch: HTMLElement;
  buttonItemsRow: HTMLElement;
  buttonItemsColumn: HTMLElement;

  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.currentData = DATA;
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

    this.buttonSortStockUp = document.createElement("button");
    this.buttonSortStockUp.id = "rating-up";
    this.buttonSortStockUp.classList.add("button", "button_rating-up");
    this.buttonSortStockUp.textContent = MainPage.TextObject.btnStockUp;

    this.buttonSortStockDown = document.createElement("button");
    this.buttonSortStockDown.id = "rating-down";
    this.buttonSortStockDown.classList.add("button", "button__rating-down");
    this.buttonSortStockDown.textContent = MainPage.TextObject.btnStockDown;

    this.inputSearch = document.createElement("input");
    this.inputSearch.setAttribute("type", "text");
    this.inputSearch.setAttribute("placeholder", "Search");
    this.inputSearch.classList.add("input-search");

    this.buttonItemsRow = document.createElement("button");
    this.buttonItemsRow.id = "button-row";
    this.buttonItemsRow.classList.add("button__row", "button-vie", "active");
    this.buttonItemsRow.textContent = MainPage.TextObject.btnItemsRow;

    this.buttonItemsColumn = document.createElement("button");
    this.buttonItemsColumn.id = "button-column";
    this.buttonItemsColumn.classList.add("button__column", "button-vie");
    this.buttonItemsColumn.textContent = MainPage.TextObject.btnItemsColumn;

    this.buttonSortPriceUp.addEventListener("click", this.sortItemsPriceUp);
    this.buttonSortPriceDown.addEventListener("click", this.sortItemsPriceDown);

    this.buttonSortStockUp.addEventListener("click", this.sortItemsStockUp);
    this.buttonSortStockDown.addEventListener("click", this.sortItemsStockDown);

    this.buttonItemsColumn.addEventListener("click", this.cardsShowColumn);
    this.buttonItemsRow.addEventListener("click", this.cardsShowRow);

    // this.inputSearch.addEventListener("input", this.searchCards);
  }
  // private createFilters() { }
  private createSorts() {
    const sortsHeader = document.createElement("div");

    sortsHeader.classList.add("items__sorts");
    sortsHeader.append(
      this.buttonSortPriceDown,
      this.buttonSortPriceUp,
      this.buttonSortStockDown,
      this.buttonSortStockUp,
      this.inputSearch,
      this.buttonItemsRow,
      this.buttonItemsColumn
    );
    return sortsHeader;
  }
  // searchCards = () => {
  //   console.log("input");
  // };

  private createCards(data: Array<SET>) {
    let itemsHTML = "";

    data.forEach(({ thumbnail, title, brand, price, stock, rating }) => {
      itemsHTML += `
      <div class="cards__item card" data-price=${price} data-rating=${rating}>
      <div class="card__image">
        <img src=${thumbnail} alt="product image" class="card__img">
      </div>
      <div class="card__about-act">
      <div class="card__about">
        <h3 class="card__title">${title}</h3>
        <p class="card__brand">Brand: ${brand}</p>
        <p class="card__price">Price: ${price}</p>
        <p class="card__stock">Stock: ${stock}</p>
      </div>
      <div class="card__act">
        <button class="card__btn">Add to card</button>
      </div>
      </div>
    </div>
      `;
    });
    this.itemsContainer.innerHTML = itemsHTML;
    return this.itemsContainer;
  }
  getCurrentData(data: Array<SET>) {
    return data;
  }

  public sortItemsPriceUp = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.price > b.price) {
        return 1;
      }
      if (a.price < b.price) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
  };

  public sortItemsPriceDown = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.price < b.price) {
        return 1;
      }
      if (a.price > b.price) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
  };

  private generateProducts(data: Array<SET>) {
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(data) as HTMLElement;

    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
  }
  public sortItemsStockUp = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.stock > b.stock) {
        return 1;
      }
      if (a.stock < b.stock) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
  };
  public sortItemsStockDown = () => {
    this.currentData.sort((a: SET, b: SET) => {
      if (a.stock < b.stock) {
        return 1;
      }
      if (a.stock > b.stock) {
        return -1;
      }
      return 0;
    });
    this.generateProducts(this.currentData);
  };

  public cardsShowRow() {
    const container = document.querySelector(".items__cards");

    if (container) {
      if (!container.classList.contains("row")) {
        container.classList.remove("column");
        container.classList.add("row");
        this.buttonItemsColumn.classList.remove("active");
        this.buttonItemsRow.classList.add("active");
      }
    }
  }
  public cardsShowColumn = () => {
    const container = document.querySelector(".items__cards");

    if (container) {
      if (!container.classList.contains("column")) {
        container.classList.add("column");
        container.classList.remove("row");
        this.buttonItemsRow.classList.remove("active");
        this.buttonItemsColumn.classList.add("active");
      }
    }
  };

  render() {
    const title = this.createTitle(MainPage.TextObject.mainTitle);
    const mainItems = document.createElement("section") as HTMLElement;
    const sorts = this.createSorts() as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

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
