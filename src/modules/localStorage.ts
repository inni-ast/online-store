class LocalStorageUtil {
  keyName: string;

  constructor() {
    this.keyName = "products"; // это будет id товара
  }
  getProducts() {
    const productsLocalStorage = localStorage.getItem(this.keyName);
    if (productsLocalStorage !== null) {
      return JSON.parse(productsLocalStorage);
    }
    return [];
  }
  putProducts(id: number) {
    const products = this.getProducts();
    let pushProduct = false;
    const index = products.indexOf(id);

    if (index === -1) {
      products.push(id);
      pushProduct = true;
    } else {
      pushProduct = false;
      products.splice(index, 1);
    }

    localStorage.setItem(this.keyName, JSON.stringify(products));
    return {
      pushProduct,
      products,
    };
  }
}
export const localStorageUtil = new LocalStorageUtil();
