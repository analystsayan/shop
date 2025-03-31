// Get cart from localStorage or create empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update cart count
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}

// Function to update buttons (Add to Cart → Remove)
function updateButtons() {
    document.querySelectorAll(".add-to-cart").forEach(button => {
        const name = button.dataset.name;
        if (cart.some(item => item.name === name)) {
            button.innerText = "Remove";
            button.classList.add("remove-from-cart");
        } else {
            button.innerText = "Add to Cart";
            button.classList.remove("remove-from-cart");
        }
    });
}

// Function to display cart items in cart page
function displayCartItems() {
    const cartItemsContainer = document.getElementById("cart-items");
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = cart.length
            ? cart.map(item => `<div class="cart-item"><p>${item.name} - $${item.price}</p><button class="remove-item" data-name="${item.name}">Remove</button></div>`).join("")
            : "<p>Your cart is empty</p>";

        // Add event listeners to "Remove" buttons in the cart page
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", removeFromCart);
        });
    }
}

// Function to add/remove item from cart
function toggleCart(event) {
    const name = event.target.dataset.name;
    const price = event.target.dataset.price;
    const index = cart.findIndex(item => item.name === name);

    if (index === -1) {
        // Add item to cart
        cart.push({ name, price });
    } else {
        // Remove item from cart
        cart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateButtons();
    displayCartItems();
}

// Function to remove item from cart (for cart page)
function removeFromCart(event) {
    const name = event.target.dataset.name;
    cart = cart.filter(item => item.name !== name);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    updateButtons();
    displayCartItems();
}

// Add event listeners to product page buttons
document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", toggleCart);
});

// Update UI on page load
updateCartCount();
updateButtons();
displayCartItems();

// Cart Page Checkout Button
if (document.getElementById("checkout")) {
    document.getElementById("checkout").addEventListener("click", () => {
        window.location.href = "https://wa.me/yourwplink";
    });
}