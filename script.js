// Base de datos de películas organizadas por categorías
const moviesByCategory = {
  Terror: [
    {
      id: 1,
      title: "El Conjuro",
      year: 2013,
      genre: "Terror",
      rating: "7.5",
      poster: "https://placehold.co/600x400",
      description:
        "Los investigadores paranormales Ed y Lorraine Warren trabajan para ayudar a una familia aterrorizada por una presencia oscura en su granja.",
      director: "James Wan",
      cast: "Vera Farmiga, Patrick Wilson, Lili Taylor",
      duration: "112 min",
    },
    {
      id: 2,
      title: "Hereditary",
      year: 2018,
      genre: "Terror",
      rating: "7.3",
      poster: "https://placehold.co/600x400",
      description:
        "Una familia en duelo se ve atormentada por tragedias y secretos perturbadores que los llevan al borde de la locura.",
      director: "Ari Aster",
      cast: "Toni Collette, Alex Wolff, Milly Shapiro",
      duration: "127 min",
    },
    {
      id: 3,
      title: "It",
      year: 2017,
      genre: "Terror",
      rating: "7.3",
      poster: "https://placehold.co/600x400",
      description:
        "Un grupo de niños marginados se enfrentan a sus peores miedos cuando se encuentran cara a cara con Pennywise, un payaso malvado.",
      director: "Andy Muschietti",
      cast: "Bill Skarsgård, Jaeden Martell, Finn Wolfhard",
      duration: "135 min",
    },
    {
      id: 4,
      title: "El Exorcista",
      year: 1973,
      genre: "Terror",
      rating: "8.1",
      poster: "https://placehold.co/600x400",
      description: "Una madre busca la ayuda de dos sacerdotes para salvar a su hija de una misteriosa enfermedad.",
      director: "William Friedkin",
      cast: "Ellen Burstyn, Max von Sydow, Linda Blair",
      duration: "122 min",
    },
    {
      id: 5,
      title: "Midsommar",
      year: 2019,
      genre: "Terror",
      rating: "7.1",
      poster: "https://placehold.co/600x400",
      description:
        "Una pareja viaja a Suecia para asistir a un festival de verano, pero lo que encuentran es una pesadilla pagana.",
      director: "Ari Aster",
      cast: "Florence Pugh, Jack Reynor, William Jackson Harper",
      duration: "148 min",
    },
    {
      id: 6,
      title: "Scream",
      year: 1996,
      genre: "Terror",
      rating: "7.4",
      poster: "https://placehold.co/600x400",
      description: "Un asesino en serie aterroriza a los estudiantes de secundaria en el pequeño pueblo de Woodsboro.",
      director: "Wes Craven",
      cast: "Neve Campbell, Courteney Cox, David Arquette",
      duration: "111 min",
    },
  ],
  Acción: [
    {
      id: 7,
      title: "John Wick",
      year: 2014,
      genre: "Acción",
      rating: "7.4",
      poster: "https://placehold.co/600x400",
      description: "Un ex-asesino a sueldo sale de su retiro para rastrear a los gángsters que mataron a su perro.",
      director: "Chad Stahelski",
      cast: "Keanu Reeves, Michael Nyqvist, Alfie Allen",
      duration: "101 min",
    },
    {
      id: 8,
      title: "Mad Max: Fury Road",
      year: 2015,
      genre: "Acción",
      rating: "8.1",
      poster: "https://placehold.co/600x400",
      description:
        "En un mundo post-apocalíptico, Max se une a Furiosa para escapar de un señor de la guerra tiránico.",
      director: "George Miller",
      cast: "Tom Hardy, Charlize Theron, Nicholas Hoult",
      duration: "120 min",
    },
    {
      id: 9,
      title: "Die Hard",
      year: 1988,
      genre: "Acción",
      rating: "8.2",
      poster: "https://placehold.co/600x400",
      description: "Un policía de Nueva York lucha contra terroristas en un rascacielos de Los Ángeles.",
      director: "John McTiernan",
      cast: "Bruce Willis, Alan Rickman, Bonnie Bedelia",
      duration: "132 min",
    },
    {
      id: 10,
      title: "The Matrix",
      year: 1999,
      genre: "Acción",
      rating: "8.7",
      poster: "https://placehold.co/600x400",
      description: "Un hacker descubre que la realidad es una simulación y se une a una rebelión contra las máquinas.",
      director: "Lana y Lilly Wachowski",
      cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss",
      duration: "136 min",
    },
    {
      id: 11,
      title: "Terminator 2",
      year: 1991,
      genre: "Acción",
      rating: "8.6",
      poster: "https://placehold.co/600x400",
      description: "Un cyborg del futuro protege a John Connor de un Terminator más avanzado.",
      director: "James Cameron",
      cast: "Arnold Schwarzenegger, Linda Hamilton, Edward Furlong",
      duration: "137 min",
    },
    {
      id: 12,
      title: "Speed",
      year: 1994,
      genre: "Acción",
      rating: "7.3",
      poster: "https://placehold.co/600x400",
      description: "Un autobús con una bomba debe mantener una velocidad mínima o explotará.",
      director: "Jan de Bont",
      cast: "Keanu Reeves, Sandra Bullock, Dennis Hopper",
      duration: "116 min",
    },
  ],
  Drama: [
    {
      id: 13,
      title: "El Padrino",
      year: 1972,
      genre: "Drama",
      rating: "9.2",
      poster: "https://placehold.co/600x400",
      description: "La historia de la familia Corleone, una poderosa dinastía del crimen organizado.",
      director: "Francis Ford Coppola",
      cast: "Marlon Brando, Al Pacino, James Caan",
      duration: "175 min",
    },
    {
      id: 14,
      title: "Forrest Gump",
      year: 1994,
      genre: "Drama",
      rating: "8.8",
      poster: "https://placehold.co/600x400",
      description: "La extraordinaria vida de un hombre que influye en varios eventos históricos.",
      director: "Robert Zemeckis",
      cast: "Tom Hanks, Robin Wright, Gary Sinise",
      duration: "142 min",
    },
    {
      id: 15,
      title: "12 Años de Esclavitud",
      year: 2013,
      genre: "Drama",
      rating: "8.1",
      poster: "https://placehold.co/600x400",
      description: "La historia real de Solomon Northup, un hombre libre vendido como esclavo.",
      director: "Steve McQueen",
      cast: "Chiwetel Ejiofor, Michael Fassbender, Lupita Nyong'o",
      duration: "134 min",
    },
    {
      id: 16,
      title: "Moonlight",
      year: 2016,
      genre: "Drama",
      rating: "7.4",
      poster: "https://placehold.co/600x400",
      description: "La vida de un joven afroamericano mientras navega por la infancia, adolescencia y adultez.",
      director: "Barry Jenkins",
      cast: "Mahershala Ali, Naomie Harris, Trevante Rhodes",
      duration: "111 min",
    },
    {
      id: 17,
      title: "There Will Be Blood",
      year: 2007,
      genre: "Drama",
      rating: "8.2",
      poster: "https://placehold.co/600x400",
      description: "Un magnate del petróleo se obsesiona con el poder y la riqueza en el oeste americano.",
      director: "Paul Thomas Anderson",
      cast: "Daniel Day-Lewis, Paul Dano, Ciarán Hinds",
      duration: "158 min",
    },
    {
      id: 18,
      title: "Manchester by the Sea",
      year: 2016,
      genre: "Drama",
      rating: "7.8",
      poster: "https://placehold.co/600x400",
      description: "Un hombre debe cuidar a su sobrino después de la muerte de su hermano.",
      director: "Kenneth Lonergan",
      cast: "Casey Affleck, Michelle Williams, Kyle Chandler",
      duration: "137 min",
    },
  ],
  Comedia: [
    {
      id: 19,
      title: "Superbad",
      year: 2007,
      genre: "Comedia",
      rating: "7.6",
      poster: "https://placehold.co/600x400",
      description: "Dos mejores amigos intentan conseguir alcohol para una fiesta antes de graduarse.",
      director: "Greg Mottola",
      cast: "Jonah Hill, Michael Cera, Christopher Mintz-Plasse",
      duration: "113 min",
    },
    {
      id: 20,
      title: "The Grand Budapest Hotel",
      year: 2014,
      genre: "Comedia",
      rating: "8.1",
      poster: "https://placehold.co/600x400",
      description: "Las aventuras de un conserje legendario y su protégé en un famoso hotel europeo.",
      director: "Wes Anderson",
      cast: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric",
      duration: "99 min",
    },
    {
      id: 21,
      title: "Anchorman",
      year: 2004,
      genre: "Comedia",
      rating: "7.2",
      poster: "https://placehold.co/600x400",
      description: "Un presentador de noticias narcisista debe adaptarse cuando llega una mujer reportera.",
      director: "Adam McKay",
      cast: "Will Ferrell, Christina Applegate, Paul Rudd",
      duration: "94 min",
    },
    {
      id: 22,
      title: "Bridesmaids",
      year: 2011,
      genre: "Comedia",
      rating: "6.8",
      poster: "https://placehold.co/600x400",
      description: "Una mujer lucha con los preparativos de la boda de su mejor amiga.",
      director: "Paul Feig",
      cast: "Kristen Wiig, Maya Rudolph, Rose Byrne",
      duration: "125 min",
    },
    {
      id: 23,
      title: "Tropic Thunder",
      year: 2008,
      genre: "Comedia",
      rating: "7.1",
      poster: "https://placehold.co/600x400",
      description: "Un grupo de actores prima donna se encuentra en una situación de combate real.",
      director: "Ben Stiller",
      cast: "Ben Stiller, Jack Black, Robert Downey Jr.",
      duration: "107 min",
    },
    {
      id: 24,
      title: "Knives Out",
      year: 2019,
      genre: "Comedia",
      rating: "7.9",
      poster: "https://placehold.co/600x400",
      description: "Un detective investiga la muerte de un patriarca de una familia disfuncional.",
      director: "Rian Johnson",
      cast: "Daniel Craig, Chris Evans, Ana de Armas",
      duration: "130 min",
    },
  ],
  "Ciencia Ficción": [
    {
      id: 25,
      title: "Blade Runner 2049",
      year: 2017,
      genre: "Ciencia Ficción",
      rating: "8.0",
      poster: "https://placehold.co/600x400",
      description: "Un joven blade runner descubre un secreto que lo lleva a buscar a Rick Deckard.",
      director: "Denis Villeneuve",
      cast: "Ryan Gosling, Harrison Ford, Ana de Armas",
      duration: "164 min",
    },
    {
      id: 26,
      title: "Interstellar",
      year: 2014,
      genre: "Ciencia Ficción",
      rating: "8.6",
      poster: "https://placehold.co/600x400",
      description: "Un grupo de astronautas viaja a través de un agujero de gusano para salvar a la humanidad.",
      director: "Christopher Nolan",
      cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain",
      duration: "169 min",
    },
    {
      id: 27,
      title: "Ex Machina",
      year: 2014,
      genre: "Ciencia Ficción",
      rating: "7.7",
      poster: "https://placehold.co/600x400",
      description: "Un programador participa en un experimento con inteligencia artificial.",
      director: "Alex Garland",
      cast: "Domhnall Gleeson, Alicia Vikander, Oscar Isaac",
      duration: "108 min",
    },
    {
      id: 28,
      title: "Arrival",
      year: 2016,
      genre: "Ciencia Ficción",
      rating: "7.9",
      poster: "https://placehold.co/600x400",
      description: "Una lingüista trabaja con el ejército para comunicarse con extraterrestres.",
      director: "Denis Villeneuve",
      cast: "Amy Adams, Jeremy Renner, Forest Whitaker",
      duration: "116 min",
    },
    {
      id: 29,
      title: "Her",
      year: 2013,
      genre: "Ciencia Ficción",
      rating: "8.0",
      poster: "https://placehold.co/600x400",
      description: "Un hombre se enamora de un sistema operativo con inteligencia artificial.",
      director: "Spike Jonze",
      cast: "Joaquin Phoenix, Scarlett Johansson, Amy Adams",
      duration: "126 min",
    },
    {
      id: 30,
      title: "Dune",
      year: 2021,
      genre: "Ciencia Ficción",
      rating: "8.0",
      poster: "https://placehold.co/600x400",
      description: "Paul Atreides lidera una rebelión para liberar su mundo del control de una casa rival.",
      director: "Denis Villeneuve",
      cast: "Timothée Chalamet, Rebecca Ferguson, Oscar Isaac",
      duration: "155 min",
    },
  ],
  Romance: [
    {
      id: 31,
      title: "Titanic",
      year: 1997,
      genre: "Romance",
      rating: "7.9",
      poster: "https://placehold.co/600x400",
      description: "La épica historia de amor entre Jack y Rose a bordo del RMS Titanic.",
      director: "James Cameron",
      cast: "Leonardo DiCaprio, Kate Winslet, Billy Zane",
      duration: "194 min",
    },
    {
      id: 32,
      title: "La La Land",
      year: 2016,
      genre: "Romance",
      rating: "8.0",
      poster: "https://placehold.co/600x400",
      description: "Un pianista de jazz y una aspirante a actriz se enamoran en Los Ángeles.",
      director: "Damien Chazelle",
      cast: "Ryan Gosling, Emma Stone, John Legend",
      duration: "128 min",
    },
    {
      id: 33,
      title: "El Diario de Noah",
      year: 2004,
      genre: "Romance",
      rating: "7.8",
      poster: "https://placehold.co/600x400",
      description: "Un hombre lee a una mujer la historia de dos jóvenes amantes de los años 40.",
      director: "Nick Cassavetes",
      cast: "Ryan Gosling, Rachel McAdams, James Garner",
      duration: "123 min",
    },
    {
      id: 34,
      title: "Casablanca",
      year: 1942,
      genre: "Romance",
      rating: "8.5",
      poster: "https://placehold.co/600x400",
      description: "Un expatriado americano debe elegir entre su amor y ayudar a su ex-amante a escapar.",
      director: "Michael Curtiz",
      cast: "Humphrey Bogart, Ingrid Bergman, Paul Henreid",
      duration: "102 min",
    },
    {
      id: 35,
      title: "Eterno Resplandor",
      year: 2004,
      genre: "Romance",
      rating: "8.3",
      poster: "https://placehold.co/600x400",
      description: "Una pareja se somete a un procedimiento para borrar los recuerdos de su relación.",
      director: "Michel Gondry",
      cast: "Jim Carrey, Kate Winslet, Kirsten Dunst",
      duration: "108 min",
    },
    {
      id: 36,
      title: "Before Sunset",
      year: 2004,
      genre: "Romance",
      rating: "8.1",
      poster: "https://placehold.co/600x400",
      description: "Nueve años después, Jesse y Celine se reencuentran en París.",
      director: "Richard Linklater",
      cast: "Ethan Hawke, Julie Delpy, Vernon Dobtcheff",
      duration: "80 min",
    },
  ],
}

