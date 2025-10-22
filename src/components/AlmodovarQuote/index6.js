const AlmodovarQuoteNew = () => {
  return (
    <div className="relative h-screen w-screen flex flex-col justify-center items-start overflow-hidden gap-2 pl-2 md:pl-60 bg-white">
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%]">
        <img src="/images/Vilarnau_analog_04.jpg"
        className="object-cover w-full h-full"/>
      </div>
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%] ">
        <img src="/images/Vilarnau_analog_06.jpg"
        className="object-cover w-full h-full "/>
        {/* <div className="absolute translate-x-0 md:-translate-x-24 translate-y-36 md:translate-y-52 w-screen md:w-[55%] mix-blend-difference "> */}
        <div className="absolute bottom-[39%] md:bottom-[35%] left-[2%] md:left-[11%] w-screen md:w-[55%] mix-blend-difference ">
          <p className="text-gray-300 pr-2 md:pr-0 text-base md:text-[clamp(0.95rem,2vw,1.45rem)] tracking-wider leading-none md:leading-5 ">
          &quot;well, as i was saying it costs a lot to be authentic, madam
          And one can&apos;t be stingy with these things,
          because you are more authentic the more you
          resemble what you&apos;ve dreamed you are&quot;
          </p>
        </div>
      </div>
      <div className="flex w-[75%] md:w-[38%] h-[22%] md:h-[31%]">
        <img src="/images/Vilarnau_analog_13.jpg"
        className="object-cover w-full h-full"/>
      </div>
    </div>
  )
}

export default AlmodovarQuoteNew;