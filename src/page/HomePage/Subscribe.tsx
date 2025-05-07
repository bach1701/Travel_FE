import subcribeImage from "../../assets/image/home/sub2.png";

const Subscribe = () => {
  return (
    <div
      className="flex items-center justify-center bg-cover bg-center mt-8 relative"
      style={{ backgroundImage: `url(${subcribeImage})`, height: "240px" }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "#040E27",
          opacity: 0.7,
          mixBlendMode: "multiply",
        }}
      ></div>
      <div className="mx-36 px-4 flex relative z-10 w-full">
        <div className="flex-1 mb-4 text-white ml-8">
          <h3>Subscribe Our Newsletter</h3>
          <p className="text-24 pt-1 text-gray-400">
            Subscribe newsletter to get offers and about new places to discover.
          </p>
        </div>
        <div className="flex justify-start items-center flex-1">
          <input
            type="email"
            className="mr-3 p-4"
            placeholder="Enter your email"
            style={{ height: "60px", width: "380px", borderRadius: "8px" }}
          />
          <button
            className="uppercase text-[20px] font-semibold p-2 bg-primary text-white"
            style={{ height: "60px", width: "140px", borderRadius: "8px" }}
          >
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
