"use client";

import { Web3Provider } from "../providers/Web3Provider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className="bg-blue-900">
        <Web3Provider>{children}</Web3Provider>
      </body>
    </html>
  );
}
