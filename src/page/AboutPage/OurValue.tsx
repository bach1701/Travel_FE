import { FaGlobe, FaLeaf, FaSave, FaUser } from "react-icons/fa";
import bg from "../../assets/image/about/bg-ourvalue.jpg";
import methodpay from "../../assets/image/about/methodpay.svg";
const OurValue = () => {
  const ContentOurValue = [
    {
      icon: <FaSave className="bg-white p-1 rounded-lg text-primary"></FaSave>,
      title: "Safety First",
      description:
        "We prioritize the safety and well-being of our travelers above all else, with rigorous standards and protocols.",
    },
    {
      icon: <FaUser className="bg-white p-1 rounded-lg text-primary"></FaUser>,
      title: "Cultural Respect",
      description:
        "We promote meaningful exchanges p-1 rounded-lg that respect and celebrate local traditions and communities.",
    },
    {
      icon: <FaLeaf className="bg-white p-1 rounded-lg text-primary"></FaLeaf>,
      title: "Sustainability",
      description:
        "We're committed to minimizing our environmental impact and supporting conservation efforts worldwide.",
    },
    {
      icon: (
        <FaGlobe className="bg-white p-1 rounded-lg text-primary"></FaGlobe>
      ),
      title: "Global Perspective",
      description:
        "We believe travel builds bridges between cultures and fosters a more connected, understanding world.",
    },
  ];
  return (
    <div id="our-values-section">
      <div className="grid grid-cols-2 gap-10 mt-24 px-24">
        <div>
          <h3 className="font-bold text-[36px]">Our Values</h3>
          <p className="text-gray-600 mt-6 text-[20px]">
            At Wanderlust, our values guide everything we do. We believe that
            travel should be transformative, responsible, and accessible to all
            who wish to explore our beautiful world.
          </p>
          <div className="grid grid-rows-4">
            {ContentOurValue.map((item, index) => (
              <div key={index} className="mt-6">
                <div className="flex items-center text-[30px]">
                  {item.icon}{" "}
                  <p className="font-semibold mb-0 ml-2">{item.title}</p>
                </div>
                <p className="text-gray-500 mt-2 text-[20px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="rounded-2xl bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${bg})`,
          }}
        ></div>
      </div>
      <div
        className="bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${methodpay})`, height: "350px" }}
      ></div>
    </div>
  );
};

export default OurValue;
