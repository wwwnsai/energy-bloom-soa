import { MAX_MONTHY_USAGE } from "@/constants";

const ColorIndicator: React.FC<{ totalUsage: number }> = ({ totalUsage }) => {
  let colorClass = "text-gray-600";
  let displayText = "No Usage";

  if (totalUsage >= MAX_MONTHY_USAGE) {
    colorClass = "text-red-500";
    displayText = "Exceeded Maximum Usage";
  } else if (totalUsage > 0) {
    colorClass = "text-green-500";
    displayText = "Usage Within Limits";
  }

  return (
    <div className={`flex items-center gap-2`}>
      <div className={`w-4 h-4 rounded-full ${colorClass} bg-current`} />
      <span className={`font-medium ${colorClass}`}>{displayText}</span>
    </div>
  );
};

export default ColorIndicator;
