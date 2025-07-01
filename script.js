// Claves y URLs base para la API de TMDB y las imágenes
const apiKey = "d4e5e3959720612e68014b13504975d2"
const baseUrl = "https://api.themoviedb.org/3"
const imageBaseUrl = "https://image.tmdb.org/t/p/w500"

// Diccionario de géneros con sus IDs de TMDB
const genreIds = {
  Acción: 28,
  Aventura: 12,
  Animación: 16,
  Comedia: 35,
  Crimen: 80,
  Documental: 99,
  Drama: 18,
  Familia: 10751,
  Fantasía: 14,
  Historia: 36,
  Terror: 27,
  Misterio: 9648,
  Música: 10402,
  Romance: 10749,
  "Ciencia Ficción": 878,
  Suspenso: 53,
  Bélica: 10752,
  Western: 37,
}

// Objeto para almacenar referencias a los carouseles por categoría
const carousels = {}
let isSearching = false

// Referencias a elementos del DOM
const categoriesContainer = document.getElementById("categoriesContainer")
const searchInput = document.getElementById("searchInput")
const modal = document.getElementById("movieModal")
const closeModal = document.getElementById("closeModal")
const loadingScreen = document.getElementById("loadingScreen")

// Función mejorada para detectar dispositivos táctiles
const isTouchDevice = () => {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0
}

// Función para detectar si es móvil o tablet - ACTUALIZADA
const isMobileOrTablet = () => {
  return window.matchMedia("(max-width: 1024px)").matches || isTouchDevice()
}

// Evento principal al cargar la página
document.addEventListener("DOMContentLoaded", async () => {
  showLoadingScreen() // Muestra pantalla de carga
  await createCarousels() // Crea los carouseles de películas por género
  setupEventListeners() // Configura los listeners de eventos
  setupTouchEvents() // Configura scroll táctil siempre
  hideLoadingScreen() // Oculta pantalla de carga
})

// Muestra la pantalla de carga
function showLoadingScreen() {
  loadingScreen.style.display = "flex"
}

// Oculta la pantalla de carga con animación
function hideLoadingScreen() {
  loadingScreen.style.opacity = "0"
  setTimeout(() => {
    loadingScreen.style.display = "none"
  }, 500)
}

// Configura listeners para búsqueda, cierre de modal y escape
function setupEventListeners() {
  searchInput.addEventListener("input", debounce(handleSearch, 300))
  closeModal.addEventListener("click", closeMovieModal)
  document.addEventListener("keydown", (e) => e.key === "Escape" && closeMovieModal())
}

// Función debounce para limitar la frecuencia de ejecución
function debounce(func, wait) {
  let timeout
  return function (...args) {
    clearTimeout(timeout)
    timeout = setTimeout(() => func.apply(this, args), wait)
  }
}

// Busca películas por género usando la API de TMDB
async function fetchMoviesByGenre(genreId, pages = 2) {
  const movies = []
  for (let page = 1; page <= pages; page++) {
    const res = await fetch(
      `${baseUrl}/discover/movie?api_key=${apiKey}&language=es-ES&sort_by=popularity.desc&with_genres=${genreId}&page=${page}`,
    )
    const data = await res.json()
    movies.push(...data.results)
  }
  return movies.slice(0, 40) // Limita a 40 películas por género
}

// Crea los carouseles de películas por cada género
async function createCarousels() {
  categoriesContainer.innerHTML = ""

  for (const category in genreIds) {
    const movies = await fetchMoviesByGenre(genreIds[category])
    renderCategory(category, movies)
  }

  // Configura navegación por botones (desktop) y scroll táctil (touch)
  setupCarouselNavigation()
}

// Renderiza una categoría y su carrusel de películas
function renderCategory(category, movies) {
  const categoryId = category.toLowerCase().replace(/\s+/g, "-")
  const section = document.createElement("div")
  section.className = "mb-5 carousel-section"

  section.innerHTML = `
    <h2 class="text-white fs-4 mb-3 ps-2">${category}</h2>
    <div class="carousel-container position-relative">
      <button class="carousel-nav prev d-none d-lg-flex position-absolute start-0 top-50 translate-middle-y" data-category="${category}" data-direction="-1">
        <i class="bi bi-chevron-left"></i>
      </button>
      <div class="d-flex overflow-hidden gap-2 carousel-wrapper px-5" id="wrapper-${categoryId}">
        ${movies.map(createMovieCard).join("")}
      </div>
      <button class="carousel-nav next d-none d-lg-flex position-absolute end-0 top-50 translate-middle-y" data-category="${category}" data-direction="1">
        <i class="bi bi-chevron-right"></i>
      </button>
    </div>
  `

  categoriesContainer.appendChild(section)

  // Guarda referencia al carrusel para navegación
  carousels[category] = {
    wrapper: section.querySelector(`#wrapper-${categoryId}`),
    cardWidth: 200,
    currentIndex: 0,
  }
}

