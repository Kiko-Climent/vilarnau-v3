import TextAnimation from "../Tools";

const AppointmentsSection = () => {
  return (
    <div className="h-screen w-screen flex gap-2 overflow-hidden px-2 py-16">
      {/* Parte izquierda: 2 imágenes en columna */}
      <div className="w-1/4 flex flex-col gap-2">
        <div className="h-[calc(50%-0.25rem)]">
          <img
            src="./images/img16.jpeg"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="h-[calc(10%-0.25rem)] bg-black w-full rounded-xl"></div>
        <div className="h-[calc(40%-0.25rem)]">
          <img
            src="./images/img2.jpeg"
            className="w-full h-full object-cover rounded-xl"
          />
          
        </div>
      </div>
      <div className="w-1/3 flex flex-col gap-2">
      <div className="h-[calc(15%-0.25rem)] bg-black w-full rounded-xl"></div>
        <div className="h-[calc(63%-0.25rem)]">
          <img
            src="./images/img1.jpeg"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
        <div className="relative h-[calc(22%-0.25rem)] bg-black rounded-xl">
          {/* <img
            src="./images/img6.JPG"
            className="w-full h-full object-cover rounded-xl"
          /> */}
          <div className="absolute blur-[0.7px] justify-center flex items-center w-full text-4xl text-white text-start pl-2 leading-7 text-white font-semibold left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          becasue you are more authentic the more you resemble what you&apos;ve dreamed you are.
            {/* <p>becasue you are<br></br>more authentic<br></br>the more you resemble<br></br>what you've dreamed<br></br>you are</p> */}
          </div>
        </div>
      </div>

      {/* Parte derecha: 1 imagen en toda la mitad derecha */}
      <div className="w-2/3 flex h-full relative">
        <img
          src="./images/img9.jpg"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute flex flex-col text-white text-5xl w-2/3 h-auto font-semibold items-center justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[0.7px]">
          <h2 className="flex">info hotline</h2>
          <h2 className="flex ">(030) 61202363</h2>
        </div>
      </div>
    </div>
  );
};

export default AppointmentsSection;
