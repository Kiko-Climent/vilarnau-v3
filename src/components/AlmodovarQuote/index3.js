import AnimatedImageBox from "../Tools/AnimatedImageBox";

const AlmodovarQuote2Mobile = () => {
  return (
    <div className="w-full overflow-x-hidden min-h-screen flex flex-col justify-center items-center text-justify tracking-wider px-2 font-myfont2 uppercase">
      
      {/* Intro */}
      <div className="flex">
        <p className="text-[clamp(1.25rem,3vw,1.75rem)] leading-none">
          "well, as i was saying it costs a lot to be authentic, madam. 
          And one can't be stingy with these things,
        </p>
      </div>

      <div className="flex flex-row gap-2 items-stretch">
        <div className="flex aspect-square min-w-[160px] max-w-[280px]">
          <AnimatedImageBox />
        </div>
        <div className="flex flex-1 items-center">
          <p className="text-[clamp(3rem,12vw,6rem)] leading-[0.8]">
            because you are more authentic
          </p>
        </div>
      </div>
      
      {/* Frase final */}
      <div className="flex flex-col">
        <p className="pt-2 flex text-[clamp(3rem,12vw,6rem)] leading-[0.8]">
          the more you resemble what you've dreamed you are." -
        </p>
        <p className="flex text-[clamp(1.25rem,3vw,1.75rem)] leading-none">
          Agrado from "Todo Sobre Mi Madre”
        </p>
      </div>
    </div>
  );
};

export default AlmodovarQuote2Mobile;
