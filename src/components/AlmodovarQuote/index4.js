import TextAnimation from "../Tools";
import AnimatedImageBox from "../Tools/AnimatedImageBox";

const AlmodovarQuote2 = () => {
  return(
    <div className="w-full min-h-screen bg-[#0f0f0f] flex flex-col tracking-wider uppercase font-myfont2 justify-center text-justify text-5xl pl-1 pr-4">
      <div className="flex flex-col">
        {/* <p className="flex"></p> */}
        <TextAnimation>
          <p className="flex bg-white">&quot;well, as i was saying it costs a lot to be authentic,</p>
        </TextAnimation>
      </div>
      <div className="flex flex-row gap-0">
        <div className="flex w-full aspect-[3/4]">
          <AnimatedImageBox />
        </div>
        <div className="flex flex-col">
          {/* <p>the more you</p> */}
          <p className="flex bg-white">And one can&apos;t be stingy with these things, </p>
          <p className="flex text-9xl leading-[6.0rem] text-white">because you are more authentic the more you resemble what you&apos;ve dreamed </p>
          {/* <p>you've dreamd</p> */}
        </div>
      </div>
      <div className="flex">
        <p className="text-9xl bg-white">you are.&quot;</p>
        <p className="text-4xl self-center pt-12 text-white">- Agrado from &quot;Todo Sobre Mi Madre&quot;</p>
      </div>
    </div>
  )
}

export default AlmodovarQuote2;