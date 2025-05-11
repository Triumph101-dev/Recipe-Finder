async function searchRecipes() {
  const query = document.getElementById("searchInput").value.trim();
  const resultsContainer = document.getElementById("results");

  if (!query) {
    resultsContainer.innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  resultsContainer.innerHTML = "<p>Loading...</p>";

  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const data = await res.json();

    if (!data.meals) {
      resultsContainer.innerHTML = `<p>No recipes found for "${query}".</p>`;
      return;
    }

    resultsContainer.innerHTML = data.meals.map(meal => `
      <div class="recipe">
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
        <h3>${meal.strMeal}</h3>
        <a href="${meal.strSource || meal.strYoutube}" target="_blank">View Recipe</a>
      </div>
    `).join("");
  } catch (error) {
    resultsContainer.innerHTML = `<p>Something went wrong. Please try again.</p>`;
    console.error(error);
  }
}
