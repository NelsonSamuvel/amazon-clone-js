import { cart,addToCart,displayCartCount } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


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
            $${formatCurrency(product.priceCents)}
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



const cartItems = displayCartCount();
    if(cartItems === 0){
      document.querySelector(".cart-quantity").innerHTML = '';
    }
    else{
      document.querySelector(".cart-quantity").innerHTML = cartItems;
    }





document.querySelectorAll(".js-add-cart-btn").forEach((button) => {
  button.addEventListener("click", () => {

    const {productId} = button.dataset;

    //add to cart button
      addToCart(productId);

    //added msg display
    displayAddedMsg(productId);

    //display cart count at right top

      document.querySelector(".cart-quantity").innerHTML = displayCartCount();
    
    
    

  });
});





let timeoutId = {};

function displayAddedMsg(productId){

  const productTimeout = timeoutId[productId];

  if(productTimeout){
    clearTimeout(productTimeout);
  }

  timeoutId[productId] = setTimeout(()=>{
    document.querySelector(`.js-add-cart-${productId}`).classList.remove('added-cart-msg');
  },2000);

  document.querySelector(`.js-add-cart-${productId}`).classList.add('added-cart-msg');
}


