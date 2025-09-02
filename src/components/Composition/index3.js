const Composition3 = () => {
  return (
    <div className="w-screen h-full py-24 flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10]">

        {/* Imagen inferior centro */}
        <div
          className="absolute pr-2"
          style={{
            bottom: "0%",
            left: "32%",
            width: "31%",
            height: "58.5%",
            transform: "translateX(-50%)",
            zIndex: 1,
          }}
        >
          <img
            src="/images/img15.jpeg"
            className="w-full h-full object-cover"
            alt="img15"
          />
        </div>

        {/* Texto, pegado a la imagen por arriba */}
        <div
          className="absolute text-[clamp(0.9rem,1.2vw,1.3rem)] text-left leading-none"
          style={{
            bottom: "58.5%", // exactamente el alto de la imagen inferior
            left: "32%",
            width: "31%",
            transform: "translateX(-50%)",
            zIndex: 2, // siempre encima de la imagen
          }}
        >
          <p className="p-1">
            vilarnau opens <br />
            tuesday till friday<br />
            from 12am to 8pm,<br />
            saturday from 1am<br />
            sunday and monday off.<br />
            come and say hello.
          </p>
        </div>

        {/* Imagen superior centro */}
        <div
          className="absolute"
          style={{
            top: "0%",
            left: "50%",
            width: "36.5%",
            height: "62%",
            transform: "translateX(-7%)",
            zIndex: 1,
          }}
        >
          <img
            src="/images/img10.jpg"
            className="w-full h-full object-cover"
            alt="img10"
          />
        </div>

        {/* Imagen inferior derecha */}
        <div
          className="absolute pr-2"
          style={{
            bottom: "0%",
            right: "0%",
            width: "31.5%",
            height: "37.3%",
            zIndex: 1,
          }}
        >
          <img
            src="/images/img2.jpg"
            className="w-full h-full object-cover"
            alt="img2"
          />
        </div>
      </div>
    </div>
  );
};

export default Composition3;
