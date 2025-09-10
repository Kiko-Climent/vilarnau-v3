"use client";


// import PageTransition from "@/components/Layout/PageTransition";
import { ReactLenis } from "lenis/react";
import FlipSection from "@/components/FlipSections";
import ZoomGallery from "@/components/ZoomGallery";
import Footer from "@/components/Sticky_Footer/footer";
import Triptico5 from "@/components/Triptico/index5";
import Composition3 from "@/components/Composition/index3";
import Test4 from "@/components/NewHero/test4";
import Test3 from "@/components/NewHero/text3";
import Composition4 from "@/components/Composition/index4";
import Composition4Wrapper from "@/components/CompositionWrapper";
import Team from "@/components/Team";
import AlmodovarQuote2 from "@/components/AlmodovarQuote/index2";
import AlmodovarQuoteWrapper from "@/components/AlmodovarQuote/AlmodovarQuoteWrapper";
import TextWrapper4 from "@/components/TextWrapper/index4";
import TextWrapper from "@/components/TextWrapper";
import Triptico6 from "@/components/Triptico/index6";
import Quote1 from "@/components/Other/index2";


export default function Home() {
  
  return(
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
    
  )
}