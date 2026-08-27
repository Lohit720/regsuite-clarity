import { Reveal } from "./primitives";

export function ProductStatement() {
  return (
    <section className="relative bg-surface-1 px-5 py-32 sm:px-8 md:py-48">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <h2 className="text-4xl leading-[0.92] font-semibold tracking-tighter text-white sm:text-6xl lg:text-8xl">
            One platform.
            <br />
            <span className="text-white/45">Three ways to stay ahead.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.15}>
          <p className="mt-16 text-xl font-medium tracking-tight text-teal sm:text-2xl">
            RegIntel. RegOps. RegAdapt.
          </p>
        </Reveal>

        <Reveal delay={0.25}>
          <p className="mt-4 max-w-[520px] text-sm text-white/70 md:text-base">
            Intelligence, operations and adaptation — connected in one regulatory environment.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
