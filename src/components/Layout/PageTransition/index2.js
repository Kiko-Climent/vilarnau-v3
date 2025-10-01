import { motion } from "framer-motion";

export default function PageTransition2({ children, route }) {
  return (
    <div className="relative overflow-hidden">
      {/* Contenido real */}
      <motion.div
        key={route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Overlay negro */}
      <motion.div
        key={route + "-overlay"}
        initial={{ clipPath: "inset(0 100% 0 0)" }}   // empieza fuera
        animate={{ clipPath: "inset(0 0% 0 0)" }}     // cubre todo (salida de la página vieja)
        exit={{ clipPath: "inset(0 0 0 100%)" }}      // se abre hacia la derecha (entrada nueva)
        transition={{ duration: 0.8, ease: "easeInOut" }}
        className="absolute top-0 left-0 w-full h-full bg-black z-50 pointer-events-none"
      />
    </div>
  );
}
