const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.json());

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
    const foodName = req.query.query;

    if (!foodName) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`;

    const response = await axios.get(url);
    const meals = response.data.meals;

    if (!meals) {
      return res.status(404).json({ error: "No recipes found" });
    }

    const processedRecipes = meals.map((meal) => {
      const ingredients = extractIngredients(meal);

      return {
        name: meal.strMeal,
        image: meal.strMealThumb,
        ingredientCount: ingredients.length,
        ingredients: ingredients
      };
    });

    const minimumIngredients = Math.min(
      ...processedRecipes.map(r => r.ingredientCount)
    );

    const filteredRecipes = processedRecipes.filter(
      r => r.ingredientCount === minimumIngredients
    );

    res.json({
      minimumIngredients,
      recipes: filteredRecipes
    });

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch recipes" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
