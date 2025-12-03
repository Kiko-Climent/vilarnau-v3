"use client";

import Head from "next/head";
import Pic1 from "../../../public/zoomgallery/zoom5.webp";
// import Pic2 from "../../../public/zoomgallery/zoom1.webp";
// import Pic3 from "../../../public/zoomgallery/zoom8.webp";
// import Pic4 from "../../../public/zoomgallery/zoom2.webp";
// import Pic5 from "../../../public/zoomgallery/zoom3.webp";
// import Pic6 from "../../../public/zoomgallery/zoom4.webp";
// import Pic7 from "../../../public/zoomgallery/zoom6.webp";
import FlipSection from "@/components/FlipSections";
import ZoomGallery from "@/components/ZoomGallery";
import Footer from "@/components/Sticky_Footer/footer";
import Triptico5 from "@/components/Triptico/index5";
import Composition3 from "@/components/Composition/index3";
import Test4 from "@/components/NewHero/test4";
import Composition4Wrapper from "@/components/CompositionWrapper";
import Quote2 from "@/components/Other/index3";
import Triptico6 from "@/components/Triptico/index6";
import Quote1 from "@/components/Other/index2";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useLenis } from "lenis/react";
import FlipSection2 from "@/components/FlipSections/index2";
import TeamWrapper from "@/components/Team/TeamWrapper";
import FlipSection3 from "@/components/FlipSections/index3";
import AlmodovarQuoteNew from "@/components/AlmodovarQuote/index6";
import AnimatedBoxComponent from "@/components/Other/AnimatedBoxComponent";


export default function Home() {

  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    if (router.asPath.includes("#about")) {
      setTimeout(() => {
        lenis?.scrollTo("#about");
      }, 300);
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [router.asPath]);
  
// }, [router.asPath, lenis]);
  
  return(
    <>
    <Head>
        {/* Preload de las imágenes críticas del ZoomGallery */}
        <link rel="preload" as="image" href="/newhero/img10.webp" />
        <link rel="preload" as="image" href="/images/img1.jpeg" />
        <link rel="preload" as="image" href="/images/img17.jpeg" />
        <link rel="preload" as="image" href={Pic1.src} />
        {/* <link rel="preload" as="image" href={Pic2.src} />
        <link rel="preload" as="image" href={Pic3.src} />
        <link rel="preload" as="image" href={Pic4.src} />
        <link rel="preload" as="image" href={Pic5.src} />
        <link rel="preload" as="image" href={Pic6.src} />
        <link rel="preload" as="image" href={Pic7.src} /> */}
    </Head>
      <div className="w-screen relative">
          {/* <ReactLenis root> */}
            <FlipSection FirstComponent={Test4} SecondComponent={Triptico5} />
            <ZoomGallery />
            <div id="about" className="my-12 md:my-32">
              {/* <Composition4Wrapper /> */}
              <FlipSection3 FirstComponent={Quote2} SecondComponent={Composition4Wrapper}/>
            </div>
            <FlipSection2 FirstComponent={Quote1} SecondComponent={Triptico6}/>
            <div className="my-12 md:my-32">
              <TeamWrapper />
            </div>
            <Composition3 />
              <FlipSection3 FirstComponent={AlmodovarQuoteNew} SecondComponent={AnimatedBoxComponent} />
            <Footer />        
          {/* </ReactLenis> */}
      </div>
    </>
    
  )
}