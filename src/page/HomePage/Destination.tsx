import north from "../../assets/image/home/destination/mapileng.jpg";
import central from "../../assets/image/home/destination/phu-yen.webp";
import south from "../../assets/image/home/destination/mt3.webp";
import { FaArrowRight } from "react-icons/fa";

const Destination = () => {
  const destinations = [
    {
      loca: "Nothern Vietnam",
      img: north,
      des_vn:
        "Miền Bắc nổi bật với núi non trùng điệp và cảnh sắc thiên nhiên hùng vĩ. Một hành trình lý tưởng cho những ai yêu khám phá thiên nhiên và hoài cổ.",
      des_eng:
        "The North is famous for its majestic mountains and natural scenery. An ideal journey for those who love exploring nature and nostalgia.",
    },
    {
      loca: "The central of Vietnam",
      img: central,
      des_vn:
        "Miền Trung gây ấn tượng với đường bờ biển dài, nắng vàng, làn nước trong xanh. Đây là điểm đến lý tưởng cho những kỳ nghỉ thư giãn đầy cảm hứng.",
      des_eng:
        "The Central region impresses with its long coastline, golden sunshine, and clear blue water. This is an ideal destination for inspiring, relaxing vacations.",
    },
    {
      loca: "Southern Vietnam",
      img: south,
      des_vn:
        "Miền Nam mang đậm bản sắc sông nước với những khu chợ nổi và hệ thống kênh rạch đặc trưng. Cuộc sống nơi đây gần gũi và hiếu khách nên phù hợp cho những chuyển đi tìm hiểu cuộc con người",
      des_eng:
        "The South has a strong river identity with floating markets and a typical canal system. Life here is close and hospitable, so it is suitable for trips to explore human life.",
    },
  ];
  return (
    <div className="text-center mt-24 mb-12 pb-24">
      <h2 className="pb-4 font-bold">Destination</h2>
      <h4 className="pb-8">
        Each region has its own unique characteristics. Let's explore now!
      </h4>
      <div className="flex gap-8 px-36">
        {destinations.map((destination, index) => (
          <div className="flex-1 bg-white p-3" key={index}>
            <img src={destination.img}></img>
            <h3 className="px-8 pt-4 pb-4 font-bold">{destination.loca}</h3>
            <p className="text-left px-8 pb-4">{destination.des_eng}</p>
            <div className="flex items-center justify-start px-8 pb-4">
              <p
                className="text-primary uppercase font-bold"
                style={{ fontSize: "14px", marginRight: "10px" }}
              >
                See more
              </p>
              <FaArrowRight style={{ color: "#FF6A00", fontSize: "20px" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Destination;
