const express = require("express");
const path = require("path");
const app = express();
const gamesRoutes = require("./routes/games");
const usersRoutes = require("./routes/users");
// const cartRouter = require("./routes/cart");

let gamesData = require("./data/games.json");

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, "../public")));

// Default route to serve the HTML page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.get("/pages/product/:id", (req, res) => {
  const game = gamesData.find((game) => game.id == req.params.id);

  res.setHeader("Content-Type", "text/html");
  res.send(`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />

    <!-- Cloud UI -->
    <link
      rel="stylesheet"
      href="https://cloud-ui-css.netlify.app/css/main.css"
    />

    <!-- Icons Dependency -->
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      integrity="sha512-1ycn6IcaQQ40/MKBW2W4Rhis/DbILU74C1vSrLJxCq57o941Ym01SwNsOMqvEBFlcgUa6xLiPY/NS5R+E6ztJQ=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <!-- Custom Styles -->
    <link rel="stylesheet" href="/css/styles.css" />
    <title>Gamotore - ${game.name}</title>
  </head>

  <body class="bg-dark text-light">
    <header class="">
      <nav>
        <div class="nav-logo">
          <img src="/assets/gamotore-logo-light.svg" alt="" />
        </div>
        <div class="nav-list">
          <div class="nav-left">
            
          </div>
          <div class="nav-right">
            <a href="/pages/sign-in.html" class="nav-item"
              ><i class="fas fa-user"></i>SIGN IN</a
            >
            <a href="/pages/sign-up.html" class="nav-item"
              ><i class="fas fa-user-plus"></i>SIGN UP</a
            >
          </div>
        </div>
      </nav>
    </header>
    <div class="container">
      <!-- Sticky Navbar -->
      <div class="sticky-header">

        <a href="/">Discover</a>
        <a href="/pages/browse-products.html">Browse</a>
      </div>

      <!-- Main Content -->
      <main class="main-section">
        <h1 class="product-title border-top py-sm">${game.name}</h1>
       
        <div class="product-container">
          <div class="product-page-details">
            <!-- <div> -->
            <img
              class="product-page-image"
              src=${game.image}
              alt=${game.name}
            />

            <div>
              ${game.description}
            </div>
            <div class="d-flex gap-md my-sm">
              <span
                ><div class="text-dark-light">Category</div>
                <a href=""> ${game.category}</a></span
              >
              <span
                ><div class="text-dark-light">Features</div>
                <a href="">Controller Support</a>,
                <a href="">Single Player</a></span
              >
            </div>
            <div class="product-heading">${game.name}</div>
            <div class="product-description">
              ${game.description}
            </div>
          </div>
          <div class="product-page-card">
            <img
              style="padding: 20px"
              src=${game.image}
              alt=${game.name}
            />
            <div class="badge">${game.badge}</div>
            <span class="current-price">$${game.price}</span>
            <div id="add-to-cart" class="btn btn-outlined btn-rounded" data-id="${game.id}" data-name="${game.name}" data-price="${game.price}" data-image="${game.image}" data-badge="${game.badge}" data-category="${game.category}" data-description="${game.description}">ADD TO CART</div>
          
            <div class="product-page-card-detail">
              <span class="text-dark-light text-semibold">Platform</span
              ><span>${game.platform}</span>
            </div>
            <div class="product-page-card-detail">
              <span class="text-dark-light text-semibold">Badge</span
              ><span>${game.badge}</span>
            </div>
            <div class="product-page-card-detail">
              <span class="text-dark-light text-semibold">Availability</span
              ><span>${game.availability}</span>
            </div>
            <div class="product-page-card-detail">
              <span class="text-dark-light text-semibold">Developer</span
              ><span><i class=${game.platform_icon}></i></span>
            </div>
          </div>
        </div>
      </main>
    </div>
    <!-- Footer -->
    <footer class="footer">
      <div class="d-flex justify-between items-center text-lg">
        <span>
          <a href=""><i class="fab fa-facebook-square"></i></a>
          <a href=""><i class="fab fa-twitter-square"></i></a>
          <a href=""><i class="fab fa-youtube-square"></i></a>
        </span>
        <span>
          <a href="#"><i class="far fa-caret-square-up"></i></a>
        </span>
      </div>
      <div>
        <div class="footer-heading">Resources</div>
        <div>
          <div class="d-flex gap-sm">
            <div class="d-flex flex-column gap-xxxs">
              <a href="">Support-A-Creator</a>
              <a href="">Publish on Epic Games</a>
              <a href="">Careers</a>
              <a href="">Company</a>
            </div>
            <div class="d-flex flex-column gap-xxxs">
              <a href="">Fan Art policy</a>
              <a href="">UX Research</a>
              <a href="">Store</a>
            </div>
            <div class="d-flex flex-column gap-xxxs">
              <a href="">Online Services</a>
              <a href="">Community Rules</a>
              <a href="">Newsletter</a>
            </div>
          </div>
        </div>
        <div>
          <div class="footer-heading">Made by Gamotore</div>
          <div>
            <div class="d-flex gap-sm">
              <div class="d-flex flex-column gap-xxxs">
                <a href="">Fan Art policy</a>
                <a href="">UX Research</a>
                <a href="">Store</a>
              </div>
              <div class="d-flex flex-column gap-xxxs">
                <a href="">Online Services</a>
                <a href="">Community Rules</a>
                <a href="">Newsletter</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        © 2022, Gamotore, Inc. All rights reserved. Lorem ipsum dolor sit amet,
        consectetur adipisicing elit. Doloremque alias praesentium cum
        repellendus veritatis inventore nemo velit necessitatibus magnam
        officiis ipsa dignissimos omnis, eius quasi facere excepturi incidunt id
        blanditiis? Molestiae vitae voluptatibus accusamus, rerum voluptatum
        commodi veniam quos alias, laudantium suscipit ex nihil blanditiis
        adipisci a pariatur similique labore deleniti.
      </div>
      <div class="d-flex justify-between items-center">
        <span>
          <a href="">Terms of Services</a>
          <a href="">Privacy Policy</a>
          <a href="">Store Refund Policy</a>
        </span>
      </div>
    </footer>
    <script src="/js/cart.js"></script>
    <script src="/js/product.js"></script>
    <script src="/js/index.js"></script>
  </body>
</html>
`);
});

// Routes for the API
app.use("/api/games", gamesRoutes);
app.use("/api/users", usersRoutes);
// Use the cartRouter for cart-related routes
// app.use("/cart", cartRouter);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
