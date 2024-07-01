import { Download } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
}
export default function ReportDownloadCard({ title, subtitle }: Props) {
  return (
    <div className="border border-neutral-300 flex flex-col items-center justify-center gap-2 rounded-xl p-3 hover:cursor-pointer hover:bg-neutral-300/10 text-center">
      <p className="text-xl">{title}</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-200">
        {subtitle}
      </p>
      <Download size={30} />
    </div>
  );
}
