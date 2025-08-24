

const QuoteAndImage = () => {
  return (
    <section className="h-screen px-2 py-16">
      <div className="flex flex-col md:flex-row md:justify-between items-center h-full gap-8 md:gap-16"
      >
        {/* Contenedor del texto */}
        <div className="flex w-full md:w-6/12">
          <div className="w-full text-right md:text-left text-3xl md:text-4xl font-semibold text-gray-700 leading-8 blur-[0.7px]">
            located in the heart of Kreuzberg, Vilarnau has been elevating the craft of hairstyling since 2018
          </div>
        </div>
        {/* Contenedor de la imagen */}
        <div className="flex items-center w-full md:w-6/12 h-full">
          <img
            src="./images/img2.jpeg"
            className="object-cover h-[90%] w-[85%] self-center rounded-xl"
            alt="Vilarnau"
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteAndImage;