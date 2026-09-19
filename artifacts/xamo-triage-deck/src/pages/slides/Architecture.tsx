import type { SlideComponentProps } from '@/slideLoader';

export default function Architecture(_: SlideComponentProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#eef4f7] text-[#0b2942]">
      <div className="absolute right-0 top-0 h-full w-[17vw] bg-[#d9e9ed]" />
      <div className="relative flex h-full flex-col px-[7vw] py-[6vh]">
        <div className="flex items-center justify-between">
          <div className="text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#567080]">La plateforme</div>
          <div className="text-[1.5vw] uppercase tracking-[0.18em] text-[#567080]">04 / 05</div>
        </div>
        <div className="mt-[5vh] flex items-end justify-between">
          <div>
            <div className="mb-[2.4vh] h-[0.35vw] w-[5vw] bg-[#f47b45]" />
            <h2 className="font-display max-w-[60vw] text-[4.35vw] font-semibold leading-[1] tracking-[-0.055em]">
              Une architecture prête pour le déploiement
            </h2>
          </div>
          <div className="mb-[0.8vh] text-right text-[1.5vw] leading-[1.25] text-[#567080]">
            Construction reproductible<br />et accès IA protégé
          </div>
        </div>
        <div className="relative mt-[8vh] flex items-center justify-between">
          <div className="absolute left-[10vw] right-[10vw] top-1/2 h-[0.15vw] -translate-y-1/2 bg-[#f47b45]" />
          <div className="relative z-10 flex h-[12vw] w-[15vw] flex-col justify-between border-[0.14vw] border-[#9fcbd2] bg-[#f5f8f7] p-[1.3vw]">
            <div className="text-[1.5vw] font-semibold uppercase tracking-[0.15em] text-[#f47b45]">01 / frontend</div>
            <div className="font-display text-[2.1vw] font-semibold leading-[1.02]">React / Vite</div>
            <div className="text-[1.5vw] text-[#567080]">artifacts/xamo-triage</div>
          </div>
          <div className="relative z-10 flex h-[12vw] w-[15vw] flex-col justify-between border-[0.14vw] border-[#9fcbd2] bg-[#f5f8f7] p-[1.3vw]">
            <div className="text-[1.5vw] font-semibold uppercase tracking-[0.15em] text-[#f47b45]">02 / serveur</div>
            <div className="font-display text-[2.1vw] font-semibold leading-[1.02]">Express / Node</div>
            <div className="text-[1.5vw] text-[#567080]">artifacts/api-server</div>
          </div>
          <div className="relative z-10 flex h-[12vw] w-[15vw] flex-col justify-between border-[0.14vw] border-[#9fcbd2] bg-[#f5f8f7] p-[1.3vw]">
            <div className="text-[1.5vw] font-semibold uppercase tracking-[0.15em] text-[#f47b45]">03 / analyse</div>
            <div className="font-display text-[2.1vw] font-semibold leading-[1.02]">Modèle IA</div>
            <div className="text-[1.5vw] text-[#567080]">Appel côté serveur</div>
          </div>
          <div className="relative z-10 flex h-[12vw] w-[15vw] flex-col justify-between border-[0.14vw] border-[#f47b45] bg-[#0b2942] p-[1.3vw] text-[#f5f8f7]">
            <div className="text-[1.5vw] font-semibold uppercase tracking-[0.15em] text-[#f47b45]">04 / livraison</div>
            <div className="font-display text-[2.1vw] font-semibold leading-[1.02]">Docker / HF</div>
            <div className="text-[1.5vw] text-[#b8e1e6]">Port 7860</div>
          </div>
        </div>
        <div className="mt-auto flex items-end justify-between border-t-[0.12vw] border-[#a9c4ca] pt-[2.3vh]">
          <div className="max-w-[45vw] text-[1.65vw] font-medium leading-[1.15]">
            Analyse protégée côté serveur avec intégration OpenAI
          </div>
          <div className="text-right text-[1.5vw] uppercase tracking-[0.16em] text-[#567080]">XAMO / 04</div>
        </div>
      </div>
    </div>
  );
}