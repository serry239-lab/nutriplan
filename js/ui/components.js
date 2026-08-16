// =========== Loading Spinner Design ============
/*
<div class="flex items-center justify-center py-12">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
</div>
*/

// =========== Empty State Design ============
/*
<div class="flex flex-col items-center justify-center py-12 text-center">
    <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <i class="fa-solid fa-search text-gray-400 text-2xl"></i>
    </div>
    <p class="text-gray-500 text-lg">No recipes found</p>
    <p class="text-gray-400 text-sm mt-2">Try searching for something else</p>
</div>
*/

import { getMealDetails, analyzeNutrition } from "../mealdb.js";
import { getProductByBarcode } from "../products.js";
import {
  addFoodToLog,
  getFoodLog,
  removeFoodFromLog,
  clearFoodLog,
} from "../appState.js";
// V  A  R  I  A  B  L  E  S
const pageTitle = document.getElementById("page-title");
const pageSubtitle = document.getElementById("page-subtitle");
const categoriesGrid = document.getElementById("categories-grid");
const recipesGrid = document.getElementById("recipes-grid");
const recipesCount = document.getElementById("recipes-count");
const allRecipesSection = document.getElementById("all-recipes-section");
const mealCategoriesSection = document.getElementById(
  "meal-categories-section",
);
const searchFiltersSection = document.getElementById("search-filters-section");
const mealDetailsSection = document.getElementById("meal-details");
const mealDetailsImg = document.getElementById("meal-details-img");
const mealDetailsTitle = document.getElementById("meal-details-title");
const mealDetailsCategory = document.getElementById("meal-details-category");
const mealDetailsArea = document.getElementById("meal-details-area");
const mealDetailsYoutubeVideo = document.getElementById(
  "meal-details-youtube-video",
);

const ingredientsCount = document.getElementById("ingredients-count");
const ingredientsList = document.getElementById("ingredients-list");
const instructionsList = document.getElementById("instructions-list");
const backToMealsBtn = document.getElementById("back-to-meals-btn");
const logMealBtn = document.getElementById("log-meal-btn");

const heroServings = document.getElementById("hero-servings");
const heroCalories = document.getElementById("hero-calories");
const nutritionCalories = document.getElementById("nutrition-calories");
const nutritionTotalCalories = document.getElementById(
  "nutrition-total-calories",
);
const nutritionProtein = document.getElementById("nutrition-protein");
const nutritionCarbs = document.getElementById("nutrition-carbs");
const nutritionFat = document.getElementById("nutrition-fat");
const nutritionFiber = document.getElementById("nutrition-fiber");
const nutritionSugar = document.getElementById("nutrition-sugar");
const nutritionCholesterol = document.getElementById("nutrition-cholesterol");
const nutritionSodium = document.getElementById("nutrition-sodium");

const nutritionLoader = document.getElementById("nutrition-loader");
const nutritionContent = document.getElementById("nutrition-facts-container");

const productsSection = document.getElementById("products-section");
const foodLogSection = document.getElementById("foodlog-section");
const navLinks = document.querySelectorAll(".nav-link");

const productsGrid = document.getElementById("products-grid");
const productsCount = document.getElementById("products-count");
const productCategoriesContainer =
  document.getElementById("product-categories");

let selectedProduct = null;
let selectedMeal = null;
let selectedMealNutrition = null;

const productModal = document.getElementById("product-modal");
const modalProductImage = document.getElementById("modal-product-image");
const modalProductBrand = document.getElementById("modal-product-brand");
const modalProductName = document.getElementById("modal-product-name");
const modalProductBarcode = document.getElementById("modal-product-barcode");
const modalNutriScore = document.getElementById("modal-nutri-score");
const modalNovaScore = document.getElementById("modal-nova-score");
const modalCalories = document.getElementById("modal-calories");
const modalProtein = document.getElementById("modal-protein");
const modalCarbs = document.getElementById("modal-carbs");
const modalFat = document.getElementById("modal-fat");
const modalSugar = document.getElementById("modal-sugar");
const modalSaturatedFat = document.getElementById("modal-saturated-fat");
const modalFiber = document.getElementById("modal-fiber");
const modalSodium = document.getElementById("modal-sodium");
const modalProductIngredients = document.getElementById(
  "modal-product-ingredients",
);
const closeProductModalX = document.getElementById("close-product-modal-x");
const closeProductModalBtn = document.getElementById("close-product-modal-btn");
const modalLogProductBtn = document.getElementById("modal-log-product-btn");

const loggedItemsCount = document.getElementById("logged-items-count");
const loggedItemsContainer = document.getElementById("logged-items-list");

const foodLogCalories = document.getElementById("foodlog-calories");
const foodLogProtein = document.getElementById("foodlog-protein");
const foodLogCarbs = document.getElementById("foodlog-carbs");
const foodLogFat = document.getElementById("foodlog-fat");
const foodLogCaloriesBar = document.getElementById("foodlog-calories-bar");
const foodLogProteinBar = document.getElementById("foodlog-protein-bar");
const foodLogCarbsBar = document.getElementById("foodlog-carbs-bar");
const foodLogFatBar = document.getElementById("foodlog-fat-bar");

const weeklyDaysContainer = document.getElementById("weekly-days-container");
const weeklyAverage = document.getElementById("weekly-average");
const weeklyTotalItems = document.getElementById("weekly-total-items");
const weeklyDaysGoal = document.getElementById("weekly-days-goal");

const foodLogDate = document.getElementById("foodlog-date");
const today = new Date();
const formattedDate = today.toLocaleDateString("en-US", {
  weekday: "long",
  month: "short",
  day: "numeric",
});
foodLogDate.textContent = formattedDate;

const clearFoodLogBtn = document.getElementById("clear-foodlog");

