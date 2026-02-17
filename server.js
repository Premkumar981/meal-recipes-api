const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

/*
  Helper Function:
  Extract valid ingredients from strIngredient1..20
*/
function extractIngredients(meal) {
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(ingredient.trim());
    }
  }

  return ingredients;
}

app.get("/recipes", async (req, res) => {
    try {
      const RANDOM_ATTEMPTS = 5; // number of random meals to compare
      let bestRecipe = null;
  
      for (let i = 0; i < RANDOM_ATTEMPTS; i++) {
  
        const response = await axios.get(
          "https://www.themealdb.com/api/json/v1/1/random.php"
        );
  
        const meal = response.data.meals[0];
        const ingredients = extractIngredients(meal);
  
        const recipe = {
          name: meal.strMeal,
          image: meal.strMealThumb,
          ingredientCount: ingredients.length,
          ingredients: ingredients
        };
  
        if (!bestRecipe || recipe.ingredientCount < bestRecipe.ingredientCount) {
          bestRecipe = recipe;
        }
      }
  
      res.json({
        minimumIngredients: bestRecipe.ingredientCount,
        recipe: bestRecipe
      });
  
    } catch (error) {
      console.error(error.message);
      res.status(500).json({
        error: "Failed to fetch random recipes"
      });
    }
  });
  

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
