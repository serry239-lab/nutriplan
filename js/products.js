const productsBaseURL = "https://nutriplan-api.vercel.app/api";

export const searchProducts = async (searchTerm) => {
  try {
    const response = await fetch(
      `${productsBaseURL}/products/search?q=${encodeURIComponent(searchTerm)}&page=1&limit=24`,
    );

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const productsData = await response.json();

    return productsData.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductByBarcode = async (barcode) => {
  try {
    const response = await fetch(
      `${productsBaseURL}/products/barcode/${encodeURIComponent(barcode)}`,
    );

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const productData = await response.json();

    return productData.result;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getProductCategories = async () => {
  try {
    const response = await fetch(`${productsBaseURL}/products/categories`);

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

export const getProductsByCategory = async (categoryId) => {
  try {
    const response = await fetch(
      `${productsBaseURL}/products/category/${encodeURIComponent(categoryId)}`
    );

    if (!response.ok) {
      throw new Error("Request failed: " + response.status);
    }

    const productsData = await response.json();

    return productsData.results;
  } catch (error) {
    console.log(error);
    return null;
  }
};