// Variables globales
const carousels = {}
let isSearching = false
let autoScrollInterval = null

// Elementos del DOM
const categoriesContainer = document.getElementById("categoriesContainer")
const searchInput = document.getElementById("searchInput")
const modal = document.getElementById("movieModal")
const closeModal = document.getElementById("closeModal")

// Funciones principales - definidas primero
function moveCarousel(category, direction) {
  const carousel = carousels[category]
  if (!carousel || !carousel.wrapper) return

  const wrapper = carousel.wrapper
  const cardWidth = 210 // 200px + 10px gap
  const containerWidth = wrapper.parentElement.offsetWidth
  const visibleCards = Math.floor(containerWidth / cardWidth)
  const totalOriginalCards = moviesByCategory[category].length

  // Actualizar índice
  carousel.currentIndex += direction * visibleCards

  // Lógica del carrusel infinito
  if (carousel.currentIndex >= totalOriginalCards * 2) {
    carousel.currentIndex = totalOriginalCards
  } else if (carousel.currentIndex < 0) {
    carousel.currentIndex = totalOriginalCards - visibleCards
  }

  // Aplicar transformación
  const translateX = -carousel.currentIndex * cardWidth
  wrapper.style.transform = `translateX(${translateX}px)`
}

function openMovieModal(movieId) {
  // Buscar la película en todas las categorías
  const allMovies = Object.values(moviesByCategory).flat()
  const movie = allMovies.find((m) => m.id === movieId)

  if (!movie) return

  // Llenar información del modal
  document.getElementById("modalPoster").src = movie.poster
  document.getElementById("modalPoster").alt = movie.title
  document.getElementById("modalTitle").textContent = movie.title
  document.getElementById("modalYear").textContent = movie.year
  document.getElementById("modalGenre").textContent = movie.genre
  document.getElementById("modalRating").textContent = `⭐ ${movie.rating}`
  document.getElementById("modalDescription").textContent = movie.description
  document.getElementById("modalDirector").textContent = movie.director
  document.getElementById("modalCast").textContent = movie.cast
  document.getElementById("modalDuration").textContent = movie.duration

  // Mostrar modal
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeMovieModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Inicializar la aplicación
document.addEventListener("DOMContentLoaded", () => {
  createCarousels()
  setupEventListeners()
  startAutoScroll()
})

// Configurar event listeners
function setupEventListeners() {
  // Búsqueda
  searchInput.addEventListener("input", handleSearch)

  // Modal
  closeModal.addEventListener("click", closeMovieModal)
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      closeMovieModal()
    }
  })

  // Cerrar modal con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeMovieModal()
    }
  })
}

