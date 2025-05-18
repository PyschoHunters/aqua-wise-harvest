
import { Info } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface InfoTooltipProps {
  content: string | React.ReactNode;
}

export default function InfoTooltip({ content }: InfoTooltipProps) {
  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <Info className="h-4 w-4 text-gray-500 cursor-help" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="text-sm">
          {content}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
