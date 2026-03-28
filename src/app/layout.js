import { Montserrat } from "next/font/google";
import { defaultMetadata } from "@/lib/seo";
import ContentWrapper from "@/wrappers/ContentWrapper";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata = defaultMetadata;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head suppressHydrationWarning />

      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ContentWrapper>{children}</ContentWrapper>
      </body>
    </html>
  );
}
