import { Page } from "../core/templates/page";
import { DATA } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
import { StorageProducts } from "../modules/data";
export class Basket extends Page {
  productsContainer: HTMLElement;
  static TextObject = {
    mainTitle: "Basket",
    total: "Cart total",
  };
  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.productsContainer = document.createElement("div");
    this.productsContainer.classList.add("items__cards", "row");
  }
  // handlerClear() {
  //   ROOT_SHOPPING.innerHTML = "";
  // }

  renderProducts() {
    const productsStore = localStorageUtil
      .getProducts()
      .map((x: StorageProducts) => x.id);
    console.log(productsStore);

    let htmlCatalog = "";
    let sumCatalog = 0;

    DATA.forEach(({ id, title, price }) => {
      if (productsStore.indexOf(id) !== -1) {
        htmlCatalog += `
                <tr>
                    <td class="shopping-element__name">⚡️ ${title}</td>
                    <td class="shopping-element__price">${price.toLocaleString()} USD</td>
                </tr>
            `;
        sumCatalog += price;
      }
    });

    const html = `
        <div class="shopping-container">
            <div class="shopping__close" onclick="shoppingPage.handlerClear();"></div>
            <table>
                ${htmlCatalog}
                <tr>
                    <td class="shopping-element__name">💥 Сумма:</td>
                    <td class="shopping-element__price">${sumCatalog.toLocaleString()} USD</td>
                </tr>
            </table>
        </div>
    `;
    this.productsContainer.innerHTML = "";
    this.productsContainer.innerHTML = html;
    return this.productsContainer;

    // ROOT_SHOPPING.innerHTML = html;

    // // this.itemsContainer.innerHTML = html;
    // return ROOT_SHOPPING;
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
