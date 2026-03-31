export const defaultMetadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "Prodify | Streamlined Product Experience",
    template: "%s | Prodify",
  },
  description:
    "Discover, shop, and manage the latest products with Prodify's premium multi-category platform.",
  keywords: ["ecommerce", "shopping", "nextjs", "products", "curated collections", "premium items"],
  authors: [{ name: "Prodify Team" }],
  creator: "Prodify Development",
  openGraph: {
    title: "Prodify",
    description: "Your modern product discovery hub.",
    url: "/",
    siteName: "Prodify",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Prodify - Premium Shopping Experience",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Prodify",
    description: "Discover the best products online with Prodify.",
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export function getMetadata(overrides = {}) {
  return {
    ...defaultMetadata,
    ...overrides,
    title: overrides.title ?? defaultMetadata.title,
    openGraph: {
      ...defaultMetadata.openGraph,
      ...overrides.openGraph,
    },
    twitter: {
      ...defaultMetadata.twitter,
      ...overrides.twitter,
    },
  };
}
