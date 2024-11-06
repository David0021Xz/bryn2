// Função para alternar o estado do menu lateral
function toggleDrawer() {
  const drawer = document.getElementById('drawer');
  drawer.classList.toggle('open');
}

// Função para buscar produtos por termo digitado
function searchProduct() {
  const searchInput = document.getElementById('search-input').value.toLowerCase();
  const products = document.querySelectorAll('.product-card');
  const carousel = document.querySelector('.carousel');
  const noResultsMessage = document.getElementById('no-results-message');
  let foundProducts = false;

  // Esconde o carrossel se houver uma pesquisa
  carousel.style.display = searchInput ? 'none' : 'block';

  products.forEach(product => {
    const productName = product.querySelector('h2').textContent.toLowerCase();

    // Verifica correspondência parcial do termo de busca no nome do produto
    if (productName.includes(searchInput)) {
      product.style.display = 'block';
      foundProducts = true;
    } else {
      product.style.display = 'none';
    }
  });

  // Exibe mensagem se nenhum produto for encontrado
  if (!foundProducts && searchInput) {
    noResultsMessage.innerHTML = "Opss, não encontramos nada!";
    noResultsMessage.style.display = 'block';
  } else {
    noResultsMessage.style.display = 'none';
  }
}

// Função para alternar o estado de favorito e salvar no localStorage
function toggleFavorite(index) {
  const heartIcon = document.querySelectorAll('.heart-icon')[index];
  const isFavorited = heartIcon.classList.toggle('favorited');

  if (isFavorited) {
    localStorage.setItem(`favorite-camiseta${index}`, true);
  } else {
    localStorage.removeItem(`favorite-camiseta${index}`);
  }
}

// Restaura o estado dos favoritos ao carregar a página
function loadFavorites() {
  // Seleciona todos os elementos com a classe 'product-card' automaticamente
  const productCards = document.querySelectorAll('.product-card');

  productCards.forEach((productCard, index) => {
    const heartIcon = productCard.querySelector('.heart-icon');

    // Adiciona a classe 'favorited' se o produto estiver salvo no localStorage
    if (localStorage.getItem(`favorite-camiseta${index}`)) {
      heartIcon.classList.add('favorited');
    }

    // Define o evento de clique para alternar favorito
    heartIcon.onclick = () => toggleFavorite(index);
  });
}

// Função para salvar imagem do carrossel no localStorage
window.onload = function() {
  loadFavorites();
  const savedImage = localStorage.getItem('carouselImage');

  if (savedImage) {
    document.querySelector('.carousel img').src = savedImage;
  } else {
    const imgElement = document.querySelector('.carousel img');
    const imageUrl = imgElement.src;

    fetch(imageUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = function() {
          const base64Image = reader.result;
          localStorage.setItem('carouselImage', base64Image);
          imgElement.src = base64Image;
        };
        reader.readAsDataURL(blob);
      })
      .catch(error => console.error('Erro ao carregar a imagem:', error));
  }
};


let currentIndex = 0;

function moveSlide(direction) {
  const images = document.querySelectorAll('.carousel-item');
  const totalImages = images.length;

  // Atualiza o índice da imagem atual
  currentIndex = (currentIndex + direction + totalImages) % totalImages;

  // Move o carrossel para a nova posição
  const carouselImages = document.querySelector('.carousel-images');
  carouselImages.style.transform = `translateX(-${currentIndex * 100}%)`;
}

// Inicializa o carrossel (opcional)
setInterval(() => moveSlide(1), 3000); // Muda a imagem a cada 3 segundos
