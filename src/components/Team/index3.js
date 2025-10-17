import TextAnimation from "../Tools";
import GridRevealImage from "../Tools/GridRevealAnimation";

const TeamMobile = () => {
  return(
    <div className="w-screen h-screen relative bg-[#0f0f0f]">
      <div className="absolute aspect-[3/4] w-3/5 top-[0%] left-[0%]">
        <img src="/images/img4.jpg" 
        className="w-full h-full grayscale object-cover"/>
      </div> 
      <div className="absolute top-[43%] md:top-[10%] right-4 text-white text-base tracking-wider leading-none w-2/3 mix-blend-difference">
        <p>At Salon Vilarnau, Sergi ( 1 ) and Damian ( 2 ) bring warmth, care, and genuine connection to every visit.
        Their calm energy and attention to detail create a space where you can relax, feel understood, and leave refreshed — inside and out..</p>
      </div>     
    </div>
  )
}

export default TeamMobile;