const form = document.getElementById("weatherForm");
const weatherInput = document.getElementById("cityInput");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  resultsDiv.innerHTML = "<p>Chargement...</p>";
  const cities = weatherInput.value.split(", ");
  fetchWeather(cities);
});

async function fetchWeather(cities) {
  const promises = cities.map((city) =>
    fetch(`https://wttr.in/${city}?format=j1`).then((res) => res.json())
  );

  try {
    const data = await Promise.all(promises);
    displayWeather(data);
  } catch (err) {
    console.error(err);
  }
}

async function fetchCityDescription(city) {
  const res = await fetch(
    `https://en.wikipedia.org/api/rest_v1/page/summary/${city}`
  );
  const data = await res.json();

  return {
    description: data.description ? data.description : "aucune description pour cette ville.",
    image: data.originalimage ? data.originalimage.source : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAADGCAMAAADFYc2jAAAAKlBMVEXQ0NDw8PDNzc3e3t7X19fs7Ozu7u7U1NTS0tLd3d3Z2dnl5eXi4uLn5+djo+YlAAADyUlEQVR4nO2dCYKjIBBF27gbvf91JwYnCcoiylr13wn4XQ8Kwdh/fwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACgbPpprOtx6h+pB5KAfm676k3X1n3q0URmelYSM6c/wDB31Y62Tj2oaAzPffiVJ5MloG9V6atqGVKPLAqLOv2r/hzyz7r0VTWmHlt4psOq9wP59X/Qqv/WP/XwQjOZ0lddk3p8gVH2vC9z6vEFxpy+WmjP/sYSn7j9oyV+NaUeYVAsU594639Y45N+8nkYu/4K7aWfd/VNG34B7aXPvOl7QbvxDZb0Le1tj/5hX0B75bPue2hPff1J1+Y++fMeY/mpF9983sHhsLfXq0982RfoTvta2j3/w6Rc/njUfqVRzH/i5zwSQ70L343kW57EULefJaBbaD/nKRmmen4uy3OumSx5R4YXqccAAAAAAAAAAAAAAPKmYXt6ttJ0XC5MVDQtpyuTPeIKjfjboVqajteFoUzzuT7kmP/38rRjN//lq3Nu9W92Lw7wyt8cXhvg5L/qpRE+/W9vPi//j+Zv+Vn4r/9xJIf8avO5+K8zn0d+c3rq/ht/FE2+/qZ5Tz+/zXza/tvNF9Dc/50xn67/58yn6r/61XAu+c+bT9F/F/OLyN+4vNntnj5z/yeXnzGe7XjF1P+9kJ3N7zrvs8+/BapP/Zjtivlb/jz9/3zU5Ez9r5mfcf1/AtnzXzU/2/xSIJv/183f8ufm/+5zPub+dzd9dvkPU9nk/z3zt/w5+a/Yus9a/+/XPrP8vaqcus8X+Umfkf+aJqb2/07H2+XPo/7ah1ZVfh/zPqv8hkDH/ufL/C1/ev+NH7Db9z9/5m/5U9ffEkj236f5WeS3yvzrv1/zt/wp/dd/xeObP2j6pPlPTeX//vs3f8ufyv+Tx7Ri/xem9gnzK/d6KsZHyPSJvhRl/XLdlzmY+YIE9Xe6oJgD1n4lev6w5XQm8vqfWfrI+X1vXj0Q0f+Qy/hlotX/dMeLS6T8GZoviOK/25V8VCLkz9R8QfD9n8NeLwWB65+x+YKg+bPb7RwJuP4XkD5g/mw7nkwg/7Pc66kIUv+sO55MgPyFmC/w7n/2HU/Gc/6CzBd43f8V0fFkPNa/MPMF3vIXWPsVT+t/oek95S+q48l48L+YvZ6K2/UvruPJ3MxfsPmCW/4X2fFkbuQv3HzB5f1fsR1P5uL8J2C+4JL/RXc8mQv1J2K+wDl/8R1PxtF/QuYLnOpPouPJOOQnZr7gvP9TTRH6/yoQAAAAAAAAAAAAGw/W/KU+hUrLPxqeOVrdjftAAAAAAElFTkSuQmCC"
  };
}

function displayWeather(weather) {
  weather.forEach(async (city) => {
    const div = document.createElement("div");
    div.classList.add("city-card");
    
    const wiki = await fetchCityDescription(city.nearest_area[0].areaName[0].value);

    div.innerHTML = `
        <div class="information">
            <h2>${city.nearest_area[0].areaName[0].value}</h2>
            <p>${city.current_condition[0].temp_C}°C</p>
            <p>${city.current_condition[0].weatherDesc[0].value}</p>
            <p>${wiki.description}</p>
        </div>
        <img src=${wiki.image} />
    `;

    resultsDiv.appendChild(div);
  });
}
