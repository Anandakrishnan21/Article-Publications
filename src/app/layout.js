import { cn } from "@/lib/utils";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Particles: Publication Platform",
  description: "Made using Nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "dark:bg-neutral-950")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          storageKey="particles"
        >
          <AuthProvider>{children}</AuthProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
