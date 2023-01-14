export function summaryHTML(products: number, price: number) {
  return `
  <div class="summary">
      <h3 class="summary__title">SUMMARY</h3>
      <p class="summary__products">Products in cart: ${products} </p>
      <p class="summary__price">Price: ${price} $</p>
      <p class="summary__price-promo hidden"></p>
      <input type="text" placeholder="Enter promo code"
      class="summary__input">
      <div class="summary__sh hidden">
        <p class="summary__sh-promo">Promo 'sh' - 5% </p>
        <button  class="button button-sh">ADD</button>
      </div>
      <div class="summary__win hidden">
      <p class="summary__win-promo">Promo 'win' - 15% </p>
      <button  class="button button-win">ADD</button>
    </div>
      <p class="summary__promo">Promo for test: 'sh', 'win'</p>
      <button class="button summary__button">BUY</button>
  </div>
  `;
}
