"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "../../utils/cn";
import { sidebarLinks } from "../../constants";
import Footer from "./footer";
import { User } from "../../types/user";

interface SiderbarProps {
  user: User;
}

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();

  return (
    <section className="sticky left-0 top-0 flex w-fit flex-col justify-between border-r border-gray-200 bg-white pt-8  text-white max-md:hidden sm:p-4 xl:p-6 2xl:w-[355px] rounded-[3.25rem] m-4 shadow-lg">
      <nav className="flex flex-col gap-4">
        <Link href="/" className="mb-12 cursor-pointer flex items-center gap-2">
          <Image
            src="/assets/icons/logo/energy-bloom-icon.png"
            width={120}
            height={120}
            alt="Energy Bloom logo"
          />
          <h1 className="2xl:text-[26px] font-ibm-plex-serif text-[26px] font-bold text-black-1 max-xl:hidden">
            Energy Bloom
          </h1>
        </Link>

        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);

          return (
            <Link
              href={item.route}
              key={item.label}
              className={cn(
                " flex gap-3 items-center py-1 md:p-3 2xl:p-4 rounded-lg justify-center xl:justify-start",
                { "bg-primary": isActive }
              )}
            >
              <div className="relative size-6">
                <Image
                  src={item.imgURL}
                  alt={item.label}
                  fill
                  className={cn({
                    "text-black-1": isActive,
                  })}
                />
              </div>
              <p
                className={cn(
                  "text-[16px] font-semibold text-black-1 max-xl:hidden",
                  { "!text-gray-500": !isActive }
                )}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer user={user} type="desktop" />
    </section>
  );
};

export default Sidebar;
