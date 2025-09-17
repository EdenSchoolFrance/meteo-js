
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const rechercher = document.querySelector(".rechercher")
const barreDeRecherche = document.querySelector("#cityInput")


rechercher.addEventListener("submit", async () => {
    // console.log(barreDeRecherche.value + " est dans la barre de recherche ")
    // console.log("https://wttr.in/" + barreDeRecherche.value + "?format=j1")
    // await main()
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";
});

const meteo = new Promise(async (resolve, reject) => {
    const cityName = "lyon"
    console.log(cityName)
    const url = `https://wttr.in/${cityName}?format=j1`
    console.log(url)
    const res = await fetch(url)
    const result = await res.json()
    resolve(result)
})

async function main() {
    try {
        const data = await meteo
        console.log(data.nearest_area[0].areaName[0].value)
        console.log(data.current_condition[0].temp_C + " degrés")
        console.log(data.current_condition[0].lang_fr[0].value)
    } catch (error) {
        console.log("erreur")
    }
}   