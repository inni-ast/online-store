export function removePrice(price: number) {
  let totalPrice = 10;
  totalPrice -= price;
  return totalPrice;
}

module.exports = removePrice;
