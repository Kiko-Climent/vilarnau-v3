import TextAnimation from "../Tools";
import TextAnimation2 from "../Tools/AnimatedText2";
import GridRevealImage from "../Tools/GridRevealAnimation";
import GridRevealContain from "../Tools/GridRevealContain";

const Composition3_1 = () => {
  return (
    <div className="w-screen h-screen md:h-full py-24 flex items-center justify-center overflow-hidden font-myfont2">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10]">

        {/* Imagen inferior centro */}
        <div className="absolute pr-2 bottom-0 left-[25%] w-[100%] h-[70.5%] -translate-x-1/2 z-[1]
            md:left-[28%] // tablets/desktop">

          <GridRevealContain
            src="/images/img3.jpeg"
            className="w-full h-full"
            alt="img15">
          </GridRevealContain>
        </div>

        {/* Texto, pegado a la imagen por arriba */}
        <div className="absolute bottom-[40%] left-[25.3%] md:left-[83.3%] w-[38%] md:w-[31%] -translate-x-1/2 z-[2]
            text-base md:text-lg text-left leading-none tracking-wider"
            >
          <TextAnimation2>
            <div className="">
            <p>vilarnau opens:</p>
            <p>tuesday 12 — 20</p>
            <p>wednesday 12 — 20</p>
            <p>thursday 12 — 20</p>
            <p>friday 12 — 20</p>
            <p>saturday 10 — 18</p>
            <p>sunday - closed</p>
            <p>monday - closed</p>
            </div>
          </TextAnimation2>
        </div>


        {/* Imagen superior centro */}
        <div className="absolute top-0 left-[48%] md:left-[12%] w-[49%] md:w-[100%] h-[61.5%] md:h-[60%] -translate-x-[7%] z-[1]">
          <GridRevealContain
            src="/images/img5.jpeg"
            className="w-full h-full"
            alt="img10"
          />
        </div>


        {/* Imagen inferior derecha */}
        <div className="absolute bottom-0 right-[4.3%] md:right-[0%] w-[51%] md:w-[39.5%] h-[39.5%] pr-2 md:pr-6 z-[1]">
          <GridRevealImage
            src="/images/img8.jpg"
            className="w-full h-full object-cover"
            alt="img2"
            style={{
              backgroundPosition: "top"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Composition3_1;
