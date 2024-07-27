import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Room Search",
  description: "Room Search",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full`}>
        <div className="h-full flex flex-col bg-black text-lime-400 text-center font-mono">
          <div className="grow flex justify-center items-center">
            {children}
          </div>
          <div className="text-lime-700 text-xs pb-4">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/BrunoRoemers/room-search"
            >
              source code
            </a>
            <span> · </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://app.netlify.com/sites/room-search/deploys"
            >
              deploy status
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
