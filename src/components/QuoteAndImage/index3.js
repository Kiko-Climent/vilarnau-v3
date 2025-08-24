import TextAnimation from "../Tools";

const QuoteAndImage3 = () => {
  return (
    <section className="h-screen w-screen bg-white">
      <div className="flex flex-col-reverse md:flex-row-reverse md:justify-between items-center h-full gap-8 md:gap-16"
      >
        {/* Contenedor del texto */}
        <div className="flex w-full md:w-6/12 flex-1">
          <TextAnimation>
            <p className="w-full text-right md:text-left text-3xl md:text-5xl font-medium text-gray-700  blur-[0.7px]">
              we believe in creating a look that while keeping an insight on actual trends, better highlights your features and lifestyle
            </p>
          </TextAnimation>
        </div>
        {/* Contenedor de la imagen */}
        <div className="flex items-center w-full md:w-6/12 h-full">
          <img
            src="./images/img2.jpeg"
            className="object-cover h-full w-full"
            alt="Vilarnau"
          />
        </div>
      </div>
    </section>
  );
};

export default QuoteAndImage3;