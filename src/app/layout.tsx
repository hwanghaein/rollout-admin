import "./globals.css";
import Header from "@/components/header";
import { AuthProvider } from './context/auth-context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
    <html lang="ko">
      <body>
        <div className="flex flex-col flex-grow  min-h-screen">
          <Header />
     <main>{children}</main>
        </div>

      </body>
    </html>
    </AuthProvider>
  );
}