const categoryStyles = {
  Beef: {
    icon: "fa-drumstick-bite",
    cardClasses: [
      "from-red-50",
      "to-rose-50",
      "border-red-200",
      "hover:border-red-400",
    ],
    iconClasses: ["from-red-400", "to-rose-500"],
  },

  Pork: {
    icon: "fa-drumstick-bite",
    cardClasses: [
      "from-red-50",
      "to-rose-50",
      "border-red-200",
      "hover:border-red-400",
    ],
    iconClasses: ["from-red-400", "to-rose-500"],
  },

  Chicken: {
    icon: "fa-drumstick-bite",
    cardClasses: [
      "from-orange-50",
      "to-amber-50",
      "border-orange-200",
      "hover:border-orange-400",
    ],
    iconClasses: ["from-orange-400", "to-amber-500"],
  },

  Pasta: {
    icon: "fa-bowl-food",
    cardClasses: [
      "from-orange-50",
      "to-amber-50",
      "border-orange-200",
      "hover:border-orange-400",
    ],
    iconClasses: ["from-orange-400", "to-amber-500"],
  },

  Lamb: {
    icon: "fa-drumstick-bite",
    cardClasses: [
      "from-orange-50",
      "to-amber-50",
      "border-orange-200",
      "hover:border-orange-400",
    ],
    iconClasses: ["from-orange-400", "to-amber-500"],
  },

  Seafood: {
    icon: "fa-fish",
    cardClasses: [
      "from-blue-50",
      "to-cyan-50",
      "border-blue-200",
      "hover:border-blue-400",
    ],
    iconClasses: ["from-blue-400", "to-cyan-500"],
  },

  Dessert: {
    icon: "fa-cake-candles",
    cardClasses: [
      "from-pink-50",
      "to-rose-50",
      "border-pink-200",
      "hover:border-pink-400",
    ],
    iconClasses: ["from-pink-400", "to-rose-500"],
  },

  Vegan: {
    icon: "fa-leaf",
    cardClasses: [
      "from-emerald-50",
      "to-teal-50",
      "border-emerald-200",
      "hover:border-emerald-400",
    ],
    iconClasses: ["from-emerald-400", "to-green-500"],
  },

  Starter: {
    icon: "fa-utensils",
    cardClasses: [
      "from-teal-50",
      "to-cyan-50",
      "border-teal-200",
      "hover:border-teal-400",
    ],
    iconClasses: ["from-teal-400", "to-cyan-500"],
  },
};

const defaultCategoryStyle = {
  icon: "fa-utensils",
  cardClasses: [
    "from-emerald-50",
    "to-teal-50",
    "border-emerald-200",
    "hover:border-emerald-400",
  ],
  iconClasses: ["from-emerald-400", "to-green-500"],
};

const productCategoryStyles = {
  snacks: {
    icon: "fa-cookie",
    backgroundColor: "#d946ef",
    color: "white",
  },

  beverages: {
    icon: "fa-glass-water",
    backgroundColor: "#3b82f6",
    color: "white",
  },

  dairies: {
    icon: "fa-cheese",
    backgroundColor: "#0ea5e9",
    color: "white",
  },

  cheeses: {
    icon: "fa-cheese",
    backgroundColor: "#f59e0b",
    color: "white",
  },

  yogurts: {
    icon: "fa-jar",
    backgroundColor: "#a855f7",
    color: "white",
  },

  chocolates: {
    icon: "fa-cookie-bite",
    backgroundColor: "#92400e",
    color: "white",
  },

  "biscuits-and-cookies": {
    icon: "fa-cookie",
    backgroundColor: "#f97316",
    color: "white",
  },

  "ice-cream": {
    icon: "fa-ice-cream",
    backgroundColor: "#ec4899",
    color: "white",
  },

  "breakfast-cereals": {
    icon: "fa-wheat-awn",
    backgroundColor: "#f59e0b",
    color: "white",
  },

  fruits: {
    icon: "fa-apple-whole",
    backgroundColor: "#ef4444",
    color: "white",
  },

  vegetables: {
    icon: "fa-carrot",
    backgroundColor: "#22c55e",
    color: "white",
  },

  breads: {
    icon: "fa-bread-slice",
    backgroundColor: "#f59e0b",
    color: "white",
  },

  meats: {
    icon: "fa-drumstick-bite",
    backgroundColor: "#e11d48",
    color: "white",
  },

  waters: {
    icon: "fa-droplet",
    backgroundColor: "#06b6d4",
    color: "white",
  },
};

const defaultProductCategoryStyle = {
  icon: "fa-box",
  backgroundColor: "#14b8a6",
  color: "white",
};

// V  A  R  I  A  B  L  E  S

// F  U  N  C  T  I  O  N  S
export const showInitialPage = () => {
  searchFiltersSection.style.display = "";
  mealCategoriesSection.style.display = "";
  allRecipesSection.style.display = "";

  mealDetailsSection.style.display = "none";
  productsSection.style.display = "none";
  foodLogSection.style.display = "none";
};

const updatePageHeader = (title, subtitle) => {
  pageTitle.textContent = title;
  pageSubtitle.textContent = subtitle;
};

export const displayCategories = (categories) => {
  categoriesGrid.textContent = "";

  for (let i = 0; i < 12 && i < categories.length; i++) {
    const categoryCard = document.createElement("div");
    const style = categoryStyles[categories[i].name] || defaultCategoryStyle;

    categoryCard.classList.add(
      "category-card",
      "bg-gradient-to-br",
      "rounded-xl",
      "p-3",
      "border",
      "hover:shadow-md",
      "cursor-pointer",
      "transition-all",
      "group",
    );
    categoryCard.classList.add(...style.cardClasses);
    categoryCard.setAttribute("data-category", categories[i].name);

    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("flex", "items-center", "gap-2.5");

    const categoryIconBox = document.createElement("div");
    categoryIconBox.classList.add(
      "text-white",
      "w-9",
      "h-9",
      "bg-gradient-to-br",
      "rounded-lg",
      "flex",
      "items-center",
      "justify-center",
      "group-hover:scale-110",
      "transition-transform",
      "shadow-sm",
    );
    categoryIconBox.classList.add(...style.iconClasses);

    const categoryIcon = document.createElement("i");
    categoryIcon.classList.add("fa-solid", style.icon);

    const categoryName = document.createElement("h3");
    categoryName.classList.add("text-sm", "font-bold", "text-gray-900");
    categoryName.textContent = categories[i].name;

    categoryIconBox.append(categoryIcon);
    categoryContainer.append(categoryIconBox, categoryName);
    categoryCard.append(categoryContainer);
    categoriesGrid.append(categoryCard);
  }
};

