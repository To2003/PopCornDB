// --- CONFIGURACIÓN ---
const apiKey = 'd4e5e3959720612e68014b13504975d2';
const baseUrl = 'https://api.themoviedb.org/3';
const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';

// 🎬 Categorías tipo Netflix
const genreIds = {
  "Acción": 28,
  "Aventura": 12,
  "Animación": 16,
  "Comedia": 35,
  "Crimen": 80,
  "Documental": 99,
  "Drama": 18,
  "Familia": 10751,
  "Fantasía": 14,
  "Historia": 36,
  "Terror": 27,
  "Misterio": 9648,
  "Música": 10402,
  "Romance": 10749,
  "Ciencia Ficción": 878,
  "Suspenso": 53,
  "Bélica": 10752,
  "Western": 37
};

const carousels = {};
let isSearching = false;
let autoScrollInterval = null;

// --- ELEMENTOS DEL DOM ---
const categoriesContainer = document.getElementById("categoriesContainer");
const searchInput = document.getElementById("searchInput");
const modal = document.getElementById("movieModal");
const closeModal = document.getElementById("closeModal");

// --- INICIO ---
document.addEventListener("DOMContentLoaded", () => {
  createCarousels();
  setupEventListeners();
  startAutoScroll();
});

// --- EVENTOS ---
function setupEventListeners() {
  searchInput.addEventListener("input", handleSearch);
  closeModal.addEventListener("click", closeMovieModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeMovieModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMovieModal();
  });
}

// --- CARGAR HASTA 120 PELÍCULAS POR GÉNERO ---
async function fetchMoviesByGenre(genreId, pages = 6) {
  const allMovies = [];

  for (let page = 1; page <= pages; page++) {
    const res = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`);
    const data = await res.json();
    allMovies.push(...data.results);
  }

  return allMovies.slice(0, 120);
}

// --- CREAR CARRUSELES ---
async function createCarousels() {
  categoriesContainer.innerHTML = "";

  for (const category in genreIds) {
    const movies = await fetchMoviesByGenre(genreIds[category]);
    renderCategory(category, movies);
  }

  setupCarouselButtons();
}

// --- CREAR CATEGORÍA ---
function renderCategory(category, movies) {
  const categoryId = category.replace(/\s+/g, "-").toLowerCase();

  const section = document.createElement("div");
  section.className = "category-section";
  section.innerHTML = `
    <h2 class="category-title">${category}</h2>
    <div class="carousel-container" id="carousel-${categoryId}">
      <button class="carousel-nav prev" data-category="${category}" data-direction="-1">‹</button>
      <div class="carousel-wrapper" id="wrapper-${categoryId}"></div>
      <button class="carousel-nav next" data-category="${category}" data-direction="1">›</button>
    </div>
  `;
  categoriesContainer.appendChild(section);

  const wrapper = section.querySelector(".carousel-wrapper");
  wrapper.innerHTML = movies.map(movie => createMovieCard(movie)).join("");

  carousels[category] = {
    currentIndex: 0,
    wrapper,
    totalOriginal: movies.length,
  };
}

// --- TARJETA DE PELÍCULA ---
function createMovieCard(movie) {
  const poster = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/placeholder.svg';
  const title = movie.title || "Sin título";
  const year = movie.release_date ? movie.release_date.slice(0, 4) : "Desconocido";
  const rating = movie.vote_average?.toFixed(1) || "N/A";

  return `
    <div class="movie-card" data-movie-id="${movie.id}">
      <img src="${poster}" alt="${title}" class="movie-poster">
      <div class="movie-rating">${rating}</div>
      <div class="movie-info">
        <h3 class="movie-title">${title}</h3>
        <p class="movie-year">${year}</p>
      </div>
    </div>
  `;
}

// --- MOVER CARRUSEL INFINITO ---
function moveCarousel(category, direction) {
  const carousel = carousels[category];
  if (!carousel || !carousel.wrapper) return;

  const wrapper = carousel.wrapper;
  const cardWidth = 210;
  const containerWidth = wrapper.parentElement.offsetWidth;
  const visibleCards = Math.floor(containerWidth / cardWidth);
  const totalCards = carousel.totalOriginal;

  carousel.currentIndex += direction * visibleCards;

  // Reiniciar al final/inicio
  if (carousel.currentIndex >= totalCards - visibleCards) {
    carousel.currentIndex = 0;
  } else if (carousel.currentIndex < 0) {
    carousel.currentIndex = totalCards - visibleCards;
  }

  const translateX = -carousel.currentIndex * cardWidth;
  wrapper.style.transform = `translateX(${translateX}px)`;
}

// --- BOTONES CARRUSEL ---
function setupCarouselButtons() {
  const navButtons = document.querySelectorAll(".carousel-nav");
  navButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.getAttribute("data-category");
      const direction = parseInt(button.getAttribute("data-direction"));
      moveCarousel(category, direction);
    });
  });
}

// --- MODAL ---
async function fetchCredits(movieId) {
  const res = await fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=es-ES`);
  const data = await res.json();

  const director = data.crew.find(person => person.job === "Director");
  const topCast = data.cast.slice(0, 3).map(actor => actor.name).join(", ");

  return {
    director: director?.name || "No disponible",
    cast: topCast || "No disponible"
  };
}

