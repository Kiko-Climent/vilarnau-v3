"use client";
import { useEffect } from "react";
import gsap from "gsap";
import Image from "next/image";

export default function Hero2() {
  useEffect(() => {
    gsap.set(".letter-wrapper", { y: 400 });
    gsap.set(".item-copy-wrapper p", { y: 50 });

    gsap.defaults({ duration: 1, ease: "power3.out" });
    const tl = gsap.timeline({ paused: true, delay: 0.5 });

    tl.to(".letter-wrapper", { y: 0, stagger: 0.1 })
      .to(".header-item-1", { left: "12vw" })
      .to(".header-item-2", { right: "8vw" }, "<")
      .to(".item-main .item-img img", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
      }, "<")
      .to(".header-item-1", { left: 0, scale: 1 })
      .to(".header-item-2", { right: 0, scale: 1 }, "<")
      .to(".item-main .item-img img", { scale: 1 }, "<")
      .to(".item-side .item-img", {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        stagger: 0.1,
      }, "<")
      .to(".header", { bottom: "0" }, "<")
      .to(".item-copy-wrapper p", { y: 0, stagger: 0.05 }, "<")

    tl.play();
  }, []);

  return (
    <div className="container">
      <div className="items">
        <div key="main" className="item-main">
          <div className="item-img">
            <Image src={`/images/img1.jpeg`} alt="" width={400} height={400} />
          </div>
        </div>

      </div>

      <div className="header">
        <div className="header-item header-item-1">
          {"SALON".split("").map((letter, i) => (
            <div key={i} className="letter">
              <div className="letter-wrapper">{letter}</div>
            </div>
          ))}
        </div>
        <div className="header-item header-item-2">
          {"VILARNAU".split("").map((letter, i) => (
            <div key={i} className="letter">
              <div className="letter-wrapper">{letter}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
