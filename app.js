
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const cityValue = document.querySelector('#cityInput')

const city1 = new Promise(async (resolve, reject) => {
    const req = await fetch(`https://wttr.in/${cityValue.value}?format=j1`);
    const res = await req.json()

    try {
        console.log('a')
        resolve(res)
    } catch (error) {
        reject(resultsDiv.innerHTML = `</p>veuillez réessayer ultérieurement</p> ${error}`)
    }
})

form.addEventListener("submit", (e) => {
    e.preventDefault();
    Promise.all([city1])
        .then(data => {
            console.log(data)
            if (data[0].current_condition[0].lang_fr[0].value === "New Found Out") {
                resultsDiv.innerHTML = "Ville incorrect</p>"
            } else if (data[0].current_condition[0].lang_fr[0].value === "Nuageux") {
                console.log(data)
                resultsDiv.innerHTML = `
            <p>${data[0].nearest_area[0].areaName[0].value}</p>
            <p>${data[0].current_condition[0].lang_fr[0].value}</p>
            <p>${data[0].current_condition[0].lang_fr[0].temp_C}</p>
            <p>${data[0].current_condition[0].lang_fr[0].value}</p>
            <p>Prenez un menteau</p>
            `
            }
        })
        .catch(error => console.log(error))
});