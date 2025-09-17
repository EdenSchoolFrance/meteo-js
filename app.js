
const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";
});