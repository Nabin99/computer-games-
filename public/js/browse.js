document.addEventListener("DOMContentLoaded", () => {
  const API_URL = "http://localhost:3000/api/games";

  const listingContainer = document.getElementById("product-listing");
  const filterSection = document.getElementById("category-filter");
  const priceFilterSection = document.getElementById("price-filter");
  const platformFilterSection = document.getElementById("platform-filter");
  const pagination = document.getElementById("pagination");
  const searchInput = document.getElementById("search");
  const resetFilters = document.getElementById("reset");

  let items = []; // Array to store all fetched data
  let filteredItems = []; // Array to store filtered data
  let currentPage = 1;
  const itemsPerPage = 6;

  // Fetch Data from API/JSON
  async function fetchData() {
    try {
      const response = await fetch(API_URL); // Replace with your data source
      items = await response.json();
      filteredItems = items; // Initially, all items are displayed
      renderFilters();
      renderItems();
      renderPagination();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Render Filters
  async function renderFilters() {
    const response = await fetch(`${API_URL}/categories`);
    let categories = await response.json();
    let platforms = ["PC", "Mac"];
    let prices = [
      "$0 - $10",
      "$10 - $20",
      "$20 - $30",
      "$30 - $40",
      "$40 - $50",
      "$50 - above",
    ];

    priceFilterSection.innerHTML = prices
      ?.map(
        (price) =>
          `<li class="filter-item" data-property="price" data-value="${price}">${price}</li>`
      )
      .join("");

    platformFilterSection.innerHTML = platforms
      ?.map(
        (platform) =>
          `<li class="filter-item" data-property="platform" data-value="${platform}">${platform}</li>`
      )
      .join("");

    filterSection.innerHTML = categories
      ?.map(
        (category) =>
          `<li class="filter-item" data-property="category" data-value="${category.name}">${category.name}</li>`
      )
      .join("");
    document
      .querySelectorAll(".filter-item")
      .forEach((btn) =>
        btn.addEventListener("click", () =>
          applyFilter(btn.dataset.property, btn.dataset.value)
        )
      );
  }

  // Apply Filter
  function applyFilter(property, value) {
    if (property === "price") {
      filterPrice(value);
    } else {
      filteredItems = items.filter((item) => item[property].includes(value));
      currentPage = 1;
    }
    renderItems();
    renderPagination();
  }

  filterPrice = (priceRange) => {
    switch (priceRange) {
      case "$0 - $10":
        filteredItems = items.filter((item) => item.price <= 10);
        break;
      case "$10 - $20":
        filteredItems = items.filter(
          (item) => item.price > 10 && item.price <= 20
        );
        break;
      case "$20 - $30":
        filteredItems = items.filter(
          (item) => item.price > 20 && item.price <= 30
        );
        break;
      case "$30 - $40":
        filteredItems = items.filter(
          (item) => item.price > 30 && item.price <= 40
        );
        break;
      case "$40 - $50":
        filteredItems = items.filter(
          (item) => item.price > 40 && item.price <= 50
        );
        break;
      case "$50 - above":
        filteredItems = items.filter((item) => item.price > 50);
        break;
      default:
        filteredItems = items;
    }
  };

  // Reset Filters
  resetFilters.addEventListener("click", () => {
    filteredItems = items;
    currentPage = 1;
    renderItems();
    renderPagination();
  });

  // Render Items
  function renderItems() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    const currentItems = filteredItems.slice(startIndex, endIndex);

    listingContainer.innerHTML = currentItems
      .map(
        (item) => `
          <a href="/pages/product/${
            item.id
          }" class="product-card" data-productId="${item.id}">
              <div class="product-card-image">
                <div class="product-card-overlay"><i class="fas fa-plus-circle"></i></div>
                <img
                  src=${item.image}
                  alt="game-image">
              </div>
              <div class="product-card-main">
                <div class="product-card-title">${item.name}</div>
                <p>
                <div class="badge discound-badge">-${
                  (item.price / item.originalPrice).toPrecision(2) * 100
                }%</div> <span class="mrp-price">$2,999</span> <span
                  class="current-price">$${item.price}</span></p>
              </div>
            </a>
        `
      )
      .join("");
  }

  // Render Pagination
  function renderPagination() {
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    pagination.innerHTML = Array.from({ length: totalPages }, (_, i) => i + 1)
      .map(
        (page) => `
          <a class="pagination-btn ${
            currentPage === page ? "active" : ""
          }" href="#" data-page="${page}">${page}</button>
        `
      )
      .join("");

    document.querySelectorAll(".pagination-btn").forEach((btn) =>
      btn.addEventListener("click", () => {
        currentPage = parseInt(btn.dataset.page, 10);
        renderItems();
        renderPagination();
      })
    );
  }

  // Search Items
  searchInput.addEventListener("change", () => {
    const query = searchInput.value.toLowerCase();
    filteredItems = items.filter(
      (item) =>
        item.name.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.platform.toLowerCase().includes(query)
    );
    currentPage = 1;
    renderItems();
    renderPagination();
  });

  fetchData();
});
