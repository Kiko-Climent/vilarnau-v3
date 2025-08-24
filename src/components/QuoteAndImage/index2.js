import TextAnimation from "../Tools";

const QuoteAndImage2 = () => {
  return (
    <section className="h-screen w-screen bg-white">
      <div className="flex flex-col md:flex-row md:justify-between items-center h-full gap-8 md:gap-16"
      >
        {/* Contenedor del texto */}
        <div className="flex w-full md:w-6/12 flex-1">
          <TextAnimation>
            <p className="w-full text-right md:text-right text-3xl md:text-5xl font-medium text-gray-700  blur-[0.7px]">
            located in the heart of Berlin-Kreuzberg, Vilarnau has been elevating the craft of hairstyling since 2018
            </p>
          </TextAnimation>
        </div>
        {/* Contenedor de la imagen */}
        <div className="flex items-center w-full md:w-6/12 h-full">
          <img
            src="./images/img4.jpg"
            className="object-cover h-full w-full"
            alt="Vilarnau"
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteAndImage2;