// Crear carruseles para cada categoría
function createCarousels() {
  categoriesContainer.innerHTML = ""

  Object.keys(moviesByCategory).forEach((category) => {
    const categorySection = document.createElement("div")
    categorySection.className = "category-section"

    const categoryId = category.replace(/\s+/g, "-").toLowerCase()

    categorySection.innerHTML = `
      <h2 class="category-title">${category}</h2>
      <div class="carousel-container" id="carousel-${categoryId}">
        <button class="carousel-nav prev" data-category="${category}" data-direction="-1">‹</button>
        <div class="carousel-wrapper" id="wrapper-${categoryId}"></div>
        <button class="carousel-nav next" data-category="${category}" data-direction="1">›</button>
      </div>
    `

    categoriesContainer.appendChild(categorySection)

    // Configurar carrusel
    const wrapper = document.getElementById(`wrapper-${categoryId}`)
    const originalMovies = moviesByCategory[category]

    // Crear contenido triplicado para efecto infinito
    wrapper.innerHTML = createMovieCards([...originalMovies, ...originalMovies, ...originalMovies])

    // Inicializar datos del carrusel
    carousels[category] = {
      currentIndex: originalMovies.length, // Empezar en el medio
      wrapper: wrapper,
      totalOriginal: originalMovies.length,
    }

    // Posición inicial
    const cardWidth = 210
    wrapper.style.transform = `translateX(${-originalMovies.length * cardWidth}px)`
  })

  // Configurar event listeners para los botones
  setupCarouselButtons()
}

