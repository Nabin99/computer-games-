document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/games"; // Update with your API base URL

  // DOM Elements
  const heroImage = document.querySelector(".hero-image img");
  const heroContainer = document.querySelector(".hero-image");
  const heroTitle = document.querySelector(
    ".hero-image-overflow > div:nth-child(2)"
  );
  const heroDescription = document.querySelector(
    ".hero-image-overflow > div:nth-child(3)"
  );
  const heroPrice = document.querySelector(
    ".hero-image-overflow > div:nth-child(4)"
  );
  const heroList = document.querySelector(".hero-list");
  const categoryContainer = document.querySelector(".category-container");
  const gamesOnSaleContainer = document.querySelector(".listing-container");

  // Fetch data from API
  const fetchData = async (endpoint) => {
    try {
      const response = await fetch(`${API_URL}/${endpoint}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  // Populate Hero Section
  const populateHeroSection = (game) => {
    if (!game) return;
    heroImage.src = game.image;
    heroTitle.textContent = game.name;
    heroDescription.textContent = game.description;
    heroPrice.textContent = `Starting at ${game.price}`;
    heroContainer.addEventListener("click", () =>
      window.location.assign(`http://localhost:3000/pages/product/${game.id}`)
    );
  };

  // Populate Hero List
  const populateHeroList = (games) => {
    heroList.innerHTML = ""; // Clear previous content
    games.forEach((game) => {
      const heroItem = document.createElement("div");
      heroItem.className = "hero-item";
      heroItem.addEventListener("click", () => {
        window.location.assign(
          `http://localhost:3000/pages/product/${game.id}`
        );
      });
      heroItem.innerHTML = `
          <img src="${game.image}" alt="${game.name}">
          ${game.name}
        `;
      heroList.appendChild(heroItem);
    });
  };

  // Populate Categories
  const populateCategories = (categories) => {
    categoryContainer.innerHTML = ""; // Clear previous content
    categories.forEach((category) => {
      const categoryCard = document.createElement("a");
      categoryCard.className = "category-card";
      categoryCard.href = "/pages/browse-products.html";
      categoryCard.innerHTML = `
          <img src="${category.image}" alt="${category.name}">
          <span class="category-name">${category.name}</span>
        `;
      categoryContainer.appendChild(categoryCard);
    });
  };

  // Populate Games on Sale
  const populateGamesOnSale = (games) => {
    gamesOnSaleContainer.innerHTML = ""; // Clear previous content
    games.forEach((game) => {
      const productCard = document.createElement("a");
      productCard.className = "product-card";
      productCard.href = `/pages/product/${game.id}`;
      productCard.innerHTML = `
          <div class="product-card-image">
            <div class="product-card-overlay"><i class="fas fa-plus-circle"></i></div>
            <img src="${game.image}" alt="${game.name}">
          </div>
          <div class="product-card-main">
            <div class="product-card-title">${game.name}</div>
            <p>
              <div class="badge discound-badge">-${(
                (game.price / game.originalPrice) *
                100
              ).toFixed(2)}%</div>
              <span class="mrp-price">$${game.originalPrice}</span>
              <span class="current-price">$${game.price}</span>
            </p>
          </div>
        `;
      gamesOnSaleContainer.appendChild(productCard);
    });
  };

  // Load and Populate Data
  const initializePage = async () => {
    const heroGame = await fetchData("featured/hero"); // Fetch hero game
    const featuredGames = await fetchData("featured"); // Fetch featured games
    const categories = await fetchData("categories"); // Fetch categories
    const gamesOnSale = await fetchData("games-on-sale"); // Fetch games on sale

    populateHeroSection(heroGame);
    populateHeroList(featuredGames);
    populateCategories(categories);
    populateGamesOnSale(gamesOnSale);
  };

  initializePage();
});
