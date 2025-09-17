const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const cityInput = document.getElementById('cityInput')
const btnSubmit = document.getElementById('btnSubmit')

async function fetchWeather(city) {
    const promise = new Promise(async (resolve, reject) => {
        try {
            const res = await fetch(`https://wttr.in/${city}?format=j1`)
            const data = await res.json()
            resolve(data)
        } catch (err) {
            reject(err)
        }
    })
    return promise.then((data) => data).catch((err) => console.error(err))
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";

    let cityValue = cityInput.value.trim()
    let values = cityValue.split(' ');

    try {
        if (values.length > 1) {
            console.log(`Il y a plusieurs valeurs ${values}`)
            const data = await fetchWeather(values)
            displayWeather(data)
        }

    } catch (err) {
        console.error(err)
    }

});

function displayWeather(weatherData) {
    const resultsDiv = document.getElementById('results')

    const country = weatherData.nearest_area[0].country[0].value
    const city = weatherData.nearest_area[0].areaName[0].value
    const temp = parseInt(weatherData.current_condition[0].temp_C) + " °C"
    const weatherDescription = weatherData.current_condition[0].weatherDesc[0].value

    let customMessage = ""

    if (weatherDescription.toLowerCase().includes('rain')) {
        customMessage = "Y'a de la pluie"
    }

    resultsDiv.innerHTML = `<h1>${country}</h1>
    <h2>${city}</h2>
    <p>${temp}</p>
    <p>${weatherDescription}</p>
    <p>${customMessage}</p> `
}

fetchWeather()