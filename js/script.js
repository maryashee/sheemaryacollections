function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(name, price) {
  let cart = getCart();

  let existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }

  saveCart(cart);
  alert(name + " added to cart!");
}

function removeFromCart(name) {
  let cart = getCart().filter(item => item.name !== name);
  saveCart(cart);
  renderCart(); 
}

function updateQuantity(name, quantity) {
  let cart = getCart();
  let item = cart.find(item => item.name === name);
  if (item) {
    item.quantity = parseInt(quantity);
  }
  saveCart(cart);
  renderCart();
}

document.querySelectorAll(".add-to-cart").forEach(button => {
  button.addEventListener("click", () => {
    let card = button.parentElement;
    let name = card.querySelector("h3").innerText;
    let price = parseInt(card.querySelector(".price").innerText);
    addToCart(name, price);
  });
});

function renderCart() {
  let cartTable = document.querySelector(".cart-table tbody");
  if (!cartTable) return; 

  cartTable.innerHTML = "";
  let cart = getCart();
  let subtotal = 0;

  cart.forEach(item => {
    let total = item.price * item.quantity;
    subtotal += total;

    let row = `
      <tr>
        <td>${item.name}</td>
        <td>KSh ${item.price}</td>
        <td><input type="number" min="1" value="${item.quantity}" 
              onchange="updateQuantity('${item.name}', this.value)"></td>
        <td>KSh ${total}</td>
        <td><button onclick="removeFromCart('${item.name}')">Remove</button></td>
      </tr>
    `;
    cartTable.innerHTML += row;
  });

  let tax = subtotal * 0.05;
  let grandTotal = subtotal + tax;

  document.querySelector(".cart-summary").innerHTML = `
    <h3>Cart Summary</h3>
    <p>Subtotal: <strong>KSh ${subtotal}</strong></p>
    <p>Tax (5%): <strong>KSh ${tax.toFixed(2)}</strong></p>
    <p>Grand Total: <strong>KSh ${grandTotal.toFixed(2)}</strong></p>
    <button class="checkout-btn">Proceed to Checkout</button>
  `;
}

document.addEventListener("DOMContentLoaded", renderCart);
