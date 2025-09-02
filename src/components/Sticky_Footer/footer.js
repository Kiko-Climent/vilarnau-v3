export default function Footer() {
  return (
    <div
      className="relative h-[300px] md:h-[375px] bg-[#0f0f0f]"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed bottom-0 h-[300px] md:h-[375px] w-full flex flex-col justify-between text-white px-2 py-4">
        <div className="flex flex-row justify-between items-start blur-[0.3px]">
          {/* Address */}
          <div className="flex flex-col text-sm md:text-base -space-y-2">
            <h3>address</h3>
            <h3>manteufelstr.55</h3>
            <h3>10247 · berlin</h3>
          </div>
          
          {/* Inquires */}
          <div className="flex flex-col text-sm md:text-base -space-y-2">
            <h3>inquires</h3>
            <h3>hello@vilarnau.com</h3>
          </div>

          {/* Appointments */}
          <div className="flex flex-col text-sm md:text-base -space-y-2 items-end">
            <h3>appointments</h3>
            <h3>(030) 61202363</h3>
          </div>
        </div>

        {/* Salon Name */}
        <div className="flex justify-center items-end ">
          <h1 className="text-[13vw] text-center tracking-wider uppercase whitespace-nowrap font-myfont2">salon vilarnau</h1>
        </div>
      </div>
    </div>
  );
}
