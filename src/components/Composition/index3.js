import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Composition3 = () => {
  return (
    <div className="w-screen h-screen md:h-full py-24 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10]">

        {/* Imagen inferior centro */}
        <div className="absolute pr-2 bottom-0 left-[25%] w-[38%] h-[58.5%] -translate-x-1/2 z-[1]
            md:left-[32%] md:w-[31%] md:h-[58.5%] // tablets/desktop">

          <GridRevealImage
            src="/images/img15.jpeg"
            className="w-full h-full object-cover"
            alt="img15">
          </GridRevealImage>
        </div>

        {/* Texto, pegado a la imagen por arriba */}
        <TextAnimation>
        <div className="absolute bottom-[58.5%] left-[24.5%] md:left-[32%] w-[38%] md:w-[31%] -translate-x-1/2 z-[2]
            text-[clamp(0.9rem,1.2vw,1.3rem)] text-left leading-none"
        >
          <p className="p-1">
            vilarnau opens <br />
            tuesday till friday<br />
            from 12am to 8pm,<br />
            saturday from 1am<br />
            sunday and monday off.<br />
            come and say hello.
          </p>
        </div>

        </TextAnimation>

        {/* Imagen superior centro */}
        <div className="absolute top-0 left-[48%] md:left-1/2 w-[49%] md:w-[36.5%] h-[61.5%] md:h-[62%] -translate-x-[7%] z-[1]">
          <GridRevealImage
            src="/images/img10.jpg"
            className="w-full h-full object-cover"
            alt="img10"
          />
        </div>


        {/* Imagen inferior derecha */}
        <div className="absolute bottom-0 right-[4.3%] md:right-0 w-[51%] md:w-[31.5%] h-[37.3%] pr-2 md:pr-6 z-[1]">
          <GridRevealImage
            src="/images/img2.jpg"
            className="w-full h-full object-cover"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition3;
