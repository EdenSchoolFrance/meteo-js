const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "<p>Chargement...</p>";

  Promise.all(
    cityInput.value.split(",").map((city) => {
      city = city.trim();
      return getCityWeatherHtml(city);
    })
  ).then((values) => {
    displayValues(values);
  });
});

function displayValues(values) {
  resultsDiv.innerHTML = "";
  values.forEach((value) => (resultsDiv.innerHTML += value));
}

async function getCityWeatherHtml(city) {
  try {
    const weatherData = await getCityWeather(city);
    if (!weatherData.ok)
      return `<p class="error">Aucune ville trouvée, vérifiez l'orthographe.</p>`;

    const citySummary = await getCitySumarry(weatherData.cityName);

    console.log(citySummary.summary);
    const result = `
        <div class="city-card">
            <h2>${weatherData.cityName}</h2>
            <p>${weatherData.tempC}°C</p>
            <p>${weatherData.descriptionFr}</p>
             ${
               citySummary.ok
                 ? `<p class="summary"><b>Summary:</b> ${citySummary.summary}</p>`
                 : ""
             }
               
        </div>
    `;

    return result;
  } catch (error) {
    console.log(error);
    return '<p class="error">une erreur s\'est produite, réessayez plus tard</p>';
  }
}

async function getCityWeather(city) {
  const res = await fetch(`https://wttr.in/${city}?format=j1`);
  const data = await res.json();
  return res.status == 404
    ? {
        ok: false,
      }
    : {
        ok: true,
        cityName: data.nearest_area[0].areaName[0].value,
        tempC: data.current_condition[0].temp_C,
        descriptionFr: data.current_condition[0].lang_fr[0].value,
      };
}

async function getCitySumarry(city) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
  );
  const data = await res.json();
  if (200 <= res.status && res.status < 300)
    return { ok: true, summary: data.extract };
  else return { ok: false };
}
