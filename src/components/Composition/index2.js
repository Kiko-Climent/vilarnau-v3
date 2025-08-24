const Composition2 = () => {
  return(
    <div className="relative min-h-screen w-screen px-2 py-2">
      <div className="absolute top-68 translate-x-1/2 w-[450px] pr-2">
        <p className="text-lg text-right leading-none">
          vilarnau opens <br></br>
          tuesday till friday<br></br>
          from 12am to 8pm,<br></br>
          saturday from 1am<br></br>
          sunday and monday off.<br></br>
          come and say hello.
        </p>
      </div>
      <div className="absolute w-[450px] h-[510px] bottom-2 translate-x-1/2 pr-2">
        <img src="/images/img15.jpeg" className="w-full h-full"/>
      </div>
      <div className="absolute w-[525px] h-[560px] top-2 left-1/2 -translate-x-1/14 pb-2">
        <img src="/images/img10.jpg" className="w-full h-full"/>
      </div>
      <div className="absolute w-[450px] h-[324px] bottom-2 right-2">
        <img src="/images/img2.jpg" className="w-full h-full"/>
      </div>
    </div>
  )
}

export default Composition2