import Hero10 from "@/components/Hero/index10";
import Hero9 from "@/components/Hero/index9";
import Triptico3 from "@/components/Triptico/index3";
import Triptico4 from "@/components/Triptico/index4";
import FlipSection from "@/components/FlipSections";
import ZoomGallery from "@/components/ZoomGallery";
import QuoteAndImage2 from "@/components/QuoteAndImage/index2";
import QuoteAndImage3 from "@/components/QuoteAndImage/index3";
import FlipSection2 from "@/components/FlipSections/index2";
import Footer from "@/components/Sticky_Footer/footer";
import Hero11 from "@/components/Hero/index11";
import TextWrapper from "@/components/TextWrapper";
import StickyPics from "@/components/StickyPics";
import Test3 from "@/components/NewHero/text3";
import Triptico5 from "@/components/Triptico/index5";
import Composition3 from "@/components/Composition/index3";

export default function About() {
  return(
    <div className="w-screen min-h-screen relative">
      <FlipSection FirstComponent={Test3} SecondComponent={Triptico5} />
      <ZoomGallery />
      {/* <FlipSection2 FirstComponent={QuoteAndImage2} SecondComponent={QuoteAndImage3} /> */}
      <TextWrapper />
      <Composition3 />
      {/* <StickyPics /> */}
      <Footer />
      {/* <QuoteAndImage2 />
      <QuoteAndImage3 /> */}
    </div>
  )
}