export const displayMeals = (meals) => {
  recipesGrid.textContent = "";
  recipesCount.textContent = `Showing ${meals.length} recipes`;

  if (meals.length === 0) {
    const emptyState = document.createElement("div");
    emptyState.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-12",
      "text-center",
    );
    emptyState.style.gridColumn = "1 / -1";

    const emptyIconContainer = document.createElement("div");
    emptyIconContainer.classList.add(
      "w-16",
      "h-16",
      "bg-gray-100",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "mb-4",
    );

    const emptyIcon = document.createElement("i");
    emptyIcon.classList.add(
      "fa-solid",
      "fa-search",
      "text-gray-400",
      "text-2xl",
    );

    const emptyTitle = document.createElement("p");
    emptyTitle.classList.add("text-gray-500", "text-lg");
    emptyTitle.textContent = "No recipes found";

    const emptyText = document.createElement("p");
    emptyText.classList.add("text-gray-400", "text-sm", "mt-2");
    emptyText.textContent = "Try searching for something else";

    emptyIconContainer.append(emptyIcon);
    emptyState.append(emptyIconContainer, emptyTitle, emptyText);
    recipesGrid.append(emptyState);
    return;
  }

  for (let i = 0; i < meals.length; i++) {
    const recipeCard = document.createElement("div");
    recipeCard.classList.add(
      "recipe-card",
      "bg-white",
      "rounded-xl",
      "overflow-hidden",
      "shadow-sm",
      "hover:shadow-lg",
      "cursor-pointer",
      "transition-all",
      "group",
    );
    recipeCard.setAttribute("data-meal-id", meals[i].id);
    recipeCard.addEventListener("click", async (eventInfo) => {
      const selectedRecipe =
        eventInfo.currentTarget.getAttribute("data-meal-id");

      const mealDetails = await getMealDetails(selectedRecipe);
      if (mealDetails !== null) {
        await displayMealDetails(mealDetails);
      }
    });

    const mealImgContainer = document.createElement("div");
    mealImgContainer.classList.add("relative", "h-48", "overflow-hidden");

    const mealImg = document.createElement("img");
    mealImg.classList.add(
      "w-full",
      "h-full",
      "object-cover",
      "group-hover:scale-110",
      "transition-transform",
      "duration-500",
    );
    mealImg.setAttribute("src", meals[i].thumbnail);
    mealImg.setAttribute("alt", meals[i].name);
    mealImg.setAttribute("loading", "lazy");

    const mealTags = document.createElement("div");
    mealTags.classList.add("absolute", "bottom-3", "left-3", "flex", "gap-2");

    const mealCategory = document.createElement("span");
    mealCategory.classList.add(
      "px-2",
      "py-1",
      "bg-white/90",
      "backdrop-blur-sm",
      "text-xs",
      "font-semibold",
      "rounded-lg",
    );

    const mealCategoryIcon = document.createElement("i");
    mealCategoryIcon.classList.add(
      "fa-solid",
      "fa-tag",
      "mr-1",
      "text-emerald-600",
    );

    mealCategory.append(mealCategoryIcon, meals[i].category);

    const mealCuisine = document.createElement("span");
    mealCuisine.classList.add(
      "px-2",
      "py-1",
      "bg-white/90",
      "backdrop-blur-sm",
      "text-xs",
      "font-semibold",
      "rounded-lg",
    );

    const mealCuisineIcon = document.createElement("i");
    mealCuisineIcon.classList.add(
      "fa-solid",
      "fa-globe",
      "mr-1",
      "text-blue-600",
    );

    mealCuisine.append(mealCuisineIcon, meals[i].area);

    mealTags.append(mealCategory, mealCuisine);

    const mealContent = document.createElement("div");
    mealContent.classList.add("p-4");

    const mealTitle = document.createElement("h3");
    mealTitle.classList.add(
      "text-base",
      "font-bold",
      "text-gray-900",
      "mb-1",
      "group-hover:text-emerald-600",
      "transition-colors",
      "line-clamp-1",
    );
    mealTitle.textContent = meals[i].name;

    const mealInstructions = document.createElement("p");
    mealInstructions.classList.add(
      "text-xs",
      "text-gray-600",
      "mb-3",
      "line-clamp-2",
    );
    mealInstructions.textContent = meals[i].instructions.join(" ");

    const mealContentTags = document.createElement("div");
    mealContentTags.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "text-xs",
    );

    const mealContentCategory = document.createElement("span");
    mealContentCategory.classList.add("text-gray-900", "font-semibold");

    const mealContentCategoryIcon = document.createElement("i");
    mealContentCategoryIcon.classList.add(
      "fa-solid",
      "fa-utensils",
      "mr-1",
      "text-emerald-600",
    );

    mealContentCategory.append(mealContentCategoryIcon, meals[i].category);

    const mealContentCuisine = document.createElement("span");
    mealContentCuisine.classList.add("text-gray-500", "font-semibold");

    const mealContentCuisineIcon = document.createElement("i");
    mealContentCuisineIcon.classList.add(
      "fa-solid",
      "fa-globe",
      "mr-1",
      "text-blue-500",
    );

    mealContentCuisine.append(mealContentCuisineIcon, meals[i].area);

    mealContentTags.append(mealContentCategory, mealContentCuisine);
    mealContent.append(mealTitle, mealInstructions, mealContentTags);
    mealImgContainer.append(mealImg, mealTags);
    recipeCard.append(mealImgContainer, mealContent);
    recipesGrid.append(recipeCard);
  }
};

