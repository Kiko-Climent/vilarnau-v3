import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const TeamMobile2 = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center overflow-hidden gap-[clamp(0.5rem,2vw,1rem)] px-[clamp(0.5rem,3vw,2rem)] py-[clamp(1rem,5vw,3rem)] ">

      {/* === Bloque superior === */}
      <div className="flex flex-row justify-start items-start gap-[clamp(0.3rem,1.5vw,0.8rem)] w-full max-w-[600px]">
        <div 
          className="flex w-[70vw]
                     h-[calc(70vw*1.333)]
                     max-h-[80vh] overflow-hidden">
          <GridRevealImage 
            src="/assets/img12.jpg"
            className="w-full h-full object-cover"
            start="top 65%"
          />
        </div>
        <p className="flex self-end text-[clamp(0.8rem,2vw,1rem)] translate-y-[clamp(2px,0.4vw,4px)] text-nowrap">( 1 )</p>
      </div>

      {/* === Bloque inferior === */}
      <div className="flex flex-row justify-end items-stretch gap-[clamp(0.5rem,2vw,1rem)] w-full max-w-[600px]">
        <TextAnimation>
          <p className="team-mobile-fix flex w-[50%] text-base tracking-wider text-justify">
          At Salon Vilarnau, Sergi (1) and Damian (2) bring warmth, care, and genuine connection to every visit.
          Their calm energy and attention to detail create a space where you can relax, feel understood, and leave refreshed — inside and out.
          </p>
        </TextAnimation>

        <div 
          className="flex w-[40vw] 
                     h-[calc(40vw*1.333)]
                     max-h-[70vh] overflow-hidden">
          <GridRevealImage 
            src="/assets/img2.jpg"
            className="w-full h-full object-cover"
          />
        </div>

        <p className="flex self-end text-[clamp(0.8rem,2vw,1rem)] translate-y-[clamp(2px,0.4vw,4px)] text-nowrap">( 2 )</p>
      </div>
    </div>
  );
};

export default TeamMobile2;
