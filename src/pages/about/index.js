import AlmodovarQuoteNew from "@/components/AlmodovarQuote/index6";
import Composition5 from "@/components/Composition/index8";
import FlipSection3 from "@/components/FlipSections/index3";
import Test4 from "@/components/NewHero/test4";
import AnimatedBoxComponent from "@/components/Other/AnimatedBoxComponent";
import Team2 from "@/components/Team/index2";
import TeamMobile from "@/components/Team/index3";
import TeamMobile2 from "@/components/Team/index4";
import TeamMobile3 from "@/components/Team/index5";

export default function About() {
  return(
    <>
      <Composition5 />
      <FlipSection3 FirstComponent={AlmodovarQuoteNew} SecondComponent={AnimatedBoxComponent}/>
    </>
  )
}