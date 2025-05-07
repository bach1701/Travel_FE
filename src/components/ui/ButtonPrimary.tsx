import { FaPaperPlane } from "react-icons/fa";

interface BookNowButtonProps {
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
}

const BookNowButton = ({
  onClick,
  className = "",
  icon = <FaPaperPlane className="ml-2" />,
  children = "Book now",
  variant = "primary",
  size = "md",
}: BookNowButtonProps) => {
  // Base classes
  const baseClasses =
    "uppercase font-bold rounded-lg flex items-center justify-center transition-all duration-300";

  // Variant classes
  const variantClasses = {
    primary: "bg-primary hover:bg-orange-600 text-white",
    secondary: "bg-blue-500 hover:bg-blue-600 text-white",
    outline:
      "bg-transparent border-2 border-orange-500 hover:bg-orange-500 text-orange-500 hover:text-white",
  };

  // Size classes
  const sizeClasses = {
    sm: "py-1 px-3 text-sm",
    md: "py-2 px-4 text-base",
    lg: "py-3 px-6 text-lg",
  };

  return (
    <div className="flex justify-center mb-2">
      <button
        onClick={onClick}
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      >
        {children}
        {icon}
      </button>
    </div>
  );
};

export default BookNowButton;
