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
          <header className="flex px-6 py-4">
            <Image
              src={logoImage}
              alt="Logo"
              width={42}
              height={42}
              priority
              className="mr-2"
            />
            <h1 className="my-auto text-xl">NumIMDB</h1>
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
