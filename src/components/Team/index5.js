import TextAnimation from "../Tools"

const TeamMobile3 = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-between bg-white">
      <div className="flex">
        <TextAnimation>
          <p className="text-base text-black tracking-wider leading-none px-1 pt-12">At Salon Vilarnau, every visit is more than an appointment — it’s an experience. 
              Sergi ( 1 ) and Damian ( 2 ) bring warmth, care, and attention to every detail, making you feel instantly at ease. 
              They take the time to understand not just your hair, but your personality and lifestyle, 
              crafting individual styles that enhance your features and reflect who you truly are. 
              With a perfect balance of classic technique and contemporary vision, their cuts and colorings leave you feeling confident, 
              comfortable, and at home in your own skin.
          </p>
        </TextAnimation>
      </div>
      <div className="flex aspect-[3/4] w-7/12 self-start">
        <img src="/images/img4.jpg" 
        className="w-full h-full grayscale object-cover"/>
      </div>
    </div>
  )
}

export default TeamMobile3