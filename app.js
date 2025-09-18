const form = document.getElementById("weatherForm");
const resultsDiv = document.getElementById("results");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    resultsDiv.innerHTML = "<p>Chargement...</p>";
})