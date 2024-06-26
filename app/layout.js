import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import "react-loading-skeleton/dist/skeleton.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RaltsAI",
  description: "",
};

export default function RootLayout({ children }) {
  // const decoded = jwtDecode(token);

  return (
    <html lang="en" className="light">
      <body
        className={cn(
          `min-h-screen font-sans antialiased grainy`,
          inter.className
        )}
      >
        <Navbar />
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
