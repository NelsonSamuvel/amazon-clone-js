  import { Cart } from "../../data/cart-class.js";
  
  import { products } from "../../data/products.js";
  import { formatCurrency } from "../utils/money.js";
  import { formatDate } from "../utils/dates.js";
  import { deliveryOptions } from "../../data/deliveryOptions.js";
  import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
  import { renderPaymentSummary } from "./paymentSummary.js";
  import { displayCheckoutQuantity } from "./checkoutHeader.js";
  
  

  

  
 export function renderOrderSummary(){

  const cart= new Cart('cart');
    
    displayCheckoutQuantity();
  
  const cartItemContainer = document.querySelector(".order-summary");
  
  let cartHtml = "";
  cart.cartItems.forEach((cartItem) => {
    const { productId, quantity } = cartItem;
    const findProduct = products.find((product) => product.id === productId);
  
    const foundDelivery = deliveryOptions.find(option => option.id === cartItem.deliveryId);
   
  
    if (findProduct) {
      cartHtml += `<div class="cart-item-container js-cart-container js-cart-container-${productId}">
              
              <div class="delivery-date js-delivery-date-${productId}">
               Delivery Date : ${formatDate(foundDelivery.deliveryTime)}
              </div>
  
              <div class="cart-item-details-grid">
                <img class="product-image"
                  src="${findProduct.image}">
  
                <div class="cart-item-details js-product-${productId}">
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
                    <span class="update-quantity-link link-primary js-update-btn" data-product-id ="${productId}">
                      Update
                    </span>
                    <span class="delete-quantity-link js-delete-${productId} link-primary js-delete-btn" data-product-id = "${productId}">
                      Delete
                    </span>
                  </div>
                </div>
  
                <div class="delivery-options js-delivery-${productId}">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  ${deliveryOptionsHtml(productId,cartItem)}                
                </div>
              </div>
            </div>`;
    }
  });
  
  
  cartItemContainer.innerHTML = cartHtml;
  
  
  function deliveryOptionsHtml(productId,cartItem){
    let deliveryHtml = '';
    let deliveryDate = '';
  
    deliveryOptions.forEach(option => {
      let priceString = option.priceCents;
      if(priceString === 0){
          priceString = 'FREE'
      }
      else{
        priceString ='$' + String(formatCurrency(priceString))
      }
  
      let isChecked = option.id === cartItem.deliveryId;
  
      
      
  
      deliveryHtml += `<div class="delivery-option js-delivery-option" data-product-id = "${productId}" data-delivery-id = "${option.id}">
                    <input type="radio"
                      ${isChecked ? 'checked': ''}
                      class="delivery-option-input"
                      name="delivery-option-${productId}">
                    <div>
                      <div class="delivery-option-date">
                        ${formatDate(option.deliveryTime)}
                      </div>
                      <div class="delivery-option-price">
                        ${priceString} - Shipping
                      </div>
                    </div>
                  </div>`
    })
    return deliveryHtml;
  
  }
  
  
  
  
  

  
  //adding update btn event listener for the initial cart page loaded
  displayUpdate();
  function displayUpdate() {
    document.querySelectorAll(".js-update-btn").forEach((updateBtn) => {
      updateBtn.addEventListener("click", () => {
        const { productId } = updateBtn.dataset;
        const quantityHtml = `Quantity : 
                <input type="text" name="quantity" class="input-quantity js-quantity-input-${productId}">
                 <span class="update-quantity-link link-primary js-save-${productId}" data-product-id ="${productId}">
                        Save
                    </span>
                      <span class="delete-quantity-link js-delete-${productId} link-primary js-delete-btn" data-product-id = "${productId}">
                        Delete
                      </span>
                `;
        document.querySelector(`.js-quantity-${productId}`).innerHTML =
          quantityHtml;
        updateQuantity(productId);
      });
    });
  }
  
  //adding a delete btn event listener for initial cart page loaded
  deleteCartItem();
  
  function deleteCartItem() {
    document.querySelectorAll(".js-delete-btn").forEach((deleteBtn) => {
      deleteBtn.addEventListener("click", () => {
        const { productId } = deleteBtn.dataset;
        cart.removeCartItem(productId);
        renderOrderSummary();
        document.querySelector(".return-to-home-link").innerHTML =
        cart.displayCartCount() + " items";
        cart.saveToStorage();
        renderPaymentSummary();
      });
    });
  }
  
  function updateQuantity(productId) {
    const quantitySaveBtn = document.querySelector(`.js-save-${productId}`);
    quantitySaveBtn.addEventListener("click", () => {
      const newQuantity = Number(
        document.querySelector(`.js-quantity-input-${productId}`).value
      );
      if (newQuantity <= 0 || newQuantity > 100) {
        return;
      }
      cart.cartItems.forEach((cartItem) => {
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
                    <span class="delete-quantity-link link-primary js-delete-btn js-delete-${productId}" data-product-id = "${productId}">
                      Delete
                    </span>`;
      cart.saveToStorage();
  
      document.querySelector(".return-to-home-link").innerHTML =
        cart.displayCartCount() + " items";

        renderPaymentSummary();
  
      //after changing the dom of update and delete btn then again add the event listener to the two buttons
      displayUpdate();
      deleteCartItem();
    });
  }
  document.querySelectorAll('.js-delivery-option').forEach(btn => {
    btn.addEventListener('click',()=>{
  
      const {productId,deliveryId} = btn.dataset;
      cart.updateDeliveryOptions(productId,deliveryId);
      renderOrderSummary();
      renderPaymentSummary();
    })
  })
  
  }
  
  
  
  
  
  