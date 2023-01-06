import { Page } from "../core/templates/page";
import { DATA, StorageProducts } from "../modules/data";
import { localStorageUtil } from "../modules/localStorage";
// import { header } from "./header";

export class Product extends Page {
  static TextObject = {
    mainTitle: "Product",
    total: "Product total",
    addToCard: "Add to card",
    buyNow: "BUY NOW",
    dropFromCard: "Drop from card",
  };

  productContainer: HTMLElement;
  productLine: HTMLElement;
  productDetail: HTMLElement;
  productTitle: HTMLElement;
  productData: HTMLElement;
  productPhotos: HTMLElement;
  productInfo: HTMLElement;
  addToCart: HTMLElement;
  productSlides: HTMLElement;
  productBigPhoto: HTMLElement;

  constructor(el: string, id: string, nameClass: string) {
    super(el, id, nameClass);
    this.productContainer = document.createElement("div");
    this.productContainer.classList.add("product__container", "colomn");

    this.productLine = document.createElement("div");
    this.productLine.classList.add("product__line");

    this.productDetail = document.createElement("div");
    this.productDetail.classList.add("product__detail");

    this.productContainer.append(this.productLine, this.productDetail);

    this.productTitle = document.createElement("div");
    this.productTitle.classList.add("product__title");

    this.productData = document.createElement("div");
    this.productData.classList.add("product__data");

    this.productDetail.append(this.productTitle, this.productData);

    this.productPhotos = document.createElement("div");
    this.productPhotos.classList.add("product__photos");

    this.productInfo = document.createElement("div");
    this.productInfo.classList.add("product__info");

    this.addToCart = document.createElement("div");
    this.addToCart.classList.add("add-to-cart");

    this.productData.append(
      this.productPhotos,
      this.productInfo,
      this.addToCart
    );
    this.productSlides = document.createElement("div");
    this.productSlides.classList.add("product__slides");

    this.productBigPhoto = document.createElement("div");
    this.productBigPhoto.classList.add("product__big-photo");

    this.productPhotos.append(this.productSlides, this.productBigPhoto);
  }
  getProduct(idi: number) {
    const id = idi - 1;
    const H3 = [
      "Description",
      "Discount Percentage:",
      "Rating:",
      "Stock:",
      "Brand:",
      "Category:",
    ];
    const P = [
      DATA[id].description,
      DATA[id].discountPercentage,
      DATA[id].rating,
      DATA[id].stock,
      DATA[id].brand,
      DATA[id].category,
    ];

    const linkStore1 = document.createElement("a");
    linkStore1.setAttribute("href", "#main-container");
    linkStore1.textContent = "STORE";
    this.productLine.append(linkStore1);
    const textStore1 = document.createElement("p");
    textStore1.textContent = " >> ";
    this.productLine.append(textStore1);
    const linkStore2 = document.createElement("a");
    linkStore2.setAttribute("href", "#");
    linkStore2.textContent = `${DATA[id].category.toUpperCase()}`;
    this.productLine.append(linkStore2);
    const textStore2 = document.createElement("p");
    textStore2.textContent = " >> ";
    this.productLine.append(textStore2);
    const linkStore3 = document.createElement("a");
    linkStore3.setAttribute("href", "#");
    linkStore3.textContent = `${DATA[id].brand.toUpperCase()}`;
    this.productLine.append(linkStore3);
    const textStore3 = document.createElement("p");
    textStore3.textContent = " >> ";
    this.productLine.append(textStore3);
    const linkStore4 = document.createElement("a");
    linkStore4.setAttribute("href", "#");
    linkStore4.textContent = `${DATA[id].title.toUpperCase()}`;
    this.productLine.append(linkStore4);

    this.productTitle.textContent = `${DATA[id].title.toUpperCase()}`;

    for (let i = 0; i < DATA[id].images.length; i++) {
      const productSlidesPhoto = document.createElement("img");
      productSlidesPhoto.setAttribute("src", `${DATA[id].images[i]}`);
      this.productSlides.append(productSlidesPhoto);
    }

    const productBigPhoto = document.createElement("img");
    productBigPhoto.setAttribute("src", `${DATA[id].thumbnail}`);
    this.productBigPhoto.append(productBigPhoto);

    for (let i = 0; i < H3.length; i++) {
      const productDetailItem = document.createElement("div");
      productDetailItem.classList.add("product__detail-item");

      const productDetailH3 = document.createElement("h3");
      productDetailH3.textContent = `${H3[i]}`;

      const productDetailP = document.createElement("p");
      productDetailP.textContent = `${P[i]}`;

      productDetailItem.append(productDetailH3, productDetailP);
      this.productInfo.append(productDetailItem);
    }

    const productPrice = document.createElement("p");
    productPrice.classList.add("product__price");
    productPrice.textContent = "€" + DATA[id].price;

    const productBasket = document.createElement("button");

    productBasket.classList.add(`card__btn`);

    const productsStore = localStorageUtil
      .getProducts()
      .map((x: StorageProducts) => x.id);

    let activeClass = "";
    let activeText = "";

    if (productsStore.indexOf(id + 1) === -1) {
      activeText = Product.TextObject.addToCard;
    } else {
      activeText = Product.TextObject.dropFromCard;
      activeClass = "active-btn";
      productBasket.classList.add(`${activeClass}`);
    }

    productBasket.setAttribute("data-id", `${DATA[id].id}`);
    productBasket.setAttribute("data-price", `${DATA[id].price}`);
    productBasket.textContent = activeText;

    const productBuy = document.createElement("button");
    productBuy.classList.add(`card__btnB`);
    productBuy.textContent = Product.TextObject.buyNow;

    this.addToCart.append(productPrice, productBasket, productBuy);
  }
  render() {
    // const title = this.createTitle(Product.TextObject.mainTitle);
    this.container.append(this.productContainer);
    const id = 4;
    this.getProduct(id);
    return this.container;
  }
}

export const PRODUCT = new Product("div", "products", "products");

// window.onload = function () {
//   (document.getElementById("products") as HTMLElement).onclick = function (
//     event: Event
//   ) {
//     console.log("1");
//     const target = event.target as HTMLElement;
//     const id = target.getAttribute("data-id");
//     const price = target.getAttribute("data-price");

//     if (id && price) {
//       if (target.classList.contains("card__btn")) {
//         const { pushProduct } = localStorageUtil.putProducts(+id, +price);

//         if (pushProduct) {
//           target.classList.add("active-btn");
//           target.innerHTML = Product.TextObject.dropFromCard;

//           header.addProduct(+price);
//         } else {
//           target.classList.remove("active-btn");
//           target.innerHTML = Product.TextObject.addToCard;
//           header.removeProduct(+price);
//         }
//       }
//     }
//   };
// };
