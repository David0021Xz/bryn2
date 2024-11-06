// Função para carregar os produtos favoritos salvos no localStorage
window.onload = function() {
  loadFavorites();
};

function loadFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const favoritesContainer = document.getElementById('favorites-container');

  // Cria os elementos de favoritos
  if (favorites.length === 0) {
    favoritesContainer.innerHTML = "<p>Você não tem nenhum produto salvo.</p>";
  } else {
    favorites.forEach(favorite => {
      const productCard = document.createElement('div');
      productCard.classList.add('product-card');

      productCard.innerHTML = `
        <img src="${favorite.image}" alt="${favorite.name}">
        <h2>${favorite.name}</h2>
        <p>${favorite.price}</p>
        <button class="buy-btn">Comprar</button>
      `;

      favoritesContainer.appendChild(productCard);
    });
  }
}
