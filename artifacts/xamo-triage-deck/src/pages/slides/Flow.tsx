import type { SlideComponentProps } from '@/slideLoader';

export default function Flow(_: SlideComponentProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0b2942] text-[#f5f8f7]">
      <div className="absolute bottom-0 left-0 h-[30vh] w-full bg-[#103b56]" />
      <div className="absolute left-[6vw] top-[11vh] h-[0.12vw] w-[88vw] bg-[#b8e1e6]/25" />
      <div className="relative flex h-full flex-col px-[7vw] py-[6vh]">
        <div className="flex items-center justify-between">
          <div className="text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#b8e1e6]">Le parcours</div>
          <div className="text-[1.5vw] uppercase tracking-[0.18em] text-[#b8e1e6]/70">03 / 05</div>
        </div>
        <div className="mt-[6vh] max-w-[67vw]">
          <div className="mb-[2.4vh] h-[0.35vw] w-[5vw] bg-[#f47b45]" />
          <h2 className="font-display text-[4.7vw] font-semibold leading-[1] tracking-[-0.055em]">
            Un parcours guidé et bilingue
          </h2>
        </div>
        <div className="relative mt-[8vh] grid grid-cols-5 gap-[1.2vw]">
          <div className="absolute left-[4vw] right-[4vw] top-[2.8vw] h-[0.12vw] bg-[#b8e1e6]/35" />
          <div className="relative">
            <div className="relative z-10 mb-[2.6vh] flex h-[5.7vw] w-[5.7vw] items-center justify-center rounded-full border-[0.18vw] border-[#f47b45] bg-[#0b2942] font-display text-[2vw] font-semibold">01</div>
            <p className="max-w-[14vw] text-[2vw] font-medium leading-[1.08]">Consentement obligatoire avant toute saisie</p>
          </div>
          <div className="relative">
            <div className="relative z-10 mb-[2.6vh] flex h-[5.7vw] w-[5.7vw] items-center justify-center rounded-full border-[0.18vw] border-[#b8e1e6] bg-[#0b2942] font-display text-[2vw] font-semibold">02</div>
            <p className="max-w-[14vw] text-[2vw] font-medium leading-[1.08]">Formulaire guidé : symptômes, durée, âge, sexe et contexte</p>
          </div>
          <div className="relative">
            <div className="relative z-10 mb-[2.6vh] flex h-[5.7vw] w-[5.7vw] items-center justify-center rounded-full border-[0.18vw] border-[#b8e1e6] bg-[#0b2942] font-display text-[2vw] font-semibold">03</div>
            <p className="max-w-[14vw] text-[2vw] font-medium leading-[1.08]">Prise en compte de la possibilité de grossesse</p>
          </div>
          <div className="relative">
            <div className="relative z-10 mb-[2.6vh] flex h-[5.7vw] w-[5.7vw] items-center justify-center rounded-full border-[0.18vw] border-[#b8e1e6] bg-[#0b2942] font-display text-[2vw] font-semibold">04</div>
            <p className="max-w-[14vw] text-[2vw] font-medium leading-[1.08]">Résultats en français ou en anglais</p>
          </div>
          <div className="relative">
            <div className="relative z-10 mb-[2.6vh] flex h-[5.7vw] w-[5.7vw] items-center justify-center rounded-full border-[0.18vw] border-[#f47b45] bg-[#f47b45] font-display text-[2vw] font-semibold text-[#0b2942]">05</div>
            <p className="max-w-[14vw] text-[2vw] font-medium leading-[1.08]">Détection prioritaire des signaux d’urgence</p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-[#b8e1e6]/25 pt-[2.2vh] text-[1.5vw] uppercase tracking-[0.16em] text-[#b8e1e6]/70">
          <span>Du contexte vers une conversation mieux préparée</span>
          <span>XAMO / 03</span>
        </div>
      </div>
    </div>
  );
}