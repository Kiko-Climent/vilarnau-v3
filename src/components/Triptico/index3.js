import React, { useState } from "react";
import TextAnimation from "../Tools";

const Triptico3 = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-screen h-full flex items-center justify-start overflow-hidden cursor-pointer">

      {/* Imagen 1 - Fondo grande */}
      <img
        src="./images/img4.jpeg"
        alt="Imagen 1"
        className={`absolute w-full h-full object-cover transition duration-500 ${
          hovered ? "invert-0" : "invert"
        }`}
      />

      {/* Texto animado */}
      <div
        className="absolute z-10"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <TextAnimation>
          <p
            className={`tracking-tighter text-5xl text-left pl-2 blur-[0.7px] transition duration-500 ${
              hovered
                ? "text-white invert-0 blur-0"
                : "text-green-500 invert"
            }`}
          >
            a place where individuality<br />
            and self expression<br />
            are not just embraced<br />
            but celebrated
          </p>
        </TextAnimation>
      </div>

    </div>
  );
};

export default Triptico3;
