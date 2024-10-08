import ColorIndicator from "@/components/shared/box/color-indicator";
import HeaderBox from "@/components/shared/box/header-box";
import DoughnutChart from "@/components/shared/charts/doughnut-chart";
import { MAX_MONTHY_USAGE } from "@/constants";
import { calculateUsageAndPrice } from "@/../../energy-bloom-soa/backend/src/services/electricity-usages/electricity-usage.actions";
import { getLoggedInUser } from "@/../../energy-bloom-soa/backend/src/services/users/users.actions";
import { cn } from "@/utils/cn";
import dayjs from "dayjs";

const MySmartMeterPage = async () => {
  const currentDateTime = dayjs().format("MMMM D, YYYY h:mm A");

  const user = await getLoggedInUser();
  let totalUsage = 0;
  let totalPrice = 0;

  const remainingUsage = MAX_MONTHY_USAGE - totalUsage;

  if (user) {

    const { usage, price } = await calculateUsageAndPrice({user_id:  user.id });
    totalUsage = usage;
    totalPrice = price;
    console.log("------------Total usage:", totalUsage);
  }

  return (
    <section className="no-scrollbar flex w-full flex-row max-xl:max-h-screen max-xl:overflow-y-scroll ">
      <div
        className="no-scrollbar flex w-full flex-1 flex-col gap-8 px-5 py-7  bg-white rounded-3xl m-4
        sm:px-8 
        lg:py-12 
        xl:max-h-screen xl:overflow-y-scroll"
      >
        <header>
          <HeaderBox title={`${currentDateTime}`} />
        </header>
        <div className="relative flex flex-row justify-center items-end h-72">
          <DoughnutChart
            totalUsage={totalUsage}
            remainingUsage={remainingUsage}
          />
          <div className="flex justify-center items-center">
            <p className="text-[50px] lg:text-[64px] font-normal text-indigo-700">
              ฿{totalPrice.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <p
            className={cn("text-[20px] lg:text-[28px] font-norml", {
              "text-red-500": totalUsage >= MAX_MONTHY_USAGE,
              "text-green-500": totalUsage < MAX_MONTHY_USAGE,
              "text-gray-600": totalUsage === 0.00,
            })}
          >
            Used so far this month: {totalUsage.toFixed(2)} kWh
          </p>
        </div>
        <div className="flex justify-center items-center">
          <ColorIndicator totalUsage={totalUsage} />
        </div>
      </div>
    </section>
  );
};

export default MySmartMeterPage;
