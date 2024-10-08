import Image from "next/image";

interface HeaderBoxProps {
  title: string;
  subtext: string;
}

const HeaderBoxBilling = ({ title, subtext }: HeaderBoxProps) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="text-[32px] lg:text-[30px] font-semibold text-gray-900">
        {title}
      </h1>
      <div className="flex flex-row gap-2 items-center">
        <div className="bg-primary rounded-full w-8 h-8 flex items-center justify-center">
          <Image
            src="/assets/icons/shared/calendar-icon.svg"
            alt="pin icon"
            width={50}
            height={2}
            className="size-5"
          />
        </div>
        <p className="text-[14px] lg:text-[16px] font-normal text-gray-600">
          {subtext}
        </p>
      </div>
    </div>
  );
};

export default HeaderBoxBilling;
