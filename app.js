const $form = document.getElementById("weatherForm");
const $resultsDiv = document.getElementById("results");
const $cityInput = document.getElementById("cityInput")

let cities = $cityInput.value.split(", ")

async function fetchMeteo() {
    const res = await fetch("https://wttr.in/Paris?format=j1")
    const data = await res.json()

    try {
        $resultsDiv.innerHTML = "";
        displayMeteo(data)
    } catch(err) {
        $resultsDiv.innerHTML = "<p>Pas trouvé</p>";
        console.log(err);
    }
}

function displayMeteo(data) {
    const cardCity = document.createElement("div")
    cardCity.classList.add("city-card")
    cardCity.innerHTML = `
        <h2>${data.nearest_area[0].areaName[0].value}</h2>
        <p>${data.current_condition[0].temp_C}</p>
        <p>${data.current_condition[0].weatherDesc[0].value}</p>
    `
    $resultsDiv.appendChild(cardCity)
    console.log(cardCity);
    
}


$form.addEventListener("submit", (e) => {
    e.preventDefault();
    $resultsDiv.innerHTML = "<p>Chargement...</p>";
    fetchMeteo()
});