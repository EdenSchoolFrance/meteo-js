
const form = document.getElementById("weatherForm");
const $cityInput = document.getElementById("cityInput");
const $resultsDiv = document.getElementById("results");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    $resultsDiv.innerHTML = "<p>Chargement...</p>";

    setTimeout(() => {
        $resultsDiv.innerHTML = "";
    }, 800)

    setTimeout(() => {

        if ($resultsDiv.value != "") {
            $resultsDiv.innerHTML = "";
            const valeur = $cityInput.value;
            valeurSplit = valeur.split(",");
            const tab = [];
            console.log(valeurSplit)
            valeurSplit.forEach((e) => {
                tab.push(e)
            })
            tab.forEach(e => {
                fetchData(e);
            })
        } else {
            $resultsDiv.innerHTML = "<p>Ya rien.</p>";
        }

    }, 800);

});



async function fetchData(city) {
    try {
        const res = await fetch(`https://wttr.in/${city}?format=j1`);
        const data = await res.json();

        const countryName = document.createElement("h1");
        countryName.textContent = data.nearest_area[0].country[0].value;

        const cityName = document.createElement("h2");
        cityName.textContent = data.nearest_area[0].areaName[0].value;

        const weather = document.createElement("p")
        weather.classList.add("weather")
        weather.textContent = data.weather[0].hourly[0].lang_fr[0].value;

        const temp = document.createElement("p");
        temp.textContent = `Temp: ${data.current_condition[0].temp_C} C°`

        const dataWiki = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${city}`);
        const descriptionWiki = await dataWiki.json();
        const descWiki = document.createElement("p");
        descWiki.classList.add("wiki-description");
        descWiki.textContent = descriptionWiki.extract;

        $resultsDiv.appendChild(countryName);
        $resultsDiv.appendChild(cityName);
        $resultsDiv.appendChild(weather);
        $resultsDiv.appendChild(temp);
        $resultsDiv.appendChild(descWiki);

        return data;

    } catch (err) {

        console.log(err);
        $resultsDiv.innerHTML = "<p>Ya rien.</p>";
    }
}

Promise.all([firstTask, secondTask, thirdTask]).then((data) => console.log(data)).catch((err) => console.log(err))