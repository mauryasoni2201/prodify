import Header from "@/components/Header";
import { Toaster } from "sonner";

export default function ContentWrapper({ children }) {
  return (
    <main suppressHydrationWarning={true}>
      <Toaster position="top-right" suppressHydrationWarning />
      <Header />
      <div suppressHydrationWarning={true}>{children}</div>
    </main>
  );
}
