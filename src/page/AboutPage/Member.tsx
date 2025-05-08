import dev1 from "../../assets/image/about/member/dev1.svg";
import dev2 from "../../assets/image/about/member/dev2.svg";
import designer from "../../assets/image/about/member/designer.svg";

const Member = () => {
  return (
    <div className="text-center">
      <h2 className="font-semibold text-[48px] mb-10 mt-24">
        Our Expert Team Member
      </h2>
      <p className="text-[20px] text-gray-600">
        Our team of passionate travelers and industry experts work tirelessly to
        create exceptional experiences for every Wanderlust adventure.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div
          className="text-center bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${designer})`,
            width: "33vw",
            height: "100vh",
          }}
        ></div>
        <div
          className="text-center bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${dev1})`,
            width: "33vw",
            height: "100vh",
          }}
        ></div>
        <div
          className="text-center bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${dev2})`,
            width: "33vw",
            height: "100vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default Member;
