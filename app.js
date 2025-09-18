const cityInput = document.getElementById("cityInput");
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");

var names = '';
var namesTab = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";
    setTimeout(() => {
        resultsDiv.innerHTML = "<p></p>";
    }, 1000);
    setTimeout(() => {
        if (cityInput.value != '') {
          if (cityInput.value.includes(","))
          {
            names = cityInput.value;
            namesSplit = names.split(",");
            namesTab = [];
            namesSplit.forEach(function (product) {
                namesTab.push(product);
            })
            namesTab.forEach(function (product) {
                metéoCity(product);
            })

            Promise.all([namesTab]).then((values) => {
                // console.log(values);
            });
          }
          else
          {
            metéoCity(cityInput.value)
          }
        }
        else
        {
            resultsDiv.innerHTML = "<p>Erreur</p>";
        }
    }, 1010);
});

function createMéteo(dataMetéo, dataWiki) {
    const $country = document.createElement("h1");
    const $city = document.createElement("h2");
    const $region = document.createElement("h2");
    const $countryTemp = document.createElement("p");
    const $countryDesc = document.createElement("p");
    const $wikiDesc = document.createElement("p");
    const $advice = document.createElement("h3");

    $country.textContent = dataMetéo.nearest_area[0].country[0].value;
    $city.textContent = dataMetéo.nearest_area[0].areaName[0].value;
    $region.textContent = dataMetéo.nearest_area[0].region[0].value;
    $countryTemp.textContent = `Température: °C ${dataMetéo.weather[0].hourly[0].tempC}`;
    $countryDesc.textContent = `Description: ${dataMetéo.weather[0].hourly[0].weatherDesc[0].value}`;
    $wikiDesc.textContent = dataWiki.extract;
    // console.log(dataMetéo.weather[0].hourly[0].weatherDesc[0].value)

    switch (dataMetéo.weather[0].hourly[0].weatherDesc[0].value)
    {
        case 'Patchy rain nearby ': 
        $advice.textContent = 'Prenez un parapluie.';
        break;

        case 'Clear ': 
        $advice.textContent = 'Prenez une paire de lunettes de soleil.';
        break;

        case 'Overcast ' || 'Partly Cloudy ' || 'Mist ':
        $advice.textContent = 'Prenez un manteau';
        break;

        default:
        $advice.textContent = '';
        break;
    }

    resultsDiv.appendChild($country);
    resultsDiv.appendChild($city);
    resultsDiv.appendChild($region);
    resultsDiv.appendChild($countryTemp);
    resultsDiv.appendChild($countryDesc);
    resultsDiv.appendChild($wikiDesc);
    resultsDiv.appendChild($advice);
}

async function metéoCity(city) {
    const res = await fetch(`https://wttr.in/${city}?format=j1`);
    const api = await res.json();

    const res2 = await fetch(`https://fr.wikipedia.org/api/rest_v1/page/summary/${city}`);
    const api2 = await res2.json();

    // console.log(api2.title)

    try {
        createMéteo(api, api2);
    }
    catch (err) {
        resultsDiv.innerHTML = "<p>Erreur</p>";
    }
}