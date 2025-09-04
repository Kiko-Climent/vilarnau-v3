import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Composition4MobileFlex2 = () => {
  return (
    <div className="w-screen h-screen flex flex-col px-2 gap-2 uppercase text-[clamp(1rem,7vw,4rem)] font-myfont2 tracking-wide">
      {/* Texto superior */}
      <TextAnimation>
      <div className="w-full flex-col text-justify leading-none">
        <p className="flex">
          Welcome to Salon Vilarnau.<br /><br></br>
          Our philosophy is to deeply understand your wishes, so that we can create
          individual cuts that accentuate your features and style.
        </p>
        <p className="flex">
          We believe in the power of classic meets contemporary, and customers
          leaving our salon feeling seen, understood, and phenomenal.
        </p>
      </div>
      </TextAnimation>

      {/* Composición en dos columnas */}
      <div className="flex gap-2">
        {/* Columna izquierda (40%) */}
        <div className="flex flex-col w-2/5 gap-2">
          {/* Row 1 (40%) */}
          <div className="relative aspect-[3/4]">
            <GridRevealImage
              src="/images/img17.jpeg"
              className="w-full h-full object-contain"
              alt="img15"
            />
          </div>

          {/* Row 2 (60%) */}
          <div className="flex flex-col">
            <div className="flex flex-col leading-none">
              <p>Open in the heart of Berlin-Kreuzberg since 2018.</p>
              <p>Come and say hello</p>
            </div>
            <p className="flex text-lg">©vilarnau 2025</p>
          </div>
        </div>

        {/* Columna derecha (60%) */}
        <div className="w-3/5 relative aspect-[3/4]">
          <GridRevealImage
            src="/images/img9.jpg"
            className="w-full h-full object-contain"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition4MobileFlex2;