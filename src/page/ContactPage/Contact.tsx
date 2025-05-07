import { FaMailBulk, FaPaperPlane, FaPhone } from "react-icons/fa";
import { FaLocationPin } from "react-icons/fa6";
import plane from "../../assets/image/about/plane.svg";

const Contact = () => {
  return (
    <div className="px-24 mb-12 mt-12">
      <h1 className="text-center mb-4 font-semibold">Contact Us</h1>
      <p className="text-center">Contact with Us for Your Any Help</p>
      <div className="flex w-full mt-12">
        <div className="w-2/5 flex flex-col pr-16">
          <img className="rounded-2xl mb-4" src={plane}></img>
          <p className="flex items-center text-[18px] mb-3">
            <FaMailBulk className="text-primary mr-3 text-[18px]"></FaMailBulk>
            travelwithb&p@gmail.com
          </p>
          <p className="flex items-center text-[18px] mb-3">
            <FaLocationPin className="text-primary mr-3 text-[18px]"></FaLocationPin>
            54 Nguyễn Lương Bằng, Đà Nẵng
          </p>
          <p className="flex items-center text-[18px] mb-3">
            <FaPhone className="text-primary mr-3 text-[18px]"></FaPhone> 1900
            10099
          </p>
        </div>
        <div className="w-3/5 text-center border border-black rounded-2xl bg-white p-8">
          <h3 className="text-2xl font-semibold mb-4">Send Your Mail</h3>
          <p className="mb-8 px-12 text-gray-600">
            We offer carefully curated destinations and tours that capture the
            true essence of location, ensuring you experience.
          </p>

          <div className="flex flex-col items-center gap-4">
            <input
              placeholder="Your name"
              type="text"
              className="w-3/4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              placeholder="Email Address"
              type="text"
              className="w-3/4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <input
              placeholder="Phone Number"
              type="text"
              className="w-3/4 px-4 py-2 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Write Your Message"
              className="w-3/4 px-4 py-2 border border-gray-300 rounded-md h-32 resize-none"
            ></textarea>
            <button className="font-bold uppercase bg-primary text-white px-6 py-2 rounded-md flex items-center gap-2">
              Submit <FaPaperPlane />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
