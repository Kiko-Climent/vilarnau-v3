import { motion, AnimatePresence } from "framer-motion";

export default function PageTransitionWrapper({ children, route }) {
  const variants = {
    initial: { x: "100%" },   // entra desde la derecha
    animate: { x: 0 },         // posición final
    exit: { x: "-100%" },      // se va a la izquierda
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={route}
        variants={variants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full"
        style={{ transform: "translate3d(0,0,0)" }} // fuerza GPU
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
