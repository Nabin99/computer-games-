const user = localStorage.getItem("user");

if (!user) {
  window.location.href = "/pages/sign-in.html";
}

const navRight = document.querySelector(".nav-right");
navRight.innerHTML = user
  ? `
  <a href="/pages/cart.html" class="nav-item">
    <i class="fas fa-shopping-cart number-of-item"></i>
  </a>
  <a href="/pages/profile.html" class="nav-item">
    <i class="fas fa-user"></i>
  </a>
  <a href="#" class="nav-item logout-button"><i class="fas fa-sign-out-alt mr-xxxs"></i></a>
`
  : `<a href="/pages/sign-in.html" class="nav-item"><i class="fas fa-user mr-xxxs"></i>Sign In</a>
<a href="/pages/sign-up.html" class="nav-item"><i class="mr-xxxs"></i>Sign Up</a>`;

const logoutButton = document.querySelector(".logout-button");
logoutButton &&
  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("user");
    window.location.href = "/pages/sign-in.html";
  });

const calculateNumberOfItems = (reset) => {
  const numberOfCartItems = (() => {
    if (reset) {
      return 0;
    }

    const cart = JSON.parse(localStorage.getItem("cart"));
    let total = 0;
    if (cart) {
      cart.forEach((item) => {
        total += item.quantity;
      });
    }
    return total;
  })();

  const numberOfItem = document.querySelectorAll(".number-of-item");
  numberOfItem.forEach((item) => (item.textContent = numberOfCartItems));
};

calculateNumberOfItems();
