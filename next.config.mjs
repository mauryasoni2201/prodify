/** @type {import('next').NextConfig} */
const productDomain = process.env.NEXT_PRODUCTS_API_DOMAIN;

if (!productDomain) {
  throw new Error(
    "NEXT_PRODUCTS_API_DOMAIN environment variable is missing in .env. This is required for images remote patterns."
  );
}

let hostname = productDomain;
try {
  const url = new URL(
    productDomain.startsWith("http") ? productDomain : `https://${productDomain}`
  );
  hostname = url.hostname;
} catch (e) {
  console.warn(
    "Could not parse NEXT_PRODUCTS_API_DOMAIN as a valid URL, using it as a raw hostname."
  );
}

const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: hostname,
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
    ],
  },
  env: {
    NEXT_PRODUCTS_API_URL: process.env.NEXT_PRODUCTS_API_URL || "",
    NEXT_PRODUCTS_API_DOMAIN: process.env.NEXT_PRODUCTS_API_DOMAIN || "",
    NEXT_PRODUCTS_WEBSITE_URL: process.env.NEXT_PRODUCTS_WEBSITE_URL || "",
    NEXT_GOOGLE_SITE_VERIFICATION: process.env.NEXT_GOOGLE_SITE_VERIFICATION || "",
  },
};

export default nextConfig;
