import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Triptico5 = () => {
  return (
    <div className="w-full h-screen overflow-hidden bg-white">
      {/* Imagen en esquina superior izquierda */}
      <div className="absolute top-0 right-0 w-10/12 md:w-7/12 h-[75%] aspect-[4/3]">
        <GridRevealImage
          src="/images/img4.jpeg"
          className="w-full h-full"
          rows={5}
          cols={5}
          order="diagonal"      // prueba: "random", "row", "column" o tu array custom
          start="top 85%"
        />
      </div>

      {/* Texto en esquina inferior derecha */}
      <TextAnimation>
      <div className="absolute bottom-2 left-2 text-left font-myfont2 text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5">
        <p>a place where individuality</p>
        <p>and self expression are</p>
        <p>not just embraced</p>
        <p>but celebrated</p>
        
      </div>
      </TextAnimation>
    </div>
  );
};

export default Triptico5;
