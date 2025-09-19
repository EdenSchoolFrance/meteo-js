const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "<p>Chargement...</p>";
  await forthemoment();
  //resultsDiv.innerHTML = "<p>" + getCityWeather() + "<p>";
});

async function getCityWeather(city) {
  try {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const data = await res.json();

    return data;
  } catch (err) {
    console.log(err);
  }
}

// console.log(await getCityWeather());

function displayInformation(cityData) {
  console.log(cityData);
  const fetchedCityName = cityData.nearest_area[0].areaName[0].value;
  resultsDiv.textContent = fetchedCityName;
}

async function forthemoment() {
  try {
    const cityInput = document.getElementById("cityInput");
    const searchedCity = cityInput.value
    const data = await getCityWeather(searchedCity);
    displayInformation(data);
  } catch (err) {
    console.log(err);
  }
}
