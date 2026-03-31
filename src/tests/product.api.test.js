import {
  getProducts,
  getProductById,
  getProductsByCategory,
  searchProducts,
} from "@/apis/products/product.api";

global.fetch = jest.fn();

const fakeProduct = { id: 1, title: "Test Product", price: 29.99 };
const fakeProductList = { products: [fakeProduct], total: 1 };

function mockSuccess(data) {
  global.fetch.mockResolvedValueOnce({
    ok: true,
    json: async () => data,
  });
}

describe("product.api", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("getProducts returns a list of products", async () => {
    mockSuccess(fakeProductList);
    const result = await getProducts();
    expect(result).toEqual(fakeProductList);
  });

  test("getProductById returns a single product", async () => {
    mockSuccess(fakeProduct);
    const result = await getProductById(1);
    expect(result).toEqual(fakeProduct);
  });

  test("getProductsByCategory returns products in that category", async () => {
    mockSuccess(fakeProductList);
    const result = await getProductsByCategory("electronics");
    expect(result).toEqual(fakeProductList);
  });

  test("searchProducts returns matching products", async () => {
    mockSuccess(fakeProductList);
    const result = await searchProducts("apple");
    expect(result).toEqual(fakeProductList);
  });
});
