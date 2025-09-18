
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const rechercher = document.querySelector(".rechercher")
const barreDeRecherche = document.querySelector("#cityInput")
const resultVille = document.querySelector("#results")

// https://en.wikipedia.org/api/rest_v1/page/summary/Paris


rechercher.addEventListener("click", async () => {
    resultVille.textContent = ""
    const villes = barreDeRecherche.value.split(", ")
    for (let i = 0; i < villes.length; i++) {
        console.log(villes)
        await main(villes[i])
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    // resultsDiv.innerHTML = "<p>Chargement...</p>";
});



async function fetchmeteo(ville) {
    return new Promise(async (resolve, reject) => {
        const url = `https://wttr.in/${ville}?format=j1`
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




async function fetchWiki(ville) {
    return new Promise(async (resolve, reject) => {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${ville}`
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




async function main(ville) {
    try {
        const data = await fetchmeteo(ville).then(data => data)
        const data2 = await fetchWiki(ville).then(data2 => data2)
        const villeName = data.nearest_area[0].areaName[0].value
        const degres = data.current_condition[0].temp_C + " degrés"
        const temp = data.current_condition[0].lang_fr[0].value
        console.log(villeName)
        console.log(degres)
        console.log(temp)
        const $divVille = document.createElement("div")
        const $villeName = document.createElement("p")
        const $degres = document.createElement("p")
        const $temp = document.createElement("p")
        const $wiki = document.createElement("p")

        $divVille.classList.add("divVille")

        $villeName.textContent = villeName
        $degres.textContent = degres
        $temp.textContent = temp
        $wiki.textContent = data2.extract

        resultVille.appendChild($divVille)
        $divVille.appendChild($villeName)
        $divVille.appendChild($degres)
        $divVille.appendChild($temp)
        resultVille.appendChild($wiki)
    } catch (error) {
        console.log("erreur")
    }
}   