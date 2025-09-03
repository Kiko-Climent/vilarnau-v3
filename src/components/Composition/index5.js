import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Comopsition4Mobile = () => {
  return(
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10] font-myfont2">
    
            {/* Imagen inferior centro */}
            <div
              className="absolute pl-2"
              style={{
                top: "23%",
                left: "20.5%",
                width: "40%",
                height: "61%",
                transform: "translateX(-50%)",
                zIndex: 1,
              }}
            >
              <GridRevealImage
                src="/images/img17.jpeg"
                className="w-full h-full object-contain"
                alt="img15"
              />
            </div>
    
            {/* Texto superior */}
            <TextAnimation>
            <div
              className="absolute text-left pl-2 leading-none tracking-wider uppercase text-[clamp(0.95rem,2vw,1.6rem)]"
              style={{
                top: "0%",
                width: "100%",
                right: "0%",
                zIndex: 2,
              }}
            >
              <p>
              Welcome to Salon Vilarnau.<br></br>
              Our philosophy is to deeply understand your wishes, so that we can create individual
              cuts that accentuate your features and style.<br></br>
              </p>
              <p>
              We believe in the power of classic meets contemporary, and customers leaving our salon
              feeling seen, understood, and phenomenal.
              </p>
            </div>
            </TextAnimation>
    
            {/* Texto inferior */}
            <div
              className="absolute text-left pl-2 uppercase leading-none tracking-wider text-[clamp(0.95rem,2vw,1.6rem)]"
              style={{
                bottom: "8%",
                left: "0%",
                zIndex: 2,
              }}
            >
              <p>Open in the heart <br></br>of Berlin-Kreuzberg<br></br>since 2018. <br></br>Come say hello.</p>
            </div>
            <div
              className="absolute text-right pl-2 uppercase leading-none tracking-wider"
              style={{
                bottom: "0%",
                left: "0%",
                width:"24,3%",
                zIndex: 2,
              }}
            >
              {/* <p>(030) - 61202363 <br></br>hello@vilarnau.de</p> */}
              <p>©vilarnau 2025</p>
            </div>
    
            {/* Imagen inferior derecha */}
            <div
              className="absolute pr-2"
              style={{
                bottom: "0%",
                right: "0%",
                width: "57.5%",
                height: "77%",
                zIndex: 1,
              }}
            >
              <GridRevealImage
                src="/images/img9.jpg"
                className="w-full h-full object-contain"
                alt="img2"
              />
            </div>
          </div>
        </div>
  )
}

export default Comopsition4Mobile;