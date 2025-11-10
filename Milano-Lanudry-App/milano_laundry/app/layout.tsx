import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";



export const metadata: Metadata = {
  title: "Milano Laundry",
  description: "Milano Laundry - Your one-stop solution for laundry services.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>    
        <html lang="en">
          <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Montserrat:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/assets/images/m_l_logo.png"/>
      </head>
          <body>
            <Header />
            {children}
            <Footer />   
          </body>

        </html>
    </ClerkProvider>
  );
}
