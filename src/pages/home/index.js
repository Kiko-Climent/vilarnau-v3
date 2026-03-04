"use client";

import Head from "next/head";
import Pic1 from "../../../public/zoomgallery/zoom5.webp";
import FlipSection from "@/components/FlipSections";
import ZoomGallery from "@/components/ZoomGallery";
import Footer from "@/components/Sticky_Footer/footer";
import Triptico5Wrapper from "@/components/Triptico/Triptico5Wrapper"; // 👈 wrapper
import Composition3 from "@/components/Composition/index3";
import Test4 from "@/components/NewHero/test4";
import Composition4Wrapper from "@/components/CompositionWrapper";
import Quote2 from "@/components/Other/index3";
import Triptico6 from "@/components/Triptico/index6";
import Quote1 from "@/components/Other/index2";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import FlipSection2 from "@/components/FlipSections/index2";
import TeamWrapper from "@/components/Team/TeamWrapper";
import FlipSection3 from "@/components/FlipSections/index3";
import AlmodovarQuoteNew from "@/components/AlmodovarQuote/index6";
import AnimatedBoxComponent from "@/components/Other/AnimatedBoxComponent";
import Composition4MobileFlex3 from "@/components/Composition/index11";
import Composition3Mobile from "@/components/Composition/index12";

export default function Home() {
  const [isDesktop, setIsDesktop] = useState(false);
  const router = useRouter();
  const lenis = useLenis();

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    if (router.asPath.includes("#about")) {
      setTimeout(() => {
        lenis?.scrollTo("#about");
      }, 300);
    } else {
      lenis?.scrollTo(0, { immediate: true });
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <link rel="preload" as="image" href="/newhero/img10.webp" />
        <link rel="preload" as="image" href="/images/img1.jpeg" />
        <link rel="preload" as="image" href="/images/img17.jpeg" />
        <link rel="preload" as="image" href="/images/img2.jpg" />    {/* 👈 */}
        <link rel="preload" as="image" href="/images/img4.jpeg" />    {/* 👈 */}
        <link rel="preload" as="image" href={Pic1.src} />
      </Head>
      <div className="w-screen relative">
        <FlipSection FirstComponent={Test4} SecondComponent={Triptico5Wrapper} /> {/* 👈 */}
        <ZoomGallery />
        <div id="about" className="my-12 md:my-32">
        {isDesktop ? (
          <FlipSection3 FirstComponent={Quote2} SecondComponent={Composition4Wrapper} />
        ) : (
          <Composition4MobileFlex3 />
        )}
        </div>
        {isDesktop && (
          <FlipSection2
            FirstComponent={Quote1}
            SecondComponent={Triptico6}
          />
        )}
        <div className="my-12 md:my-32">
          <TeamWrapper />
        </div>
        {isDesktop ? (
          <Composition3 />
        ) : (
          <Composition3Mobile />
        )}
        <FlipSection3 FirstComponent={AlmodovarQuoteNew} SecondComponent={AnimatedBoxComponent} />
          <Footer />
      </div>
    </>
  );
}