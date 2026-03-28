import nextJest from "next/jest.js";

// These are needed so next.config.mjs doesn't throw during test setup
process.env.NEXT_PRODUCTS_API_DOMAIN = process.env.NEXT_PRODUCTS_API_DOMAIN || "dummyjson.com";
process.env.NEXT_PRODUCTS_API_URL =
  process.env.NEXT_PRODUCTS_API_URL || "https://dummyjson.com/products";

const createJestConfig = nextJest({
  dir: "./",
});
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  moduleNameMapper: {
    // Resolve @/ path alias (nextJest doesn't always pick this up automatically)
    "^@/(.*)$": "<rootDir>/src/$1",
    // swiper/css imports don't end in .css so Next.js's CSS mapper misses them
    "^swiper/css(.*)$": "<rootDir>/__mocks__/emptyModule.js",
  },
};

export default createJestConfig(config);