// Crea el HTML de una tarjeta de película
function createMovieCard(movie) {
  const poster = movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : "placeholder.svg"
  const title = movie.title || "Sin título"
  const rating = movie.vote_average?.toFixed(1) || "N/A"

  return `
    <div class="movie-card position-relative" data-movie-id="${movie.id}">
      <span class="badge bg-danger position-absolute top-0 start-0 m-2">${rating}</span>
      <img src="${poster}" alt="${title}" class="movie-poster w-100 h-100 object-fit-cover rounded" onerror="this.src='placeholder.svg'"/>
    </div>
  `
}

// Configura scroll horizontal táctil para móviles/tablets
function setupTouchEvents() {
  const wrappers = document.querySelectorAll(".carousel-wrapper")

  wrappers.forEach((wrapper) => {
    // Configura estilos para scroll táctil
    wrapper.style.overflowX = "auto"
    wrapper.style.scrollBehavior = "smooth"
    wrapper.style.scrollbarWidth = "none" // Firefox
    wrapper.style.msOverflowStyle = "none" // IE/Edge
    wrapper.style.cursor = "grab"

    // Oculta scrollbar en webkit
    wrapper.style.setProperty("-webkit-scrollbar", "none", "important")

    let isDown = false
    let startX
    let scrollLeft
    let velocity = 0
    let lastX = 0
    let lastTime = 0

    // Eventos touch para móviles y tablets
    wrapper.addEventListener(
      "touchstart",
      (e) => {
        isDown = true
        const touch = e.touches[0]
        startX = touch.pageX - wrapper.offsetLeft
        scrollLeft = wrapper.scrollLeft
        lastX = touch.pageX
        lastTime = Date.now()
        wrapper.style.touchAction = "pan-x" // Solo scroll horizontal
      },
      { passive: true },
    )

    wrapper.addEventListener(
      "touchmove",
      (e) => {
        if (!isDown) return

        const touch = e.touches[0]
        const x = touch.pageX - wrapper.offsetLeft
        const walk = (x - startX) * 1.5 // Sensibilidad del scroll
        wrapper.scrollLeft = scrollLeft - walk

        // Calcula velocidad para momentum
        const currentTime = Date.now()
        velocity = (touch.pageX - lastX) / (currentTime - lastTime)
        lastX = touch.pageX
        lastTime = currentTime

        // Prevenir scroll vertical si se mueve horizontalmente
        if (Math.abs(walk) > 10) {
          e.preventDefault()
        }
      },
      { passive: false },
    )

    wrapper.addEventListener("touchend", () => {
      isDown = false
      wrapper.style.touchAction = "auto"
      applyMomentum()
    })

    // Eventos mouse para drag en desktop/tablet
    wrapper.addEventListener("mousedown", (e) => {
      if (window.innerWidth > 1024) return // Solo en tablets
      isDown = true
      wrapper.style.cursor = "grabbing"
      startX = e.pageX - wrapper.offsetLeft
      scrollLeft = wrapper.scrollLeft
      lastX = e.pageX
      lastTime = Date.now()
      e.preventDefault()
    })

    wrapper.addEventListener("mouseleave", () => {
      isDown = false
      wrapper.style.cursor = "grab"
    })

    wrapper.addEventListener("mouseup", () => {
      isDown = false
      wrapper.style.cursor = "grab"
      applyMomentum()
    })

    wrapper.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - wrapper.offsetLeft
      const walk = (x - startX) * 2
      wrapper.scrollLeft = scrollLeft - walk

      // Calcula velocidad
      const currentTime = Date.now()
      velocity = (e.pageX - lastX) / (currentTime - lastTime)
      lastX = e.pageX
      lastTime = currentTime
    })

    // Función para aplicar momentum/inercia al scroll
    function applyMomentum() {
      if (Math.abs(velocity) > 0.5) {
        const momentum = velocity * 100 // Factor de momentum
        const targetScroll = wrapper.scrollLeft - momentum

        // Scroll suave con inercia
        wrapper.scrollTo({
          left: Math.max(0, Math.min(targetScroll, wrapper.scrollWidth - wrapper.clientWidth)),
          behavior: "smooth",
        })
      }
      velocity = 0
    }

    // Snap automático a la tarjeta más cercana al dejar de hacer scroll
    let scrollTimeout
    wrapper.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        if (!isDown) {
          snapToNearestCard()
        }
      }, 150)
    })

    // Función para alinear el scroll a la tarjeta más cercana
    function snapToNearestCard() {
      const cardWidth = 160 // Ajusta según el ancho de tus tarjetas
      const scrollPosition = wrapper.scrollLeft
      const nearestCard = Math.round(scrollPosition / cardWidth)
      const targetPosition = nearestCard * cardWidth

      wrapper.scrollTo({
        left: targetPosition,
        behavior: "smooth",
      })
    }
  })
}

// Configura navegación por botones en los carouseles (desktop)
function setupCarouselNavigation() {
  document.querySelectorAll(".carousel-nav").forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.dataset.category
      const direction = Number.parseInt(btn.dataset.direction)
      const carousel = carousels[category]

      if (!carousel) return

      const wrapper = carousel.wrapper
      const scrollAmount = wrapper.clientWidth * 0.7

      wrapper.scrollTo({
        left: wrapper.scrollLeft + direction * scrollAmount,
        behavior: "smooth",
      })
    })
  })
}

