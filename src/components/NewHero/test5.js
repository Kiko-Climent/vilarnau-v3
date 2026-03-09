export default function Test5() {
  return (
    <div className="flex w-screen h-screen text-black overflow-hidden tracking-widest">
      {/* Mitad izquierda: imagen a pantalla completa */}
      <div className="w-1/2 h-full">
        <img
          src="/newhero/img10.webp"
          alt="Left side"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Mitad derecha: composición tipográfica */}
      <div className="relative w-1/2 h-full flex items-center justify-center">
        {/* Imagen central dentro del lado derecho */}
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/newhero/img10.webp"
            alt="Centered"
            className="object-cover w-[60%] aspect-[3/4]"
          />
        </div>

        {/* Superior derecha */}
        <div className="absolute top-0 right-0 flex flex-col items-end">
          <h1 className="text-8xl">salon</h1>
          <h1 className="text-8xl origin-right rotate-90 translate-y-[calc(100%-0.2em)]">
            vilarnau
          </h1>
        </div>

        {/* Inferior izquierda */}
        <div className="absolute bottom-0 left-2 flex flex-col items-start">
          <h1 className="text-8xl font-bold origin-left -rotate-90 translate-x-[calc(100%-0.2em)]">
            manteuffelstr.55
          </h1>
          <h1 className="text-8xl font-bold">(030) 61202363</h1>
        </div>
      </div>
    </div>
  );
}
