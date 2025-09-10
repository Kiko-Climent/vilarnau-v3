import GridRevealImage from "../Tools/GridRevealAnimation";

const Triptico6 = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white relative">
      {/* Imagen en esquina superior izquierda */}
      <div className="absolute top-0 left-0 w-10/12 md:w-7/12 h-[75%] aspect-[4/3]">
        <GridRevealImage
          src="/images/img5.jpg"
          className="w-full h-full"
          rows={5}
          cols={5}
          order="diagonal"      // prueba: "random", "row", "column" o tu array custom
          start="top 85%"
        />
      </div>

      {/* Texto en esquina inferior derecha */}
      <div className="absolute bottom-2 right-2 md:right-5 text-right font-myfont2">
        <p className="text-base md:text-lg tracking-wider leading-none">
          we believe in creating a look<br />
          that while keeping an insight<br />
          on actual trends, better highlights<br />
          your features and lifestyle
        </p>
      </div>
    </div>
  );
};

export default Triptico6;
