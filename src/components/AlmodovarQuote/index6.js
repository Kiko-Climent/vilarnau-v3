"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import TextAnimation from "../Tools";


const AlmodovarQuoteNew = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    let ctx;
    const runAnimation = async () => {
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      gsap.registerPlugin(ScrollTrigger);

      const section = sectionRef.current;
      if (!section) return;

      const images = section.querySelectorAll(".reveal-img");

      ctx = gsap.context(() => {
        gsap.set(images, {
          clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        });

        gsap.to(images, {
          clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.25,
          scrollTrigger: {
            trigger: section,
            start: "top 25%",
            toggleActions: "play none none reverse",
          },
        });
      }, section);
    };

    runAnimation();

    return () => ctx && ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} 
    className="relative h-screen w-screen flex flex-col justify-center items-start overflow-hidden gap-2 pl-2 md:pl-60 bg-white">
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%]">
        <img src="/images/Vilarnau_analog_04.jpg"
        className="reveal-img object-cover w-full h-full"/>
      </div>
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%] ">
        <img src="/images/Vilarnau_analog_06.jpg"
        className="reveal-img object-cover w-full h-full "/>
        <TextAnimation>
          <div className="absolute bottom-[39%] md:bottom-[35%] left-[2%] md:left-[11%] w-screen md:w-[55%] mix-blend-difference ">
            <p className="text-gray-300 pr-2 md:pr-0 text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5 ">
            &quot;well, as i was saying it costs a lot to be authentic, madam
            And one can&apos;t be stingy with these things,
            because you are more authentic the more you
            resemble what you&apos;ve dreamed you are&quot;
            </p>
          </div>
        </TextAnimation>
      </div>
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%]">
        <img src="/images/Vilarnau_analog_13.jpg"
        className="reveal-img object-cover w-full h-full"/>
      </div>
    </div>
  )
}

export default AlmodovarQuoteNew;