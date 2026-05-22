import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  variant?: "navbar" | "footer";
  className?: string;
}

export function BrandLogo({ variant = "navbar", className }: BrandLogoProps) {
  const isNavbar = variant === "navbar";

  return (
    <Link
      href="/"
      className={cn("group flex items-center gap-3", className)}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={isNavbar ? 44 : 36}
        height={isNavbar ? 44 : 36}
        className={cn(
          "shrink-0",
          isNavbar ? "h-11 w-11" : "h-9 w-9"
        )}
        priority={isNavbar}
      />
      <div className="min-w-0">
        <span
          className={cn(
            "block font-serif font-bold leading-tight text-white",
            isNavbar ? "text-2xl tracking-tight" : "text-xl"
          )}
        >
          ThesisPoint
        </span>
        {isNavbar && (
          <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-white/55">
            Institutional Research
          </span>
        )}
      </div>
    </Link>
  );
}
