// customize.js

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  const mm = String(m).padStart(2, "0");
  const ss = String(s).padStart(2, "0");
  return `${mm}:${ss}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const timerEl = document.getElementById("timer");
  let timeLeft = 10 * 60; // 10 minutes in seconds

  timerEl.textContent = formatTime(timeLeft);

  const intervalId = setInterval(() => {
    timeLeft -= 1;
    timerEl.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(intervalId);
      window.location.href = "order_summary.html";
    }
  }, 1000);

  const form = document.getElementById("orderForm");
  const totalPriceEl = document.getElementById("totalPrice");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // validate base 
    const baseSelected = document.querySelector('input[name="baseFlavor"]:checked');
    if (!baseSelected) {
      alert("Please select a base flavor.");
      return;
    }

    // validate at least one topping
    const toppingChecked = document.querySelectorAll('input[name="toppings"]:checked');
    if (toppingChecked.length === 0) {
      alert("Please select at least one topping.");
      return;
    }

    // price 
    const basePrice = 6.0;
    const toppingPrice = 1.5;
    const total = basePrice + toppingChecked.length * toppingPrice;

    totalPriceEl.textContent = `$${total.toFixed(2)}`;

    setTimeout(() => {
      window.location.href = "order_summary.html";
    }, 500);
  });
});