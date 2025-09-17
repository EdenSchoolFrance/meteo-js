const form = document.getElementById("weatherForm")
const resultsDiv = document.getElementById("results")
const cityInput = document.getElementById("cityInput")

async function newRecherche(city) {
    try {
        // ici j'appelle l'api
        const res = await fetch(`https://wttr.in/${city}?format=j1`)
        const data = await res.json()

        // ici je trie et garde les données qui m'interressent
        const countryName = data.nearest_area[0].country[0].value
        const regionName = data.nearest_area[0].region[0].value
        const cityName = data.nearest_area[0].areaName[0].value
        const temperature = data.current_condition[0].temp_C
        const description = data.current_condition[0].weatherDesc[0].value

        // ici je fais le message bonus qui permet de mettre un message en fonction de la meteo
        let message = ""

        if (description.toLowerCase().includes("rain")) {
            message = "☔ Prenez un parapluie"
        } else if (description.toLowerCase().includes("sun")) {
            message = "😎 Sortez les lunettes de soleil"
        } else if (description.toLowerCase().includes("cloud")) {
            message = "☁️ Il y a des nuages"
        } else if (description.toLowerCase().includes("snow")) {
            message = "🌨️ Sortez les bonnets et les gants"
        } else if (description.toLowerCase().includes("storm")) {
            message = "🌩️ Restez chez vous"
        } else {
            message = "👍 Beau temps aujourd'hui"
        }

        let méteo = ""
        if (description.toLowerCase().includes("rain")) {
            méteo = "🌧️"
        } else if (description.toLowerCase().includes("sun")) {
            méteo = "😎"
        } else if (description.toLowerCase().includes("cloud")) {
            méteo = "☁️"
        } else if (description.toLowerCase().includes("snow")) {
            méteo = "🌨️"
        } else if (description.toLowerCase().includes("storm")) {
            méteo = "🌩️"
        } else {
            méteo = "👍"
        }

        // ici j'affiche les données dans le html
        resultsDiv.innerHTML = `
            <h2>🌍 Country ${countryName} </h2>
            <h3>🗺️ Région ${regionName} </h3>
            <h3>📍 City ${cityName}</h3>
            <h4>🌡️Température : ${temperature} °C</h4>
            <h4>Metéo : ${méteo} ${description}</h4>
            <h4>${message}</h4>`
            
    } catch (err) { // ici je vais afficher dans la console les potentielles erreurs
        console.error(err)
        resultsDiv.textContent = "erreur"
    }


}

// ici c'est le form qui va me permette de faire la recherche
form.addEventListener("submit", (e) => {
    e.preventDefault()
    const city = cityInput.value.trim()
    if (city) {
        newRecherche(city)
    }
    cityInput.value = ""
})

