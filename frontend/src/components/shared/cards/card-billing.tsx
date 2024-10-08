"use client";

import { use, useState } from "react";
import { cn } from "@/utils/cn";
import { AnimatePresence, motion } from "framer-motion";

export const HoverEffectBilling = ({
  items,
  className,
  useGrid = true,
}: {
  items: {
    month_year: string;
    usage: number;
    price: number;
    tax: number;
    total: number;
  }[];
  className?: string;
  useGrid?: boolean;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      key={"billing"}
      className={cn("", className, {
        "grid grid-cols-1 md:grid-cols-1  lg:grid-cols-1 py-10": useGrid,
      })}
    >
      {items.map((item, idx) => (
        <div
          key={item?.month_year}
          className="relative group  block p-2  w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-primary dark:bg-slate-800 block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            <Cardmonth_year>{item.month_year}</Cardmonth_year>
            <div className="border-t border-gray-300 my-4"></div>
            <CardDescription className="text-black-2 text-[14px] font-medium flex">
                <div className="flex flex-col">
                    <p> Total Electricity Usage: {item.usage} kWh </p>
                    <p> Price: {item.price} .- </p>
                    <p> Tax: {item.tax} .- </p>
                </div>
                <div className="flex ml-auto">
                    <p> Total: {item.total} .- </p>
                </div>
            </CardDescription>
          </Card>
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl w-full overflow-hidden relative z-20 shadow-lg bg-white",
        className
      )}
    >
      <div className="relative z-50">
        <div className="px-8 py-6">{children}</div>
      </div>
    </div>
  );
};
export const Cardmonth_year = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4 className={cn("text-black-1 font-bold tracking-wide", className)}>
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mt-3 text-black-2 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      {children}
    </div>
  );
};
