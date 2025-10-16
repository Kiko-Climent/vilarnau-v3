import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Team = () => {
  return(
    <div className="w-screen h-screen flex items-center justify-center gap-3 px-2 pb-24">
      <div className="flex flex-col w-6/12 md:w-3/12 h-[46%]">
      <TextAnimation>
        <p className="flex text-4xl text-nowrap md:text-[clamp(1.6rem, 2.4vw, 2.8rem)] self-end text-right uppercase font-myfont2 tracking-wider">
          our team:</p>
      </TextAnimation>
        <div className="flex relative aspect-[3/4]">
          <GridRevealImage src="/assets/img12.jpg"
              className="w-full h-full object-contain"
              alt="img15"/>
        </div>
      </div>
      <div className="flex flex-col w-6/12 md:w-3/12 h-[45%]">
        <div className="flex relative w-full aspect-[3/4]">
          <GridRevealImage
            src="/assets/img2.jpg"
            className="w-full h-full object-contain"
            alt="img15"
          />
        </div>
          <div className="flex flex-row text-4xl md:text-[clamp(1.6rem, 2.4vw, 2.8rem)] gap-2 mt-2">
            <p className="flex uppercase tracking-wider">ell@s</p>
            <div className="flex flex-col -space-y-3">
              <p className="flex text-base md:text-[clamp(0.8rem,1.4vw,1rem)] uppercase font-myfont2 tracking-wider">sergi</p>
              <p className="flex text-base md:text-[clamp(0.8rem,1.4vw,1rem)] uppercase font-myfont2 tracking-wider">damian</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Team;