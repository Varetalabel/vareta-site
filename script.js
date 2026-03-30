// ----------------- CART -----------------
let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Update cart count in navbar
function updateCartCount() {
    const count = document.getElementById("cart-count");
    if (count) count.innerText = cart.length;
}

// Add product to cart
function addToCart(name, price) {
    cart.push({name, price});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to cart`);
}

// Add product with variant (size/color)
function addToCartVariant(name, price, id) {
    const sizeSelect = document.getElementById(`size-${id}`);
    const size = sizeSelect ? sizeSelect.value : "One Size";
    cart.push({name, price, size});
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert(`${name} (${size}) added to cart`);
}

// Load cart items on cart page
function loadCart() {
    const cartDiv = document.getElementById("cart");
    if (!cartDiv) return;

    cartDiv.innerHTML = "";

    cart.forEach((item, index) => {
        const div = document.createElement("div");
        div.innerText = `${item.name} (${item.size || "One Size"}) - $${item.price}`;
        const removeBtn = document.createElement("button");
        removeBtn.innerText = "Remove";
        removeBtn.onclick = () => {
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
            updateCartCount();
        };
        div.appendChild(removeBtn);
        cartDiv.appendChild(div);
    });
}

// Clear cart
function clearCart() {
    localStorage.removeItem("cart");
    cart = [];
    updateCartCount();
    loadCart();
}

// Go to checkout page
function goToCheckout() {
    window.location.href = "checkout.html";
}

// ----------------- DROP COUNTDOWN -----------------
const countdown = document.getElementById("countdown");
if (countdown) {
    let dropDate = new Date();
    dropDate.setDate(dropDate.getDate() + 3); // Next drop in 3 days

    setInterval(() => {
        const now = new Date();
        const diff = dropDate - now;
        if (diff < 0) {
            countdown.innerText = "Drop is live!";
            return;
        }
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        countdown.innerText = `Drop in ${days}d ${hours}h ${minutes}m`;
    }, 1000);
}

// ----------------- CHECKOUT (STRIPE SANDBOX) -----------------
const payButton = document.getElementById("pay-button");
if (payButton) {
    payButton.addEventListener("click", async (e) => {
        e.preventDefault();
        if (cart.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        // Calculate total
        const total = cart.reduce((sum, item) => sum + item.price, 0);

        // Stripe test mode alert (no real charges)
        alert(`Stripe Sandbox:\nTotal $${total}\nPayment simulated.`);

        // Clear cart after checkout
        clearCart();
        window.location.href = "index.html";
    });
}

// Initial load
updateCartCount();
loadCart();