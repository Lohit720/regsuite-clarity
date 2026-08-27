import { motion } from "framer-motion";
import { ShinyText } from "./ShinyText";
import { Reveal, Eyebrow } from "./primitives";
import aiChat from "@/assets/ai-chat.png.asset.json";

export function AIAssistant() {
  return (
    <section className="relative overflow-hidden border-t border-border bg-black px-5 py-32 sm:px-8 md:py-48">
      <div className="glow-teal pointer-events-none absolute top-1/2 left-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-20 blur-3xl" />
      <div className="relative mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <Reveal>
            <Eyebrow>Smart AI Chat Assistant</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-5 text-4xl leading-[0.95] font-semibold tracking-tighter text-white/70 sm:text-6xl lg:text-7xl">
              And when you don't
              <br />
              want to search…
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 text-6xl font-semibold tracking-tighter sm:text-8xl">
              <ShinyText>Ask.</ShinyText>
            </p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.1 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="product-frame p-0">
            <img
              src={aiChat.url}
              alt="Smart AI Chat Assistant panel inside RegProductSuite"
              loading="lazy"
              decoding="async"
              className="block w-full"
            />
          </div>

          {/* Illustrative conversation — visual prototype only */}
          <div className="mt-5 space-y-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-sm bg-teal/20 px-4 py-3 text-sm text-white"
            >
              What regulatory items need attention?
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="w-fit max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-surface-2 px-4 py-3 text-sm text-white/70"
            >
              Here are the items requiring attention…
            </motion.div>
            <p className="pt-2 text-[11px] tracking-wide text-white/45">
              Illustrative interaction — visual prototype.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
