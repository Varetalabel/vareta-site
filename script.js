let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({name, price});
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Added to cart");
}

function loadCart() {
  const cartDiv = document.getElementById("cart");
  if (!cartDiv) return;

  cartDiv.innerHTML = "";

  cart.forEach(item => {
    const div = document.createElement("div");
    div.innerText = item.name + " - $" + item.price;
    cartDiv.appendChild(div);
  });
}

loadCart();