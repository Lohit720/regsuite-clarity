import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Eyebrow, Reveal } from "./primitives";
import { easeOut } from "./primitives";

export type ShowcaseProduct = {
  index: string;
  name: string;
  headline: string;
  copy: string;
  image: string;
  alt: string;
  callouts: string[];
};

export function ProductShowcase({ products }: { products: ShowcaseProduct[] }) {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const ref = useRef<HTMLElement>(null);
  const lockRef = useRef(false);

  const go = useCallback(
    (next: number) => {
      const clamped = (next + products.length) % products.length;
      setDir(clamped > active || (active === products.length - 1 && clamped === 0) ? 1 : -1);
      setActive(clamped);
    },
    [active, products.length],
  );

  // Scroll-linked progression through the three products while the section is pinned in view.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (lockRef.current) return;
    const idx = Math.min(products.length - 1, Math.max(0, Math.floor(v * products.length)));
    if (idx !== active) {
      setDir(idx > active ? 1 : -1);
      setActive(idx);
    }
  });

  // Manual selection temporarily suspends scroll-driven changes.
  useEffect(() => {
    lockRef.current = false;
  }, [active]);

  const suspend = () => {
    lockRef.current = true;
    window.setTimeout(() => (lockRef.current = false), 900);
  };

  const current = products[active];
  const prev = products[(active - 1 + products.length) % products.length];
  const next = products[(active + 1) % products.length];

  return (
    <section
      ref={ref}
      id="products"
      className="relative border-t border-border bg-surface-2"
      style={{ height: `${products.length * 100}vh` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden px-5 py-20 sm:px-8">
        <div className="glow-teal pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-15 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl">
          {/* Product navigation */}
          <Reveal>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {products.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => {
                    suspend();
                    go(i);
                  }}
                  className="group flex items-baseline gap-2"
                >
                  <span
                    className={`text-[11px] tracking-[0.28em] transition-colors ${
                      i === active ? "text-teal" : "text-white/30"
                    }`}
                  >
                    {p.index}
                  </span>
                  <span
                    className={`text-sm tracking-tight transition-colors ${
                      i === active ? "text-white" : "text-white/40 group-hover:text-white/70"
                    }`}
                  >
                    {p.name}
                  </span>
                  <span
                    className={`ml-1 h-px transition-all duration-500 ${
                      i === active ? "w-10 bg-teal" : "w-0 bg-transparent"
                    }`}
                  />
                </button>
              ))}
            </div>
          </Reveal>

          {/* Stage */}
          <div className="relative mt-10 flex items-center gap-6 md:mt-14">
            {/* neighbour peek - left */}
            <div className="pointer-events-none hidden w-[10%] shrink-0 opacity-25 blur-[3px] lg:block">
              <div className="product-frame">
                <img src={prev.image} alt="" aria-hidden className="block w-[320%] max-w-none" />
              </div>
            </div>

            <div className="relative min-h-[52vh] flex-1 overflow-hidden">
              <AnimatePresence mode="wait" custom={dir}>
                <motion.div
                  key={current.name}
                  custom={dir}
                  initial={{ opacity: 0, x: dir * 90, scale: 0.96, filter: "blur(14px)" }}
                  animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: dir * -90, scale: 0.96, filter: "blur(14px)" }}
                  transition={{ duration: 0.85, ease: easeOut }}
                  className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-14"
                >
                  <div>
                    <Eyebrow>
                      {current.index} / {current.name}
                    </Eyebrow>
                    <h2 className="mt-4 text-4xl leading-[0.95] font-semibold tracking-tighter text-white sm:text-5xl lg:text-6xl">
                      {current.headline}
                    </h2>
                    <p className="mt-5 max-w-[460px] text-sm text-white/70 md:text-base">
                      {current.copy}
                    </p>
                    <div className="mt-7 flex flex-wrap gap-3">
                      {current.callouts.map((c) => (
                        <span
                          key={c}
                          className="rounded-full border border-border px-4 py-1.5 text-[11px] tracking-[0.18em] text-white/70 uppercase"
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="glow-teal pointer-events-none absolute -inset-x-10 -inset-y-8 opacity-30 blur-3xl" />
                    <div className="product-frame relative">
                      <img
                        src={current.image}
                        alt={current.alt}
                        loading="lazy"
                        decoding="async"
                        className="block w-full"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* neighbour peek - right */}
            <div className="pointer-events-none hidden w-[10%] shrink-0 opacity-25 blur-[3px] lg:block">
              <div className="product-frame">
                <img src={next.image} alt="" aria-hidden className="block w-[320%] max-w-none" />
              </div>
            </div>
          </div>

          {/* Arrows + progress */}
          <div className="mt-10 flex items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <button
                aria-label="Previous product"
                onClick={() => {
                  suspend();
                  go(active - 1);
                }}
                className="rounded-full border border-border p-3 text-white/70 transition-all hover:border-teal hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                aria-label="Next product"
                onClick={() => {
                  suspend();
                  go(active + 1);
                }}
                className="rounded-full border border-border p-3 text-white/70 transition-all hover:border-teal hover:text-white"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 items-center gap-2">
              {products.map((p, i) => (
                <span key={p.name} className="h-px flex-1 overflow-hidden bg-white/10">
                  <motion.span
                    className="block h-px bg-teal"
                    initial={false}
                    animate={{ scaleX: i <= active ? 1 : 0 }}
                    style={{ transformOrigin: "left" }}
                    transition={{ duration: 0.7, ease: easeOut }}
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
