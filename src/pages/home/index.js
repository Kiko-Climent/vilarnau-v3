"use client";

import Head from "next/head";
import Pic1 from "../../../public/zoomgallery/zoom5.webp";
import Pic2 from "../../../public/zoomgallery/zoom1.webp";
import Pic3 from "../../../public/zoomgallery/zoom7.webp";
import Pic4 from "../../../public/zoomgallery/zoom2.webp";
import Pic5 from "../../../public/zoomgallery/zoom3.webp";
import Pic6 from "../../../public/zoomgallery/zoom4.webp";
import Pic7 from "../../../public/zoomgallery/zoom6.webp";
// import PageTransition from "@/components/Layout/PageTransition";
import { ReactLenis } from "lenis/react";
import FlipSection from "@/components/FlipSections";
import ZoomGallery from "@/components/ZoomGallery";
import Footer from "@/components/Sticky_Footer/footer";
import Triptico5 from "@/components/Triptico/index5";
import Composition3 from "@/components/Composition/index3";
import Test4 from "@/components/NewHero/test4";
import Composition4Wrapper from "@/components/CompositionWrapper";
import Team from "@/components/Team";
import AlmodovarQuoteWrapper from "@/components/AlmodovarQuote/AlmodovarQuoteWrapper";
import Triptico6 from "@/components/Triptico/index6";
import Quote1 from "@/components/Other/index2";


export default function Home() {
  
  return(
    <>
    <Head>
        {/* Preload de las imágenes críticas del ZoomGallery */}
        <link rel="preload" as="image" href="/newhero/img10.webp" />
        <link rel="preload" as="image" href="/images/img1.jpeg" />
        <link rel="preload" as="image" href="/images/img17.jpeg" />
        <link rel="preload" as="image" href={Pic1.src} />
        <link rel="preload" as="image" href={Pic2.src} />
        <link rel="preload" as="image" href={Pic3.src} />
        <link rel="preload" as="image" href={Pic4.src} />
        <link rel="preload" as="image" href={Pic5.src} />
        <link rel="preload" as="image" href={Pic6.src} />
        <link rel="preload" as="image" href={Pic7.src} />
    </Head>
      <div className="w-screen min-h-screen relative">
        {/* <PageTransition> */}
          <ReactLenis root>
            <FlipSection FirstComponent={Test4} SecondComponent={Triptico5} />
            <ZoomGallery />
            <Quote1 />
            <div className="pt-24">
              <Triptico6 />
            </div>
            <Composition3 />
            <Team />
            <Composition4Wrapper />
            <div className="pt-24">
              <AlmodovarQuoteWrapper />
            </div>
            <Footer />        
          </ReactLenis>
        {/* </PageTransition> */}
      </div>
    </>
    
  )
}