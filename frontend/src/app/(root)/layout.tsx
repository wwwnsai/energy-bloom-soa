"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/navigations/sidebar";
import "../globals.css";
import { Inter } from "next/font/google";

interface RootLayoutProps {
  children: React.ReactNode;
}

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: RootLayoutProps) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/users/logged-in-user"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }

        const data = await response.json();
        setUser(data);

        if (data) {
          const devicesResponse = await fetch(`/api/devices/get?user_id=${data.id}`);
          if (!devicesResponse.ok) {
            throw new Error("Failed to fetch devices");
          }

          const devicesData = await devicesResponse.json();
          // Optionally handle devices data here
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unexpected error occurred");
        }
        router.push("/sign-in");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <main className="flex h-screen w-full bg-secondary">
          <Sidebar user={user} />
          {children}
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
