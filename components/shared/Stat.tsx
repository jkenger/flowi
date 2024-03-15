import { formatNumber } from "@/lib/utils";
import Image from "next/image";

export const Stat = ({
  icon,
  value,
  label,
  containerClasses,
  otherClasses,
}: {
  icon: string;
  value: number | string;
  label?: string;
  containerClasses?: string;
  otherClasses?: string;
}) => {
  return (
    <div className={`flex gap-1 items-center ${containerClasses}`}>
      <Image alt="Stat Icon" src={icon} width={16} height={16} />
      <span className={`text-dark400_light800 small-medium ${otherClasses}`}>
        {typeof value === "number" ? formatNumber(value) : value} {label}{" "}
      </span>
    </div>
  );
};
