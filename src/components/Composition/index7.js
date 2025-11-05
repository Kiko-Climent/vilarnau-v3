import TextAnimation from "../Tools";
import TextAnimation2 from "../Tools/AnimatedText2";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Composition4MobileFlex2 = () => {
  return (
    <div className="w-screen h-screen flex flex-col pr-2 gap-2 uppercase text-[clamp(1rem,7vw,4rem)] bg-white tracking-wide">
      {/* Texto superior */}
      <TextAnimation2>
      <div className="w-full flex-col text-justify leading-none pl-1">
        <p className="flex">
          Welcome to Salon Vilarnau.
        </p>
        <p className="flex">
          Our philosophy is to deeply understand your wishes, so that we can create
          individual cuts that accentuate your features and style.
        </p>
        <p className="flex">
          We believe in the power of classic meets contemporary, and customers
          leaving our salon feeling seen, understood, and phenomenal.
        </p>
      </div>
      </TextAnimation2>

      {/* Composición en dos columnas */}
      <div className="flex gap-2 pl-2">
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
          <div className="flex flex-col h-full justify-start">
            <div className="flex flex-col leading-none">
              <p>Open in the heart of Berlin-Kreuzberg since 2018.</p>
              <p>Come and say hello</p>
            </div>
            <p className="flex text-lg mt-auto">©vilarnau 2025</p>
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