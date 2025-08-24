import { useEffect, useState } from "react";

const Composition = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const updateScale = () => {
      const baseWidth = 1440;
      const baseHeight = 900;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Calculamos la escala horizontal y vertical
      const scaleX = screenWidth / baseWidth;
      const scaleY = screenHeight / baseHeight;

      // Elegimos el menor para mantener el aspecto sin recortar nada
      let newScale = Math.min(scaleX, scaleY);

      // Limitar la escala mínima para que no se vea enano
      newScale = Math.max(newScale, 0.6); // puedes ajustar este mínimo

      setScale(newScale);
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden bg-neutral-100">
      <div
        className="relative origin-top-left"
        style={{
          width: "1440px",
          height: "900px",
          transform: `scale(${scale})`,
        }}
      >
        {/* Texto centrado */}
        <div className="absolute top-[270px] left-[460px] w-[450px] -translate-x-1/2 pr-2">
          <p className="text-lg text-right leading-none">
            vilarnau opens <br />
            tuesday till friday<br />
            from 12am to 8pm,<br />
            saturday from 1am<br />
            sunday and monday off.<br />
            come and say hello.
          </p>
        </div>

        {/* Imagen inferior centro */}
        <div className="absolute bottom-[8px] left-[450px] w-[450px] h-[510px] -translate-x-1/2">
          <img src="/images/img15.jpeg" className="w-full h-full object-cover" />
        </div>

        {/* Imagen superior centro */}
        <div className="absolute top-[8px] left-[720px] w-[525px] h-[560px] -translate-x-[7%] pb-2">
          <img src="/images/img10.jpg" className="w-full h-full object-cover" />
        </div>

        {/* Imagen inferior derecha */}
        <div className="absolute bottom-[8px] right-[8px] w-[450px] h-[324px]">
          <img src="/images/img2.jpg" className="w-full h-full object-cover" />
        </div>
      </div>
    </div>
  );
};

export default Composition;
