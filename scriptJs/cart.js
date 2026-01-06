function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

async function ajouterAuPanier(productId) {
  if (!productId) return;

  try {
    const res = await fetch("http://localhost:3000/produits/" + productId);
    if (!res.ok) throw new Error("Erreur serveur");

    const produit = await res.json();
    const cart = getCart();

    const item = cart.find(p => String(p.id) === String(produit.id));
    const stock = Number(produit.quantity) || 0;

    if (item) {
      if (item.quantity < stock) {
        item.quantity++;
             showToast("Quantité mise à jour 🛒", "info");
      } else {
        throw new Error("Stock épuisé");
      }
    } else {
      cart.push({
        id: produit.id,
        name: produit.name,
        price: produit.price,
        image: produit.image,
        quantity: 1,
        stock
      });
    }

    saveCart(cart);
    return true; 

  } catch (err) {
    console.error(err.message);
    return false;
  }
}


function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  toast.className = `
    ${colors[type] || colors.success}
    text-white px-4 py-3 rounded-lg shadow-lg
    flex items-center gap-2
    animate-slide-in
  `;

  toast.innerHTML = `
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("opacity-0", "transition", "duration-300");
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}
