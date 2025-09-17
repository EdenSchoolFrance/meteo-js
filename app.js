
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");
const cityValue = document.querySelector('#cityInput')



form.addEventListener("submit", (e) => {
    e.preventDefault();
    const city1 = new Promise(async (resolve, reject) => {
        const req = await fetch(`https://wttr.in/${cityValue.value}?format=j1`);
        const res = await req.json()
        console.log(res)
        try {
            console.log('a')
            resolve(res)
        } catch (error) {
            reject(resultsDiv.innerHTML = `</p>veuillez réessayer ultérieurement</p> ${error}`)
        }
    })


    Promise.all([city1])
        .then(data => {

            if (data[0].nearest_area[0].areaName[0].value === "New Found Out") {
                resultsDiv.innerHTML = "Ville incorrect</p>"
            } else {
                console.log(data)
                resultsDiv.innerHTML = `
                <div class="city-card">
                    <h2>${data[0].nearest_area[0].areaName[0].value}</h2>
                    <p>${data[0].current_condition[0].lang_fr[0].value}</p>
                    <p>${data[0].current_condition[0].temp_C} degres</p>
                </div>`
            }
        })
        .catch(error => console.log(error))
});