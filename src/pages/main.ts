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
    btnItemsRow: "Items row",
    btnItemsColumn: "Items column",
    divFilterBrand: "Brand",
    divFilterCategory: "Category",
    inputFilterPrice: "Price",
    inputFilterStock: "Stock",
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
  filterCategory: HTMLElement;
  filterBrand: HTMLElement;
  filterPrice: HTMLElement;
  filterStock: HTMLElement;

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
    this.buttonItemsRow.classList.add("button__row", "button-vie");
    this.buttonItemsRow.textContent = MainPage.TextObject.btnItemsRow;

    this.buttonItemsColumn = document.createElement("button");
    this.buttonItemsColumn.id = "button-column";
    this.buttonItemsColumn.classList.add("button__column", "button-vie");
    this.buttonItemsColumn.textContent = MainPage.TextObject.btnItemsColumn;

    this.filterCategory = document.createElement("div");
    this.filterCategory.classList.add("filter__category", "filter");
    this.filterCategory.textContent = MainPage.TextObject.divFilterCategory;

    this.filterBrand = document.createElement("div");
    this.filterBrand.classList.add("filter__brand", "filter");
    this.filterBrand.textContent = MainPage.TextObject.divFilterBrand;

    this.filterPrice = document.createElement("input");
    this.filterPrice.setAttribute("type", "range");
    this.filterPrice.classList.add("filter__price", "filter-input");
    this.filterPrice.textContent = MainPage.TextObject.inputFilterPrice;

    this.filterStock = document.createElement("input");
    this.filterStock.setAttribute("type", "range");
    this.filterStock.classList.add("filter__stock", "filter-input");
    this.filterStock.textContent = MainPage.TextObject.inputFilterStock;

    this.buttonSortPriceUp.addEventListener("click", this.sortItemsPriceUp);
    this.buttonSortPriceDown.addEventListener("click", this.sortItemsPriceDown);

    this.buttonSortStockUp.addEventListener("click", this.sortItemsStockUp);
    this.buttonSortStockDown.addEventListener("click", this.sortItemsStockDown);

    this.buttonItemsColumn.addEventListener("click", MainPage.cardsShowColumn);
    this.buttonItemsRow.addEventListener("click", MainPage.cardsShowRow);
  }
  private createFilters() {
    const filtersHeader = document.createElement("div");
    filtersHeader.classList.add("items__filters");

    const setCategory = new Set();

    this.currentData.map((a: SET): void => {
      setCategory.add(a.category);
    });

    const filterCategoryBlock = document.createElement("div");
    filterCategoryBlock.classList.add("input-checkbox-block");

    setCategory.forEach((item) => {
      const filterCategoryItem = document.createElement("input");
      filterCategoryItem.setAttribute("type", "checkbox");
      filterCategoryItem.classList.add("input-checkbox");
      const filterCategoryText = document.createElement("lable");
      filterCategoryText.classList.add("input-checkbox-text");
      filterCategoryText.innerHTML = `${item}`;

      filterCategoryText.append(filterCategoryItem);

      filterCategoryBlock.append(filterCategoryText);
    });
    this.filterCategory.append(filterCategoryBlock);

    // this.currentData.map((a: SET): void => {
    //   setCategory.forEach((item) => {
    //     if (a.category===item){
    //     setCategoryCount.item=1;
    //     }
    //   });
    // });

    const setBrand = new Set();

    this.currentData.map((a: SET): void => {
      setBrand.add(a.brand);
    });

    const filterBrandBlock = document.createElement("div");
    filterBrandBlock.classList.add("input-checkbox-block");

    setBrand.forEach((item) => {
      const filterBrandItem = document.createElement("input");
      filterBrandItem.setAttribute("type", "checkbox");
      filterBrandItem.classList.add("input-checkbox");
      const filterBrandText = document.createElement("lable");
      filterBrandText.classList.add("input-checkbox-text");
      filterBrandText.innerHTML = `${item}`;

      filterBrandText.append(filterBrandItem);

      filterBrandBlock.append(filterBrandText);
    });
    this.filterBrand.append(filterBrandBlock);

    const filtersHeaderPrice = document.createElement("div");

    filtersHeaderPrice.classList.add("items__filters-input");

    const filtersHeaderStock = document.createElement("div");
    filtersHeaderStock.classList.add("items__filters-input");

    filtersHeaderPrice.append(this.filterPrice);
    filtersHeaderStock.append(this.filterStock);
    filtersHeader.append(
      this.filterCategory,
      this.filterBrand,
      filtersHeaderPrice,
      filtersHeaderStock
    );
    return filtersHeader;
  }
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

  private createCards(data: Array<SET>) {
    let itemsHTML = "";

    data.forEach(
      ({ thumbnail, title, category, brand, price, stock, rating }) => {
        itemsHTML += `
      <div class="cards__item card" data-price=${price} data-rating=${rating}>
      <div class="card__image">
        <img src=${thumbnail} alt="product image" class="card__img">
      </div>
      <div class="card__about-act">
      <div class="card__about">
        <h3 class="card__title">${title}</h3>
        <p class="card__category">Category: ${category}</p>
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
      }
    );
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
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
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
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
  };

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
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
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
    const mainItems = document.querySelector("section") as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.append(allCards);
    this.container.append(mainItems);
    return this.container;
  };

  static cardsShowRow() {
    const container = document.querySelector(".items__cards");

    if (container) {
      if (!container.classList.contains("row")) {
        container.classList.remove("column");
        container.classList.add("row");
      }
    }
  }
  static cardsShowColumn() {
    const container = document.querySelector(".items__cards");

    if (container) {
      if (!container.classList.contains("column")) {
        container.classList.add("column");
        container.classList.remove("row");
      }
    }
  }

  render() {
    // const title = this.createTitle(MainPage.TextObject.mainTitle);
    const mainItems = document.createElement("section") as HTMLElement;
    const filters = this.createFilters() as HTMLElement;
    const sorts = this.createSorts() as HTMLElement;
    const allCards = this.createCards(this.currentData) as HTMLElement;

    mainItems.classList.add("main__items");

    // this.container.append(title); // будет фильтры
    this.container.append(filters); // блок с фильтрами
    mainItems.append(sorts); // блок с сортировками
    mainItems.append(allCards); // все товары
    this.container.append(mainItems);
    return this.container;
  }
}

const P = new MainPage("div", "main-container", "main__container");
console.log(P);
