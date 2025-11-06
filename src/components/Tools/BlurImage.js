"use client";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlurImage({ src, blurDataURL, alt, scale }) {
  return (
    <motion.div style={{ scale }} className="el-zoom">
      <div className="image-container-zoom">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurDataURL}
          priority={alt === "image-0"}
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
    </motion.div>
  );
}
