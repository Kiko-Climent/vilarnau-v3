import AnimatedImageBox from "../Tools/AnimatedImageBox";

const AlmodovarQuote2 = () => {
  return(
    <div className="w-screen min-h-screen flex flex-col tracking-wider uppercase font-myfont2 justify-center text-justify text-5xl px-2">
      <div className="flex flex-col">
        {/* <p className="flex"></p> */}
        <p className="flex">"well, as i was saying it costs a lot to be authentic, madam.</p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex w-full aspect-[3/4]">
          <AnimatedImageBox />
        </div>
        <div className="flex flex-col">
          {/* <p>the more you</p> */}
          <p className="">And one can't be stingy with these things, </p>
          <p className="text-9xl leading-[6.5rem]">because you are more authentic the more you resemble what you've dreamed </p>
          {/* <p>you've dreamd</p> */}
        </div>
      </div>
      <div className="flex">
        <p className="text-9xl">you are."</p>
        <p className="text-4xl self-center pt-12">- Agrado from "Todo Sobre Mi Madre”</p>
      </div>
    </div>
  )
}

export default AlmodovarQuote2;