export const displayMealDetails = async (meal) => {
  selectedMeal = meal;
  selectedMealNutrition = null;
  logMealBtn.disabled = true;

  updatePageHeader(
    "Recipe Details",
    "View full recipe information and nutrition facts",
  );

  searchFiltersSection.style.display = "none";
  mealCategoriesSection.style.display = "none";
  allRecipesSection.style.display = "none";
  productsSection.style.display = "none";
  foodLogSection.style.display = "none";

  mealDetailsSection.style.display = "";

  mealDetailsImg.src = meal.thumbnail;
  mealDetailsImg.alt = meal.name;
  mealDetailsTitle.textContent = meal.name;
  mealDetailsCategory.textContent = meal.category;
  mealDetailsArea.textContent = meal.area;
  logMealBtn.setAttribute("data-meal-id", meal.id);

  if (meal.youtube) {
    const videoId = meal.youtube.split("v=")[1];
    mealDetailsYoutubeVideo.src = `https://www.youtube.com/embed/${videoId}`;
  }

  ingredientsList.textContent = "";

  ingredientsCount.textContent = `${meal.ingredients.length} items`;
  for (let i = 0; i < meal.ingredients.length; i++) {
    const ingredientItem = document.createElement("div");
    ingredientItem.classList.add(
      "flex",
      "items-center",
      "gap-3",
      "p-3",
      "bg-gray-50",
      "rounded-xl",
      "hover:bg-emerald-50",
      "transition-colors",
    );

    const ingredientCheckbox = document.createElement("input");
    ingredientCheckbox.setAttribute("type", "checkbox");
    ingredientCheckbox.classList.add(
      "ingredient-checkbox",
      "w-5",
      "h-5",
      "text-emerald-600",
      "rounded",
      "border-gray-300",
    );

    const ingredientText = document.createElement("span");
    ingredientText.classList.add("text-gray-700");

    const ingredientMeasure = document.createElement("span");
    ingredientMeasure.classList.add("font-medium", "text-gray-900");
    ingredientMeasure.textContent = meal.ingredients[i].measure;

    ingredientText.append(
      ingredientMeasure,
      " " + meal.ingredients[i].ingredient,
    );

    ingredientItem.append(ingredientCheckbox, ingredientText);
    ingredientsList.append(ingredientItem);
  }

  instructionsList.textContent = "";

  for (let i = 0; i < meal.instructions.length; i++) {
    const instructionItem = document.createElement("div");
    instructionItem.classList.add(
      "flex",
      "gap-4",
      "p-4",
      "rounded-xl",
      "hover:bg-gray-50",
      "transition-colors",
    );

    const instructionNumber = document.createElement("div");
    instructionNumber.classList.add(
      "w-10",
      "h-10",
      "rounded-full",
      "bg-emerald-600",
      "text-white",
      "flex",
      "items-center",
      "justify-center",
      "font-bold",
      "shrink-0",
    );
    instructionNumber.textContent = i + 1;

    const instructionText = document.createElement("p");
    instructionText.classList.add("text-gray-700", "leading-relaxed", "pt-2");
    instructionText.textContent = meal.instructions[i];

    instructionItem.append(instructionNumber, instructionText);
    instructionsList.append(instructionItem);
  }

  showNutritionLoading();
  const nutrition = await analyzeNutrition(meal);
  hideNutritionLoading();

  if (nutrition !== null) {
    selectedMealNutrition = nutrition;
    displayNutrition(nutrition);
    logMealBtn.disabled = false;
  }

  window.scrollTo(0, 0);
};

export const displayNutrition = (nutrition) => {
  heroServings.textContent = `${nutrition.servings} servings`;
  heroCalories.textContent = `${nutrition.perServing.calories} cal/serving`;
  nutritionCalories.textContent = nutrition.perServing.calories;
  nutritionTotalCalories.textContent = `Total: ${nutrition.totals.calories} cal`;
  nutritionProtein.textContent = `${nutrition.perServing.protein}g`;
  nutritionCarbs.textContent = `${nutrition.perServing.carbs}g`;
  nutritionFat.textContent = `${nutrition.perServing.fat}g`;
  nutritionFiber.textContent = `${nutrition.perServing.fiber}g`;
  nutritionSugar.textContent = `${nutrition.perServing.sugar}g`;
  nutritionCholesterol.textContent = `${nutrition.perServing.cholesterol}mg`;
  nutritionSodium.textContent = `${nutrition.perServing.sodium}mg`;
};

const showNutritionLoading = () => {
  nutritionLoader.style.display = "flex";
  nutritionContent.style.display = "none";

  heroCalories.textContent = "Calculating...";
};
const hideNutritionLoading = () => {
  nutritionLoader.style.display = "none";
  nutritionContent.style.display = "";
};

export const selectedTab = function (eventInfo) {
  eventInfo.preventDefault();
  const clickedNavLink = eventInfo.currentTarget;
  const selectedPage = eventInfo.currentTarget.getAttribute("data-page");

  for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].classList.remove("bg-emerald-50", "text-emerald-700");
    navLinks[i].classList.add("text-gray-600", "hover:bg-gray-50");
  }

  clickedNavLink.classList.remove("text-gray-600", "hover:bg-gray-50");
  clickedNavLink.classList.add("bg-emerald-50", "text-emerald-700");

  searchFiltersSection.style.display = "none";
  mealCategoriesSection.style.display = "none";
  allRecipesSection.style.display = "none";
  mealDetailsSection.style.display = "none";
  productsSection.style.display = "none";
  foodLogSection.style.display = "none";

  if (selectedPage === "meals") {
    searchFiltersSection.style.display = "";
    mealCategoriesSection.style.display = "";
    allRecipesSection.style.display = "";
  } else if (selectedPage === "products") {
    productsSection.style.display = "";
  } else if (selectedPage === "foodlog") {
    foodLogSection.style.display = "";
  }

  const selectedLinkText = clickedNavLink
    .querySelector("span")
    .textContent.trim();

  if (selectedLinkText === "Meals & Recipes") {
    updatePageHeader(
      "Meals & Recipes",
      "Discover delicious and nutritious recipes tailored for you",
    );
  }

  if (selectedLinkText === "Product Scanner") {
    updatePageHeader(
      "Product Scanner",
      "Search packaged foods by name or barcode",
    );
  }

  if (selectedLinkText === "Food Log") {
    updatePageHeader("Food Log", "Track your daily nutrition and food intake");
  }
};

