import type { Metadata } from "next"
import Image from 'next/image'
import logoImage from '../../public/images/logo.svg'
import "./globals.css"

export const metadata: Metadata = {
  title: "nextjs-14-poc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <main className="">
          <header>
            <Image
              src={logoImage}
              alt="Logo"
              width={42}
              height={42}
              priority
            />
            <h1>NumIMDB</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  );
}
