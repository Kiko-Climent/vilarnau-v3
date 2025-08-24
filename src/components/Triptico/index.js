"use client";

import styles from "./styles.module.scss"
import Picture1 from "../../../public/images/img2.jpeg"
import Picture2 from "../../../public/images/img3.jpeg"
import Picture3 from "../../../public/images/img5.jpeg"
import Image from "next/image";



const Triptico = () => {
  const images = [Picture1, Picture2, Picture3];
  return(
    <div className={styles.container}>

            <div className={styles.body}>
                <h1>vilarnau</h1>
                <h1>salon</h1>
            </div>
            <div className={styles.images}>
                {
                    images.map( (image, i) => {
                        return <div key={`i_${i}`} className={styles.imageContainer}>
                            <Image 
                                src={image}
                                placeholder="blur"
                                alt="image"
                                fill
                            />
                        </div>
                    })
                }
            </div>
        </div>
  )
}

export default Triptico;