export const displayProducts = (products, searchLabel = "") => {
  productsGrid.textContent = "";

  if (searchLabel !== "") {
    productsCount.textContent = `Found ${products.length} products for "${searchLabel}"`;
  } else {
    productsCount.textContent = `Found ${products.length} products`;
  }

  if (products.length === 0) {
    const emptyState = document.createElement("div");

    emptyState.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-12",
      "text-center",
    );

    emptyState.style.gridColumn = "1 / -1";

    const emptyIconContainer = document.createElement("div");

    emptyIconContainer.classList.add(
      "w-16",
      "h-16",
      "bg-gray-100",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
      "mb-4",
    );

    const emptyIcon = document.createElement("i");

    emptyIcon.classList.add(
      "fa-solid",
      "fa-search",
      "text-gray-400",
      "text-2xl",
    );

    const emptyTitle = document.createElement("p");
    emptyTitle.classList.add("text-gray-500", "text-lg");
    emptyTitle.textContent = "No products to display";

    const emptyText = document.createElement("p");
    emptyText.classList.add("text-gray-400", "text-sm", "mt-2");
    emptyText.textContent = "Search for a product or browse by category";

    emptyIconContainer.append(emptyIcon);

    emptyState.append(emptyIconContainer, emptyTitle, emptyText);

    productsGrid.append(emptyState);

    return;
  }

  for (let i = 0; i < products.length; i++) {
    const productCard = document.createElement("div");
    productCard.classList.add(
      "product-card",
      "bg-white",
      "rounded-xl",
      "overflow-hidden",
      "shadow-sm",
      "hover:shadow-lg",
      "cursor-pointer",
      "transition-all",
      "group",
    );
    productCard.setAttribute("data-barcode", products[i].barcode);
    productCard.addEventListener("click", async (eventInfo) => {
      const barcode = eventInfo.currentTarget.getAttribute("data-barcode");

      const product = await getProductByBarcode(barcode);

      displayProductModal(product);
    });

    const productImgContainer = document.createElement("div");
    productImgContainer.classList.add(
      "relative",
      "h-40",
      "bg-gray-100",
      "flex",
      "items-center",
      "justify-center",
      "overflow-hidden",
    );

    const productImg = document.createElement("img");
    productImg.classList.add(
      "w-full",
      "h-full",
      "object-contain",
      "group-hover:scale-110",
      "transition-transform",
      "duration-300",
    );
    productImg.setAttribute("src", products[i].image);
    productImg.setAttribute("alt", products[i].name);
    productImg.setAttribute("loading", "lazy");

    const nutriScoreBadge = document.createElement("div");
    nutriScoreBadge.classList.add(
      "absolute",
      "top-2",
      "left-2",
      "bg-green-500",
      "text-white",
      "text-xs",
      "font-bold",
      "px-2",
      "py-1",
      "rounded",
      "uppercase",
    );
    const nutritionGrade = products[i].nutritionGrade || "unknown";
    nutriScoreBadge.textContent = `Nutri-Score ${nutritionGrade.toUpperCase()}`;

    const novaBadge = document.createElement("div");
    novaBadge.classList.add(
      "absolute",
      "top-2",
      "right-2",
      "bg-lime-500",
      "text-white",
      "text-xs",
      "font-bold",
      "w-6",
      "h-6",
      "rounded-full",
      "flex",
      "items-center",
      "justify-center",
    );
    novaBadge.setAttribute("title", `NOVA ${products[i].novaGroup}`);
    novaBadge.textContent = products[i].novaGroup;
    productImgContainer.append(productImg, nutriScoreBadge, novaBadge);

    const productContent = document.createElement("div");
    productContent.classList.add("p-4");

    const productBrand = document.createElement("p");
    productBrand.classList.add(
      "text-xs",
      "text-emerald-600",
      "font-semibold",
      "mb-1",
      "truncate",
    );
    productBrand.textContent = products[i].brand;

    const productName = document.createElement("h3");
    productName.classList.add(
      "font-bold",
      "text-gray-900",
      "mb-2",
      "group-hover:text-emerald-600",
      "transition-colors",
      "line-clamp-2",
    );
    productName.textContent = products[i].name;

    const productQuickFacts = document.createElement("div");
    productQuickFacts.classList.add(
      "flex",
      "items-center",
      "gap-3",
      "text-xs",
      "text-gray-500",
      "mb-3",
    );

    const productMass = document.createElement("span");
    const productMassIcon = document.createElement("i");
    productMassIcon.classList.add("fa-solid", "fa-weight-scale", "mr-1");
    const productMassText = document.createTextNode("250 g");
    productMass.append(productMassIcon, productMassText);

    const productCalories = document.createElement("span");
    const productCaloriesIcon = document.createElement("i");
    productCaloriesIcon.classList.add("fa-solid", "fa-fire", "mr-1");
    const productCaloriesText = document.createTextNode(
      `${parseFloat(products[i].nutrients.calories).toFixed(0)} kcal/100g`,
    );
    productCalories.append(productCaloriesIcon, productCaloriesText);
    productQuickFacts.append(productMass, productCalories);

    const productMiniNutrition = document.createElement("div");
    productMiniNutrition.classList.add(
      "grid",
      "grid-cols-4",
      "gap-1",
      "text-center",
    );

    const productProteinBox = document.createElement("div");
    productProteinBox.classList.add("bg-emerald-50", "rounded", "p-1.5");

    const productProteinCount = document.createElement("p");
    productProteinCount.classList.add(
      "text-xs",
      "font-bold",
      "text-emerald-700",
    );
    productProteinCount.textContent = `${parseFloat(products[i].nutrients.protein).toFixed(1)}g`;

    const productProteinTitle = document.createElement("p");
    productProteinTitle.classList.add("text-[10px]", "text-gray-500");
    productProteinTitle.textContent = "Protein";

    productProteinBox.append(productProteinCount, productProteinTitle);

    const productCarbsBox = document.createElement("div");
    productCarbsBox.classList.add("bg-blue-50", "rounded", "p-1.5");

    const productCarbsCount = document.createElement("p");
    productCarbsCount.classList.add("text-xs", "font-bold", "text-blue-700");
    productCarbsCount.textContent = `${parseFloat(products[i].nutrients.carbs).toFixed(1)}g`;

    const productCarbsTitle = document.createElement("p");
    productCarbsTitle.classList.add("text-[10px]", "text-gray-500");
    productCarbsTitle.textContent = "Carbs";

    productCarbsBox.append(productCarbsCount, productCarbsTitle);

    const productFatBox = document.createElement("div");
    productFatBox.classList.add("bg-purple-50", "rounded", "p-1.5");

    const productFatCount = document.createElement("p");
    productFatCount.classList.add("text-xs", "font-bold", "text-purple-700");
    productFatCount.textContent = `${parseFloat(products[i].nutrients.fat).toFixed(1)}g`;

    const productFatTitle = document.createElement("p");
    productFatTitle.classList.add("text-[10px]", "text-gray-500");
    productFatTitle.textContent = "Fat";

    productFatBox.append(productFatCount, productFatTitle);

    const productSugarBox = document.createElement("div");
    productSugarBox.classList.add("bg-orange-50", "rounded", "p-1.5");

    const productSugarCount = document.createElement("p");
    productSugarCount.classList.add("text-xs", "font-bold", "text-orange-700");
    productSugarCount.textContent = `${parseFloat(products[i].nutrients.sugar).toFixed(1)}g`;

    const productSugarTitle = document.createElement("p");
    productSugarTitle.classList.add("text-[10px]", "text-gray-500");
    productSugarTitle.textContent = "Sugar";
    productSugarBox.append(productSugarCount, productSugarTitle);

    productMiniNutrition.append(
      productProteinBox,
      productCarbsBox,
      productFatBox,
      productSugarBox,
    );
    productContent.append(
      productBrand,
      productName,
      productQuickFacts,
      productMiniNutrition,
    );
    productCard.append(productImgContainer, productContent);
    productsGrid.append(productCard);
  }
};

