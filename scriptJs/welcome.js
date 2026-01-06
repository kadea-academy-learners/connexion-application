document.addEventListener("DOMContentLoaded", () => {
  chargerProduits();
});

document.addEventListener("click", async (e) => {
  const btn = e.target.closest(".btn-add-cart");
  if (!btn) return;

  const id = btn.dataset.id;
  await ajouterAuPanier(id);
});


function chargerProduits() {
  fetch("http://localhost:3000/produits")
    .then(response => response.json())
    .then(produits => {
      afficherProduits(produits);
    })
    .catch(error => {
      console.log("Cette requête n'est pas disponible :", error);
    });
}

function afficherProduits(produits) {
  produits.forEach(produit => {

    const section = document.getElementById(produit.categories);
    if (!section) return;

    const article = document.createElement("article");
    article.className =
      "w-52 h-full flex-shrink-0 border rounded-lg p-2 shadow hover:scale-105 transition";

    article.innerHTML = `
      <img src="${produit.image}" 
           alt="${produit.name}"
           class="w-full h-40 object-cover rounded">

      <h3 class="mt-2 text-center text-sm font-bold">${produit.name}</h3>

      <p class="text-orange-600 text-center font-semibold">
        ${produit.price} $
      </p>
     
      <div class="flex justify-center">

      <button 
        class="btn-add-cart mt-2 text-center w-40 bg-orange-500 text-white py-1 rounded hover:bg-orange-600"
        data-id="${produit.id}">
        Ajouter au panier
      </button>
      </div>
    `;

    section.appendChild(article);
  })
}


document.addEventListener("click", (e) => {
  const payBtn = e.target.closest(".buttonPay");
  if (!payBtn) return;

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    showToast("Votre panier est vide! ❌", "error");
    return;
  }

  window.location.href = "panier.html";
});