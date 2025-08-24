import React, { useState } from "react";
import TextAnimation from "../Tools";

const Triptico4 = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="relative w-screen h-full flex items-center justify-center overflow-hidden cursor-pointer">

      <div className="relative w-[60%] aspect-[5/4]"
      onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}>
        {/* Imagen */}
        <img
          src="./images/img4.jpeg"
          alt="Imagen 1"
          className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
            hovered ? "invert-0" : "invert"
          }`}
        />

        {/* Texto animado sobre la imagen */}
        <div
          className="absolute top-4 left-4 z-10"  // puedes ajustar con padding o gap

        >
          <TextAnimation>
            <p
              className={`font-medium tracking-tighter text-5xl
                blur-[0.7px] transition duration-500 ${
                hovered ? "text-white invert-0 blur-0" : "text-green-500 invert"
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


    </div>
  );
};

export default Triptico4;
