import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ShinyText } from "./ShinyText";
import { Eyebrow, PillButton, easeOut } from "./primitives";
import regops from "@/assets/regops-dashboard.png.asset.json";
import regintel from "@/assets/regintel-tracker.png.asset.json";
import regadapt from "@/assets/regadapt-table.png.asset.json";

const montage = [regops.url, regintel.url, regadapt.url];

/**
 * Cinematic hero.
 * NOTE FOR DEV: the background layer is the placeholder for the RegProductSuite
 * demo video (<video autoPlay muted loop playsInline poster=... />). Until the
 * capture exists, a slow montage of the real product screens stands in.
 */
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const visualScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -60]);

  return (
    <section ref={ref} id="top" className="relative h-screen min-h-[680px] w-full overflow-hidden">
      {/* Ambient video layer (montage stand-in) */}
      <div className="absolute inset-0">
        {montage.map((src, i) => (
          <motion.img
            key={src}
            src={src}
            alt=""
            aria-hidden
            className="absolute inset-0 h-full w-full object-cover"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: [0, 0.5, 0.5, 0], scale: [1.08, 1.16] }}
            transition={{
              duration: 18,
              times: [0, 0.15, 0.85, 1],
              repeat: Infinity,
              repeatDelay: 12,
              delay: i * 6,
              ease: "linear",
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/78" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
        <div className="glow-teal absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 opacity-25 blur-3xl" />
      </div>

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

        {/* Product interface emerging from the dark */}
        <motion.div
          style={{ scale: visualScale, y: visualY }}
          initial={{ opacity: 0, y: 90 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: easeOut }}
          className="pointer-events-none absolute right-[-14%] bottom-[-16%] hidden w-[62%] origin-bottom lg:block"
        >
          <div className="glow-teal absolute -inset-16 opacity-30 blur-3xl" />
          <img
            src={regops.url}
            alt="RegProductSuite renewals dashboard inside the RegOps module"
            className="relative w-full rounded-2xl border border-border shadow-[0_60px_160px_-40px_#000]"
          />
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
