import { Bond } from "@/type/operations";
import { ChevronUp } from "lucide-react";

interface Props {
  bond: Bond;
}
export default function PriceVariationCard({ bond }: Props) {
  return (
    <div className="w-full mx-auto border border-neutral-400 p-2 rounded-xl flex justify-between dark:border-neutral-600 items-center text-left">
      <div className="flex flex-col gap-2">
        <p className="text-xl">{bond.isin}</p>
        <p className="text-sm text-neutral-500">{bond.name}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <ChevronUp color="green" />
        <p className="text-sm text-green-800">%{Math.random().toFixed(2)}</p>
      </div>
    </div>
  );
}
