import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { fetchProducts, products } from "../data/products.js";
import { Cart } from "../data/cart-class.js";
import { formatOrderDate } from "./utils/dates.js";
import { loadCartFetch } from "../data/cart.js";


console.log(orders);


fetchProducts().then(renderOrderPage);


loadCartFetch();







function renderOrderPage(){

    const cart = new Cart('cart');

    let orderContainerHtml = '';

    document.querySelector('.cart-quantity').innerText  = cart.displayCartCount();

orders.forEach(order => {
    orderContainerHtml += `<div class="order-container">
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${formatOrderDate(order.orderTime)}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
            ${orderProductsDisplay(order)}
          </div>
        </div>`
})


document.querySelector('.orders-grid').innerHTML = orderContainerHtml;

document.querySelectorAll('.js-buy-btn').forEach(btn => {
    btn.addEventListener('click',()=>{
        const {productId} = btn.dataset;
        cart.addToCart(productId);
        renderOrderPage();
    })
})



 function orderProductsDisplay(order){


    let orderProductHtml = ''
    order.products.forEach(orderProduct=>{

        const product = products.find(product => product.id ===orderProduct.productId);



         orderProductHtml += `<div class="product-image-container">
              <img src="${product.image}">
            </div>

            <div class="product-details">
              <div class="product-name">
                ${product.name}
              </div>
              <div class="product-delivery-date">
                Arriving on: ${formatOrderDate(orderProduct.estimatedDeliveryTime)}
              </div>
              <div class="product-quantity">
                Quantity: ${orderProduct.quantity}
              </div>
              <button class="buy-again-button button-primary js-buy-btn" data-product-id = ${orderProduct.productId}>
                <img class="buy-again-icon" src="images/icons/buy-again.png">
                <span class="buy-again-message">Buy it again</span>
              </button>
            </div>

            <div class="product-actions">
              <a href="tracking.html?orderId=${order.id}&productId=${orderProduct.productId}">
                <button class="track-package-button button-secondary">
                  Track package
                </button>
              </a>
            </div>`

            
    })
    return orderProductHtml;
}



}




