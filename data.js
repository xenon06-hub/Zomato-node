const restaurants = [
  {
    id: 1,
    name: "Burger Palace",
    location: "Delhi",
    rating: 4.5,
    cuisine: "Fast Food",
    image: "https://source.unsplash.com/600x400/?burger",
    menu: [
      { itemId: 101, name: "Veg Burger", price: 120, description: "Crispy veg patty with fresh veggies." },
      { itemId: 102, name: "Cheese Burger", price: 150, description: "Loaded with cheese and sauces." }
    ]
  },
  {
    id: 2,
    name: "Pizza Street",
    location: "Mumbai",
    rating: 4.2,
    cuisine: "Italian",
    image: "https://source.unsplash.com/600x400/?pizza",
    menu: [
      { itemId: 201, name: "Margherita Pizza", price: 250, description: "Classic cheese pizza with basil." },
      { itemId: 202, name: "Farmhouse Pizza", price: 320, description: "Topped with veggies and cheese." }
    ]
  },
  {
    id: 3,
    name: "Tandoori Hub",
    location: "Bangalore",
    rating: 4.7,
    cuisine: "North Indian",
    image: "https://source.unsplash.com/600x400/?indian-food",
    menu: [
      { itemId: 301, name: "Paneer Tikka", price: 280, description: "Smoky paneer with spices." },
      { itemId: 302, name: "Tandoori Roti", price: 40, description: "Traditional tandoor baked roti." }
    ]
  }
];

module.exports = { restaurants };
