/**
 * NutriPlan - Main Entry Point
 *
 * This is the main entry point for the application.
 * Import your modules and initialize the app here.
 */

import { getCategories, getMeals, filterMeals } from "./mealdb.js";
import {
  displayCategories,
  displayMeals,
  selectedTab,
  displayProducts,
  showInitialPage,
  displayProductCategories,
  showProductsLoading,
  showApiError,
} from "./ui/components.js";
import {
  searchProducts,
  getProductByBarcode,
  getProductCategories,
  getProductsByCategory,
} from "./products.js";

const loadingOverlay = document.getElementById("app-loading-overlay");
const searchInput = document.getElementById("search-input");
const navLinks = document.querySelectorAll(".nav-link");

const productSearchInput = document.getElementById("product-search-input");
const productSearchBtn = document.getElementById("search-product-btn");
const barcodeInput = document.getElementById("barcode-input");
const barcodeLookupBtn = document.getElementById("lookup-barcode-btn");
const nutriScoreButtons = document.querySelectorAll(".nutri-score-filter");
let currentProducts = [];
let currentProductsLabel = "";

const showLoading = () => {
  loadingOverlay.style.display = "flex";
};

const hideLoading = () => {
  loadingOverlay.style.display = "none";
};

showInitialPage();

showLoading();
const categories = await getCategories();
displayCategories(categories);
const meals = await getMeals();
displayMeals(meals);
hideLoading();

const categoryCards = document.querySelectorAll(".category-card");
const productCategories = await getProductCategories();
displayProductCategories(productCategories);
const productCategoryBtns = document.querySelectorAll(".product-category-btn");

searchInput.addEventListener("input", async () => {
  const searchTerm = searchInput.value.trim();

  const searchedMeals = await getMeals(searchTerm);

  if (searchedMeals === null) {
    showApiError("Could not load recipes. Please try again.");
    return;
  }
  displayMeals(searchedMeals);
});

for (let i = 0; i < categoryCards.length; i++) {
  categoryCards[i].addEventListener("click", async (eventInfo) => {
    const category = eventInfo.currentTarget.getAttribute("data-category");
    showLoading();

    const filteredMeals = await filterMeals(category);

    if (filteredMeals === null) {
      showApiError(
        "Could not load recipes from this category. Please try again.",
      );

      return;
    }

    displayMeals(filteredMeals);
    hideLoading();
  });
}

for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", selectedTab);
}

productSearchBtn.addEventListener("click", async () => {
  const searchTerm = productSearchInput.value.trim();

  if (searchTerm === "") {
    return;
  }
  showProductsLoading();

  const products = await searchProducts(searchTerm);

  if (products === null) {
    showApiError("Could not search for products. Please try again.");
    displayProducts(currentProducts, currentProductsLabel);
    return;
  }

  currentProducts = products;
  currentProductsLabel = searchTerm;

  displayProducts(products, currentProductsLabel);
});

barcodeLookupBtn.addEventListener("click", async () => {
  const barcode = barcodeInput.value.trim();

  if (barcode === "") {
    return;
  }
  showProductsLoading();
  const product = await getProductByBarcode(barcode);

  if (product === null) {
    showApiError(
      "Could not find this product. Check the barcode and try again.",
    );
    displayProducts(currentProducts, currentProductsLabel);
    return;
  }

  currentProducts = [product];
  currentProductsLabel = barcode;

  displayProducts([product], barcode);
});

for (let i = 0; i < productCategoryBtns.length; i++) {
  productCategoryBtns[i].addEventListener("click", async (eventInfo) => {
    const categoryId = eventInfo.currentTarget.getAttribute("data-category-id");
    const categoryName =
      eventInfo.currentTarget.getAttribute("data-category-name");
    showProductsLoading();

    const products = await getProductsByCategory(categoryId);

    if (products === null) {
      showApiError("Could not load products from this category.");
      displayProducts(currentProducts, currentProductsLabel);
      return;
    }

    currentProducts = products;
    currentProductsLabel = categoryName;

    displayProducts(products, currentProductsLabel);
  });
}

for (let i = 0; i < nutriScoreButtons.length; i++) {
  nutriScoreButtons[i].addEventListener("click", function (eventInfo) {
    const selectedGrade = eventInfo.currentTarget.getAttribute("data-grade");

    if (selectedGrade === "") {
      displayProducts(currentProducts, currentProductsLabel);
      return;
    }

    const filteredProducts = currentProducts.filter(function (product) {
      return product.nutritionGrade === selectedGrade;
    });

    displayProducts(
      filteredProducts,
      `Nutri-Score ${selectedGrade.toUpperCase()}`,
    );
  });
}
