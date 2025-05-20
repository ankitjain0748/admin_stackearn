import { FaStar } from "react-icons/fa";

const RatingComponent = ({ rating }) => {
  return (
    <span>
      {[...Array(rating)].map((_, index) => (
        <FaStar key={index} className="text-yellow-500" />
      ))}
    </span>
  );
};

export default RatingComponent;
