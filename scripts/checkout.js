import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

// import '../data/cart-class.js'

// import "../data/backend-practice.js";

// Promise.all([
//   new Promise((resolve) => {
//     loadProducts(resolve);
//   }),
//   new Promise((resolve) => {
//     loadCart(resolve);
//   }),
// ]).then((values) => {
//     console.log(values);
//   renderOrderSummary();
//   renderPaymentSummary();
// });

// loadProducts(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })

fetchProducts().then(loadCart).then(()=>{
    renderOrderSummary();
    renderPaymentSummary();
})


// renderOrderSummary();
// renderPaymentSummary();