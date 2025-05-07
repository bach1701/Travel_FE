import { useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

interface NotificationProps {
  type: "success" | "error";
  message: string;
  description?: string;
  duration?: number;
  onClose?: () => void;
}

const ModelNotification: React.FC<NotificationProps> = ({
  type,
  message,
  description,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!isVisible) return null;

  const isSuccess = type === "success";
  const iconColor = isSuccess ? "text-green-500" : "text-red-500";
  const textColor = isSuccess ? "text-green-700" : "text-red-700";
  const bgColor = isSuccess ? "bg-green-100" : "bg-red-100";
  const borderColor = isSuccess ? "border-green-300" : "border-red-300";

  return (
    <div
      className={`fixed top-4 right-4 w-80 p-4 ${bgColor} border ${borderColor} border-solid rounded-md shadow-lg z-50`}
    >
      <div className="flex justify-between items-center mb-2">
        {isSuccess ? (
          <FaCheckCircle className={`text-2xl ${iconColor}`} />
        ) : (
          <FaTimesCircle className={`text-2xl ${iconColor}`} />
        )}
        <button
          onClick={handleClose}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <FaTimesCircle className="text-lg"></FaTimesCircle>
        </button>
      </div>
      <p className={`font-semibold ${textColor}`}>{message}</p>
      {description && <p className={`text-sm ${textColor}`}>{description}</p>}
    </div>
  );
};

export default ModelNotification;
