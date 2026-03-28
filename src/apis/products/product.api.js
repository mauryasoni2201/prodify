const BASE_URL = process.env.NEXT_PRODUCTS_API_URL;

export const getProducts = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${BASE_URL}${queryParams ? `?${queryParams}` : ""}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error in getProducts API:", error);
    throw error;
  }
};

export const getProductById = async (id) => {
  try {
    if (!id) throw new Error("Product ID is required");

    const response = await fetch(`${BASE_URL}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch product details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in getProductById API (${id}):`, error);
    throw error;
  }
};

export const getProductsByCategory = async (category, filters = {}) => {
  try {
    const queryParams = new URLSearchParams(filters).toString();
    const url = `${BASE_URL}/category/${category}${queryParams ? `?${queryParams}` : ""}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch category products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in getProductsByCategory API (${category}):`, error);
    throw error;
  }
};

export const searchProducts = async (query, filters = {}) => {
  try {
    const queryParams = new URLSearchParams({ q: query, ...filters }).toString();
    const url = `${BASE_URL}/search?${queryParams}`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Failed to search products: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error in searchProducts API (${query}):`, error);
    throw error;
  }
};
