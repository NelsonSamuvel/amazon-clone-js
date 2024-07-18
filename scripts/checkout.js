import { cart ,removeCartItem} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


const cartItemContainer = document.querySelector('.order-summary');

displayCartItems();


function displayCartItems(){
    let cartHtml = '';
cart.forEach(cartItem => {
    const {productId,quantity} = cartItem;
    const findProduct = products.find(product => product.id === productId);
    if(findProduct){
        cartHtml += `<div class="cart-item-container js-cart-container-${productId}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${findProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${findProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(findProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${productId}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options js-delivery-${productId}">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                    name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`
    }
})


cartItemContainer.innerHTML = cartHtml;
}




document.querySelectorAll('.js-delete-btn')
    .forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', ()=>{
            const {productId} = deleteBtn.dataset;
            removeCartItem(productId);
            document.querySelector(`.js-cart-container-${productId}`).remove();
        });

    })


