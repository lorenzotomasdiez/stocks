import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  href: string;
  label: string;
  icon: LucideIcon;
  isSelected?: boolean;
}

export default function MenuOption({
  href,
  label,
  isSelected,
  icon: Icon,
}: Props) {
  return (
    <Link href={href}>
      <div
        className={cn(
          "p-3 border rounded-lg bg-neutral-200 aspect-square flex flex-col justify-center items-center duration-300 transition-all",
          isSelected && "bg-neutral-500 text-white",
          "hover:bg-neutral-400/40",
        )}
      >
        <div className="relative">
          <p className={cn("absolute -bottom-10 left-1/2 -translate-x-1/2")}>
            {label}
          </p>
          <Icon size={50} />
        </div>
      </div>
    </Link>
  );
}
