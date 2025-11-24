import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div
        className={cn(
          "liquid-glass-element liquid-glass-element--blue rounded-full animate-spin",
          sizeClasses[size]
        )}
        style={{
          borderTopColor: "hsl(var(--primary))",
          borderWidth: "3px",
          borderStyle: "solid",
          borderRightColor: "transparent",
        }}
      />
    </div>
  );
};

interface LoadingSkeletonProps {
  className?: string;
  children?: React.ReactNode;
}

export const LoadingSkeleton = ({ className, children }: LoadingSkeletonProps) => {
  return (
    <div className={cn("liquid-glass-element liquid-glass-element--dark animate-pulse", className)}>
      {children}
    </div>
  );
};
