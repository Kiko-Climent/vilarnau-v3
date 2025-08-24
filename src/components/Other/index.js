import TextAnimation from "../Tools";

const Other1 = () => {
  return (
    <div className="h-screen w-screen relative flex justify-evenly items-center overflow-hidden px-2 py-16 bg-[#020406]">
      {/* Parte izquierda: 2 imágenes en columna */}
      <div className="max-w-[400px] flex aspect-[4/5]">
        <img
          src="./images/img3.jpeg"
          className="w-full h-full object-cover rounded-xl saturate-200 grayscale blur-[5px]"
        />
      </div>

      {/* Parte derecha: 1 imagen en toda la mitad derecha */}
      <div className="relative max-w-[450px] aspect-[4/5]">
        <img
          src="./images/img3.jpeg"
          className="w-full h-full object-cover rounded-xl"
        />
        <div className="absolute flex flex-col justify-end font-semibold text-end text-gray-400 mix-blend-difference bottom-2 left-2 tracking-tight blur-[0.2px] ">
          <TextAnimation>
            <p className="flex text-base">tuesday to friday from 11am to 8pm</p>          
            <p className="flex text-base">saturday from 11am to 8pm</p>         
            <p className="flex text-base">monday and sunday off</p>         
          </TextAnimation>
        </div>
        <div className="absolute flex flex-col justify-center items-center font-semibold text-white mix-blend-difference tracking-tighter left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 blur-[0.2px] whitespace-nowrap ">
          <TextAnimation>         
            {/* <p className="flex text-5xl blur-[0.7px]">(030) - </p>                 
            <p className="flex text-5xl blur-[0.7px] -mb-2">61202363</p>                  */}
            <p className="flex text-5xl blur-[0.7px]">hello@vilarnau.com</p>                 
          </TextAnimation>
        </div>
        <div className="absolute right-2 top-1 flex font-semibold text-gray-400 mix-blend-difference tracking-tight blur-[0.2px] ">
          <TextAnimation>
            <h2 className="flex text-base">appointments</h2>                   
          </TextAnimation>
        </div>
      </div>
      <div className="max-w-[400px] flex-1 aspect-[4/5]">
        <img
          src="./images/img3.jpeg"
          className="w-full h-full object-cover rounded-xl invert blur-[1px]"
        />
      </div>
      {/* <div className="absolute flex justify-center w-screen text-center text-white  whitespace-nowrap left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 tracking-tighter blur-[0.7px]">
        <TextAnimation>
        <h2 className="text-[14vw]">salon vilarnau</h2>          
        </TextAnimation>
      </div> */}
    </div>
  );
};

export default Other1;
