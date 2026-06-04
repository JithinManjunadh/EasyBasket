let cart = {}; // { productId: quantity }

// Update the cart button in boilerplate
function updateCartIcon() {
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const cartBtn = document.querySelector(".cart-btn");
  if (cartBtn) cartBtn.textContent = `Cart (${cartCount})`;
}

// Update product quantity badges
function updateProductQuantities() {
  for (const productId in cart) {
    const qtySpan = document.getElementById(`quantity-${productId}`);
    if (qtySpan) qtySpan.textContent = cart[productId];
  }
}

// Handle Add to Cart button click
document.querySelectorAll(".add-to-cart-btn").forEach(btn => {
  btn.addEventListener("click", async () => {
    const productId = btn.dataset.productId;

    // Update cart
    if (cart[productId]) {
      cart[productId] += 1;
    } else {
      cart[productId] = 1;
    }

    // Update button text
    btn.textContent = "In Basket";

    // Update cart icon & quantity badges
    updateCartIcon();
    updateProductQuantities();

  });
});

// Initialize on page load
updateCartIcon();
updateProductQuantities();

// Auto-dismiss flash messages after 4.5 seconds
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.flash').forEach(flash => {
    setTimeout(() => {
      flash.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      flash.style.opacity = '0';
      flash.style.transform = 'translateX(-50%) translateY(-12px)';
      setTimeout(() => flash.remove(), 500);
    }, 4500);
  });
});