import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShinyText } from "./ShinyText";
import { Eyebrow, PillButton, easeOut } from "./primitives";
import { DataNetwork } from "./DataNetwork";

/**
 * Cinematic, typography-first hero. The background is a subtle live
 * data-network canvas — drifting nodes, thin links, faint grid and soft
 * teal pulses — suggesting an intelligent data environment behind the words.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section ref={ref} id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* Ambient intelligent-data layer */}
      <motion.div style={{ opacity: bgOpacity }} className="absolute inset-0">
        <DataNetwork />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black" />
        <div className="glow-teal absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-25 blur-3xl" />
        <motion.div
          className="glow-teal absolute right-[8%] bottom-[12%] h-[300px] w-[420px] opacity-15 blur-3xl"
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 pt-24 sm:px-8">
        <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeOut }}
          >
            <Eyebrow>720 Degrees / RegProductSuite</Eyebrow>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.15, ease: easeOut }}
            className="mt-6 text-5xl leading-[0.88] font-semibold tracking-tighter text-white sm:text-6xl lg:text-8xl xl:text-9xl"
          >
            Regulatory
            <br />
            complexity.
            <br />
            <ShinyText>Made simpler.</ShinyText>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: easeOut }}
            className="mt-8 max-w-[560px] text-sm text-white/70 md:text-base"
          >
            AI-powered regulatory intelligence, operations and adaptation for modern enterprises.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: easeOut }}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <PillButton href="#demo" withArrow>
              See RegProductSuite in Action
            </PillButton>
            <PillButton href="#cta" variant="ghost">
              Talk to 720 Degrees
            </PillButton>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: textOpacity }}
        className="absolute inset-x-0 bottom-7 flex justify-center"
      >
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="text-[10px] tracking-[0.4em] text-white/45 uppercase"
        >
          Scroll to explore ↓
        </motion.span>
      </motion.div>
    </section>
  );
}
