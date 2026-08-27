import { Reveal, PillButton } from "./primitives";

export function FinalCTA() {
  return (
    <section
      id="cta"
      className="relative flex min-h-screen items-center justify-center overflow-hidden border-t border-border bg-black px-5 sm:px-8"
    >
      <div className="glow-teal pointer-events-none absolute bottom-[-30%] left-1/2 h-[600px] w-[900px] -translate-x-1/2 opacity-25 blur-3xl" />
      <div className="relative mx-auto max-w-3xl text-center">
        <Reveal>
          <h2 className="text-4xl leading-[0.95] font-semibold tracking-tighter text-white sm:text-6xl lg:text-7xl">
            Ready to see what's possible?
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="mx-auto mt-6 max-w-[500px] text-sm text-white/70 md:text-base">
            Explore RegProductSuite with the 720 Degrees team.
          </p>
        </Reveal>
        <Reveal delay={0.22}>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <PillButton withArrow>Request a Demo</PillButton>
            <PillButton variant="ghost">Talk to 720 Degrees</PillButton>
          </div>
        </Reveal>
      </div>

      <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-7xl items-center justify-between px-5 py-6 text-[11px] tracking-[0.2em] text-white/45 uppercase sm:px-8">
        <span>720 Degrees</span>
        <span>RegProductSuite</span>
      </div>
    </section>
  );
}
