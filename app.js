const $form = document.getElementById("weatherForm");
const $cityInput = document.getElementById("cityInput");
const $resultsDiv = document.getElementById("results");

async function fetchCities(cities) {
  let promises = [];

  cities.forEach((city) => {
    promises.push(
      fetch(`https://wttr.in/${city}?format=j1`).then((res) => res.json())
    );
  });

  try {
    const data = await Promise.all(promises);
    createCityCard(data);
  } catch (err) {
    console.log(err);
  }
}

async function getCityDesc(city) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
  );
  const data = await res.json();

  return data.description;
}

async function createCityCard(cities) {
  $resultsDiv.innerHTML = "";
  cities.forEach(async (city) => {
    const cityName = city.nearest_area[0].areaName[0].value;

    const div = document.createElement("div");
    div.classList.add("city-card");
    div.innerHTML += `
    <div class="city-card">
        <h2>${cityName}</h2>
        <p>${city.current_condition[0].temp_C}°C</p>
        <p>${city.current_condition[0].weatherDesc[0].value}</p>
        <p>${await getCityDesc(cityName)}</p>
    </div>
    `;
    $resultsDiv.appendChild(div);
  });
}

$form.addEventListener("submit", async (e) => {
  e.preventDefault();
  $resultsDiv.innerHTML = "<p>Chargement...</p>";

  const cities = $cityInput.value.split(", ");
  fetchCities(cities);
});
