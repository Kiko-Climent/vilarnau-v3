const Composition4 = () => {
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
          <img
            src="/images/img9.jpg"
            className="w-full h-full object-cover"
            alt="img15"
          />
        </div>

        {/* Texto superior */}
        <div
          className="absolute text-left pl-2 leading-none tracking-wider uppercase "
          style={{
            top: "0%",
            width: "60%",
            right: "0%",
            zIndex: 2,
            fontSize: "1.7rem", // ✅ responsive
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
          <img
            src="/images/img21.jpg"
            className="w-full h-full object-cover"
            alt="img10"
          />
        </div>

        {/* Texto inferior */}
        <div
          className="absolute text-left pl-2 uppercase leading-none tracking-wider"
          style={{
            bottom: "-1%",
            left: "0%",
            zIndex: 2,
            fontSize: "1.7rem", // ✅ responsive
          }}
        >
          <p>Open in the heart <br></br>of Berlin-Kreuzberg<br></br>since 2018. <br></br>Come say hello.</p>
        </div>
        <div
          className="absolute text-right  uppercase leading-none tracking-wider"
          style={{
            bottom: "-1%",
            left: "41%",
            width:"24,3%",
            zIndex: 2,
            fontSize: "3rem", // ✅ responsive
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
            width: "34.5%",
            height: "77%",
            zIndex: 1,
          }}
        >
          <img
            src="/images/img17.jpeg"
            className="w-full h-full object-cover"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition4;
