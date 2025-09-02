const Triptico5 = () => {
  return (
    <div className="w-screen h-screen overflow-hidden bg-white">
      {/* Imagen en esquina superior izquierda */}
      <div className="absolute top-0 right-0 w-10/12 md:w-7/12 h-[75%] aspect-[4/3]">
        <img
          src="/images/img4.jpeg"
          className="w-full h-full object-cover"
          alt="Decorative"
        />
      </div>

      {/* Texto en esquina inferior derecha */}
      <div className="absolute bottom-2 left-2 text-left">
        <p className="text-lg leading-none">
          a place where individuality<br />
          and self expression<br />
          are not just embraced<br />
          but celebrated
        </p>
      </div>
    </div>
  );
};

export default Triptico5;