// Configurar botones del carrusel
function setupCarouselButtons() {
  const navButtons = document.querySelectorAll(".carousel-nav")

  navButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const category = e.target.getAttribute("data-category")
      const direction = Number.parseInt(e.target.getAttribute("data-direction"))
      moveCarousel(category, direction)
    })
  })
}

// Crear tarjetas de películas
function createMovieCards(movies) {
  return movies
    .map(
      (movie) => `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-rating">${movie.rating}</div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// Event delegation para las tarjetas de películas
document.addEventListener("click", (e) => {
  const movieCard = e.target.closest(".movie-card")
  if (movieCard) {
    const movieId = Number.parseInt(movieCard.getAttribute("data-movie-id"))
    openMovieModal(movieId)
  }
})

// Auto-scroll para los carruseles
function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    if (!isSearching) {
      Object.keys(carousels).forEach((category) => {
        moveCarousel(category, 1)
      })
    }
  }, 5000) // Cambiar cada 5 segundos
}

function stopAutoScroll() {
  if (autoScrollInterval) {
    clearInterval(autoScrollInterval)
    autoScrollInterval = null
  }
}

// Manejar búsqueda
function handleSearch(e) {
  const searchTerm = e.target.value.toLowerCase().trim()

  if (searchTerm === "") {
    isSearching = false
    createCarousels()
    startAutoScroll()
    return
  }

  isSearching = true
  stopAutoScroll()

  // Buscar en todas las categorías
  const allMovies = Object.values(moviesByCategory).flat()
  const filteredMovies = allMovies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.genre.toLowerCase().includes(searchTerm) ||
      movie.director.toLowerCase().includes(searchTerm) ||
      movie.cast.toLowerCase().includes(searchTerm),
  )

  // Mostrar resultados de búsqueda
  showSearchResults(filteredMovies, searchTerm)
}

// Mostrar resultados de búsqueda
function showSearchResults(movies, searchTerm) {
  categoriesContainer.innerHTML = `
    <div class="search-results">
      <h2 class="category-title">Resultados para "${searchTerm}" (${movies.length})</h2>
      <div class="movies-grid">
        ${movies.length > 0 ? createSearchMovieCards(movies) : '<p style="color: #999; text-align: center; grid-column: 1 / -1;">No se encontraron películas</p>'}
      </div>
    </div>
  `
}

// Crear tarjetas para resultados de búsqueda
function createSearchMovieCards(movies) {
  return movies
    .map(
      (movie) => `
        <div class="movie-card" data-movie-id="${movie.id}">
            <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
            <div class="movie-rating">${movie.rating}</div>
            <div class="movie-info">
                <h3 class="movie-title">${movie.title}</h3>
                <p class="movie-year">${movie.year} • ${movie.genre}</p>
            </div>
        </div>
    `,
    )
    .join("")
}

// Efectos del header
document.addEventListener("scroll", () => {
  const header = document.querySelector(".header")
  if (window.scrollY > 100) {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.95)"
  } else {
    header.style.backgroundColor = "rgba(0, 0, 0, 0.9)"
  }
})

// Hacer funciones globales para compatibilidad
window.moveCarousel = moveCarousel
window.openMovieModal = openMovieModal
