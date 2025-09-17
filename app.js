const form = document.getElementById("weatherForm");
const weatherInput = document.getElementById("cityInput");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "<p>Chargement...</p>";
  const cities = weatherInput.value.split(", ");
  fetchWeather(cities);
});

async function fetchWeather(cities) {
  const promises = cities.map((city) =>
    fetch(`https://wttr.in/${city}?format=j1`).then((res) => res.json())
  );

  try {
    const data = await Promise.all(promises);
    displayWeather(data);
  } catch (err) {
    console.error(err);
  }
}

async function fetchCityDescription(city) {
    const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`)
    const data = await res.json()

    return data.description
}

function displayWeather(weather) {
  weather.forEach(async (city) => {
    const div = document.createElement("div");
    div.classList.add("city-card");

    div.innerHTML = `
        <h2>${city.nearest_area[0].areaName[0].value}</h2>
        <p>${city.current_condition[0].temp_C}°C</p>
        <p>${city.current_condition[0].weatherDesc[0].value}</p>
         <p>${await fetchCityDescription(city.nearest_area[0].areaName[0].value)}</p>
    `;

    resultsDiv.appendChild(div);
  });
}


