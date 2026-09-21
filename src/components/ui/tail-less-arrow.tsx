import { cn } from "@/lib/utils";

interface TailLessArrowProps {
  direction?: "left" | "right";
  className?: string;
}

export const TailLessArrow = ({ direction = "right", className }: TailLessArrowProps) => (
  <span aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center font-sans font-bold leading-none", className)}>
    {direction === "left" ? "<" : ">"}
  </span>
);
