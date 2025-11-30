const express = require("express");
const path = require("path");
const { restaurants } = require("./data");

const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

// Home page - list all restaurants
app.get("/", (req, res) => {
  res.render("index", { restaurants });
});

// Restaurant details + menu page
app.get("/restaurant/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const restaurant = restaurants.find(r => r.id === id);

  if (!restaurant) {
    return res.status(404).send("Restaurant not found");
  }

  res.render("restaurant", { restaurant });
});

// Fake order page
app.get("/order", (req, res) => {
  const { restaurantId, itemId } = req.query;

  const restaurant = restaurants.find(r => r.id === parseInt(restaurantId));
  if (!restaurant) return res.status(404).send("Restaurant not found");

  const item = restaurant.menu.find(i => i.itemId === parseInt(itemId));
  if (!item) return res.status(404).send("Item not found");

  res.render("order", { restaurant, item });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Zomato clone app running on port ${PORT}`);
});
