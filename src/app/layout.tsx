import type { Metadata } from "next"
import Image from 'next/image'
import logoImage from '../../public/images/logo.svg'
import "./globals.css"
import BackButton from "@/components/BackButton";

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
        <main>
          <header className="flex justify-between align-middle px-6 py-4">
            <div className="flex">
              <Image
                src={logoImage}
                alt="Logo"
                width={42}
                height={42}
                priority
                className="mr-2"
              />
              <h1 className="my-auto text-xl">NumIMDB</h1>
            </div>
            <BackButton />
          </header>
          <div className="p-6">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
