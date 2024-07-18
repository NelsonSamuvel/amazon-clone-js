import { cart } from "../data/cart.js";

let productsHtml = "";
products.forEach((product) => {
  productsHtml += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image" src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${product.priceCents / 100}
          </div>

          <div class="product-quantity-container">
            <select class = "js-quantity-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="add-cart-msg js-add-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-cart-btn" data-product-id = "${
            product.id
          }">
            Add to Cart
          </button>
        </div>`;
});

document.querySelector(".js-products-grid").innerHTML = productsHtml;




let timeoutId = {};

document.querySelectorAll(".js-add-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {



    const {productId} = button.dataset;
    const quantity = Number(document.querySelector(`.js-quantity-${productId}`).value);
    let matchingItem;


    cart.forEach((item) => {
      if (item.productId === productId) {
        matchingItem = item;
      }
    });

    if (matchingItem) {
      matchingItem.quantity+= quantity;
    } else {
      cart.push({ productId, quantity });
    }

    const productTimeout = timeoutId[productId];

    if(productTimeout){
      console.log(timeoutId);
      clearTimeout(productTimeout);
    }

    timeoutId[productId] = setTimeout(()=>{
      document.querySelector(`.js-add-cart-${productId}`).classList.remove('added-cart-msg');
    },2000);

    document.querySelector(`.js-add-cart-${productId}`).classList.add('added-cart-msg');

    displayCartCount();

  });
});

function displayCartCount() {
  let cartItems = 0;
  cart.forEach((item) => {
    cartItems += item.quantity;
  });

  document.querySelector(".cart-quantity").innerHTML = cartItems;
}
