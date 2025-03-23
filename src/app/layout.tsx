import type { Metadata } from "next";
import { Inter } from "next/font/google";
import TopMenu from "@/components/TopMenu";
import "./globals.css";
import NextAuthProvider from "@/provider/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";
import ReduxProvider from "@/redux/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VenueVista",
  description: "Made by Nonthawat Makdee",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
      <ReduxProvider>
        <NextAuthProvider session={session}>
          <TopMenu />
          {children}
        </NextAuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
