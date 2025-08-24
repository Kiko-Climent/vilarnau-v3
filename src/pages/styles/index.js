import PageTransition from "@/components/Layout/PageTransition";
import NewHero from "@/components/NewHero";
import NewHero2 from "@/components/NewHero/index2";
import NewHero3 from "@/components/NewHero/index3";
import Test from "@/components/NewHero/test";
import Test2 from "@/components/NewHero/test2";
import Test3 from "@/components/NewHero/text3";
import StyleSlider from "@/components/Styles";
import StyleSlider2 from "@/components/Styles/index2";
import Triptico5 from "@/components/Triptico/index5";

export default function Styles() {

  // const images = Array.from({ length: 16 }, (_, i) => `/styles/img${i + 1}.jpg`);

  return(
    <PageTransition>
      <div className="relative ">
        {/* <NewHero /> */}
        {/* <NewHero2 /> */}
        <NewHero3 />
        {/* <Test3 /> */}
        {/* <Test2 /> */}
        {/* <Test /> */}
        {/* <StyleSlider2 images={images} id="vilarnau_styles"/> */}

        {/* <StyleSlider /> */}
        {/* <Triptico5 /> */}
      </div>
    </PageTransition>
  )
}