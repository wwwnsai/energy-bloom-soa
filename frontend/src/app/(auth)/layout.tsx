import Image from "next/image";
import "../globals.css";

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex min-h-screen w-full justify-between">
          {children}
          <div className="flex h-screen w-full sticky top-0 items-center justify-end bg-sky-1 max-lg:hidden">
            {/* <div>
              <Image
                src="/assets/images/auth/auth-image.svg"
                alt="Auth image"
                width={500}
                height={500}
                className="rounded-l-xl object-contain"
              />
            </div> */}
          </div>
        </main>
      </body>
    </html>
  );
}
