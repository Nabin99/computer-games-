const express = require("express");
const router = express.Router();

// Mock database for games
let games = require("../data/games.json");

const categories = [
  {
    id: 1,
    name: "Action",
    image:
      "https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=400", // Verified
  },
  {
    id: 2,
    name: "Sandbox",
    image: "/assets/minecraft.jpg",
  },
  {
    id: 3,
    name: "Survival",
    image:
      "https://images.pexels.com/photos/1647167/pexels-photo-1647167.jpeg?auto=compress&cs=tinysrgb&w=400", // Verified
  },
  {
    id: 4,
    name: "Racing",
    image: "/assets/starwars.jpg", // Verified
  },
  {
    id: 5,
    name: "Strategy",
    image: "/assets/elder_scrolls.jpg", // Verified
  },
  {
    id: 6,
    name: "RPG",
    image: "/assets/cyberpunk.jpg", // Verified
  },
  {
    id: 7,
    name: "Sports",
    image: "/assets/fifa_23.jpg", // Verified
  },
  {
    id: 9,
    name: "Shooter",
    image: "/assets/call_of_duty.jpg", // Verified
  },
  {
    id: 10,
    name: "Fighting",
    image: "assets/the_witcher_3.jpg", // Verified
  },
];

// Get all games
router.get("/", (req, res) => {
  res.json(games);
});

// Endpoint: Featured Games
router.get("/featured", (req, res) => {
  const featuredGames = games.slice(0, 6); // Logic to fetch top 3 featured games
  res.json(featuredGames);
});

// Endpoint: Featured Hero Game
router.get("/featured/hero", (req, res) => {
  const heroGame = games.find((game) => game.id === 1); // Replace with logic to dynamically fetch hero game
  res.json(heroGame);
});

// Endpoint: Categories
router.get("/categories", (req, res) => {
  res.json(categories);
});

// Endpoint: Games on Sale
router.get("/games-on-sale", (req, res) => {
  const gamesOnSale = games.filter(
    (game) => game.originalPrice - game.price > 0
  ); // Filter games with a discount
  res.json(gamesOnSale);
});

// Get a specific game by ID
router.get("/:id", (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");
  res.json(game);
});

// Add a new game
router.post("/", (req, res) => {
  const newGame = req.body;
  games.push(newGame);
  res.status(201).json(newGame);
});

// Update an existing game by ID
router.put("/:id", (req, res) => {
  const game = games.find((game) => game.id === parseInt(req.params.id));
  if (!game) return res.status(404).send("Game not found");

  // Update game details
  Object.assign(game, req.body);
  res.json(game);
});

// Delete a game by ID
router.delete("/:id", (req, res) => {
  const gameIndex = games.findIndex(
    (game) => game.id === parseInt(req.params.id)
  );
  if (gameIndex === -1) return res.status(404).send("Game not found");

  games.splice(gameIndex, 1);
  res.status(200).send("Game deleted");
});

module.exports = router;
