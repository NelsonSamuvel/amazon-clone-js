import { orders } from "../data/orders.js";
import { fetchProducts, products } from "../data/products.js";
// import { formatDate } from "./orders.js";
import { formatOrderDate } from "./utils/dates.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";


fetchProducts().then(renderTrackingPage)


function renderTrackingPage(){
    const url = new URL(window.location.href);
        const orderId = url.searchParams.get('orderId');
        const productId = url.searchParams.get('productId');



        const trackOrder = orders.find(order => order.id === orderId);


        const orderedProduct = trackOrder.products.find(product => productId === product.productId);



        const trackProduct = products.find(product => product.id === productId);

        const today = dayjs()
        const orderTime = dayjs(trackOrder.orderTime);
        const deliveryTime = dayjs(orderedProduct.estimatedDeliveryTime);

        
        const percentProgress = ((today - orderTime) / (deliveryTime - orderTime)) * 100;

        console.log(trackOrder);
        console.log(trackProduct);

        console.log(orderId); 
        console.log(productId);

        let trackHtml = '';

        trackHtml = `<a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${formatOrderDate(orderedProduct.estimatedDeliveryTime)}
        </div>

        <div class="product-info">
          ${trackProduct.name}
        </div>

        <div class="product-info">
          Quantity: ${orderedProduct.quantity}
        </div>

        <img class="product-image" src="${trackProduct.image}">

        <div class="progress-labels-container">
          <div class="progress-label ${ percentProgress < 50 ? 'current-status' : ''}">
            Preparing
          </div>
          <div class="progress-label current-status ${  percentProgress >= 50 && percentProgress < 100 ? 'current-status' : ''}">
            Shipped
          </div>
          <div class="progress-label ${percentProgress >= 100 ? "current-status" : ''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style = "width : ${percentProgress}%;"></div>
        </div>`

    document.querySelector('.order-tracking').innerHTML = trackHtml;
}


