import type { SlideComponentProps } from '@/slideLoader';

export default function Need(_: SlideComponentProps) {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#eef4f7] text-[#0b2942]">
      <div className="absolute right-0 top-0 h-full w-[28vw] bg-[#d9e9ed]" />
      <div className="absolute -right-[7vw] -top-[10vw] h-[37vw] w-[37vw] rounded-full border-[0.12vw] border-[#9fcbd2]" />
      <div className="absolute bottom-[8vh] right-[8vw] h-[13vw] w-[13vw] rounded-full border-[0.12vw] border-[#f47b45]/70" />
      <div className="relative flex h-full flex-col px-[7vw] py-[6vh]">
        <div className="flex items-center justify-between">
          <div className="text-[1.5vw] font-semibold uppercase tracking-[0.2em] text-[#567080]">Le besoin</div>
          <div className="text-[1.5vw] uppercase tracking-[0.18em] text-[#567080]">02 / 05</div>
        </div>
        <div className="mt-[8vh] grid flex-1 grid-cols-[0.82fr_1.18fr] gap-[6vw]">
          <div>
            <div className="mb-[3vh] h-[0.35vw] w-[5vw] bg-[#f47b45]" />
            <h2 className="font-display max-w-[30vw] text-[5.3vw] font-semibold leading-[0.98] tracking-[-0.06em]">
              Le besoin
            </h2>
            <p className="mt-[4vh] max-w-[27vw] text-[2vw] leading-[1.25] text-[#567080]">
              Donner au patient une structure utile avant la consultation, sans se substituer au médecin.
            </p>
          </div>
          <div className="flex flex-col justify-center gap-[2.2vh] pb-[5vh]">
            <div className="border-t-[0.12vw] border-[#a9c4ca] pt-[2.2vh]">
              <div className="mb-[0.9vh] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#f47b45]">01</div>
              <p className="max-w-[39vw] text-[2.25vw] font-medium leading-[1.12]">Un patient décrit ses symptômes et son contexte médical</p>
            </div>
            <div className="border-t-[0.12vw] border-[#a9c4ca] pt-[2.2vh]">
              <div className="mb-[0.9vh] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#f47b45]">02</div>
              <p className="max-w-[39vw] text-[2.25vw] font-medium leading-[1.12]">L’outil l’aide à structurer les informations importantes</p>
            </div>
            <div className="border-t-[0.12vw] border-[#a9c4ca] pt-[2.2vh]">
              <div className="mb-[0.9vh] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#f47b45]">03</div>
              <p className="max-w-[39vw] text-[2.25vw] font-medium leading-[1.12]">Il suggère des examens possibles à discuter avec un médecin</p>
            </div>
            <div className="border-t-[0.12vw] border-[#a9c4ca] pt-[2.2vh]">
              <div className="mb-[0.9vh] text-[1.5vw] font-semibold uppercase tracking-[0.16em] text-[#f47b45]">04</div>
              <p className="max-w-[39vw] text-[2.25vw] font-medium leading-[1.12]">Il prépare des questions utiles pour la consultation</p>
            </div>
          </div>
        </div>
        <div className="text-[1.5vw] uppercase tracking-[0.16em] text-[#567080]">XAMO / Préparer la conversation</div>
      </div>
    </div>
  );
}