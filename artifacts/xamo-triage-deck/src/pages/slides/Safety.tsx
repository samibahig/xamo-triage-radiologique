import type { SlideComponentProps } from '@/slideLoader';

export default function Safety(_: SlideComponentProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#0b2942] text-[#f5f8f7]">
      <div className="absolute bottom-0 right-0 h-[47vh] w-[38vw] bg-[#103b56]" />
      <div className="absolute bottom-[8vh] right-[8vw] h-[23vw] w-[23vw] rounded-full border-[0.12vw] border-[#b8e1e6]/30" />
      <div className="absolute bottom-[14vh] right-[14vw] h-[11vw] w-[11vw] rounded-full border-[0.18vw] border-[#f47b45]" />
      <div className="relative flex h-full flex-col px-[7vw] py-[6vh]">
        <div className="flex items-center justify-between">
          <div className="text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#b8e1e6]">Les garde-fous</div>
          <div className="text-[1.5vw] uppercase tracking-[0.18em] text-[#b8e1e6]/70">05 / 05</div>
        </div>
        <div className="mt-[7vh] grid flex-1 grid-cols-[1fr_0.86fr] gap-[8vw]">
          <div>
            <div className="mb-[2.6vh] h-[0.35vw] w-[5vw] bg-[#f47b45]" />
            <h2 className="font-display max-w-[43vw] text-[4.55vw] font-semibold leading-[0.98] tracking-[-0.055em]">
              Sécurité médicale et prochaines étapes
            </h2>
            <div className="mt-[6vh] space-y-[2.1vh]">
              <p className="border-l-[0.22vw] border-[#f47b45] pl-[1.3vw] text-[2vw] font-medium leading-[1.1]">L’outil ne fournit pas de diagnostic</p>
              <p className="border-l-[0.22vw] border-[#b8e1e6] pl-[1.3vw] text-[2vw] font-medium leading-[1.1]">Il ne prescrit aucun examen</p>
              <p className="border-l-[0.22vw] border-[#b8e1e6] pl-[1.3vw] text-[2vw] font-medium leading-[1.1]">Les résultats sont éducatifs et à discuter avec un médecin</p>
              <p className="border-l-[0.22vw] border-[#f47b45] pl-[1.3vw] text-[2vw] font-medium leading-[1.1]">Les signaux urgents orientent immédiatement vers les services d’urgence</p>
            </div>
          </div>
          <div className="flex flex-col justify-end pb-[4vh]">
            <div className="border-t-[0.12vw] border-[#b8e1e6]/35 pt-[2.4vh]">
              <div className="mb-[1.6vh] text-[1.5vw] font-semibold uppercase tracking-[0.18em] text-[#f47b45]">Prochaine étape</div>
              <p className="max-w-[26vw] font-display text-[2.35vw] font-semibold leading-[1.08]">
                Prochaine étape : synchroniser le projet complet puis configurer les secrets du Space Hugging Face
              </p>
            </div>
            <div className="mt-[5vh] text-[1.5vw] uppercase tracking-[0.16em] text-[#b8e1e6]/70">XAMO / Préparer, informer, orienter</div>
          </div>
        </div>
      </div>
    </div>
  );
}