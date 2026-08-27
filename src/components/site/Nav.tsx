import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";

const links = [
  "What We Do",
  "Our Insights",
  "Who We Are",
  "AI Use Cases",
  "Blog",
  "Contact Us",
];

function Wordmark() {
  return (
    <a href="#top" className="flex items-baseline gap-2">
      <span className="text-xl font-bold tracking-tighter text-teal">720</span>
      <span className="text-[11px] font-light tracking-[0.34em] text-white/80 uppercase">
        Degrees
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "border-b border-border bg-black/60 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:px-8 lg:flex lg:justify-between">
        <Wordmark />

        <div className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l}
              href="#top"
              className="text-sm text-white/80 transition-colors hover:text-white"
            >
              {l}
            </a>
          ))}
        </div>

        <div className="hidden lg:block">
          <a
            href="#cta"
            className="group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2 text-sm text-white/80 transition-all hover:border-teal hover:text-white"
          >
            Talk to us
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </a>
        </div>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="shrink-0 justify-self-end rounded-full border border-border p-2 text-white/80 lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35 }}
            className="overflow-hidden border-t border-border bg-black/90 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-4">
              {links.map((l) => (
                <a
                  key={l}
                  href="#top"
                  onClick={() => setOpen(false)}
                  className="py-2 text-base text-white/80 transition-colors hover:text-white"
                >
                  {l}
                </a>
              ))}
              <a
                href="#cta"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex w-fit items-center gap-2 rounded-full bg-teal px-5 py-2.5 text-sm text-white"
              >
                Talk to us <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
