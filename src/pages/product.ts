import { Page } from "../core/templates/page";
// import { DATA } from "../modules/data";

const H3 = [
  "Description",
  "Discount Percentage:",
  "Rating:",
  "Stock:",
  "Brand:",
  "Category:",
];
export class Product extends Page {
  static TextObject = {
    mainTitle: "Product",
    total: "Product total",
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
  // productDetailItem: HTMLElement;
  // productDetailH3: HTMLElement;
  // productDetailP: HTMLElement;

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
  getProduct(id: number) {
    for (let i = 0; i < 6; i++) {
      const productDetailItem = document.createElement("div");
      productDetailItem.classList.add("product__detail-item");

      const productDetailH3 = document.createElement("h3");
      productDetailH3.textContent = H3[id - 1];

      const productDetailP = document.createElement("p");
      // productDetailH3.textContent=DATA[id].H3[id-1];

      productDetailItem.append(productDetailH3, productDetailP);
      this.productInfo.append(productDetailItem);
    }
  }
  render() {
    // const title = this.createTitle(Product.TextObject.mainTitle);
    this.container.append(this.productContainer);
    return this.container;
  }
}
