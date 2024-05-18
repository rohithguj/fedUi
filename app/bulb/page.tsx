"use client";
import useAppStore from "../UseAppStore";

const Bulb = () => {
  
    const [backgroundColor] = useAppStore((s) => s.color);

  return (
    <div className="w-100 h-100 rounded-full flex justify-center items-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        className="w-50 h-50 rounded-full  shadow-inner"
        style={{ backgroundColor }}
      >HI Hello</div>
    </div>
  );
};

export default Bulb;
