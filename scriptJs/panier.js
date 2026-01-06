document.addEventListener('click', (e) => {
  const addBtn = e.target.closest('.btn-add-cart');
  if (addBtn) {
    const productId = addBtn.dataset.id;
    ajouterAuPanier(productId, addBtn);
    return;
  }

  const plus = e.target.closest('.plus');
  if (plus) {
    const id = plus.dataset.id;
    updateQuantity(id, 1);
    return;
  }

  const moins = e.target.closest('.moins');
  if (moins) {
    const id = moins.dataset.id;
    updateQuantity(id, -1);
    return;
  }

  const suppr = e.target.closest('.supprimer');
  if (suppr) {
    const id = suppr.dataset.id;
    removeFromCart(id);
    return;
  }

  const commander = e.target.closest('.CommanderButton');
  if (commander) {
    handleOrder();
    return;
  }
});

function afficherPanier() {
  const panierContainer = document.getElementById("panierProduits");
   if (!panierContainer) return;
  const totalArticlesEl = document.getElementById("totalArticles");
  const totalPrixEl = document.getElementById("totalPrix");

  const cart = getCart();
  panierContainer.innerHTML = "";

  if (cart.length === 0) {
    panierContainer.innerHTML = `
      <p class="text-center text-gray-500">
        Votre panier est vide
      </p>
    `;
    totalArticlesEl.textContent = 0;
    totalPrixEl.textContent = "0 $";
    return;
  }

  let totalArticles = 0;
  let totalPrix = 0;

  cart.forEach(item => {
    totalArticles += item.quantity;
    totalPrix += item.price * item.quantity;

    const article = document.createElement("article");
    article.className =
      "bg-white rounded-xl shadow p-4 flex gap-4 items-center";

    article.innerHTML = `
      <img src="${item.image}" class="w-20 h-20 rounded object-cover" />

      <div class="flex-1">
        <h3 class="font-medium text-sm">${item.name}</h3>
        <p class="text-gray-500 text-sm">${item.price} $</p>

        <div class="flex items-center gap-3 mt-2">
          <button class="moins bg-gray-200 px-2 rounded" data-id="${item.id}">-</button>
          <span class="quantite">${item.quantity}</span>
          <button class="plus bg-gray-200 px-2 rounded" data-id="${item.id}">+</button>
        </div>
      </div>

      <button class="supprimer text-red-500 text-sm" data-id="${item.id}">
        Supprimer
      </button>
    `;

    panierContainer.appendChild(article);
  });

  totalArticlesEl.textContent = totalArticles;
  totalPrixEl.textContent = totalPrix + " $";
}


function updateQuantity(id, delta) {
  const cart = getCart();
  const idx = cart.findIndex(p => String(p.id) === String(id));
  if (idx === -1) return;
  const item = cart[idx];
  const newQty = item.quantity + delta;
  if (newQty <= 0) {
    cart.splice(idx, 1);
  } else if (newQty > (Number(item.stock) || Infinity)) {
    alert('Stock épuisé');
    return;
  } else {
    item.quantity = newQty;
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  afficherPanier();
}

function removeFromCart(id) {
  const cart = getCart().filter(p => String(p.id) !== String(id));
  localStorage.setItem('cart', JSON.stringify(cart));
  afficherPanier();
}

function handleOrder() {
  const cart = getCart();
  if (!cart || cart.length === 0) {
    alert('Votre panier est vide');
    return;
  }

  const message = 'Bravon — Attendez, votre commande sera livrée bientôt.';
  alert(message);

  localStorage.removeItem('cart');
  afficherPanier();
}

document.addEventListener('DOMContentLoaded', () => {
  afficherPanier();
});
