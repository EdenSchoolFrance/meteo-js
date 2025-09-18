const $form = document.getElementById("weatherForm");
const $resultsDiv = document.getElementById("results");
const $cityInput = document.getElementById("cityInput")

let cities = [];

async function fetchMeteo() {
    cities = $cityInput.value.split(",").map(c => c.trim()).filter(c => c);
    
    const promises = cities.map(city => {
        const meteoPromise = fetch(`https://wttr.in/${city}?format=j1`).then(res => res.json());
        const wikiPromise = fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${city}`).then(res => res.json());
        return Promise.all([meteoPromise, wikiPromise]);
    });

    try {
        const results = await Promise.all(promises);
        $resultsDiv.innerHTML = "";
        results.forEach(result => {
            const [meteoData, wikiData] = result;
            displayMeteo(meteoData, wikiData);
        });

    } catch(err) {
        $resultsDiv.innerHTML = "<p>Une erreur est survenue lors de la récupération des données.</p>";
        console.log(err);
    }
}

function displayMeteo(meteoData, wikiData) {
    const cardCity = document.createElement("div")
    cardCity.classList.add("city-card")
    cardCity.innerHTML = `
        <h2>${meteoData.nearest_area[0].areaName[0].value}</h2>
        <p>${meteoData.current_condition[0].temp_C} °C</p>
        <p>${meteoData.current_condition[0].weatherDesc[0].value}</p>
        <p>${wikiData.description || 'Description non disponible.'}</p>
    `
    $resultsDiv.appendChild(cardCity)
}


$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $resultsDiv.innerHTML = "<p>Chargement...</p>";
    fetchMeteo()
});