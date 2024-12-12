import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <div className="flex flex-col flex-grow  min-h-screen">
          <Header />
     <main>{children}</main>
        </div>

      </body>
    </html>
  );
}
