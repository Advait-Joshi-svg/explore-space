const exoplanets = [
  {
    name: "Kepler-22b",
    method: "Transit",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Exoplanet_Comparison_Kepler-22b.png/640px-Exoplanet_Comparison_Kepler-22b.png",
    description: "A potentially habitable planet orbiting within the habitable zone of its star."
  },
  {
    name: "Proxima b",
    method: "Radial Velocity",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Exoplanet_Proxima_Centauri_b.jpg/640px-Exoplanet_Proxima_Centauri_b.jpg",
    description: "Closest exoplanet to Earth, orbiting Proxima Centauri."
  },
  {
    name: "HD 209458 b",
    method: "Transit",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Exoplanet_HD_209458_b.jpg/640px-Exoplanet_HD_209458_b.jpg",
    description: "First planet detected via transit and confirmed via radial velocity."
  },
  {
    name: "51 Pegasi b",
    method: "Radial Velocity",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Exoplanet_51_Pegasi_b.jpg/640px-Exoplanet_51_Pegasi_b.jpg",
    description: "The first exoplanet discovered around a sun-like star."
  }
];

const carouselContainer = document.getElementById("carousel-container");
const dotsContainer = document.getElementById("carousel-dots");
const filterSelect = document.getElementById("filter");

let currentIndex = 0;
let currentPlanets = exoplanets;

function renderCarousel(planets) {
  carouselContainer.innerHTML = "";
  dotsContainer.innerHTML = "";
  currentIndex = 0;
  currentPlanets = planets;

  planets.forEach((planet, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide fade";
    slide.style.display = index === 0 ? "block" : "none";

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
    dot.className = "dot";
    dot.onclick = () => showSlide(index);
    dotsContainer.appendChild(dot);
  });

  updateDots();
}

function showSlide(index) {
  const slides = document.querySelectorAll(".carousel-slide");
  if (slides.length === 0) return;

  slides.forEach(slide => slide.style.display = "none");
  slides[index].style.display = "block";
  currentIndex = index;
  updateDots();
}

function plusSlides(n) {
  const nextIndex = (currentIndex + n + currentPlanets.length) % currentPlanets.length;
  showSlide(nextIndex);
}

function updateDots() {
  const dots = document.querySelectorAll(".dot");
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

filterSelect?.addEventListener("change", () => {
  const method = filterSelect.value;
  const filtered = method === "all"
    ? exoplanets
    : exoplanets.filter(p => p.method === method);
  renderCarousel(filtered);
});

document.addEventListener("DOMContentLoaded", () => {
  renderCarousel(exoplanets);
});