async function openMovieModal(movieId) {
  const res = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=es-ES`);
  const movie = await res.json();
  const credits = await fetchCredits(movieId);

  document.getElementById("modalPoster").src = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '/placeholder.svg';
  document.getElementById("modalPoster").alt = movie.title;
  document.getElementById("modalTitle").textContent = movie.title;
  document.getElementById("modalYear").textContent = movie.release_date?.slice(0, 4) || "N/A";
  document.getElementById("modalGenre").textContent = movie.genres.map(g => g.name).join(", ");
  document.getElementById("modalRating").textContent = `⭐ ${movie.vote_average?.toFixed(1) || "N/A"}`;
  document.getElementById("modalDescription").textContent = movie.overview || "Sin descripción";
  document.getElementById("modalDirector").textContent = credits.director;
  document.getElementById("modalCast").textContent = credits.cast;
  document.getElementById("modalDuration").textContent = movie.runtime ? `${movie.runtime} min` : "Duración desconocida";

  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

function closeMovieModal() {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
}

// --- AUTO SCROLL ---
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!isSearching) {
      Object.keys(carousels).forEach((category) => moveCarousel(category, 1));
    }
  }, 5000);
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval);
    autoScrollInterval = null;
  }
}

// --- BUSCADOR ---
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim();
  if (searchTerm === "") {
    isSearching = false;
    createCarousels();
    startAutoScroll();
    return;
  }

  isSearching = true;
  stopAutoScroll();
  searchMovies(searchTerm);
}

async function searchMovies(query) {
  const res = await fetch(`${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(query)}`);
  const data = await res.json();
  showSearchResults(data.results, query);
}

function showSearchResults(movies, searchTerm) {
  categoriesContainer.innerHTML = `
    <div class="search-results">
      <h2 class="category-title">Resultados para "${searchTerm}" (${movies.length})</h2>
      <div class="movies-grid">
        ${
          movies.length > 0
            ? movies.map(createMovieCard).join("")
            : '<p style="color: #999; text-align: center; grid-column: 1 / -1;">No se encontraron películas</p>'
        }
      </div>
    </div>
  `;
}

// --- CLICK GLOBAL PARA MODAL ---
document.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card");
  if (card) {
    const movieId = parseInt(card.getAttribute("data-movie-id"));
    openMovieModal(movieId);
  }

  if (e.target.classList.contains("watch-btn") || e.target.classList.contains("play-btn")) {
    alert("¡Función de reproducción no implementada!");
  }
});
