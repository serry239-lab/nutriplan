// V  A  R  I  A  B  L  E  S
const mealsBaseURL = `https://nutriplan-api.vercel.app/api`;
const usdaApiKey = `cBAGiytZYzGN8ZK1CyQdElTPvHfL1yP6CJyUZA91`;
// V  A  R  I  A  B  L  E  S

// F  U  N  C  T  I  O  N  S
export const getCategories = async () => {
  try {
    const response = await fetch(`${mealsBaseURL}/meals/categories`);

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const categoriesData = await response.json();
    return categoriesData.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getMeals = async (searchTerm = "") => {
  try {
    let url = `${mealsBaseURL}/meals/search?page=1&limit=25`;

    if (searchTerm !== "") {
      url += `&q=${encodeURIComponent(searchTerm)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const mealsData = await response.json();

    return mealsData.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const filterMeals = async (category) => {
  try {
    const response = await fetch(
      `${mealsBaseURL}/meals/filter?category=${encodeURIComponent(category)}&page=1&limit=25`,
    );

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const mealsData = await response.json();

    return mealsData.results;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getMealDetails = async (mealId) => {
  try {
    const response = await fetch(`${mealsBaseURL}/meals/${mealId}`);

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const mealData = await response.json();
    return mealData.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const analyzeNutrition = async (meal) => {
  try {
    const ingredients = [];
    for (let i = 0; i < meal.ingredients.length; i++) {
      ingredients.push(
        meal.ingredients[i].measure + " " + meal.ingredients[i].ingredient,
      );
    }
    const requestBody = {
      recipeName: meal.name,
      ingredients: ingredients,
    };

    const response = await fetch(`${mealsBaseURL}/nutrition/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": usdaApiKey,
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const nutritionData = await response.json();
    return nutritionData.data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
