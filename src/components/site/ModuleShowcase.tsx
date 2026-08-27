import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Eyebrow, Reveal, ProductVisual } from "./primitives";

type Props = {
  index: string;
  name: string;
  headline: string;
  copy: string;
  image: string;
  alt: string;
  callouts: string[];
  detailImage?: string;
  detailAlt?: string;
  align?: "left" | "right";
};

export function ModuleShowcase({
  index,
  name,
  headline,
  copy,
  image,
  alt,
  callouts,
  detailImage,
  detailAlt,
  align = "left",
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const parallax = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const drift = useTransform(scrollYProgress, [0, 1], align === "left" ? [24, -24] : [-24, 24]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden border-t border-border bg-surface-2 px-5 py-28 sm:px-8 md:py-40"
    >
      <div className="glow-teal pointer-events-none absolute top-1/3 left-1/2 h-[420px] w-[900px] -translate-x-1/2 opacity-15 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <Reveal>
            <Eyebrow>
              {index} / {name}
            </Eyebrow>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-5 text-4xl leading-[0.95] font-semibold tracking-tighter text-white sm:text-6xl lg:text-7xl">
              {headline}
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-[540px] text-sm text-white/70 md:text-base">{copy}</p>
          </Reveal>
        </div>

        <motion.div style={{ y: parallax }} className="mt-16 md:mt-24">
          <ProductVisual src={image} alt={alt} />
        </motion.div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-3">
            {callouts.map((c, i) => (
              <motion.span
                key={c}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: i * 0.18 }}
                className="rounded-full border border-border px-5 py-2 text-xs tracking-[0.18em] text-white/70 uppercase"
              >
                {c}
              </motion.span>
            ))}
          </div>

          {detailImage && (
            <motion.div
              style={{ x: drift }}
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1 }}
              className="w-full max-w-lg lg:w-[42%]"
            >
              <div className="product-frame">
                <img
                  src={detailImage}
                  alt={detailAlt ?? alt}
                  loading="lazy"
                  decoding="async"
                  className="block w-full"
                />
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
