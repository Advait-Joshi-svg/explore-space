const NASA_API_KEY = "YX9rfRWgaFSjC1l9HDfaDULlX2uu9rMdgJFHOvNP";
function fetchAPOD() {
  const titleEl = document.getElementById('apod-title');
  const imgEl = document.getElementById('apod-img');
  const descEl = document.getElementById('apod-desc');
  if (!titleEl || !imgEl || !descEl) return;

  fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`)
    .then(res => res.json())
    .then(data => {
      titleEl.textContent = data.title;
      imgEl.src = data.url;
      descEl.textContent = data.explanation;
    })
    .catch(err => {
      console.error("Failed to fetch APOD:", err);
    });
}

// ===== ISS Location + Leaflet Map =====
function setupISSMap() {
  const mapEl = document.getElementById('iss-map');
  const coordsEl = document.getElementById('iss-coords');
  if (!mapEl || !coordsEl) return;

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

// ===== SpaceX Launches =====
function fetchUpcomingLaunches() {
  const launchList = document.getElementById("launch-list");
  if (!launchList) return;

  fetch("https://api.spacexdata.com/v4/launches/upcoming")
    .then(res => res.json())
    .then(data => {
      data.sort((a, b) => new Date(a.date_utc) - new Date(b.date_utc));

      data.slice(0, 5).forEach(launch => {
        const card = document.createElement("div");
        card.className = "launch-card";

        const patch = launch.links.patch.small || "https://via.placeholder.com/100x100?text=No+Patch";

        card.innerHTML = `
          <img src="${patch}" alt="Mission Patch">
          <h3>${launch.name}</h3>
          <p><strong>Date:</strong> ${new Date(launch.date_utc).toLocaleString()}</p>
          ${launch.links.webcast ? `<a href="${launch.links.webcast}" target="_blank">🔗 Watch Live</a>` : ""}
        `;
        launchList.appendChild(card);
      });
    })
    .catch(err => {
      console.error("Failed to fetch SpaceX launches:", err);
    });
}

// ===== Run only what each page needs =====
fetchAPOD();
setupISSMap();
fetchUpcomingLaunches();