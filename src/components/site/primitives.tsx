import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

export const easeOut = [0.16, 1, 0.3, 1] as const;

export const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: easeOut },
  },
};

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      variants={revealVariants}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="text-[11px] font-medium tracking-[0.32em] text-white/45 uppercase">
      {children}
    </span>
  );
}

export function PillButton({
  children,
  variant = "primary",
  withArrow = false,
  href = "#",
}: {
  children: ReactNode;
  variant?: "primary" | "ghost";
  withArrow?: boolean;
  href?: string;
}) {
  const base =
    "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300 md:px-8 md:py-4 md:text-base";
  const styles =
    variant === "primary"
      ? "bg-teal text-white shadow-[0_18px_50px_-16px_var(--teal)] hover:brightness-110"
      : "border border-border text-white/80 hover:border-white/35 hover:text-white";
  return (
    <a href={href} className={`${base} ${styles}`}>
      {children}
      {withArrow && (
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      )}
    </a>
  );
}

/** Cinematic product screenshot: emerges from the dark, glows subtly. */
export function ProductVisual({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <motion.div
      className={`relative ${className}`}
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1.2, ease: easeOut }}
    >
      <div className="glow-teal pointer-events-none absolute -inset-x-16 -inset-y-10 opacity-30 blur-3xl" />
      <div className="product-frame relative">
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="block w-full"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}
