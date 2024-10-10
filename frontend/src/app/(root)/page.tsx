"use client"; 

import { useEffect, useState } from 'react';
import { User } from "../../types/user";
import { HoverEffect } from '@/components/shared/cards/card-hover-effect';
import HeaderBox from '@/components/shared/box/header-box';

const HomePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [devices, setDevices] = useState<any[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:3002/api/users/logged-in-user"
        );
        if (!response.ok) {
          throw new Error('Failed to fetch user');
        }
        const data = await response.json();
        setUser(data);

        if (data) {
          const devicesResponse = await fetch(`http://localhost:3002//api/devices/get?user_id=${data.id}`);
          if (!devicesResponse.ok) {
            throw new Error('Failed to fetch devices');
          }
          const devicesData = await devicesResponse.json();
          setDevices(devicesData);
        }
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unexpected error occurred');
        }
      }
    };

    fetchUser();
  }, []);

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7 
        sm:px-8 
        lg:py-12 
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBox
            type="greeting"
            title="Welcome Home"
            user={user?.first_name || "Guest"}
            subtext={`${user?.address1 || ''}, ${user?.city || ''}, ${user?.postal_code || ''}`}
            iconUrl="/assets/icons/shared/pin-icon.svg"
          />
        </header>
        {error ? <p className="text-red-500">{error}</p> : <div><p>hello</p></div>}
        <HoverEffect items={devices} />
      </div>
      {/* <RightSidebar user={user} devices={devices} /> */}
    </section>
  );
};

export default HomePage;
