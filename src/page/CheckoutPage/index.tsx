import CustomRadioButton from "@/components/ui/CustomRadioButton";
import { useEffect, useState } from "react";
import { FaPlus, FaMinus, FaArrowRight } from "react-icons/fa";

const CheckoutPage = () => {

    const [methodPay, setMethodPay] = useState<number | null>(null);

    const [passengerInfos, setPassengerInfos] = useState<{ fullName: string; gender: string; birthday: string }[]>([]);

    const [passengers, setPassengers] = useState({
        adult: 0,
        baby: 0,
        child_120_140: 0,
        child_100_120: 0,
    });

    const [orderNote, setOrderNote] = useState([
        {
            eng: 'Smoking',
            vn: 'Hút thuốc',
            value: false
        },
        {
            eng: 'Vegetarian meal',
            vn: 'Ăn chay',
            value: false
        },
        {
            eng: 'High floor room',
            vn: 'Phòng tầng cao',
            value: false
        },
        {
            eng: 'Pregnant women',
            vn: 'Phụ nữ có thai',
            value: false
        },
        {
            eng: 'People with disabilities',
            vn: 'Người khuyết tật',
            value: false
        },
        {
            eng: 'Invoice needed',
            vn: 'Cần hoá đơn',
            value: false
        },
    ])

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
    

    // const renderPassengerForms = () => {
    //     const passengerTypes = [
    //         { label: "Adult", key: "adult" },
    //         { label: "Baby", key: "baby" },
    //         { label: "Child (120cm-140cm)", key: "child_120_140" },
    //         { label: "Child (100cm-120cm)", key: "child_100_120" },
    //     ];
    
    //     return passengerTypes.flatMap(({ label, key }) =>
    //         Array.from({ length: passengers[key as keyof typeof passengers] }, (_, index) => (
    //             <div key={`${key}-${index}`} className="mb-4">
    //                 <p className="text-[18px] font-semibold mb-3">{label} - {index + 1}</p>
    //                 <div className="text-[16px] font-semibold bg-white p-4 border border-black rounded-lg flex flex-col md:flex-row gap-4">
    //                     <div className="w-full md:w-[50%]">
    //                         <p className="mb-2">Full Name<span className="text-primary font-normal"> *</span></p>
    //                         <input
    //                             className="font-normal border border-black rounded-md w-full h-[50px] px-3"
    //                             type="text"
    //                             placeholder="Type fullname"
    //                         />
    //                     </div>
    //                     <div className="w-full md:w-[20%]">
    //                         <p className="mb-2">Gender<span className="text-primary font-normal"> *</span></p>
    //                         <select
    //                             className="font-normal border border-black rounded-md w-full h-[50px] px-3"
    //                         >
    //                             <option>Male</option>
    //                             <option>Female</option>
    //                             <option>Other</option>
    //                         </select>
    //                     </div>
    //                     <div className="w-full md:w-[30%]">
    //                         <p className="mb-2">Birthday<span className="text-primary font-normal"> *</span></p>
    //                         <input
    //                             type="date"
    //                             className="font-normal border border-black rounded-md w-full h-[50px] px-3"
    //                         />
    //                     </div>
    //                 </div>
    //             </div>
    //         ))
    //     );
    // };
    

    const renderPassengerForms = () => {
        const passengerTypes = [
            { label: "Adult", key: "adult" },
            { label: "Baby", key: "baby" },
            { label: "Child (120cm-140cm)", key: "child_120_140" },
            { label: "Child (100cm-120cm)", key: "child_100_120" },
        ];
    
        const totalCount = passengerTypes.reduce(
            (sum, type) => sum + passengers[type.key as keyof typeof passengers],
            0
        );
    
        useEffect(() => {
            setPassengerInfos((prev) => {
                const newArray = [...prev];
                while (newArray.length < totalCount) {
                    newArray.push({ fullName: "", gender: "", birthday: "" });
                }
                return newArray.slice(0, totalCount);
            });
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
                                    value={passengerInfos[globalIndex]?.fullName || ""}
                                    onChange={(e) => {
                                        const updated = [...passengerInfos];
                                        updated[globalIndex].fullName = e.target.value;
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

    const handleCheckout: () => void = () => {
        console.log(passengerInfos)
    }
    

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
                                    type="text"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="Type fullname"
                                />
                            </div>
                            <div>
                                <p className="mb-1 font-semibold">Email<span className="text-primary font-normal"> *</span></p>
                                <input
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
                                    type="text"
                                    className="border border-black rounded-md p-2 w-full h-[50px]"
                                    placeholder="Enter contact phone number"
                                />
                            </div>
                            <div>
                                <p className="mb-1 font-semibold">Address</p>
                                <input
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
                                        onChange={() => {
                                        const updatedNotes = [...orderNote];
                                        updatedNotes[index].value = !updatedNotes[index].value;
                                        setOrderNote(updatedNotes);
                                        }}
                                        className="w-4 h-4 border-gray-400 text-primary bg-white rounded focus:ring-primary"
                                    />
                                    <span>{note.vn}</span>
                                </label>
                            ))}
                        </div>
                        <div className="mt-4">
                            <textarea
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
                            <input type="checkbox" style={{ fontSize: '16px', width: '16px', height: '16px' }} />
                            <span> I have read and agree to the</span>
                            <a className="text-primary" href="">Payment terms</a>
                        </label>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-1/3 ml-4 md:ml-32 bg-white p-8 rounded-lg shadow-xl flex flex-col self-start">

                <div>
                    <p className="uppercase font-semibold text-[20px] mb-4">MIỀN TRUNG 4N3Đ | ĐÀ NẴNG – SƠN TRÀ – BÀ NÀ – PHỐ CỔ HỘI AN</p>
                    <div className="flex items-center">
                        <p className="mr-2">27/04/2025</p>
                        <FaArrowRight />
                        <p className="ml-2">30/04/2025</p>
                    </div>
                </div>

                <div className="border my-5"></div>

                <div className="w-full space-y-2 text-[16px]">
                    {[
                        { label: "Adult", key: "adult" },
                        { label: "Child (120cm-140cm)", key: "child_120_140" },
                        { label: "Child (100cm-120cm)", key: "child_100_120" },
                        { label: "Baby", key: "baby" },
                    ].map(({ label, key }) => (
                        <div className="flex justify-between items-center" key={key}>
                            <p className="text-sm">{label}</p>
                            <span className="text-end font-semibold text-sm">{passengers[key as keyof typeof passengers]}  VNĐ </span>
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
                        label="Tiền mặt"
                        value={1}
                        checked={methodPay === 1}
                        onChange={() => handleMethodPayChange(1)}
                    />
                    <CustomRadioButton
                        label="Stripe"
                        value={2}
                        checked={methodPay === 2}
                        onChange={() => handleMethodPayChange(2)}
                    />
                    <CustomRadioButton
                        label="VnPay"
                        value={3}
                        checked={methodPay === 3}
                        onChange={() => handleMethodPayChange(3)}
                    />
                </div>

                <div className="border my-5"></div>

                <div className="text-primary font-bold">
                    <p>TOTAL:</p>
                </div>

                <div className="border my-5"></div>

                <div>
                    <button onClick={handleCheckout} className="uppercase p-4 text-white bg-primary font-bold rounded-lg w-full text-[22px]">Checkout</button>
                </div>
            </div>

        </div>
    );
};

export default CheckoutPage;