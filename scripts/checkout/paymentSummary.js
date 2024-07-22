import { Cart} from "../../data/cart-class.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary(){

  const cart = new Cart('cart');

    let productsPrice = 0;
    let deliveryPrice = 0;


    cart.cartItems.forEach(item => {
        const foundProduct = products.find(product => product.id === item.productId);
        const foundDelivery =  deliveryOptions.find(delivery => delivery.id === item.deliveryId);
        deliveryPrice += foundDelivery.priceCents;
        productsPrice += foundProduct.priceCents * item.quantity;
    })

    const totalBeforeTax = productsPrice + deliveryPrice;

    const tax = totalBeforeTax * 0.1;

    const totalCents = totalBeforeTax + tax;


    let orderHtml = `<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cart.displayCartCount()}):</div>
            <div class="payment-summary-money">$${formatCurrency(productsPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(deliveryPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(tax)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary js-order-btn">
            Place your order
          </button>`

        document.querySelector('.js-payment-summary').innerHTML = orderHtml;



        document.querySelector('.js-order-btn')
          .addEventListener('click',async()=>{
           try{
            const response = await fetch("https://supersimplebackend.dev/orders",{
              method : 'POST',
              headers : {'Content-Type': 'application/json'},
              body : JSON.stringify({
                cart : cart.cartItems
              })
            });

            const order = await response.json();

            console.log(order);
            
            addOrder(order);

            window.location.href = 'orders.html';

           }
           catch(err){
            console.log("unexpected error");
           }

          
  
          })


}

