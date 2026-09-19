import type { SlideComponentProps } from '@/slideLoader';

const base = import.meta.env.BASE_URL;

export default function Title(_: SlideComponentProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#071c2e] text-[#f5f8f7]">
      <img
        src={`${base}medical-hero.jpg`}
        crossOrigin="anonymous"
        alt="Interface médicale abstraite aux teintes bleues et orange"
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,46,0.98)_0%,rgba(7,28,46,0.78)_42%,rgba(7,28,46,0.22)_100%)]" />
      <div className="absolute -right-[9vw] -top-[14vw] h-[46vw] w-[46vw] rounded-full border border-[#f47b45]/35" />
      <div className="absolute -right-[1vw] -top-[6vw] h-[30vw] w-[30vw] rounded-full border border-[#9fd8e1]/30" />
      <div className="relative flex h-full flex-col justify-between px-[7vw] py-[6vh]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[1vw] text-[1.5vw] font-semibold uppercase tracking-[0.22em] text-[#b8e1e6]">
            <span className="h-[0.8vw] w-[0.8vw] rounded-full bg-[#f47b45]" />
            XAMO
          </div>
          <div className="text-[1.5vw] uppercase tracking-[0.18em] text-[#b8e1e6]/70">01 / 05</div>
        </div>
        <div className="max-w-[58vw]">
          <div className="mb-[3vh] h-[0.35vw] w-[7vw] bg-[#f47b45]" />
          <h1 className="font-display text-[6.3vw] font-semibold leading-[0.96] tracking-[-0.065em] text-wrap-balance">
            XAMO Triage Radiologique
          </h1>
          <p className="mt-[3.5vh] max-w-[47vw] text-[2.25vw] font-medium leading-[1.18] text-[#edf7f7]">
            Préparer une discussion médicale plus claire grâce à un prétriage radiologique éducatif
          </p>
          <p className="mt-[2.4vh] text-[1.5vw] font-medium uppercase tracking-[0.16em] text-[#b8e1e6]">
            Prototype bilingue français / anglais
          </p>
        </div>
        <div className="flex items-end justify-between">
          <div className="max-w-[25vw] border-l-[0.22vw] border-[#f47b45] pl-[1.2vw] text-[1.5vw] leading-[1.35] text-[#d4e8e9]/80">
            Un outil de préparation, jamais un diagnostic.
          </div>
          <div className="h-[5vw] w-[5vw] rounded-full border-[0.18vw] border-[#f47b45] p-[0.7vw]">
            <div className="h-full w-full rounded-full border border-[#b8e1e6]/70" />
          </div>
        </div>
      </div>
    </div>
  );
}