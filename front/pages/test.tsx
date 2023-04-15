const test = () => {
  return (
    <div>
      <div className="relative flex h-[300px] w-[100px] items-center justify-center overflow-hidden">
        <div className="absolute left-[50px] top-[150px] h-[400px] w-[10px] origin-top-left animate-spin  bg-red-500"></div>
        <div className="z-10 h-[284px] w-[84px] bg-black"></div>
      </div>
    </div>
  );
};
export default test;
