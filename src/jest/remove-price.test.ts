const removePrice = require("./remove-price.ts");

describe("Проверяем уменьшение количества товаров в корзине", () => {
  const numbers = [
    {
      input: 5,
      expect: 5,
    },
    {
      input: 0,
      expect: 10,
    },
    {
      input: 10,
      expect: 0,
    },
    {
      input: NaN,
      expect: NaN,
    },
    {
      input: 3,
      expect: 7,
    },
  ];
  numbers.forEach((el) => {
    it(`При значении ${el.input}, ожидаю получить: ${el.expect}`, () => {
      const res = removePrice(el.input);
      expect(res).toBe(el.expect);
    });
  });
});
