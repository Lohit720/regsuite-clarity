type ShinyTextProps = {
  children: React.ReactNode;
  className?: string;
  speed?: number;
};

/**
 * Animated shiny gradient text.
 * Base: soft 720 Degrees teal-blue (#64CEFB) -> shine: #FFFFFF
 * Continuous left -> right sweep, ~100deg gradient spread.
 */
export function ShinyText({ children, className = "", speed = 3 }: ShinyTextProps) {
  return (
    <span
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage:
          "linear-gradient(100deg, #64CEFB 20%, #ffffff 45%, #ffffff 55%, #64CEFB 80%)",
        backgroundSize: "200% auto",
        animation: `shine-sweep ${speed}s linear infinite`,
      }}
    >
      {children}
    </span>
  );
}