export const showProductsLoading = () => {
  productsGrid.textContent = "";

  const loadingContainer = document.createElement("div");
  loadingContainer.classList.add(
    "flex",
    "items-center",
    "justify-center",
    "py-12",
  );

  loadingContainer.style.gridColumn = "1 / -1";
  const spinner = document.createElement("div");
  spinner.classList.add(
    "animate-spin",
    "rounded-full",
    "h-12",
    "w-12",
    "border-b-2",
    "border-emerald-600",
  );

  loadingContainer.append(spinner);
  productsGrid.append(loadingContainer);
};
// let selectedProduct = null;

export const displayProductModal = (product) => {
  selectedProduct = product;

  const nutrients = product.nutrients || {};

  modalProductImage.src = product.image || "";
  modalProductImage.alt = product.name || "Product";

  modalProductBrand.textContent = product.brand || "Unknown brand";

  modalProductName.textContent = product.name || "Unknown product";

  modalProductBarcode.textContent = `Barcode: ${product.barcode || "Not available"}`;

  modalNutriScore.textContent = `Nutri-Score ${(product.nutritionGrade || "Unknown").toUpperCase()}`;

  modalNovaScore.textContent = `NOVA ${product.novaGroup || "Unknown"}`;

  modalCalories.textContent = Math.round(Number(nutrients.calories) || 0);

  modalProtein.textContent = `${(Number(nutrients.protein) || 0).toFixed(1)}g`;

  modalCarbs.textContent = `${(Number(nutrients.carbs) || 0).toFixed(1)}g`;

  modalFat.textContent = `${(Number(nutrients.fat) || 0).toFixed(1)}g`;

  modalSugar.textContent = `${(Number(nutrients.sugar) || 0).toFixed(1)}g`;

  modalSaturatedFat.textContent = `${(Number(nutrients.saturatedFat) || 0).toFixed(1)}g`;

  modalFiber.textContent = `${(Number(nutrients.fiber) || 0).toFixed(1)}g`;

  modalSodium.textContent = `${(Number(nutrients.sodium) || 0).toFixed(2)}g`;

  modalProductIngredients.textContent =
    product.ingredients || "Ingredients not available";

  productModal.classList.remove("hidden");
  productModal.classList.add("flex");

  document.body.classList.add("overflow-hidden");
};

const closeProductModal = () => {
  productModal.classList.add("hidden");
  productModal.classList.remove("flex");

  document.body.classList.remove("overflow-hidden");
};

export const displayProductCategories = (categories) => {
  productCategoriesContainer.textContent = "";

  for (let i = 0; i < categories.length; i++) {
    const categoryButton = document.createElement("button");

    const style =
      productCategoryStyles[categories[i].id] || defaultProductCategoryStyle;

    categoryButton.classList.add(
      "product-category-btn",
      "px-4",
      "py-2",
      "rounded-lg",
      "text-sm",
      "font-medium",
      "whitespace-nowrap",
      "transition-all",
    );

    // Dynamic colors
    categoryButton.style.backgroundColor = style.backgroundColor;
    categoryButton.style.color = style.color;

    categoryButton.setAttribute("data-category-id", categories[i].id);

    categoryButton.setAttribute("data-category-name", categories[i].name);

    const categoryIcon = document.createElement("i");

    categoryIcon.classList.add("fa-solid", style.icon, "mr-1.5");

    const categoryName = document.createTextNode(categories[i].name);

    categoryButton.append(categoryIcon, categoryName);

    productCategoriesContainer.append(categoryButton);
  }
};

