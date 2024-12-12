const addToCartBtn = document.querySelector("#add-to-cart");

function setCartItems(items) {
  localStorage.setItem("cart", JSON.stringify(items));
}
addToCartBtn.addEventListener("click", () => {
  let cartItems = getCartItems() || [];

  let cartItem = cartItems.find((item) => item.id === addToCartBtn.dataset.id);

  if (cartItem) {
    cartItems = cartItems.map((item) => {
      if (item.id === addToCartBtn.dataset.id) {
        item.quantity += 1;
        item.price = parseInt(item.price) * item.quantity;
        return item;
      }
      return item;
    });

    setCartItems(cartItems);
  } else {
    cartItems.push({
      id: addToCartBtn.dataset.id,
      name: addToCartBtn.dataset.name,
      price: addToCartBtn.dataset.price,
      image: addToCartBtn.dataset.image,
      badge: addToCartBtn.dataset.badge,
      category: addToCartBtn.dataset.category,
      description: addToCartBtn.dataset.description,
      quantity: 1,
    });

    setCartItems(cartItems);
  }

  calculateNumberOfItems();
});
