"use client";
import TextAnimation from "../Tools";

const About = () => {
  return(
    <section className="relative w-[100vw] h-[100vh] px-2 py-4 flex flex-col justify-between">
      <TextAnimation>
        <span className="block uppercase font-semibold text-xs flex">Welcome to Salon Vilarnau.</span>
      </TextAnimation>
      <div className="w-[40%] aspect-[3/2] bg-white rounded-lg overflow-hidden my-8 self-center relative">
        <img src="./images/img8.jpg"
        className="object-cover w-full h-full rounded-xl"/>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-5xl tracking-tighter blur-[0.7px] font-semibold">
        <TextAnimation>
          <h2>about</h2>
        </TextAnimation>
        </div>
      </div>
      <div className="header flex">
        <TextAnimation>
          <h1 className="leading-11 font-semibold tracking-tighter text-[3.3rem] blur-[0.6px] indent-[25%]">
            Our philosophy is to deeply understand your wishes, so that we can create individual
            cuts that accentuate your features and style.
            We believe in the power of classic meets contemporary, and customers leaving our salon
            feeling seen, understood, and phenomenal.
            Open in the heart of Berlin-Kreuzberg since 2018. Come say hello.
          </h1>
        </TextAnimation>
      </div>
    </section>
  )
}

export default About;