import PageTransition from "@/components/Layout/PageTransition";
import StyleSlider8 from "@/components/Styles/index8";


export default function Styles() {

  // const images = Array.from({ length: 16 }, (_, i) => `/styles/img${i + 1}.jpg`);

  return(
    <PageTransition>
      <div className="relative ">
        <StyleSlider8 />
      </div>
    </PageTransition>
  )
}