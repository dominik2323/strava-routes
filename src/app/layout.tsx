import { Metadata } from "next";
import React from "react";
import { AuthProvider } from "../Providers/AuthProvider";
import { getSession } from "../actions/strava";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {};

interface LayoutProps {
  children: React.ReactNode;
}

async function Layout({ children }: LayoutProps) {
  const session = await getSession();

  return (
    <AuthProvider data={session}>
      <html lang='en'>
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}

export default Layout;
