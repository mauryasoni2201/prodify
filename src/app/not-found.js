import StatusPage from "@/components/StatusPage";
import { getMetadata } from "@/lib/seo";

export const metadata = getMetadata({
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist on Prodify.",
});

export default function NotFound() {
  return (
    <StatusPage
      statusCode="404"
      title="Page Not Found"
      description="Oops! The page you are looking for does not exist or has been moved. Let's get you back on track."
      actionText="Return Home"
      actionHref="/"
    />
  );
}
