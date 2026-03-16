// menu.js
const cart = {}; // { "Berry Frost": { qty: 2, price: 5.99 } }

function formatMoney(n) {
  return `$${n.toFixed(2)}`;
}

function renderCart() {
  const emptyMsg = document.getElementById("empty-cart");
  const cartItems = document.getElementById("cart-items");
  cartItems.innerHTML = "";

  const names = Object.keys(cart);

  if (names.length === 0) {
    emptyMsg.style.display = "block";
    return;
  }

  emptyMsg.style.display = "none";

  names.forEach((name) => {
    const { qty, price } = cart[name];
    const lineTotal = qty * price;

    const row = document.createElement("div");
    row.className = "cart-row";

    const left = document.createElement("div");
    left.textContent = `${name} (${qty})`;

    const right = document.createElement("div");
    right.textContent = formatMoney(lineTotal);

    row.appendChild(left);
    row.appendChild(right);
    cartItems.appendChild(row);
  });
}

function addItem(name, price) {
  if (!cart[name]) cart[name] = { qty: 0, price };
  cart[name].qty += 1;
  renderCart();
}

function removeItem(name) {
  if (!cart[name]) return;
  cart[name].qty -= 1;
  if (cart[name].qty <= 0) delete cart[name];
  renderCart();
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".add-to-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      addItem(name, price);
    });
  });

  document.querySelectorAll(".remove-from-cart").forEach((btn) => {
    btn.addEventListener("click", () => {
      const name = btn.dataset.name;
      removeItem(name);
    });
  });

  renderCart();
});