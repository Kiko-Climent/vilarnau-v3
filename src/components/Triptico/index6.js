import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Triptico6 = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">
      {/* Imagen en esquina superior izquierda */}
      <div className="absolute top-0 left-0 w-10/12 md:w-8/12 h-[75%] aspect-[4/3]">
        <GridRevealImage
          src="/images/img2.jpg"
          className="w-full h-full"
          rows={5}
          cols={5}
          order="diagonal"      // prueba: "random", "row", "column" o tu array custom
          start="top 85%"
        />
      </div>

      {/* Texto en esquina inferior derecha */}
      <TextAnimation>
        <div className="absolute bottom-2 right-2 md:right-6 text-right text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5">
          <p>designing looks</p>
          <p>that reflect the now</p>
          <p>while highlighting</p>
          <p>who you truly are</p>
        </div>
      </TextAnimation>
    </div>
  );
};

export default Triptico6;
