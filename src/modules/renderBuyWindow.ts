export function renderBuyWindowHTML() {
  return `
  <div class="form-buy_close"> X </div>
  <h4 class="form-buy__title"> Personal details</h4>

  <input type="text" id="buy-name" name="name" required
      placeholder="Name, Surname" class="form-buy__input"
      pattern="([a-zA-Zа-яА-Я]{3,})[ ]([a-zA-Zа-яА-Я]{3,})(([a-zA-Zа-яА-Я ]{0,}){0,})">
  <span class="name-error"></span>

  <input type="tel" id="buy-tel" name="tel" required
      placeholder="Phone number" class="form-buy__input"
      pattern="[+]([0-9]{9,})">
  <span class="tel-error"></span>

  <input type="text" id="buy-address" name="address" required
      placeholder="Your address" class="form-buy__input"
      pattern="([a-zA-Zа-яА-Я]{5,})[ ]([a-zA-Zа-яА-Я]{5,})[ ]([a-zA-Zа-яА-Я]{5,})(([a-zA-Zа-яА-Я ]{0,}){0,})">
  <span class="address-error"></span>

  <input type="email" id="buy-email" name="email" required
      placeholder="Your email" class="form-buy__input">
  <span class="email-error"></span>

  <div class="form-buy__card form-card">
      <h4 class="form-card__title"> Credit card details</h4>
        <div class="form-card__block">
          <div class="form-card__number">
              <div class="form-card__image">
                <img src="https://i.guim.co.uk/img/media/b73cc57cb1d46ae742efd06b6c58805e8600d482/16_0_2443_1466/master/2443.jpg?width=700&quality=85&auto=format&fit=max&s=fb1dca6cdd4589cd9ef2fc941935de71" class="form-card__img">
              </div>

          <input type="text" id="card-num" name="card-num" required
              placeholder="Card number" class="form-card__input-number"
              pattern="([0-9]{16})">
          <span class="card-num-error"></span>
          </div>

        <label class="form-card__label">
          VALID:
           <input type="text" id="card-valid" name="card-valid" required placeholder="Data" class="form-card__input-data"
           pattern="(0[1-9]|1[1-2])/[0-9]{2}">
        <span class="card-valid-error"></span>
        </label>

        <label class="form-card__label">
          CVV:
           <input type="text" id="card-cvv" name="card-cvv" required
           placeholder="CVV" class="form-card__input-cvv"
           pattern="([0-9]{3})">
       <span class="card-cvv-error"></span>
        </label>
       </div>
  </div>
<button type="submit" class="form-buy__btn">Submit</button>
`;
}
