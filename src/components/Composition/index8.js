
import GridRevealImage from "../Tools/GridRevealAnimation";
import GridRevealContain from "../Tools/GridRevealContain";

const Composition5 = () => {
  return (
    <div className="w-screen h-screen md:h-full flex items-center justify-center overflow-hidden font-myfont2">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10]">

        {/* Imagen superior izquierda */}
        <div className="absolute pr-2 top-[0%] left-[25%] w-[38%] h-[58.5%] -translate-x-1/2 z-[1]
            md:left-[20%] md:w-[25%] md:h-[45%] md:top-[6%] // tablets/desktop">

          <GridRevealContain
            src="/images/img15.jpeg"
            className="w-full h-full object-contain"
            alt="img15">
          </GridRevealContain>
        </div>

        {/* Imagen inferior izquierda */}
        <div className="absolute pr-2 top-[0%] left-[25%] w-[38%] h-[58.5%] -translate-x-1/2 z-[1]
            md:left-[20%] md:w-[25%] md:h-[45%] md:top-[52%] // tablets/desktop">

          <GridRevealContain
            src="/images/img5.jpeg"
            className="w-full h-full "
            alt="img15">
          </GridRevealContain>
        </div>

        {/* Imagen superior centro */}
        <div className="absolute top-[2%] left-[48%] md:left-[34%] w-[49%] md:w-[20%] h-[61.5%] md:h-[42%] -translate-x-[7%] z-[1]">
          <GridRevealImage
            src="/images/img10.jpg"
            className="w-full h-full "
            alt="img10"
          />
        </div>

        {/* Imagen  centro */}
        <div className="absolute top-[45%] left-[48%] md:left-[36.8%] w-[49%] md:w-[60%] h-[61.5%] md:h-[33%] -translate-x-[7%] z-[1]">
          <GridRevealImage
            src="/images/img11.JPG"
            className="w-full h-full "
            alt="img10"
          />
        </div>
        <div className="absolute bottom-[0%] left-[48%] md:left-[33.3%] w-[49%] md:w-[10%] h-[61.5%] md:h-[20.5%] -translate-x-[7%] z-[1]">
          <GridRevealImage
            src="/images/img10.jpg"
            className="w-full h-full "
            alt="img10"
          />
        </div>

        {/* Imagen superior derecha */}
        <div className="absolute top-[12%] right-[4.3%] md:right-[24.7%] w-[51%] md:w-[22%] h-[32%] z-[1]">
          <GridRevealContain
            src="/images/img2.jpg"
            className="w-full h-full"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition5;
