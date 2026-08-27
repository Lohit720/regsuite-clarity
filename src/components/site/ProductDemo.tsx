import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShinyText } from "./ShinyText";
import { Reveal } from "./primitives";
import regops from "@/assets/regops-dashboard.png.asset.json";
import regintel from "@/assets/regintel-tracker.png.asset.json";
import regadapt from "@/assets/regadapt-table.png.asset.json";

const frames = [regops.url, regadapt.url, regintel.url];

/**
 * NOTE FOR DEV: replace the montage below with the RegProductSuite demo video:
 * <video autoPlay muted loop playsInline poster="/poster.webp" className="w-full" />
 */
export function ProductDemo() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.94, 1]);

  return (
    <section
      ref={ref}
      id="demo"
      className="relative border-t border-border bg-surface-1 px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-center text-4xl leading-[0.95] font-semibold tracking-tighter text-white sm:text-6xl lg:text-7xl">
            Don't just read about it.
            <br />
            <ShinyText>See it in action.</ShinyText>
          </h2>
        </Reveal>

        <motion.div style={{ scale }} className="relative mx-auto mt-16 md:mt-24">
          <div className="glow-teal pointer-events-none absolute -inset-16 opacity-25 blur-3xl" />
          <div className="product-frame relative aspect-[16/9] w-full">
            {frames.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="RegProductSuite product walkthrough"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover object-top"
                animate={{ opacity: [0, 1, 1, 0] }}
                transition={{
                  duration: 9,
                  times: [0, 0.1, 0.85, 1],
                  repeat: Infinity,
                  repeatDelay: 18,
                  delay: i * 9,
                  ease: "linear",
                }}
              />
            ))}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
