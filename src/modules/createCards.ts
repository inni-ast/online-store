import { SET, StorageProducts } from "./data";
import { localStorageUtil } from "./localStorage";
import { MainPage } from "../pages/main";

export function createCards(data: Array<SET>) {
  const productsStore = localStorageUtil
    .getFromLS("products")
    .map((x: StorageProducts) => x.id);

  let itemsHTML = "";
  data.forEach(({ id, thumbnail, title, brand, price, stock, category }) => {
    let activeClass = "";
    let activeText = "";

    if (productsStore.indexOf(id) === -1) {
      activeText = MainPage.TextObject.addToCard;
    } else {
      activeText = MainPage.TextObject.dropFromCard;
      activeClass = " active-btn";
    }

    itemsHTML += `
      <div class="cards__item card" href="#products/${id}">
      <div class="card__image">
        <img src=${thumbnail} alt="product image" class="card__img" loading="lazy">
      </div>
      <div class="card__about-act">
      <div class="card__about">
        <h3 class="card__title">${title}</h3>
        <p class="card__category">Category: ${category}</p>
        <p class="card__brand">Brand: ${brand}</p>
        <p class="card__price">Price: ${price.toLocaleString()} USD</p>
        <p class="card__stock">Stock: ${stock}</p>
      </div>
      <div class="card__act">
      <a href="#products"><button class="card__btn btn__product" data-id=${id}>Details</button></a>
        <button class="card__btn${activeClass}" data-price=${price} data-id=${id}>${activeText}</button>
      </div>
      </div>
    </div>
      `;
  });

  return itemsHTML;
}
