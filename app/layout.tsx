import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { RecipeProvider } from "./context/RecipeContext";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fresh Bites",
  description: "Delicious recipes app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <RecipeProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </RecipeProvider>
      </body>
    </html>
  );
}