import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PageShellProps {
  children: ReactNode;
  className?: string;
  /** When true, content can scroll internally; when false, content is clipped to viewport */
  scroll?: boolean;
  /** Apply horizontal centering + max width */
  contained?: boolean;
}

/**
 * Single-viewport page wrapper.
 * Locks page height to the visible viewport, reserving space for the fixed
 * top navbar (desktop ~64px / mobile ~56px) and the mobile bottom nav (~56px).
 */
const PageShell = ({ children, className, scroll = false, contained = true }: PageShellProps) => {
  return (
    <div
      className={cn(
        // h-svh respects mobile browser chrome; fall back to h-screen
        "w-full bg-background flex flex-col",
        "h-[100svh]",
        // Reserve top navbar (3rem mobile, 4rem desktop) + bottom nav on mobile (3.5rem)
        "pt-[3.5rem] md:pt-[4.5rem]",
        "pb-[3.5rem] md:pb-0",
        scroll ? "overflow-y-auto" : "overflow-hidden",
        className,
      )}
    >
      <div
        className={cn(
          "flex-1 min-h-0 flex flex-col w-full",
          contained && "mx-auto max-w-7xl px-4 md:px-8",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default PageShell;
