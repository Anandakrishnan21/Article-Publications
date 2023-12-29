import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";
import { AuthProvider } from "./Providers";
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  weight: '400',
  style: 'normal' ,
  subsets: ['latin'],
});

export const metadata = {
  title: "Particles: Publication Platform",
  description: "Made using Nextjs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"  suppressHydrationWarning>
      <body className={cn(poppins.className, "dark:bg-neutral-950")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
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
