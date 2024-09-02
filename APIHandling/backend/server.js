import express from "express";

const app = express();

// app.use(express.json());

app.get("/api/products", (req, res) => {
  const products = [
    {
      id: 1,
      name: "Wireless Earbuds",
      price: 49.99,
      image: {
        url: "https://example.com/images/wireless-earbuds.jpg",
      },
    },
    {
      id: 2,
      name: "Smartphone",
      price: 699.99,
      image: {
        url: "https://example.com/images/smartphone.jpg",
      },
    },
    {
      id: 3,
      name: "Laptop",
      price: 1199.99,
      image: {
        url: "https://example.com/images/laptop.jpg",
      },
    },
    {
      id: 4,
      name: "Bluetooth Speaker",
      price: 29.99,
      image: {
        url: "https://example.com/images/bluetooth-speaker.jpg",
      },
    },
    {
      id: 5,
      name: "Smart Watch",
      price: 199.99,
      image: {
        url: "https://example.com/images/smart-watch.jpg",
      },
    },
    {
      id: 6,
      name: "Gaming Headset",
      price: 89.99,
      image: {
        url: "https://example.com/images/gaming-headset.jpg",
      },
    },
    {
      id: 7,
      name: "4K Monitor",
      price: 349.99,
      image: {
        url: "https://example.com/images/4k-monitor.jpg",
      },
    },
    {
      id: 8,
      name: "Mechanical Keyboard",
      price: 129.99,
      image: {
        url: "https://example.com/images/mechanical-keyboard.jpg",
      },
    },
    {
      id: 9,
      name: "Portable Charger",
      price: 19.99,
      image: {
        url: "https://example.com/images/portable-charger.jpg",
      },
    },
    {
      id: 10,
      name: "Digital Camera",
      price: 549.99,
      image: {
        url: "https://example.com/images/digital-camera.jpg",
      },
    },
  ];

  // http://localhost:3000/api/products/search=mobile

  if (req.query.search) {
    const filterProducts = products.filter((product) =>
      product.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
    res.send(filterProducts);
    return;
  }

  setTimeout(() => {
    res.send(products);
  }, 3000);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
