import { orders } from "../data/orders.js";
import { fetchProducts, products } from "../data/products.js";
// import { formatDate } from "./orders.js";
import { formatOrderDate } from "./utils/dates.js";


fetchProducts().then(renderTrackingPage)


function renderTrackingPage(){
    const url = new URL(window.location.href);
        const orderId = url.searchParams.get('orderId');
        const productId = url.searchParams.get('productId');



        const trackOrder = orders.find(order => order.id === orderId);


        const orderedProduct = trackOrder.products.find(product => productId === product.productId)



        const trackProduct = products.find(product => product.id === productId);

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
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>`

    document.querySelector('.order-tracking').innerHTML = trackHtml;
}


