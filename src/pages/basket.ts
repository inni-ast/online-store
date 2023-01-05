import { Page } from "../core/templates/page";
import { DATA } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";
import { header } from "./header";
export class Basket extends Page {
  basketContainer: HTMLElement;
  allProductsPrice: number;
  static TextObject = {
    mainTitle: "Products In Cart",
    total: "Summary",
    stock: "Stock:",
    rating: "Rating:",
    discount: "Discount:",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.basketContainer = document.createElement("div");
    this.basketContainer.classList.add("basket__container");
    this.allProductsPrice = 0;
  }
  // очищает всю корзину
  // handlerClear() {
  //  this.basketContainer.innerHTML = "";
  // }
  getAllProductsPrice() {
    return this.allProductsPrice;
  }
  setAllProductsPrice(num: number) {
    this.allProductsPrice = num;
  }

  renderProducts() {
    const productsStore = localStorageUtil
      .getProducts()
      .map((x: StorageProducts) => x.id);

    let htmlCatalog = "";
    let sumCatalog = 0;
    let num = 1; // счетчик товаров по порядку
    let numInBasket = 0;

    DATA.forEach(
      ({
        id,
        title,
        category,
        price,
        thumbnail,
        stock,
        brand,
        rating,
        description,
        discountPercentage,
      }) => {
        if (productsStore.indexOf(id) !== -1) {
          let { count } = localStorageUtil
            .getProducts()
            .find((x: StorageProducts) => x.id === id);
          console.log(count);

          if (count > stock) {
            count = stock;
            localStorageUtil.putProductsToBasket(id, price, count);
          }

          const p = +count * +price;
          numInBasket += +count;
          htmlCatalog += `
                <div class="basket-item">
                      <div class="basket-item__num">${num}</div>
                      <div class="basket-item__image">
                        <img class="basket-item__img" src=${thumbnail} alt="image ${title}">
                      </div>
                      <div class="basket__about">
                          <p class="basket-item__title">${title}</p>
                          <p class="basket-item__desc">${description}</p>
                          <p class="basket-item__category">Category: ${category}</p>
                            <p class="basket-item__brand">Category: ${brand}</p>
                          <p class="basket-item__rating">Rating: ${rating} </p>
                          <p class="basket-item__percent">Discount:
                        ${discountPercentage} %</p>
                      </div>
                    <div class="basket-item__sale">
                      <div class="basket-item__stock">Stock: ${stock} </div>
                        <div class="basket-item__number" >
                          <button class="basket-item__plus" data-stock=${stock} data-prodId=${id}> +</button>
                            <p class="basket-item__count">${count}</p>
                              <button class="basket-item__minus" data-prodId=${id}> -</button>
                        </div>
                        <div class="basket-item__price">Price: ${p.toLocaleString()} USD</div>
                    </div>
                </div> `;
          sumCatalog += p;
          num++;
        }
      }
    );
    const html = `
        <div class="basket-items" >
            ${htmlCatalog}
      </div>
        `;
    // <p class="shopping-element__name" >Сумма: </p>
    // <p class="shopping-element__price"> ${sumCatalog.toLocaleString()} USD </p>
    this.basketContainer.innerHTML = "";
    this.basketContainer.innerHTML = html;
    this.setAllProductsPrice(sumCatalog);
    header.setPriceFromBasket(sumCatalog);
    header.setNumFromBasket(numInBasket);
    return this.basketContainer;

    // ROOT_SHOPPING.innerHTML = html;

    // // this.itemsContainer.innerHTML = html;
    // return ROOT_SHOPPING;
  }
  addProduct(id: number) {
    const product = localStorageUtil
      .getProducts()
      .find((el: StorageProducts) => el.id === id);
    product["count"]++;

    localStorageUtil.putProductsToBasket(
      product.id,
      product.price,
      product.count
    );

    BASKET.render();
  }
  removeProduct(id: number) {
    console.log(id);
    const product = localStorageUtil
      .getProducts()
      .find((el: StorageProducts) => el.id === id);

    product["count"]--;
    localStorageUtil.removeProductsFromBasket(
      product.id,
      product.price,
      product.count
    );

    BASKET.render();
  }

  render() {
    const products = this.renderProducts() as HTMLElement;
    this.container.append(products);

    return this.container;
  }
}
// renderSummary(){

// }
//   const productsStore = localStorageUtil.getProducts();
//   let htmlCatalog = '';
//   let sumCatalog = 0;

//   CATALOG.forEach(({ id, name, price }) => {
//       if (productsStore.indexOf(id) !== -1) {
//           htmlCatalog += `
//               <tr>
//                   <td class="shopping-element__name">⚡️ ${name}</td>
//                   <td class="shopping-element__price">${price.toLocaleString()} USD</td>
//               </tr>
//           `;
//           sumCatalog += price;
//       }
//   });

//   const html = `
//       <div class="shopping-container">
//           <div class="shopping__close" onclick="shoppingPage.handlerClear();"></div>
//           <table>
//               ${htmlCatalog}
//               <tr>
//                   <td class="shopping-element__name">💥 Сумма:</td>
//                   <td class="shopping-element__price">${sumCatalog.toLocaleString()} USD</td>
//               </tr>
//           </table>
//       </div>
//   `;

//   ROOT_SHOPPING.innerHTML = html;
// }

export const BASKET = new Basket("div", "basket", "basket");
console.log(BASKET.allProductsPrice);
