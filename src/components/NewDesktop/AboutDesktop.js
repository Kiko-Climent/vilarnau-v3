"use client";
import { useState } from "react";
import Image from "next/image";
import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";
import { useNavbarDesktop } from "@/components/Layout/Context/NavbarDesktopContext";

const AboutDesktop = () => {
  const [src9, setSrc9] = useState(null);
  const [src17, setSrc17] = useState(null);
  const [src14, setSrc14] = useState(null);

  const { measures } = useNavbarDesktop();
  const { pricesRight } = measures;

  // px-2 = 8px
  const px = 8;
  const measuresReady = pricesRight > 0;

  return (
    <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
      <div className="relative w-full h-full max-w-[1920px] max-h-[calc(100vh-1rem)] aspect-[16/10] font-myfont2">

        {/* Preload imágenes ocultas */}
        <div className="hidden">
          <Image src="/images/img9.jpg" width={1920} height={1080} priority onLoadingComplete={(img) => setSrc9(img.src)} />
          <Image src="/images/img17.jpeg" width={1920} height={1080} priority onLoadingComplete={(img) => setSrc17(img.src)} />
          <Image src="/images/img14.jpeg" width={1920} height={1080} priority onLoadingComplete={(img) => setSrc14(img.src)} />
        </div>

        {/* Imagen izquierda — desde px-2 hasta pricesX */}
        {src9 && measuresReady && (
          <div
            className="absolute"
            style={{
              top: "0%",
              left: px,                        // respeta px-2
              width: pricesRight - px,            // hasta la "s" de prices
              height: "85%",
              zIndex: 1,
            }}
          >
            <GridRevealImage src={src9} className="w-full h-full object-cover" rows={5} cols={5} order="diagonal" start="top 80%" />
          </div>
        )}

        {/* Texto superior */}
        <TextAnimation start="top 25%">
          <div className="absolute text-left leading-none tracking-wider uppercase text-[clamp(0.95rem,2vw,1.45rem)]" style={{ top: "0%", width: "60%", right: "0%", zIndex: 2 }}>
            <p>Our philosophy is to deeply understand your wishes, so that we can create individual cuts that accentuate your features and style.</p>
            <p>We believe in the power of classic meets contemporary, and customers leaving our salon feeling seen, understood, and phenomenal.</p>
          </div>
        </TextAnimation>

        {/* Imagen superior centro */}
        {src17 && (
          <div className="absolute" style={{ top: "23%", left: "41.8%", width: "24.3%", height: "62%", transform: "translateX(-7%)", zIndex: 1 }}>
            <GridRevealImage src={src17} className="w-full h-full object-cover" rows={5} cols={5} order="diagonal" start="top 80%" />
          </div>
        )}

        {/* Texto inferior */}
        <TextAnimation start="top 99%">
          <div className="absolute text-left pl-2 uppercase text-[clamp(0.95rem,2vw,1.45rem)] leading-none tracking-wider" style={{ bottom: "-1%", left: "0%", zIndex: 2 }}>
            <p>Open in the heart</p>
            <p>of Berlin-Kreuzberg</p>
            <p>since 2018.</p>
            <p>Come say hello.</p>
          </div>
        </TextAnimation>

        {/* Footer */}
        <div className="absolute uppercase leading-none tracking-wider" style={{ bottom: "-1%", left: "47.5%", zIndex: 2, fontSize: "clamp(1.6rem, 2.4vw, 2.8rem)" }}>
          <p>©vilarnau 2025</p>
        </div>

        {/* Imagen derecha */}
        {src14 && (
          <div className="absolute pr-6" style={{ bottom: "0%", right: "0%", width: "34.5%", height: "77%", zIndex: 1 }}>
            <GridRevealImage src={src14} className="w-full h-full object-cover" rows={5} cols={5} order="diagonal" start="top 70%" />
          </div>
        )}

      </div>
    </div>
  );
};

export default AboutDesktop;