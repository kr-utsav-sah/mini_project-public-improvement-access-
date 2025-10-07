// Importing required modules
const express = require('express');
const path = require('path');

// Create Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());  // Parse JSON bodies
app.use(express.static(path.join(__dirname)));  // Serve static files from current directory

// Sample product data (can be moved to a database in production)
let products = [
    {
        id: 1,
        name: "Light Pink Crew Neck T-Shirt",
        category: "tshirts",
        price: 3000,
        color: "Light Pink",
        material: "100% Cotton",
        fit: "Regular Fit",
        care: "Machine Wash",
        image: "https://via.placeholder.com/250x250/FFC0CB/FFFFFF?text=T-Shirt_Pink"
    },
    {
        id: 2,
        name: "Coral Red V-neck T-Shirt",
        category: "tshirts",
        price: 4000,
        color: "Coral Red",
        material: "100% Cotton",
        fit: "Regular Fit",
        care: "Machine Wash & Hand Wash",
        image: "https://via.placeholder.com/250x250/FF6347/FFFFFF?text=T-Shirt_Red"
    },
    // Add the rest of the products from the front-end
];

// Cart storage (in-memory for demonstration; use database in production)
let cart = [];

// API Endpoints

// Get all products
app.get('/api/products', (req, res) => {
    res.json(products);
});

// Get products by category
app.get('/api/products/:category', (req, res) => {
    const category = req.params.category;
    if (category === 'all') {
        res.json(products);
    } else {
        const filteredProducts = products.filter(product => product.category === category);
        res.json(filteredProducts);
    }
});

// Add item to cart
app.post('/api/cart', (req, res) => {
    const { id } = req.body;
    const product = products.find(p => p.id === id);
    if (!product) {
        return res.status(404).json({ error: 'Product not found' });
    }

    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    res.json({ message: 'Item added to cart', cart });
});

// Get cart items
app.get('/api/cart', (req, res) => {
    res.json(cart);
});

// Update cart item quantity
app.patch('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    const { change } = req.body;
    const item = cart.find(item => item.id === parseInt(id));

    if (!item) {
        return res.status(404).json({ error: 'Item not found in cart' });
    }

    item.quantity += change;
    if (item.quantity <= 0) {
        cart = cart.filter(cartItem => cartItem.id !== parseInt(id));
    }

    res.json({ message: 'Cart updated', cart });
});

// Remove from cart
app.delete('/api/cart/:id', (req, res) => {
    const { id } = req.params;
    cart = cart.filter(item => item.id !== parseInt(id));
    res.json({ message: 'Item removed from cart', cart });
});

// Clear cart
app.post('/api/cart/clear', (req, res) => {
    cart = [];
    res.json({ message: 'Cart cleared' });
});

// Checkout (dummy implementation)
app.post('/api/checkout', (req, res) => {
    if (cart.length === 0) {
        return res.status(400).json({ error: 'Cart is empty' });
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // In a real implementation, integrate with payment gateway
    setTimeout(() => {
        cart = [];
        res.json({ message: 'Order placed successfully', total });
    }, 2000);  // Simulate processing time
});

// Serve the front-end index.html
// Serve improved_timeless_trends.html as the main page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'improved_timeless_trends.html'));
});

// Error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`TimelessTrends server is running on port ${PORT}`);
});

// Export for testing (optional)
