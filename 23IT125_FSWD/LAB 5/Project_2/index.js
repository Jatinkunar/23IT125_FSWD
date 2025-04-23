const express = require('express');
const app = express();
const port = 3000;

const products = [
    { id: 1, name: 'Laptop', category: 'electronics', price: 8000 },
    { id: 2, name: 'Headphones', category: 'electronics', price: 500 },
    { id: 3, name: 'Shirt', category: 'clothing', price: 300 },
    { id: 4, name: 'Shoes', category: 'clothing', price: 600 }
];

// GET all products
app.get('/products', (req, res) => {
    const { category } = req.query;

    if (category) {
        const filteredProducts = products.filter(product => product.category === category);
        return res.json(filteredProducts);
    }

    res.json(products);
});

// GET a specific product by ID
app.get('/products/:id', (req, res) => {
    const { id } = req.params;
    const product = products.find(product => product.id === parseInt(id));

    if (product) {
        res.json(product);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