// Maneja la búsqueda de películas por texto
async function handleSearch(e) {
  const term = e.target.value.trim()

  if (!term) {
    isSearching = false
    createCarousels()
    return
  }

  isSearching = true

  try {
    const res = await fetch(
      `${baseUrl}/search/movie?api_key=${apiKey}&language=es-ES&query=${encodeURIComponent(term)}`,
    )
    const data = await res.json()
    showSearchResults(data.results, term)
  } catch (error) {
    console.error("Search error:", error)
    showSearchResults([], term)
  }
}

// Muestra los resultados de búsqueda en pantalla
function showSearchResults(movies, query) {
  categoriesContainer.innerHTML = `
    <div class="search-results">
      <h2 class="text-white mb-4 ps-2">Resultados para "${query}" (${movies.length})</h2>
      <div class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6 g-3">
        ${movies.length > 0 ? movies.map(createMovieCard).join("") : '<p class="text-white text-center col-12">No se encontraron películas</p>'}
      </div>
    </div>
  `
}

// Listener global para abrir el modal al hacer click en una tarjeta de película
document.addEventListener("click", (e) => {
  const card = e.target.closest(".movie-card")
  if (card) {
    const movieId = Number.parseInt(card.getAttribute("data-movie-id"))
    openMovieModal(movieId)
  }
})

// Obtiene director y elenco de una película usando la API de TMDB
async function fetchCredits(movieId) {
  try {
    const res = await fetch(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}&language=es-ES`)
    const data = await res.json()
    const director = data.crew.find((p) => p.job === "Director")
    const cast = data.cast
      .slice(0, 5)
      .map((a) => a.name)
      .join(", ")

    return {
      director: director?.name || "No disponible",
      cast: cast || "No disponible",
    }
  } catch (error) {
    console.error("Error fetching credits:", error)
    return {
      director: "No disponible",
      cast: "No disponible",
    }
  }
}

// Obtiene proveedores de streaming para una película
async function fetchWatchProviders(movieId) {
  try {
    const res = await fetch(`${baseUrl}/movie/${movieId}/watch/providers?api_key=${apiKey}`)
    const data = await res.json()
    const providers = data.results?.AR?.flatrate || data.results?.US?.flatrate || []

    return providers.map((provider) => ({
      name: provider.provider_name,
      logo: provider.logo_path ? `${imageBaseUrl}${provider.logo_path}` : null,
      link: `https://www.themoviedb.org/movie/${movieId}/watch?locale=AR`,
    }))
  } catch (error) {
    console.error("Error fetching providers:", error)
    return []
  }
}

// Abre el modal con la información detallada de la película seleccionada
async function openMovieModal(movieId) {
  try {
    // Obtiene datos de la película, créditos y proveedores en paralelo
    const [movieRes, creditsRes, providersRes] = await Promise.all([
      fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}&language=es-ES`),
      fetchCredits(movieId),
      fetchWatchProviders(movieId),
    ])

    const movie = await movieRes.json()

    // Rellena los campos del modal con la información obtenida
    document.getElementById("modalPoster").src = movie.poster_path
      ? `${imageBaseUrl}${movie.poster_path}`
      : "placeholder.svg"
    document.getElementById("modalTitle").textContent = movie.title || "Sin título"
    document.getElementById("modalYear").textContent = movie.release_date?.slice(0, 4) || "N/A"
    document.getElementById("modalGenre").textContent = movie.genres?.map((g) => g.name).join(", ") || "No disponible"
    document.getElementById("modalRating").textContent = `🍿 ${movie.vote_average?.toFixed(1) || "N/A"}`
    document.getElementById("modalDescription").textContent = movie.overview || "Sin descripción disponible."
    document.getElementById("modalDirector").textContent = creditsRes.director
    document.getElementById("modalCast").textContent = creditsRes.cast
    document.getElementById("modalDuration").textContent = movie.runtime
      ? `${movie.runtime} min`
      : "Duración desconocida"

    // Muestra los proveedores de streaming si existen
    const providersContainer = document.getElementById("modalProviders")
    if (providersRes.length > 0) {
      providersContainer.innerHTML = providersRes
        .map(
          (p) => `
        <a href="${p.link}" target="_blank" title="${p.name}" class="me-2 btn btn-outline-light d-inline-flex align-items-center gap-2">
          <img src="${p.logo}" alt="${p.name}" height="24" style="object-fit: contain; border-radius: 4px;"/>
          <span class="small">${p.name}</span>
        </a>
      `,
        )
        .join("")
    } else {
      providersContainer.innerHTML = '<p class="text-white">No disponible en streaming</p>'
    }

    // Muestra el modal y bloquea el scroll de fondo
    modal.style.display = "block"
    document.body.style.overflow = "hidden"
  } catch (error) {
    console.error("Error opening modal:", error)
    alert("Error al cargar la información de la película")
  }
}

// Cierra el modal de la película
function closeMovieModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}