export const displayFoodLog = (foodLog) => {
  updateFoodLogNutrition(foodLog);
  displayWeeklyOverview(foodLog);

  loggedItemsContainer.textContent = "";
  loggedItemsCount.textContent = `Logged Items (${foodLog.length})`;

  if (foodLog.length === 0) {
    const emptyState = document.createElement("div");

    emptyState.classList.add(
      "flex",
      "flex-col",
      "items-center",
      "justify-center",
      "py-10",
      "text-center",
    );

    const emptyIcon = document.createElement("i");

    emptyIcon.classList.add(
      "fa-solid",
      "fa-utensils",
      "text-gray-300",
      "text-4xl",
      "mb-3",
    );

    const emptyTitle = document.createElement("p");

    emptyTitle.classList.add("text-gray-600", "font-medium");

    emptyTitle.textContent = "No meals logged today";

    const emptyText = document.createElement("p");

    emptyText.classList.add("text-sm", "text-gray-400", "mt-1");

    emptyText.textContent = "Add meals from the Meals page or scan products";

    emptyState.append(emptyIcon, emptyTitle, emptyText);

    loggedItemsContainer.append(emptyState);

    return;
  }

  for (let i = 0; i < foodLog.length; i++) {
    const food = foodLog[i];

    const foodItem = document.createElement("div");
    foodItem.classList.add(
      "flex",
      "items-center",
      "justify-between",
      "p-4",
      "bg-gray-50",
      "rounded-xl",
      "mb-3",
    );

    const foodInfo = document.createElement("div");

    const foodName = document.createElement("h4");
    foodName.classList.add("font-semibold", "text-gray-900");
    foodName.textContent = food.name || "Unknown food";

    const foodBrand = document.createElement("p");
    foodBrand.classList.add("text-xs", "text-gray-500", "mt-1");
    foodBrand.textContent = food.brand || "Recipe";

    foodInfo.append(foodName, foodBrand);

    const foodNutrition = document.createElement("div");
    foodNutrition.classList.add("flex", "items-center", "gap-5", "text-sm");

    const calories = document.createElement("div");
    calories.classList.add("text-center");

    const caloriesValue = document.createElement("p");
    caloriesValue.classList.add("font-bold", "text-gray-900");
    caloriesValue.textContent = `${Math.round(Number(food.calories) || 0)} kcal`;

    const caloriesTitle = document.createElement("p");
    caloriesTitle.classList.add("text-xs", "text-gray-400");
    caloriesTitle.textContent = "Calories";

    calories.append(caloriesValue, caloriesTitle);

    const protein = document.createElement("div");
    protein.classList.add("text-center");

    const proteinValue = document.createElement("p");
    proteinValue.classList.add("font-bold", "text-emerald-600");
    proteinValue.textContent = `${(Number(food.protein) || 0).toFixed(1)}g`;

    const proteinTitle = document.createElement("p");
    proteinTitle.classList.add("text-xs", "text-gray-400");
    proteinTitle.textContent = "Protein";

    protein.append(proteinValue, proteinTitle);

    const deleteLoggedFoodBtn = document.createElement("button");
    deleteLoggedFoodBtn.classList.add(
      "text-gray-400",
      "hover:text-red-500",
      "transition-colors",
      "ml-2",
    );

    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-trash");
    deleteLoggedFoodBtn.append(deleteIcon);

    deleteLoggedFoodBtn.addEventListener("click", () => {
      const updatedFoodLog = removeFoodFromLog(food.id);
      displayFoodLog(updatedFoodLog);
    });

    foodNutrition.append(calories, protein, deleteLoggedFoodBtn);
    foodItem.append(foodInfo, foodNutrition);
    loggedItemsContainer.append(foodItem);
  }
};

const updateFoodLogNutrition = (foodLog) => {
  let totalCalories = 0;
  let totalProtein = 0;
  let totalCarbs = 0;
  let totalFat = 0;

  for (let i = 0; i < foodLog.length; i++) {
    totalCalories += Number(foodLog[i].calories) || 0;
    totalProtein += Number(foodLog[i].protein) || 0;
    totalCarbs += Number(foodLog[i].carbs) || 0;
    totalFat += Number(foodLog[i].fat) || 0;
  }

  foodLogCalories.textContent = `${Math.round(totalCalories)} / 2000 kcal`;

  foodLogProtein.textContent = `${totalProtein.toFixed(1)} / 50 g`;

  foodLogCarbs.textContent = `${totalCarbs.toFixed(1)} / 250 g`;

  foodLogFat.textContent = `${totalFat.toFixed(1)} / 65 g`;

  let caloriesPercentage = (totalCalories / 2000) * 100;
  let proteinPercentage = (totalProtein / 50) * 100;
  let carbsPercentage = (totalCarbs / 250) * 100;
  let fatPercentage = (totalFat / 65) * 100;

  if (caloriesPercentage > 100) {
    caloriesPercentage = 100;
  }

  if (proteinPercentage > 100) {
    proteinPercentage = 100;
  }

  if (carbsPercentage > 100) {
    carbsPercentage = 100;
  }

  if (fatPercentage > 100) {
    fatPercentage = 100;
  }

  foodLogCaloriesBar.style.width = `${caloriesPercentage}%`;
  foodLogProteinBar.style.width = `${proteinPercentage}%`;
  foodLogCarbsBar.style.width = `${carbsPercentage}%`;
  foodLogFatBar.style.width = `${fatPercentage}%`;
};

