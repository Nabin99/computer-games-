// cart.js

// Utility Functions
function getCartItems() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

function setCartItems(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}

function calculateSubtotal(cartItems) {
  console.log(cartItems);
  return cartItems?.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
}

function applyCoupon(subtotal, couponCode) {
  const coupons = {
    DISCOUNT10: 0.1,
    SAVE20: 0.2,
  };

  return coupons[couponCode] ? subtotal * (1 - coupons[couponCode]) : subtotal;
}

// Render Cart
function renderCart() {
  const cartItems = getCartItems();
  const cartContainer = document.querySelector(".cart-page-details");
  const subtotalSpan = document.querySelector(
    ".cart-page-card-detail.border-top span:last-child"
  );
  const priceSpan = document.querySelector(
    ".cart-page-card-detail:nth-child(2) span:last-child"
  );
  const discountSpan = document.querySelector(
    ".cart-page-card-detail:nth-child(3) span:last-child"
  );

  cartContainer && (cartContainer.innerHTML = ""); // Clear previous items

  if (cartItems.length === 0) {
    cartContainer && (cartContainer.innerHTML = `<p>Your cart is empty!</p>`);
    subtotalSpan.textContent = "$0.00";
    priceSpan && (priceSpan.textContent = "$0.00");
    discountSpan && (discountSpan.textContent = "$0.00");
    return;
  }

  let subtotal = calculateSubtotal(cartItems);
  priceSpan && (priceSpan.textContent = `$${subtotal.toFixed(2)}`);

  cartItems.forEach((item, index) => {
    const cartItemHTML = `
        <div class="cart-card">
          <img src="${item.image}" alt="${item.name}" />
          <div class="d-flex flex-column justify-between flex-grow">
            <div class="d-flex justify-between">
              <div class="d-flex gap-xxxs flex-column">
                <div class="badge">${item.badge}</div>
                <div class="product-name">${item.name}</div>
              </div>
  
              <div class="d-flex gap-xxxs flex-column">
                <div class="d-flex items-center justify-between gap-sm">
                  <span class="current-price">$${item.price}</span>
                </div>
              </div>
            </div>
  
            <div class="d-flex justify-between">
              <span>Quantity: ${item.quantity}</span>
              <div class="d-flex items-center gap-sm">
                <button class="btn btn-xs btn-outlined text-light" onclick="removeCartItem(${index})">Remove</button>
              </div>
            </div>
          </div>
        </div>
      `;
    cartContainer &&
      cartContainer.insertAdjacentHTML("beforeend", cartItemHTML);
  });

  subtotalSpan && (subtotalSpan.textContent = `$${subtotal.toFixed(2)}`);
}

// Add Item to Cart
function addToCart(item) {
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex(
    (cartItem) => cartItem.id === item.id
  );

  if (existingItemIndex > -1) {
    cartItems[existingItemIndex].quantity += 1;
  } else {
    cartItems.push({ ...item, quantity: 1 });
  }

  setCartItems(cartItems);
  alert("Item added to cart!");
}

// Remove Item from Cart
function removeCartItem(index) {
  const cartItems = getCartItems();
  cartItems.splice(index, 1);
  setCartItems(cartItems);
  renderCart();
  calculateNumberOfItems();
}

// Apply Coupon
function addCoupon() {
  const couponInput = document.querySelector(".coupon-input");
  const couponCode = couponInput.value.trim();
  const subtotalSpan = document.querySelector(
    ".cart-page-card-detail.border-top span:last-child"
  );
  const discountSpan = document.querySelector(
    ".cart-page-card-detail:nth-child(3) span:last-child"
  );

  const cartItems = getCartItems();
  let subtotal = calculateSubtotal(cartItems);

  const discountedTotal = applyCoupon(subtotal, couponCode);

  if (discountedTotal !== subtotal) {
    const discountAmount = subtotal - discountedTotal;
    discountSpan.textContent = `-$${discountAmount.toFixed(2)}`;
    subtotalSpan &&
      (subtotalSpan.textContent = `$${discountedTotal.toFixed(2)}`);
    alert("Coupon applied successfully!");
  } else {
    alert("Invalid coupon code!");
  }
}

// Empty Cart
function emptyCart() {
  localStorage.removeItem("cart");
  renderCart();
  calculateNumberOfItems();
}

// On Page Load
document.addEventListener("DOMContentLoaded", () => {
  renderCart();

  // Add Coupon Button
  const addCouponButton = document.querySelector(".add-coupon");
  addCouponButton &&
    addCouponButton.addEventListener("click", (e) => {
      e.preventDefault();
      addCoupon();
    });
});
