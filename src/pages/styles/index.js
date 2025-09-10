import PageTransition from "@/components/Layout/PageTransition";
import StylesWrapper from "@/components/StylesWrapper";


export default function Styles() {

  // const images = Array.from({ length: 16 }, (_, i) => `/styles/img${i + 1}.jpg`);

  return(
    <PageTransition>
      <div className="relative ">
        <StylesWrapper />
      </div>
    </PageTransition>
  )
}