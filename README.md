# 🍽️ Random Minimal Ingredient Recipe API

A REST API built using **Node.js + Express** that fetches meals from **TheMealDB API** and returns a *random recipe having the least number of ingredients* among multiple random meals.

---

## 🚀 Features

* Fetches random meals from TheMealDB
* Counts valid ingredients (`strIngredient1` → `strIngredient20`)
* Ignores empty or null ingredients
* Compares multiple meals
* Returns the recipe with **minimum ingredients**
* Every refresh returns a different recipe

---

## 🛠 Tech Stack

* Node.js
* Express.js
* Axios

---

## 📦 Installation

1. Clone the repository or download the project
2. Open terminal inside project folder
3. Install dependencies

```bash
npm install
```

---

## ▶️ Run the Server

```bash
npm run dev
```

Server starts at:

```
http://localhost:3000
```

---

## 📡 API Endpoint

### Get Random Minimal Ingredient Recipe

```
GET /recipes
```

---

## 📄 Sample Response

```json
{
  "minimumIngredients": 5,
  "recipe": {
    "name": "Garlic Butter Shrimp",
    "image": "https://www.themealdb.com/images/media/meals/xyz.jpg",
    "ingredientCount": 5,
    "ingredients": [
      "Shrimp",
      "Garlic",
      "Butter",
      "Salt",
      "Pepper"
    ]
  }
}
```

---

## 🧠 How It Works

1. The API fetches **multiple random meals** from TheMealDB
2. Extracts ingredients from each meal
3. Counts valid ingredients
4. Compares meals
5. Returns the recipe with the least ingredients

---

## 📚 External API Used

TheMealDB
https://www.themealdb.com/api.php

Random meal endpoint:

```
https://www.themealdb.com/api/json/v1/1/random.php
```

