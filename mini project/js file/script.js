// Function to get the cart from localStorage or initialize it if not present
function getCart() {
    let cart = JSON.parse(localStorage.getItem('cart'));
    if (!cart) {
        cart = [];
    }
    return cart;
}

// Function to save the cart to localStorage
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to add item to the cart
function addToCart(productId, productName, productPrice) {
    const cart = getCart();
    const product = {
        id: productId,
        name: productName,
        price: productPrice
    };

    cart.push(product);
    saveCart(cart);

    alert(`${productName} has been added to your cart.`);
}

// Function to handle "Buy Now" button click
function buyNow(productId, productName, productPrice) {
    const cart = getCart();
    const product = {
        id: productId,
        name: productName,
        price: productPrice
    };

    cart.push(product);
    saveCart(cart);

    // Redirect to the cart page
    window.location.href = 'cart.html';
}

// Event listener for Add to Cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        addToCart(productId, productName, productPrice);
    });
});

// Event listener for Buy Now buttons
document.querySelectorAll('.buy-now').forEach(button => {
    button.addEventListener('click', function() {
        const productId = this.getAttribute('data-id');
        const productName = this.getAttribute('data-name');
        const productPrice = parseFloat(this.getAttribute('data-price'));

        buyNow(productId, productName, productPrice);
    });
});
