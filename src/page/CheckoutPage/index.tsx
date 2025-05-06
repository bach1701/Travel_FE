import CustomRadioButton from "@/components/ui/CustomRadioButton";
import { baseURL } from "@/config/api";
import { Tour, TourDeparture } from "@/types/Tour";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";
import { useParams } from "react-router-dom";
import term from '../../assets/term/dieu_khoan_chung.pdf'
import { BookingRequest, ContactInfo, OrderNote, Passenger } from "@/types/Checkout";
import ModelNotification from "@/components/ModelNotification";

type BookingResponse = {
    messsage: string,
    booking: {
        booking_id: number,
        departure_id: number,
        user_id: number,
        num_adults: number,
        num_children_120_140: number,
        num_children_100_120: number,
        total_price: string,
        booking_status: string,
        special_requests: string,
        booking_date: string,
        tour_title: string,
        departure_date: string,
        departure_location: string
    };
};

type PaymentResponse = {
    message: string;
    paymentUrl: string;
    checkout_id: number;
    transaction_id: string;
};

const CheckoutPage = () => {

    const { id, id_depa } = useParams<{ id: string; id_depa: string }>();

    const [tour, setTour] = useState<Tour | null>(null);
    const [methodPay, setMethodPay] = useState<number | null>(1);
    const [passengerInfos, setPassengerInfos] = useState<Passenger[]>([]);
    const [departure, setDeparture] = useState<TourDeparture | null> (null);
    const [isAgreeTerm, setIsAgreeTerm] = useState(false);
    const [isSuccess, setIsSuccess] = useState<boolean | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [orderNotes, setOrderNotes] = useState<OrderNote>({
        smoking: false,
        vegetarian: false,
        high_floor: false,
        pregnant: false,
        disabled: false,
        invoice_need: false
    });
    
    const [contactInfo, setContactInfo] = useState<ContactInfo>({ 
        fullname: '',
        email: '',
        phone: '',
        address: '',
    });

    const [passengers, setPassengers] = useState({
        adult: 0,
        baby: 0,
        child_120_140: 0,
        child_100_120: 0,
    });

    const [specialRequire, setSpecialRequire] = useState<string>('');

    const [orderNote, setOrderNote] = useState([
        { eng: 'Smoking', vn: 'Hút thuốc', value: false, key: 'smoking' },
        { eng: 'Vegetarian meal', vn: 'Ăn chay', value: false, key: 'vegetarian' },
        { eng: 'High floor room', vn: 'Phòng tầng cao', value: false, key: 'high_floor' },
        { eng: 'Pregnant women', vn: 'Phụ nữ có thai', value: false, key: 'pregnant' },
        { eng: 'People with disabilities', vn: 'Người khuyết tật', value: false, key: 'disabled' },
        { eng: 'Invoice needed', vn: 'Cần hoá đơn', value: false, key: 'invoice_need' },
    ]);

    const handleCheckboxChange = (index: number) => {
        const updatedOrderNote = [...orderNote];
        updatedOrderNote[index].value = !updatedOrderNote[index].value;
        setOrderNote(updatedOrderNote);
    
        setOrderNotes({
        ...orderNotes,
        [updatedOrderNote[index].key]: updatedOrderNote[index].value,
        });
    };

    const handleChangePassenger = (type: keyof typeof passengers, delta: number) => {
        setPassengers((prev) =>({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    const handleMethodPayChange = (newMethodPay: number) => {
        if (methodPay !== newMethodPay) {
            setMethodPay(newMethodPay);
        }
    };

    const passengerTypes = [
        { label: "Adult", key: "adult" },
        { label: "Baby", key: "baby" },
        { label: "Child (120cm-140cm)", key: "child_120_140" },
        { label: "Child (100cm-120cm)", key: "child_100_120" },
    ];

    const renderPassengerForms = () => {  
        
        useEffect(() => {
            const newArray: Passenger[] = [];
          
            passengerTypes.forEach(({ key }) => {
              const count = passengers[key as keyof typeof passengers];
              for (let i = 0; i < count; i++) {
                newArray.push({ fullname: "", gender: "", birthday: "", ticket_type: key as "adult" | "child_120_140" | "child_100_120" | "baby"});
              }
            });

            setPassengerInfos(newArray);
          }, [passengers]);
          
    
        let indexOffset = 0;
    
        return passengerTypes.flatMap(({ label, key }) => {
            const count = passengers[key as keyof typeof passengers];
            return Array.from({ length: count }, (_, index) => {
                const globalIndex = index + indexOffset;
                return (
                        <div key={`${key}-${index}`} className="mb-4">
                            <p className="text-[18px] font-semibold mb-3">
                                {label} - {index + 1}
                            </p>
                            <div className="text-[16px] font-semibold bg-white p-4 border border-black rounded-lg flex flex-col md:flex-row gap-4">
                                <div className="w-full md:w-[50%]">
                                    <p className="mb-2">Full Name<span className="text-primary font-normal"> *</span></p>
                                    <input
                                        className="font-normal border border-black rounded-md w-full h-[50px] px-3"
                                        type="text"
                                        placeholder="Type fullname"
                                        value={passengerInfos[globalIndex]?.fullname || ""}
                                        onChange={(e) => {
                                            const updated = [...passengerInfos];
                                            updated[globalIndex].fullname = e.target.value;
                                            setPassengerInfos(updated);
                                        }}
                                    />
                                </div>
                                <div className="w-full md:w-[20%]">
                                    <p className="mb-2">Gender<span className="text-primary font-normal"> *</span></p>
                                    <select
                                        className="font-normal border border-black rounded-md w-full h-[50px] px-3"
                                        value={passengerInfos[globalIndex]?.gender || ""}
                                        onChange={(e) => {
                                            const updated = [...passengerInfos];
                                            updated[globalIndex].gender = e.target.value;
                                            setPassengerInfos(updated);
                                        }}
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div className="w-full md:w-[30%]">
                                    <p className="mb-2">Birthday<span className="text-primary font-normal"> *</span></p>
                                    <input
                                        type="date"
                                        className="font-normal border border-black rounded-md w-full h-[50px] px-3"
                                        value={passengerInfos[globalIndex]?.birthday || ""}
                                        onChange={(e) => {
                                            const updated = [...passengerInfos];
                                            updated[globalIndex].birthday = e.target.value;
                                            setPassengerInfos(updated);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                );
            }).map((item, i) => {
                if (i === count - 1) indexOffset += count;
                return item;
            });
        });
    };

    const calculateTotalPrice = (): number => {
        if (!tour?.departures?.[0]) return 0; 
        const departure = tour.departures[0];
        return passengerTypes.reduce((total, type) => {
            const count = passengers[type.key as keyof typeof passengers];
    
            let price = 0;
            if (type.key === "adult") {
                price = Number(departure.price_adult);
            } else if (type.key === "child_120_140") {
                price = Number(departure.price_child_120_140);
            } else if (type.key === "child_100_120") {
                price = Number(departure.price_child_100_120);
            } else if (type.key === "baby") {
                price = 0; 
            }
    
            return total + count * price;
        }, 0);
    }; 

    const formatDate = (dateStr: string): string => {
        const date = new Date(dateStr);
        if (isNaN(date.getTime())) return ""; 
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const extractNights = (duration: string): number => {
        const match = duration.match(/(\d+)\s*đêm/);
        if (match) {
          return parseInt(match[1], 10);
        }
        return 0;
    };

    const calculateEndDate = (startDateStr: string, nights: number): string => {
        const startDate = new Date(startDateStr);
        if (isNaN(startDate.getTime())) return ""; 
        startDate.setDate(startDate.getDate() + nights);
        return formatDate(startDate.toISOString().split('T')[0]);
    };

    const formatPrice = (price: number): string => {
        const formattedPrice = price.toLocaleString('vi-VN');
        return `${formattedPrice}`;
    };

    // const handleCofirmCheckout = (): void => {

    // }

    const handleCheckout = async (): Promise<void> => {
        if(!tour) return;
        if(isAgreeTerm === false) {
            alert('Vui lòng đọc Điều khoản chung!');
            return;
        }
        try {
            const token = localStorage.getItem('AccessToken');
            if(!token) {
                alert("Vui lòng đăng nhập để tiếp tục.");
                return;
            }

            const headers = {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            };

            const bookingDataRequest: BookingRequest = {
                departure_id: Number(id_depa), 
                num_adults: passengers.adult,
                num_children_120_140: passengers.child_120_140,
                num_children_100_120: passengers.child_100_120,
                special_requests: specialRequire,
                contact_info: contactInfo,
                passengers: passengerInfos,
                order_notes: orderNotes,
                promotion_id: 0,
            };

            console.log('bookingDataRequest - ', bookingDataRequest);

            const bookingRes = await axios.post<BookingResponse>(`${baseURL}/user/bookings`, bookingDataRequest, { headers });
            setIsSuccess(true);
            const bookingID = bookingRes.data.booking.booking_id;
            let methodPayment = '';

            if (methodPay === 3) {
                methodPayment = 'direct_to_seller';
            }   
            if (methodPay === 1) {
                methodPayment = 'stripe';
            } 
            if (methodPay === 2) {
                methodPayment = 'vnpay';
            } 
            
            console.log('payment - ', methodPayment);

            const paymentRes = await axios.post<PaymentResponse>(`${baseURL}/user/payments`, 
                {
                    booking_id: bookingID,
                    payment_method: methodPayment
                },
                { headers }
            );

            const paymentURL = paymentRes.data.paymentUrl;
            if(paymentURL) window.location.href = paymentURL;
            else alert('Không nhận được đường dẫn thanh toán.');

        }catch (error: any) {
            setIsSuccess(false);
            if (error.response && error.response.data && error.response.data.message) {
                setErrorMessage(error.response.data.message);
              } else {
                setErrorMessage("Đã có lỗi xảy ra. Vui lòng thử lại sau.");
              }
        }
    };

    const handleCloseNotification = () => {
        setIsSuccess(null);
        setErrorMessage(null);
    };

    useEffect(()=>{
        const fetchDetailTour = async() => {
            try {
                const response = await axios.get(`${baseURL}/public/tours/${id}`);
                setTour(response.data);
            }
            catch (err) {
                console.log(err);
            }
        };

        const fetchDeparture = async() => {
            try {
                const response = await axios.get(`${baseURL}/public/departures/${id_depa}`);
                setDeparture(response.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        fetchDeparture();
        fetchDetailTour();
    }, [id, id_depa])

    return (
        <div className="flex flex-col md:flex-row gap-8 px-24 mt-24">
            <div className="w-full md:w-2/3">
                <h2 className="font-semibold mb-4" style={{ fontSize: '40px'}}>Trip Overview</h2>
                <div className="mt-12">
                    <h4 className="text-lg mb-6 font-semibold" style={{ fontSize: '24px'}}>Billing Detail</h4>
                    <div className="w-full bg-white border border-black rounded-lg p-8">
                        <h5 className="font-semibold text-base mb-8 uppercase text-center" style={{ fontSize: '20px'}}>Contact Information</h5>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4"style={{ fontSize: '16px'}} >
                            <div>
                                <p className="mb-1 font-semibold">Full name<span className="text-primary font-normal"> *</span></p>
                                <input 
                                    value={contactInfo.fullname}
                                    onChange={(e) => setContactInfo({ ...contactInfo, fullname: e.target.value })}
                                    type="text"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="Type fullname"
                                />
                            </div>
                            <div>
                                <p className="mb-1 font-semibold">Email<span className="text-primary font-normal"> *</span></p>
                                <input
                                    value={contactInfo.email}
                                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                                    type="email"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="sample@gmail.com"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="mb-1 font-semibold">Phone<span className="text-primary font-normal"> *</span></p>
                                <input
                                    value={contactInfo.phone}
                                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                                    type="text"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="Enter contact phone number"
                                />
                            </div>
                            <div>
                                <p className="mb-1 font-semibold">Address</p>
                                <input
                                    value={contactInfo.address}
                                    onChange={(e) => setContactInfo({ ...contactInfo, address: e.target.value })}
                                    type="text"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="Enter contact address"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <h4 className="text-lg font-semibold mb-6" style={{ fontSize: '24px'}}>Passenger</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Adult", key: "adult" },
                        { label: "Baby", key: "baby" },
                        { label: "Child (120cm-140cm)", key: "child_120_140" },
                        { label: "Child (100cm-120cm)", key: "child_100_120" },
                    ].map(({ label, key }) => (
                        <div
                            key={key}
                            className="bg-white border text-[16px] border-black rounded-lg flex items-center font-semibold justify-between h-[70px] p-4"
                        >
                            <p>{label}</p>
                            <div className="flex items-center gap-2">
                            <button 
                                className="p-1 border border-primary rounded hover:bg-gray-200"
                                onClick={() => handleChangePassenger(key as keyof typeof passengers, -1)}
                            >
                                <FaMinus size={12} className="text-primary"/>
                            </button>
                            <span className="w-6 text-center font-normal text-primary">{passengers[key as keyof typeof passengers]}</span>
                            <button 
                                className="p-1 border border-primary rounded hover:bg-gray-200"
                                onClick={() => handleChangePassenger(key as keyof typeof passengers, 1)}
                                >
                                <FaPlus size={12} className="text-primary"/>
                            </button>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>

                <div className="mt-16">
                    <h4 className="text-lg font-semibold mb-6" style={{ fontSize: '24px'}}>Passenger information</h4>
                    <div>
                        {renderPassengerForms()}
                    </div>
                </div>
                <div className="mt-16">
                    <h4 className="text-lg font-semibold mb-3" style={{ fontSize: '24px'}}>Order Note</h4>
                    <p className="mb-3 text-[16px]">If you have any notes, please tell us!</p>
                    <div className="bg-white p-4 text-[16px] rounded-lg border border-black">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                            {orderNote.map((note, index) => (
                                <label key={index} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={note.value}
                                    onChange={() => handleCheckboxChange(index)}
                                    className="w-4 h-4 border-gray-400 text-primary bg-white rounded focus:ring-primary"
                                />
                                <span>{note.vn}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-4">
                            <textarea
                            value={specialRequire}
                            onChange={(e) => setSpecialRequire(e.target.value)}
                            rows={4}
                            className="w-full border border-gray-400 p-4 h-[150px]"
                            placeholder="Nhập ghi chú khác (nếu có)..."
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-8 text-[16px] bg-white border text-center border-black p-4 rounded-lg mb-8">
                    <p>By clicking the "AGREE" button below, the Customer agrees that these Terms and Conditions will apply. Please read the Terms and Conditions carefully before choosing to use the services of B&P Tours.</p>
                    <div className="flex justify-center">
                        <label className="flex items-center gap-1">
                            <input type="checkbox" onClick={() => setIsAgreeTerm(!isAgreeTerm)} style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                            <span> I have read and agree to the</span>
                            <a className="text-primary" href={term} target="_blank" rel="noopener noreferrer">
                                Payment terms
                            </a>
                        </label>
                    </div>
                </div>
            </div>
            <div className="w-full md:w-1/3 ml-4 md:ml-32 bg-white p-8 border border-primary rounded-lg shadow-xl flex flex-col self-start">
                <div>
                    <p className="uppercase font-semibold text-[20px] mb-4">{tour?.title}</p>
                    <div className="flex items-center">
                        <p className="mr-2">{formatDate(departure?.start_date ?? "")}</p>
                        <FaArrowRight />
                        <p className="ml-2">
                            {calculateEndDate(departure?.start_date ?? "", extractNights(tour?.duration ?? ""))}
                        </p>
                    </div>
                </div>

                <div className="border my-5"></div>

                <div className="w-full space-y-2 text-[16px]">
                    {[
                        { label: "Adult", key: "adult", price: `${departure?.price_adult}` },
                        { label: "Child (120cm-140cm)", key: "child_120_140", price: `${departure?.price_child_120_140}` },
                        { label: "Child (100cm-120cm)", key: "child_100_120", price: `${departure?.price_child_100_120}` },
                        { label: "Baby", key: "baby", price: "0" },
                    ].map(({ label, price, key }) => (
                        <div className="flex justify-between items-center" key={key}>
                        <p className="text-sm">{label}</p>
                        <span className="text-end font-semibold text-sm">
                            {passengers[key as keyof typeof passengers] === 0
                            ? "0 VNĐ"
                            : `${passengers[key as keyof typeof passengers]} x ${formatPrice(Number(price))} VNĐ`
                            }
                        </span>
                        </div>
                    ))}
                </div>

                <div className="border my-5"></div>
                <div className="w-full flex">
                    <input
                        className="w-3/4 border border-primary uppercase p-2"
                        type="text"
                        placeholder="Type COUPON"
                    />
                    <button className="w-1/4 uppercase font-semibold bg-primary text-white p-2">Apply</button>
                </div>
                <div className="border my-5"></div>
                <div className="space-y-4">
                    <CustomRadioButton
                        label="Stripe"
                        value={1}
                        checked={methodPay === 1}
                        onChange={() => handleMethodPayChange(1)}
                    />
                    <CustomRadioButton
                        label="VNPAY"
                        value={2}
                        checked={methodPay === 2}
                        onChange={() => handleMethodPayChange(2)}
                    />
                    <CustomRadioButton
                        label="Tiền mặt"
                        value={3}
                        checked={methodPay === 3}
                        onChange={() => handleMethodPayChange(3)}
                    />
                </div>
                <div className="border my-5"></div>
                <div className="text-primary font-bold flex justify-between text-center items-center">
                    <p>TOTAL:</p>
                    <p style={{ fontSize: '32px' }}>{calculateTotalPrice().toLocaleString()} <span style={{ fontSize: '16px' }}> VNĐ</span></p>
                </div>
                <div className="border my-5"></div>
                <div>
                    <button onClick={handleCheckout} className="uppercase p-4 text-white bg-primary font-bold rounded-lg w-full text-[22px]">Checkout</button>
                </div>

                {isSuccess === true && (
                    <ModelNotification
                    type="success"
                    message="Thành công!"
                    description="Thao tác đã được thực hiện thành công."
                    onClose={handleCloseNotification}
                    />
                )}

                {isSuccess === false && errorMessage && (
                    <ModelNotification
                    type="error"
                    message="Thất bại!"
                    description={errorMessage}
                    onClose={handleCloseNotification}
                    />
                )}
                
            </div>
        </div>
    );
};

export default CheckoutPage;