function fetchAPOD() {
  const titleEl = document.getElementById('apod-title');
  const imgEl = document.getElementById('apod-img');
  const descEl = document.getElementById('apod-desc');
  if (!titleEl || !imgEl || !descEl) return;

  const NASA_API_KEY = "YX9rfRWgaFSjC1l9HDfaDULlX2uu9rMdgJFHOvNP";
 // Replace with your actual key if not already
  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      titleEl.textContent = data.title;
      imgEl.src = data.url;
      descEl.textContent = data.explanation;
    })
    .catch(err => console.error("Failed to fetch APOD:", err));
}


function setupISSMap() {
  const mapEl = document.getElementById('iss-map');
  const coordsEl = document.getElementById('iss-coords');
  if (!mapEl || !coordsEl) return;

  const map = L.map(mapEl).setView([0, 0], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const issIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });

  const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

  async function updateISS() {
    try {
      const res = await fetch("http://api.open-notify.org/iss-now.json");
      const data = await res.json();
      const { latitude, longitude } = data.iss_position;

      marker.setLatLng([latitude, longitude]);
      map.setView([latitude, longitude], map.getZoom());
      coordsEl.textContent = `Lat: ${latitude}, Lon: ${longitude}`;
    } catch (err) {
      console.error("Failed to fetch ISS position:", err);
    }
  }


  updateISS();
  setInterval(updateISS, 5000);
}



if (document.getElementById("iss-map")) {
  const map = L.map('iss-map').setView([0, 0], 2);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
  }).addTo(map);

  const issIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/International_Space_Station.svg',
    iconSize: [50, 32],
    iconAnchor: [25, 16]
  });

  const marker = L.marker([0, 0], { icon: issIcon }).addTo(map);

  async function updateISS() {
    const res = await fetch("http://api.open-notify.org/iss-now.json");
    const data = await res.json();
    const { latitude, longitude } = data.iss_position;

    marker.setLatLng([latitude, longitude]);
    map.setView([latitude, longitude], map.getZoom());

    document.getElementById('iss-coords').textContent = `Lat: ${latitude}, Lon: ${longitude}`;
  }

  updateISS();
  setInterval(updateISS, 5000);
}

function setupExoplanets() {
  const planetGrid = document.getElementById("planet-grid");
  const filterSelect = document.getElementById("filter");
  if (!planetGrid || !filterSelect) return;

  const planets = [
  {
    name: "Kepler-22b",
    description: "A potentially habitable planet orbiting within the habitable zone of its star.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Exoplanet_Comparison_Kepler-22b.png"
  },
  {
    name: "Proxima b",
    description: "Closest exoplanet to Earth, orbiting Proxima Centauri.",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/27/Exoplanet_Proxima_Centauri_b.jpg"
  },
  {
    name: "HD 209458 b",
    description: "First planet detected via transit and confirmed via radial velocity.",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/57/Exoplanet_HD_209458_b.jpg"
  },
  {
    name: "51 Pegasi b",
    description: "The first exoplanet discovered around a sun-like star.",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b2/Exoplanet_51_Pegasi_b.jpg"
  }
];


  function renderPlanets(list) {
  planetGrid.innerHTML = "";
  list.forEach(planet => {
    const card = document.createElement("div");
    card.className = "planet-card";
    card.innerHTML = `
  <div class="planet-content">
    <h3>${planet.name}</h3>
    <img src="${planet.image}" alt="${planet.name}" />
    <div class="planet-extra">
      <p>${planet.description}</p>
    </div>
  </div>
`;

    card.addEventListener("click", () => {
      window.location.href = `planet.html?planet=${planet.slug}`;
    });
    planetGrid.appendChild(card);
  });
}


  filterSelect.addEventListener("change", () => {
    const method = filterSelect.value;
    if (method === "all") {
      renderPlanets(planets);
    } else {
      renderPlanets(planets.filter(p => p.method === method));
    }
  });

  renderPlanets(planets);
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAPOD();
  setupISSMap();
  setupExoplanets();
});