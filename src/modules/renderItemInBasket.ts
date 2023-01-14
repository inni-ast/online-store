export function renderItem(
  num: number,
  thumbnail: string,
  title: string,
  description: string,
  category: string,
  brand: string,
  rating: number,
  discountPercentage: number,
  stock: number,
  id: number,
  count: number,
  p: number
) {
  return `
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
}
