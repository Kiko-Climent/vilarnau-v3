import AnimatedImageBox from "../Tools/AnimatedImageBox";

const AnimatedBoxComponent = () => {
  return (
    <div className="w-screen h-[100vh] flex justify-center items-center bg-white">
      <div className="sticky top-8 w-[40vw] max-w-[250px] mt-10">
        <AnimatedImageBox />
      </div>
    </div>
  );
};

export default AnimatedBoxComponent;
