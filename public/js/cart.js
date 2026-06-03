/*CART JS */

/* ── ADD TO CART ── */
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', async (e) => {
    e.preventDefault();
    const productId = btn.dataset.productId;
    if (btn.disabled) return;
    btn.disabled = true;

    try {
      const res  = await fetch(`/cart/add/${productId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (data.success) {
        btn.innerHTML = '<i class="fa-solid fa-check"></i> In Basket';
        btn.classList.add('in-basket');
        const qtySpan = document.getElementById(`quantity-${productId}`);
        if (qtySpan) qtySpan.textContent = data.newQuantity;
        updateCartBadges(data.totalCartCount || 0);
      }
    } catch (err) {
      console.error('Error adding to cart:', err);
    } finally {
      btn.disabled = false;
    }
  });
});


/* ── FULL REMOVE (× button) ── */
document.querySelectorAll('.remove-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    const productId = btn.dataset.productId;
    if (btn.disabled) return;
    btn.disabled = true;

    try {
      const res  = await fetch(`/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();

      if (data.success) {
        animateRemoveItem(productId);
        updateCartBadges(data.totalCartCount || 0);
        updateSummaryTotals(data.newCartTotal, data.newCartCount);
        if (data.newCartCount === 0) setTimeout(showEmptyCartState, 320);
      } else {
        alert(data.message);
        btn.disabled = false;
      }
    } catch (err) {
      console.error(err);
      alert('Error removing item');
      btn.disabled = false;
    }
  });
});


/* ── QTY +/- BUTTONS ── */
document.querySelectorAll('.qty-btn').forEach(btn => {
  btn.addEventListener('click', async () => {
    console.log("yes");
    const productId = btn.dataset.productId;
    const action    = btn.classList.contains('qty-increment') ? 'increment' : 'decrement';

    if (btn.disabled) return;

    const rowEl   = document.getElementById(`cart-item-${productId}`);
    const rowBtns = rowEl ? rowEl.querySelectorAll('.qty-btn') : [btn];
    rowBtns.forEach(b => b.disabled = true);

    try {
      const res  = await fetch(`/cart/update/${productId}`, {
        method:  'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ action })
      });

      if (!res.ok) {
        console.error('PATCH failed, status:', res.status);
        rowBtns.forEach(b => b.disabled = false);
        return;
      }

      const data = await res.json();
      //console.log('update response:', data);   // ← helpful during debugging

      if (data.success) {
        if (data.removed) {
          animateRemoveItem(productId);
          updateCartBadges(data.totalCartCount || 0);
          updateSummaryTotals(data.newCartTotal, data.newCartCount);
          if (data.newCartCount === 0) setTimeout(showEmptyCartState, 320);
        } else {
          // Animate the qty number
          const qtyEl = document.getElementById(`qty-${productId}`);
          if (qtyEl) {
            qtyEl.style.transform = 'scale(1.4)';
            qtyEl.textContent     = data.newQuantity;
            setTimeout(() => { qtyEl.style.transform = 'scale(1)'; }, 140);
          }

          // Update item subtotal
          const priceEl = document.getElementById(`item-price-${productId}`);
          if (priceEl) priceEl.textContent = `$${data.itemTotal}`;

          // Turn decrement red when qty == 1
          const decBtn = rowEl ? rowEl.querySelector('.qty-decrement') : null;
          if (decBtn) decBtn.dataset.atMin = data.newQuantity === 1 ? 'true' : 'false';

          updateSummaryTotals(data.newCartTotal, data.newCartCount);
          updateCartBadges(data.totalCartCount || 0);
          rowBtns.forEach(b => b.disabled = false);
        }
      } else {
        rowBtns.forEach(b => b.disabled = false);
      }
    } catch (err) {
      console.error('Qty update error:', err);
      rowBtns.forEach(b => b.disabled = false);
    }
  });
});


/* ── HELPERS ── */

function animateRemoveItem(productId) {
  const el = document.getElementById(`cart-item-${productId}`);
  if (!el) return;
  el.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
  el.style.opacity    = '0';
  el.style.transform  = 'translateX(10px)';
  setTimeout(() => {
    el.style.overflow      = 'hidden';
    el.style.maxHeight     = el.scrollHeight + 'px';
    el.style.transition   += ', max-height 0.28s ease, padding 0.28s ease';
    requestAnimationFrame(() => {
      el.style.maxHeight    = '0';
      el.style.paddingTop   = '0';
      el.style.paddingBottom = '0';
    });
    setTimeout(() => el.remove(), 300);
  }, 250);
}

function updateSummaryTotals(newCartTotal, newCartCount) {
  const subtotalEl = document.getElementById('cart-total-price');
  if (subtotalEl) subtotalEl.textContent = parseFloat(newCartTotal).toFixed(2);

  const grandEl = document.getElementById('cart-grand-total');
  if (grandEl) grandEl.textContent = parseFloat(newCartTotal).toFixed(2);

  const countEl = document.getElementById('cart-item-count');
  if (countEl) countEl.textContent = newCartCount;
}

function updateCartBadges(count) {
  document.querySelectorAll('#cart-count').forEach(el => {
    el.textContent = count;
  });
}

function showEmptyCartState() {
  const cartPage = document.querySelector('.cart-page');
  if (!cartPage) return;
  cartPage.innerHTML = `
    <div class="cart-empty-state">
      <div class="cart-empty-icon">
        <i class="fa-solid fa-bag-shopping"></i>
      </div>
      <h3>Your cart is empty</h3>
      <p>Looks like you haven't added anything yet.</p>
      <a href="/products" class="btn-lumeo-primary">
        <i class="fa-solid fa-arrow-left"></i>
        Browse Products
      </a>
    </div>`;
}


/* ── INIT — restore badge count from server-rendered DOM ────── */
function initCartCountFromDOM() {
  let total = 0;

  document.querySelectorAll('.product-quantity').forEach(span => {
    const n = parseInt(span.textContent.trim(), 10);
    if (!isNaN(n) && n > 0) total += n;
  });

  if (total === 0) {
    document.querySelectorAll('.qty-value').forEach(span => {
      const n = parseInt(span.textContent.trim(), 10);
      if (!isNaN(n) && n > 0) total += n;
    });
  }

  updateCartBadges(total);

  document.querySelectorAll('.qty-decrement').forEach(btn => {
    const qtyEl = document.getElementById(`qty-${btn.dataset.productId}`);
    if (qtyEl && parseInt(qtyEl.textContent, 10) === 1) btn.dataset.atMin = 'true';
  });
}

document.addEventListener('DOMContentLoaded', initCartCountFromDOM);