const displayWeeklyOverview = (foodLog) => {
  weeklyDaysContainer.textContent = "";

  const today = new Date();

  const currentDay = today.getDay();
  let daysFromMonday = currentDay - 1;

  if (currentDay === 0) {
    daysFromMonday = 6;
  }

  const monday = new Date(today);
  monday.setDate(today.getDate() - daysFromMonday);
  monday.setHours(0, 0, 0, 0);

  let totalWeeklyCalories = 0;
  let totalWeeklyItems = 0;
  let daysOnGoal = 0;

  for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
    const currentDate = new Date(monday);
    currentDate.setDate(monday.getDate() + dayIndex);

    let dayCalories = 0;
    let dayItems = 0;

    for (let i = 0; i < foodLog.length; i++) {
      const foodDate = new Date(foodLog[i].loggedAt);

      if (
        foodDate.getFullYear() === currentDate.getFullYear() &&
        foodDate.getMonth() === currentDate.getMonth() &&
        foodDate.getDate() === currentDate.getDate()
      ) {
        dayCalories += Number(foodLog[i].calories) || 0;
        dayItems++;
      }
    }

    totalWeeklyCalories += dayCalories;
    totalWeeklyItems += dayItems;

    if (dayCalories >= 1800 && dayCalories <= 2200) {
      daysOnGoal++;
    }

    const dayCard = document.createElement("div");
    dayCard.classList.add("p-3", "rounded-xl", "transition-colors");

    if (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getDate() === today.getDate()
    ) {
      dayCard.classList.add("bg-indigo-100");
    }

    const dayName = document.createElement("p");
    dayName.classList.add("text-xs", "text-gray-500");
    dayName.textContent = currentDate.toLocaleDateString("en-US", {
      weekday: "short",
    });

    const dayNumber = document.createElement("p");
    dayNumber.classList.add("text-sm", "font-medium", "text-gray-700", "mt-1");
    dayNumber.textContent = currentDate.getDate();

    const caloriesValue = document.createElement("p");
    caloriesValue.classList.add("font-bold", "mt-3");

    if (dayCalories > 0) {
      caloriesValue.classList.add("text-emerald-600");
    } else {
      caloriesValue.classList.add("text-gray-300");
    }
    caloriesValue.textContent = Math.round(dayCalories);

    const caloriesTitle = document.createElement("p");
    caloriesTitle.classList.add("text-[10px]", "text-gray-400");
    caloriesTitle.textContent = "kcal";

    dayCard.append(dayName, dayNumber, caloriesValue, caloriesTitle);

    if (dayItems > 0) {
      const itemCount = document.createElement("p");
      itemCount.classList.add("text-[10px]", "text-gray-500", "mt-2");

      if (dayItems === 1) {
        itemCount.textContent = "1 item";
      } else {
        itemCount.textContent = `${dayItems} items`;
      }
      dayCard.append(itemCount);
    }
    weeklyDaysContainer.append(dayCard);
  }

  const weeklyAverageCalories = totalWeeklyCalories / 7;
  weeklyAverage.textContent = `${Math.round(weeklyAverageCalories)} kcal`;

  weeklyTotalItems.textContent = `${totalWeeklyItems} ${
    totalWeeklyItems === 1 ? "item" : "items"
  }`;
  weeklyDaysGoal.textContent = `${daysOnGoal} / 7`;
};

export const showApiError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Something went wrong",
    text: message,
    confirmButtonText: "OK",
  });
};
// F  U  N  C  T  I  O  N  S

backToMealsBtn.addEventListener("click", () => {
  mealDetailsSection.style.display = "none";

  searchFiltersSection.style.display = "";
  mealCategoriesSection.style.display = "";
  allRecipesSection.style.display = "";

  productsSection.style.display = "none";
  foodLogSection.style.display = "none";

  window.scrollTo(0, 0);
  updatePageHeader(
    "Meals & Recipes",
    "Discover delicious and nutritious recipes tailored for you",
  );
});

closeProductModalBtn.addEventListener("click", closeProductModal);

closeProductModalX.addEventListener("click", closeProductModal);

productModal.addEventListener("click", (eventInfo) => {
  if (eventInfo.target === productModal) {
    closeProductModal();
  }
});

modalLogProductBtn.addEventListener("click", () => {
  if (selectedProduct === null) {
    return;
  }
  const loggedFood = {
    type: "product",
    name: selectedProduct.name,
    brand: selectedProduct.brand,
    calories: selectedProduct.nutrients.calories,
    protein: selectedProduct.nutrients.protein,
    carbs: selectedProduct.nutrients.carbs,
    fat: selectedProduct.nutrients.fat,
    barcode: selectedProduct.barcode,
  };

  const updatedFoodLog = addFoodToLog(loggedFood);
  displayFoodLog(updatedFoodLog);
  closeProductModal();

  Swal.fire({
    icon: "success",
    title: "Food Logged!",
    text: `${loggedFood.name} has been added to your daily log. +${Math.round(
      Number(loggedFood.calories) || 0,
    )} calories`,
    showConfirmButton: false,
    timer: 1800,
    width: "380px",
  });
});

logMealBtn.addEventListener("click", () => {
  if (selectedMeal === null || selectedMealNutrition === null) {
    return;
  }
  const loggedMeal = {
    type: "meal",
    name: selectedMeal.name,
    brand: selectedMeal.category,
    calories: selectedMealNutrition.perServing.calories,
    protein: selectedMealNutrition.perServing.protein,
    carbs: selectedMealNutrition.perServing.carbs,
    fat: selectedMealNutrition.perServing.fat,
    mealId: selectedMeal.id,
  };

  const updatedFoodLog = addFoodToLog(loggedMeal);
  displayFoodLog(updatedFoodLog);

  Swal.fire({
    icon: "success",
    title: "Meal Logged!",
    html: `
      <p>${selectedMeal.name} has been added to your daily log.</p>
      <p class="text-emerald-600 font-bold mt-2">
        +${Math.round(selectedMealNutrition.perServing.calories)} calories
      </p>
    `,
    showConfirmButton: false,
    timer: 1800,
    timerProgressBar: true,
  });
});

clearFoodLogBtn.addEventListener("click", () => {
  Swal.fire({
    icon: "warning",
    title: "Clear Today's Log?",
    text: "This will remove all logged food items for today.",
    showCancelButton: true,
    confirmButtonText: "Yes, clear it!",
    cancelButtonText: "Cancel",
    confirmButtonColor: "#ef4444",
    cancelButtonColor: "#6b7280",
  }).then((result) => {
    if (result.isConfirmed) {
      const updatedFoodLog = clearFoodLog();
      displayFoodLog(updatedFoodLog);
    }
  });
});

displayFoodLog(getFoodLog());
