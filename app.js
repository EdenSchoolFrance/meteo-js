const form = document.getElementById("weatherForm")
const resultsDiv = document.getElementById("results")
const cityInput = document.getElementById("cityInput")
const baseLink = "https://wttr.in/"
const endLink = "?format=j1"
const wikiLink = "https://fr.wikipedia.org/api/rest_v1/page/summary/"

form.addEventListener("submit", e => {
  e.preventDefault()
  getAllApi()
})

async function getWeatherData(city) {
  const response = await fetch(baseLink + city + endLink)
  const data = await response.json()
  const weather = data.current_condition[0]
  const temp = weather.temp_C
  const desc = weather.weatherDesc[0].value
  let conseil = ""
  if (desc.toLowerCase().includes("rain") || desc.toLowerCase().includes("pluie")) {
    conseil = "Prenez un parapluie"
  } else if (parseInt(temp) >= 30) {
    conseil = "Buvez beaucoup d'eau"
  } else if (parseInt(temp) <= 5) {
    conseil = "Couvrez-vous bien"
  } else {
    conseil = "Bonne journée"
  }
  return { city, temp, desc, conseil }
}

async function getWikiData(city) {
  try {
    const response = await fetch(wikiLink + encodeURIComponent(city))
    if (!response.ok) return ""
    const data = await response.json()
    return data.extract || ""
  } catch {
    return ""
  }
}

async function getAllApi() {
  try {
    const cities = cityInput.value.split(",").map(c => c.trim()).filter(c => c)
    resultsDiv.innerHTML = `<h1>Chargement...</h1>`
    const results = await Promise.all(cities.map(async c => {
      const weather = await getWeatherData(c)
      const wiki = await getWikiData(c)
      return { ...weather, wiki }
    }))
    resultsDiv.innerHTML = `
      <ul>
        ${results.map(r => `
          <li class="result">
            <h3>${r.city}</h3>
            <p>Température actuelle: ${r.temp}°C</p>
            <p>${r.desc}</p>
            <p><strong>Conseil :</strong> ${r.conseil}</p>
            <p><em>${r.wiki}</em></p>
          </li>
        `).join("")}
      </ul>
    `
  } catch (error) {
    console.log(error)
  }
}
