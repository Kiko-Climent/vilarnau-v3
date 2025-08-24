"use client";

import About from "@/components/About";
import AppointmentsSection from "@/components/Appointments";
import Hero from "@/components/Hero";
import PageTransition from "@/components/Layout/PageTransition";
import Other1 from "@/components/Other";
import QuoteAndImage from "@/components/QuoteAndImage";
import Footer from "@/components/Sticky_Footer/footer";
import Triptico2 from "@/components/Triptico/index2";
import Triptico3 from "@/components/Triptico/index3";
import { ReactLenis } from "lenis/react"

export default function Home() {
  return(
    <div className="h-[100vh-68px]">
      <PageTransition>
        <ReactLenis root>
          <Hero />
          {/* <Triptico2 /> */}
          {/* <QuoteAndImage /> */}
          <Triptico3 />
          <Other1 />
          <About />
          <AppointmentsSection />
          <Footer />
        </ReactLenis>
      </PageTransition>
    </div>
    
  )
}