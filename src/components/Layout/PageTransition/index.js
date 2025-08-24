"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

const anim = (variants) => {
    
  return {
    initial: "initial",
    animate: "enter",
    exit: "exit",
    variants
  }
 
}

const routes = {
  "/home": "Home",
  "/about": "About",
  "/styles": "Styles",
  "/prices": "Prices"
}

export default function PageTransition ({children, backgroundColor}) {

  const router = useRouter();
  const [dimensions, setDimensions] = useState({
    height: 0,
    width: 0
  })

  useEffect( () => {
    const resize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }
    resize();
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  const text = {
    initial: {
      opacity: 1
    },
    enter: {
      opacity: 0,
      top: -100,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: "47.5%"
      }
    },
    exit: {
      opacity: 1,
      top: "40%",
      transition: {
        duration: .5,
        delay: 0.4,
        ease: [0.33, 1, 0.68, 1]
      },
    }
  }

  return(
    <div className="page curve" style={backgroundColor}>
      <motion.p {...anim(text)} className="route">{routes[router.route]}</motion.p>
      <div style={{opacity: dimensions.width > 0 ? 0 : 1}} className="background"></div>
      {dimensions.width > 0 && <SVG {...dimensions} />}
      {children}
    </div>
  )
}

const SVG = ({width, height}) => {

  const initialPath = `
        M0 300 
        Q${width/2} 0 ${width} 300
        L${width} ${height + 300}
        Q${width/2} ${height + 600} 0 ${height + 300}
        L0 0
    `
  const targetPath = `
      M0 300
      Q${width/2} 0 ${width} 300
      L${width} ${height}
      Q${width/2} ${height} 0 ${height}
      L0 0
  `
  const curve = {
    initial: {
      d: initialPath
    },
    enter: {
      d:targetPath,
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      }
    },
    exit: {
      d: initialPath,
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      }
    }
  }

  const slide = {
    initial: {
      top: "-300px"
    },
    enter: {
      top: "-100vh",
      transition: {
        duration: .75,
        delay: 0.3,
        ease: [0.76, 0, 0.24, 1]
      },
      transitionEnd: {
        top: "100vh"
      }
    },
    exit: {
      top: "-300px",
      transition: {
        duration: .75,
        ease: [0.76, 0, 0.24, 1]
      },
    }
  }

  return (
    <motion.svg {...anim(slide)}>
      <motion.path {...anim(curve)}></motion.path>
    </motion.svg>
  )
}