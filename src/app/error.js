"use client";
import { useEffect } from "react";
import StatusPage from "@/components/StatusPage";

export default function Error({ error, reset }) {
  useEffect(() => {
    document.title = "500 - Server Error | Prodify";
    console.error("Application error caught by boundary:", error);
  }, [error]);
  return (
    <StatusPage
      statusCode="500"
      title="Something went wrong!"
      description="We apologize for the inconvenience. Our team has been notified of this error and we are working to resolve it."
      type="error"
      onAction={() => reset()}
      actionText="Try again"
    />
  );
}
