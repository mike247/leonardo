// ChakraUi is incompatible with nextJs and app routers ssr, I would recommend not using this ui framework if you wish to utilize the best features of NextJs.
"use client";

import { Providers } from "./providers";
import NavBar from "@/components/NavBar";

// The default layout for the app, including the Navbar
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
