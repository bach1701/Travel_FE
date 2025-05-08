import { FaCompass, FaHeart, FaTasks } from "react-icons/fa";
import bgCoop from "../../assets/image/about/cooparature.svg";

const Cooparature = () => {
  const contentCooparature = [
    {
      icon: <FaTasks size={50} />,
      title: "Our Mission",
      label:
        "To inspire and enable meaningful travel experiences that create connections across cultures and foster a deeper understanding of our world.",
    },
    {
      icon: <FaCompass size={50} />,
      title: "Our Vision",
      label:
        "A world where travel breaks down barriers, broadens perspectives, and brings people together through shared experiences and discovery",
    },
    {
      icon: <FaHeart size={50} />,
      title: "Our Passion",
      label:
        "Creating unforgettable journeys that transform travelers' lives while respecting local communities and protecting the natural environment",
    },
  ];
  return (
    <>
      <div
        className="text-center bg-cover bg-no-repeat bg-center"
        style={{
          backgroundImage: `url(${bgCoop}`,
          width: "100vw",
          height: "80vh",
        }}
      >
        <div className="px-36 grid grid-cols-3 gap-4 h-full items-center justify-items-center text-white">
          {contentCooparature.map((item, index) => (
            <div
              className="bg-white mt-36 text-primary rounded-lg shadow-lg p-6 m-4"
              key={index}
            >
              <div className="grid place-items-center">
                {" "}
                {/* Thêm class này */}
                {item.icon}
              </div>
              <h5 className="font-semibold">{item.title}</h5>
              <p className="text-black">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cooparature;
