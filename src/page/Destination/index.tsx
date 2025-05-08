import PageBanner from "@/components/ui/Banner";
import aboutImage from "../../assets/image/banner/bg.svg";
import halong from "../../assets/image/destination/halong.svg";
import north from "../../assets/image/destination/north.svg";
import hcm from "../../assets/image/destination/south.svg";
import beach from "../../assets/image/destination/central.svg";
import halong2 from "../../assets/image/destination/halong.jpg";
import { FaArrowDown, FaArrowRight } from "react-icons/fa";
import hoian from "../../assets/image/destination/center/hoian.jpg";
import hue from "../../assets/image/destination/center/hue.jpg";
import danang from "../../assets/image/destination/center/danang.jpg";
import phuquoc from "../../assets/image/destination/south/phuquoc.jpg";
import hcm2 from "../../assets/image/destination/south/hcm.jpg";
import baria from "../../assets/image/destination/south/vungtau.jpg";
import hanoi from "../../assets/image/destination/north/hn.jpg";
import sapa from "../../assets/image/destination/north/sapa.jpg";
import { useNavigate } from "react-router-dom";

const DestinationPage = () => {
  const destinationNorth = [
    {
      image: hanoi,
      title: "Hanoi Capital",
      location:
        "A thousand-year-old capital where French colonial elegance meets vibrant street life and time less traditions.",
      description: "Discover more...",
    },
    {
      image: halong2,
      title: "Ha Long Bay",
      location:
        "Emerald waters dotted with limestone karsts and isles, creating a dreamlike seascape of unparalledled beauty.",
      description: "Discover more...",
    },
    {
      image: sapa,
      title: "Sa Pa",
      location:
        "Terraced rice fields cascade down the misty mountains where ethnic tribes preserve their ancient ways of life.",
      description: "Discover more...",
    },
  ];

  const destinationCenter = [
    {
      image: hoian,
      title: "Hoi An",
      location:
        "Lantern-lit streets wind through this ancient trading port, where centuries of the cuturel exchange created a living museum.",
      description: "Discover more...",
    },
    {
      image: hue,
      title: "Hue",
      location:
        "The imperial capital resonates with echoes of the Nguyen Dynasty, its monuments and cuisine preserving royal heritage.",
      description: "Discover more...",
    },
    {
      image: danang,
      title: "Da Nang",
      location:
        "Where modern aspirations meet pristine beaches, backed by marble moutains hiding sacred caves and sanctuaries.",
      description: "Discover more...",
    },
  ];

  const destinationSouth = [
    {
      image: phuquoc,
      title: "Phu Quoc Island",
      location:
        "Pristine beaches and lush forests line this island paradise, where traditional fish sauce production meets luxurious beach resorts.",
      description: "Discover more...",
    },
    {
      image: hcm2,
      title: "Ho Chi Minh City",
      location:
        "A metropolis of contrasts where colonial architecture stands alongside sleek skyscrapers, and motorbikes flow like rivers,...",
      description: "Discover more...",
    },
    {
      image: baria,
      title: "Ba Ria Vung Tau",
      location:
        "Terraced rice fields cascade down the misty mountains where ethnic tribes preserve their ancient ways of life.",
      description: "Discover more...",
    },
  ];

  const navigator = useNavigate();

  const handleSearchRegion = (region: Number) => {
    const params = new URLSearchParams();
    params.append("region", region.toString());
    navigator(`/tour?${params.toString()}`);
  };

  return (
    <div>
      <PageBanner
        backgroundImage={aboutImage}
        title="Destination"
        breadcrumb={[
          { href: "/", label: "Home" },
          { href: "/destination", label: "Destination" },
        ]}
      ></PageBanner>
      <div
        className="bg-cover bg-no-repeat bg-center text-center text-white py-12"
        style={{
          backgroundImage: `url(${halong})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <h3 className="text-[60px] font-bold mt-80 pb-16">
          Discovery the Soul of Vietnam
        </h3>
        <p
          className="mb-8 text-[24px]"
          style={{ maxWidth: "950px", margin: "0 auto" }}
        >
          Where mist -shrouded mountains cradle ancient terraced rice fields,
          and time-honored traditions weave through the bustling streets of
          Hanoi and the serene waters of Ha Long Bay.
        </p>
        <div className="justify-center flex mt-12">
          <button className="flex items-center text-[24px] bg-primary border border-white text-white rounded-2xl font-semibold px-4 py-2 mt-4 hover:bg-primary-dark transition duration-300 ease-in-out">
            Begin Your Journey
            <FaArrowDown className="ml-2 font-normal text-[24px]"></FaArrowDown>
          </button>
        </div>
      </div>
      {/* North */}
      <div
        className="bg-cover bg-no-repeat bg-center text-center py-12 text-white"
        style={{
          backgroundImage: `url(${north})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="mt-12">
          <h5 className="mb-8 font-semibold text-[20px]">
            LAND OF MOUNTAINS & HERITAGE
          </h5>
          <h2 className="font-bold mb-8 text-[42px]">Northern Vietnam</h2>
          <p
            className="mb-8 text-[20px]"
            style={{ maxWidth: "750px", margin: "0 auto" }}
          >
            Where mist -shrouded mountains cradle ancient terraced rice fields,
            and time-honored traditions weave through the bustling streets of
            Hanoi and the serene waters of Ha Long Bay.
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-12 px-36 py-12">
            {destinationNorth.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-2xl overflow-hidden bg-white "
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover"
                />
                <div className="px-8 py-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-[24px]">
                    {destination.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium"></span> {destination.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {destination.description}
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark focus:outline-none">
                  <FaArrowRight
                    onClick={() => handleSearchRegion(1)}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSearchRegion(3)}
              className="flex py-2 px-4 text-[24px] font-semibold rounded-xl bg-primary text-white items-center "
            >
              Explore more
              <FaArrowRight className="text-[24px] ml-2"></FaArrowRight>
            </button>
          </div>
        </div>
      </div>
      {/* Center */}
      <div
        className="bg-cover bg-no-repeat bg-center text-center py-12 text-white"
        style={{
          backgroundImage: `url(${beach})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="mt-12">
          <h5 className="mb-8 font-semibold text-[20px]">
            COASTAL PARADISE & IMPERIAL LEGACY
          </h5>
          <h2 className="font-bold mb-8 text-[42px]">Central Vietnam</h2>
          <p
            className="mb-8 text-[20px]"
            style={{ maxWidth: "750px", margin: "0 auto" }}
          >
            Golden beaches stretch beneath ancient citadels, as artisans
            preserve traditions in the colorful streets of Hoi An and royal
            legacies echo through the Imperial City of Hue
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-12 px-36 py-12">
            {destinationCenter.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-2xl overflow-hidden bg-white "
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover"
                />
                <div className="px-8 py-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-[24px]">
                    {destination.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium"></span> {destination.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {destination.description}
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark focus:outline-none">
                  <FaArrowRight
                    onClick={() => handleSearchRegion(2)}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSearchRegion(3)}
              className="flex py-2 px-4 text-[24px] font-semibold rounded-xl bg-primary text-white items-center "
            >
              Explore more
              <FaArrowRight className="text-[24px] ml-2"></FaArrowRight>
            </button>
          </div>
        </div>
      </div>
      {/* South */}
      <div
        className="bg-cover bg-no-repeat bg-center text-center py-12 text-white"
        style={{
          backgroundImage: `url(${hcm})`,
          width: "100vw",
          height: "100vh",
        }}
      >
        <div className="mt-12">
          <h5 className="mb-8 font-semibold text-[20px]">
            VIBRANT CITIES & LUSH DELTAS
          </h5>
          <h2 className="font-bold mb-8 text-[42px]">Southern Vietnam</h2>
          <p
            className="mb-8 text-[20px]"
            style={{ maxWidth: "750px", margin: "0 auto" }}
          >
            Dynamic urban energy flows into the tranquil waters of the Mekong
            Delta, where floating markets and verdant orchards sustain life
            along the river’s winding paths.
          </p>
        </div>
        <div>
          <div className="grid grid-cols-3 gap-12 px-36 py-12">
            {destinationSouth.map((destination, index) => (
              <div
                key={index}
                className="relative rounded-lg shadow-2xl overflow-hidden bg-white "
              >
                <img
                  src={destination.image}
                  alt={destination.title}
                  className="w-full h-64 object-cover"
                />
                <div className="px-8 py-4 text-left">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 text-[24px]">
                    {destination.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    <span className="font-medium"></span> {destination.location}
                  </p>
                  <p className="text-gray-700 text-sm line-clamp-3">
                    {destination.description}
                  </p>
                </div>
                <button className="absolute bottom-4 right-4 bg-primary text-white rounded-full p-2 hover:bg-primary-dark focus:outline-none">
                  <FaArrowRight
                    onClick={() => handleSearchRegion(3)}
                    className="h-5 w-5"
                  />
                </button>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center">
            <button
              onClick={() => handleSearchRegion(3)}
              className="flex py-2 px-4 text-[24px] font-semibold rounded-xl bg-primary text-white items-center "
            >
              Explore more
              <FaArrowRight className="text-[24px] ml-2"></FaArrowRight>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DestinationPage;
