const Triptico2 = () => {
  return (
    <div className="h-screen w-screen flex flex-row-reverse items-center justify-between mt-16 px-[5vw] overflow-hidden">
      {/* LADO IZQUIERDO: TEXTO */}
      <div className="w-1/2 bg-[#D0021B] rounded-xl p-4">
        <p className="text-4xl text-end text-white leading-tight font-semibold blur-[0.7px]">
          a place where individuality and self expression are not just embraced but celebrated
        </p>
      </div>

      {/* LADO DERECHO: IMÁGENES SUPERPUESTAS */}
      <div className="w-1/2 relative h-[85vh] flex items-end justify-center">
        {/* Imagen principal (grande) */}
        <img
          src="./images/img6.JPG"
          className="h-full w-auto object-cover rounded-xl shadow-lg"
          alt="Main"
        />

        {/* Imagen secundaria */}
        <img
          src="./images/img3.jpeg"
          className="absolute top-1/3 -left-4 w-[45%] object-cover rounded-xl shadow-md"
          alt="Overlay"
        />

        <img
          src="./images/img2.jpeg"
          className="absolute -top-8 right-0 w-[35%] object-cover rounded-xl shadow-md"
          alt="Overlay"
        />
      </div>
    </div>
  );
};

export default Triptico2;
