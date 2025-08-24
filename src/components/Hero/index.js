const Hero = () => {
  return(
    <div className="min-h-screen w-screen flex flex-col justify-center items-center gap-2 relative">
      <div className="flex w-[100%] md:w-4/5 lg:w-7/12 relative px-2 md:px-0">
        <img src="/images/img1.jpeg"
        className="w-full min-h-[60vh] aspect-[5/4] object-cover rounded-xl"/>
        <div className="text-white text-xs md:text-base flex flex-col absolute bottom-1 right-4 md:right-2 items-end -space-y-[4px] md:-space-y-[6px]">
          < h2 className="font-semibold blur-[0.5px] tracking-tight">manteufelstr.55</h2>
          < h2 className="font-semibold blur-[0.5px] tracking-tight">10247 · kreuzberg</h2>
        </div>
      </div>
      <div className="flex absolute top-1/2 -translate-y-1/2">
        <h1 className="hero-text text-6xl md:text-5xl text-white font-semibold blur-[0.7px] tracking-tight whitespace-nowrap ">salon vilarnau</h1>
      </div>
    </div>
  )
}
export default Hero;