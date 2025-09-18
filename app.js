const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const city = form.textContent;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "<p>Chargement...</p>";
  resultsDiv.innerHTML = "<p>" + getCityWeather() + "<p>";
});

async function getCityWeather(city) {
  const res = await fetch("https://wttr.in/Paris?format=j1");
  const data = await res.json();
  try {
  } catch (err) {
    console.log(err);
  }
  return data;
}

console.log(await getCityWeather());

async function forthemoment() {
  try {
    const data = await getCityWeather();
    console.log(data);
  } catch (err) {
    console.log(err);
  }
}

console.log(city);

forthemoment();
