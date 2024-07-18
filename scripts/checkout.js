import {
  cart,
  removeCartItem,
  displayCartCount,
  saveToStorage,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";

const cartItemContainer = document.querySelector(".order-summary");

let cartHtml = "";
cart.forEach((cartItem) => {
  const { productId, quantity } = cartItem;
  const findProduct = products.find((product) => product.id === productId);
  if (findProduct) {
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
                <div class="product-quantity js-quantity-${productId}">
                  <span>
                    Quantity: <span class="quantity-label">${quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-btn " data-product-id ="${productId}">
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
          </div>`;
  }
});

cartItemContainer.innerHTML = cartHtml;

document.querySelector(".return-to-home-link").innerHTML =
  displayCartCount() + " items";

document.querySelectorAll(".js-update-btn").forEach((updateBtn) => {
  updateBtn.addEventListener("click", () => {
    const { productId } = updateBtn.dataset;
    const quantityHtml = `Quantity : 
            <input type="text" name="quantity" class="js-quantity-input-${productId}">
             <span class="update-quantity-link link-primary js-save-${productId}" data-product-id ="${productId}">
                    Save
                </span>
                  <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${productId}">
                    Delete
                  </span>
            `;
    document.querySelector(`.js-quantity-${productId}`).innerHTML =
      quantityHtml;
    updateQuantity(productId);
  });
});

function updateQuantity(productId) {
  const quantitySaveBtn = document.querySelector(`.js-save-${productId}`);
  quantitySaveBtn.addEventListener("click", () => {
    const newQuantity = Number(
      document.querySelector(`.js-quantity-input-${productId}`).value
    );
    if (newQuantity <= 0 || newQuantity > 100) {
      return;
    }
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    document.querySelector(`.js-quantity-${productId}`).innerHTML = `<span>
                    Quantity: <span class="quantity-label">${newQuantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-btn " data-product-id ="${productId}">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-delete-btn" data-product-id = "${productId}">
                    Delete
                  </span>`;
    saveToStorage();

    document.querySelector(".return-to-home-link").innerHTML =
      displayCartCount() + " items";
  });
}

document.querySelectorAll(".js-delete-btn").forEach((deleteBtn) => {
  deleteBtn.addEventListener("click", () => {
    const { productId } = deleteBtn.dataset;
    removeCartItem(productId);
    document.querySelector(`.js-cart-container-${productId}`).remove();
    document.querySelector(".return-to-home-link").innerHTML =
      displayCartCount() + " items";
  });
});
