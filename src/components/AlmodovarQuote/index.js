import GridRevealImage from "../Tools/GridRevealAnimation";

const AlmodovarQuote = () => {
  return(
    <div className="w-screen min-h-screen flex flex-col tracking-wider uppercase font-myfont2 justify-center text-justify text-9xl px-2 leading-[6.5rem]">
      <div className="flex flex-col">
        {/* <p className="flex"></p> */}
        <p className="flex">&quot;because you are</p>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex w-4/5 aspect-[3/4]">
          <GridRevealImage src="/images/img9.jpg"
              className="w-full h-full object-cover"
              alt="img15"/>
        </div>
        <div className="flex flex-col pt-2">
          {/* <p>the more you</p> */}
          <p>more authentic the more you resemble what you&apos;ve dreamed </p>
          {/* <p>you've dreamd</p> */}
        </div>
      </div>
      <div className="flex pt-2">
        <p>you are.&quot;</p>
        <p className="text-3xl self-center pt-12">(P.Almodóvar)</p>
      </div>
    </div>
  )
}

export default AlmodovarQuote;