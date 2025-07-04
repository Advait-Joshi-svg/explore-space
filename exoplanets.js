const exoplanets = [
  {
    name: "Kepler-22b",
    method: "Transit",
    image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Exoplanet_Comparison_Kepler-22b.png/640px-Exoplanet_Comparison_Kepler-22b.png",
    description: "A potentially habitable planet orbiting within the habitable zone of its star."
  },
  {
    name: "Proxima b",
    method: "Radial Velocity",
    image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Exoplanet_Proxima_Centauri_b.jpg/640px-Exoplanet_Proxima_Centauri_b.jpg",
    description: "Closest exoplanet to Earth, orbiting Proxima Centauri."
  },
  {
    name: "HD 209458 b",
    method: "Transit",
    image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/2/25/Exoplanet_HD_209458_b.jpg/640px-Exoplanet_HD_209458_b.jpg",
    description: "First planet detected via transit and confirmed via radial velocity."
  },
  {
    name: "51 Pegasi b",
    method: "Radial Velocity",
    image: "https://images.weserv.nl/?url=upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Exoplanet_51_Pegasi_b.jpg/640px-Exoplanet_51_Pegasi_b.jpg",
    description: "The first exoplanet discovered around a sun-like star."
  }
];

const carouselContainer = document.getElementById("carousel-container");
const dotsContainer = document.getElementById("carousel-dots");
const filterSelect = document.getElementById("filter");

let currentIndex = 0;
let filteredPlanets = [...exoplanets];

function renderCarousel(planets) {
  carouselContainer.innerHTML = "";
  dotsContainer.innerHTML = "";

  planets.forEach((planet, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    if (index === 0) slide.style.display = "flex";

    slide.innerHTML = `
      <img src="${planet.image}" alt="${planet.name}" class="planet-img">
      <div class="planet-info">
        <h2>${planet.name}</h2>
        <p>${planet.description}</p>
        <p><strong>Discovery Method:</strong> ${planet.method}</p>
      </div>
    `;

    carouselContainer.appendChild(slide);

    const dot = document.createElement("span");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dot.addEventListener("click", () => showSlide(index));
    dotsContainer.appendChild(dot);
  });

  showSlide(0); // Ensure first slide is always visible
}

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  const dots = document.querySelectorAll(".dot");

  slides.forEach((s, i) => {
    s.style.display = i === index ? "flex" : "none";
  });
  dots.forEach((d, i) => {
    d.classList.toggle("active", i === index);
  });

  currentIndex = index;
}

function plusSlides(offset) {
  const next = (currentIndex + offset + filteredPlanets.length) % filteredPlanets.length;
  showSlide(next);
}

// For HTML inline event binding
function currentSlide(n) {
  showSlide(n - 1); // HTML uses 1-based index
}

// Dropdown filter
filterSelect?.addEventListener("change", () => {
  const selected = filterSelect.value;
  filteredPlanets = selected === "all"
    ? exoplanets
    : exoplanets.filter(p => p.method === selected);
  currentIndex = 0;
  renderCarousel(filteredPlanets);
});

// Initial render
renderCarousel(filteredPlanets);

// Expose to global scope for inline HTML onclick handlers
window.plusSlides = plusSlides;
window.currentSlide = currentSlide;
