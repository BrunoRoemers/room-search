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
          <div className="grow flex justify-center items-stretch overflow-auto p-20">
            <div className="min-h-full h-min flex items-center">{children}</div>
          </div>
          <div className="text-lime-700 text-xs p-4">
            <a href="/">home</a>
            <span> · </span>
            <a href="/users">configure users</a>
            <span> · </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://github.com/BrunoRoemers/room-search"
            >
              source code
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
