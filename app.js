
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const rechercher = document.querySelector(".rechercher")
const barreDeRecherche = document.querySelector("#cityInput")


rechercher.addEventListener("click", async () => {
    // console.log(barreDeRecherche.value + " est dans la barre de recherche ")
    // console.log("https://wttr.in/" + barreDeRecherche.value + "?format=j1")
    await main()
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";
});



async function fetchmeteo() {
    return new Promise(async (resolve, reject) => {
        const cityName = barreDeRecherche.value
        const url = `https://wttr.in/${cityName}?format=j1`
        const res = await fetch(url)
        const result = await res.json()
        resolve(result)
        if (result) {
            resolve(result)
        } else {
            reject("ceci est une ereur")
        }
    })
}

async function main() {
    try {
        const data = await fetchmeteo().then(data => data)
        console.log(data)
        console.log(data.nearest_area[0].areaName[0].value)
        console.log(data.current_condition[0].temp_C + " degrés")
        console.log(data.current_condition[0].lang_fr[0].value)
    } catch (error) {
        console.log("erreur")
    }
}   