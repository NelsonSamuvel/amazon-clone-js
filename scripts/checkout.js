import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { fetchProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";




async function loadPage(){
    await fetchProducts();
    await loadCart();
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage()

// import '../data/cart-class.js'

// import "../data/backend-practice.js";

// async function allPromise(){
// await Promise.all([fetchProducts(),loadCart()])
// renderOrderSummary();
// renderPaymentSummary();
// }

// allPromise();
// loadProducts(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })

// fetchProducts().then(loadCart).then(()=>{
//     renderOrderSummary();
//     renderPaymentSummary();
// })


// renderOrderSummary();
// renderPaymentSummary();