import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const Composition4_2 = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10] font-myfont2">

        {/* Imagen inferior centro */}
        <div
          className="absolute pr-2"
          style={{
            top: "0%",
            left: "20.5%",
            width: "40%",
            height: "85%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <GridRevealImage
            src="/images/img9.jpg"
            className="w-full h-full object-cover"
            alt="img15"
          />
        </div>

        {/* Texto superior */}
        <TextAnimation>
        <div
          className="absolute text-left pl-2 leading-none tracking-wider uppercase text-[clamp(0.95rem,2vw,1.45rem)]"
          style={{
            top: "0%",
            width: "60%",
            right: "0%",
            zIndex: 2,
          }}
        >
          <p>
          Welcome to Salon Vilarnau.
          </p>
          <p>
          Our philosophy is to deeply understand your wishes, so that we can create individual
          cuts that accentuate your features and style.
          </p>
          <p>
          We believe in the power of classic meets contemporary, and customers leaving our salon
          feeling seen, understood, and phenomenal.
          </p>
        </div>
        </TextAnimation>

        {/* Imagen superior centro */}
        <div
          className="absolute"
          style={{
            top: "23%",
            left: "42.2%",
            width: "24.3%",
            height: "62%",
            transform: "translateX(-7%)",
            zIndex: 1,
          }}
        >
          <GridRevealImage
            src="/images/img17.jpeg"
            className="w-full h-full object-cover"
            alt="img10"
          />
        </div>

        {/* Texto inferior */}
        <div
          className="absolute text-left pl-2 uppercase text-[clamp(0.95rem,2vw,1.45rem)] leading-none tracking-wider"
          style={{
            bottom: "-1%",
            left: "0%",
            zIndex: 2,
          }}
        >
          <p>Open in the heart</p>
          <p>of Berlin-Kreuzberg</p>
          <p>since 2018.</p>
          <p>Come say hello.</p>
            
        </div>
        <div
          className="absolute uppercase leading-none tracking-wider"
          style={{
            bottom: "-1%",
            left: "47.5%",
            width:"24,3%",
            zIndex: 2,
            fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)"

          }}
        >
          {/* <p>(030) - 61202363 <br></br>hello@vilarnau.de</p> */}
          <p>©vilarnau 2025</p>
        </div>

        {/* Imagen inferior derecha */}
        <div
          className="absolute pr-6"
          style={{
            bottom: "0%",
            right: "0%",
            width: "34.5%",
            height: "77%",
            zIndex: 1,
          }}
        >
          <GridRevealImage
            src="/images/img14.jpeg"
            className="w-full h-full object-cover"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition4_2;
