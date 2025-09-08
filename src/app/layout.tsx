import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { QueryProvider } from "./query-provider";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Volvo Trucks Management",
  description: "Gerenciamento de frota de caminhões Volvo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const truckFavicon = encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-6h13v6m-7 0h-6m6 0a2 2 0 11-4 0 2 2 0 014 0zm6 0a2 2 0 11-4 0 2 2 0 014 0z"/>
    </svg>`
  );

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={`data:image/svg+xml,${truckFavicon}`} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <QueryProvider>
          <SidebarProvider>
            <div className="flex min-h-screen">
              <AppSidebar />
              <main className="flex-1 p-4">
                <SidebarTrigger />
                {children}
              </main>
            </div>
          </SidebarProvider>
        </QueryProvider>

        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
