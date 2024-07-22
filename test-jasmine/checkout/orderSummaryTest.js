import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {Cart } from "../../data/cart-class.js";
import { fetchProducts } from "../../data/products.js";

describe("Test suite : renderOrderSummary", () => {
  let productId1 = "83d4ca15-0f35-48f5-b7a3-1ea210004f2e";
  let productId2 = "54e0eccd-8f36-462b-b68a-8182611d9add";

  let cart;

  beforeAll(async()=>{
   await fetchProducts()
  })

  beforeEach(() => {

   cart = new Cart('cart-class');

    document.querySelector(
      ".js-test-container"
    ).innerHTML = `<div class ="return-to-home-link"></div> <div class="order-summary"></div>
                        <div class = "js-payment-summary"></div>
          `;

    spyOn(localStorage, "setItem");

    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 1,
          deliveryId: "1",
        },
        {
          productId: productId2,
          quantity: 2,
          deliveryId: "2",
        },
      ]);
    });

    cart.loadFromStorage();

    renderOrderSummary();
  });

  it("render cart page", () => {
    expect(document.querySelectorAll(".js-cart-container").length).toEqual(2);

    expect(
      document.querySelector(`.js-quantity-${productId1}`).innerText
    ).toContain("Quantity: 1");

    expect(document.querySelector(`.js-product-${productId1}`).innerText).toContain("Adults Plain Cotton T-Shirt - 2 Pack");
    expect(document.querySelector(`.js-product-${productId1}`).innerText).toContain("$7.99");
    

    expect(
      document.querySelector(`.js-quantity-${productId2}`).innerText
    ).toContain("Quantity: 2");

  });

  it("remove from cart", () => {
    document.querySelector(`.js-delete-${productId1}`).click();

    

    expect(document.querySelectorAll(".js-cart-container").length).toEqual(2);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify([{
        productId: productId2,
        quantity: 2,
        deliveryId: "2",
      }]));

   
    expect(
      document.querySelector(`.js-cart-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.cartItems.length).toEqual(2);

    expect(cart.cartItems[0].productId).toEqual(productId1);

    
  });


  afterEach(()=>{
    document.querySelector(".js-test-container").innerHTML = ``;
  })

});
