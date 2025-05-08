import { FaGlobe, FaLeaf, FaSave, FaUser } from "react-icons/fa";
import bg from "../../assets/image/about/bg-ourvalue.jpg";

const OurValue = () => {
  const ContentOurValue = [
    {
      icon: <FaSave className="bg-white text-primary"></FaSave>,
      title: "Safety First",
      description:
        "We prioritize the safety and well-being of our travelers above all else, with rigorous standards and protocols.",
    },
    {
      icon: <FaUser className="bg-white text-primary"></FaUser>,
      title: "Cultural Respect",
      description:
        "We promote meaningful exchanges that respect and celebrate local traditions and communities.",
    },
    {
      icon: <FaLeaf className="bg-white text-primary"></FaLeaf>,
      title: "Sustainability",
      description:
        "We're committed to minimizing our environmental impact and supporting conservation efforts worldwide.",
    },
    {
      icon: <FaGlobe className="bg-white text-primary"></FaGlobe>,
      title: "Global Perspective",
      description:
        "We believe travel builds bridges between cultures and fosters a more connected, understanding world.",
    },
  ];
  return (
    <div>
      <div className="grid grid-cols-2 gap-4 mt-24 px-24">
        <div>
          <h3 className="font-semibold text-[36px]">Our Values</h3>
          <p className="text-gray-600 text-[20px]">
            At Wanderlust, our values guide everything we do. We believe that
            travel should be transformative, responsible, and accessible to all
            who wish to explore our beautiful world.
          </p>
          <div className="grid grid-rows-4">
            {ContentOurValue.map((item, index) => (
              <div key={index}>
                <div className="flex">
                  {item.icon} <p className="font-semibold">{item.title}</p>
                </div>
                <p className="text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div
          className="text-center rounded-2xl bg-no-repeat bg-center"
          style={{
            backgroundImage: `url(${bg})`,
            width: "50vw",
            height: "100vh",
          }}
        ></div>
      </div>
    </div>
  );
};

export default OurValue;
