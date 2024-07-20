import { cart ,displayCartCount} from "../../data/cart.js";
import { products } from "../../data/products.js";
import { deliveryOptions } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export function renderPaymentSummary(){

    let productsPrice = 0;
    let deliveryPrice = 0;


    cart.forEach(item => {
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
            <div>Items (${displayCartCount()}):</div>
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

          <button class="place-order-button button-primary">
            Place your order
          </button>`

        document.querySelector('.js-payment-summary').innerHTML = orderHtml;

}

