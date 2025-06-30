import './globals.css';
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-white text-black min-h-screen flex justify-center items-center p-6`}
      >
        <div className="w-full max-w-md">{children}</div>
      </body>
    </html>
  );
}