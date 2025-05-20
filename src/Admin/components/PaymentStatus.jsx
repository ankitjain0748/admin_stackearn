import React from "react";


// Function to return Bootstrap classes for status badges
const getStatusClass = (status) => {
  switch (status) {
    case "payout":
      return "completed-status"; // Green for Success
    case "Credit":
      return "upcoming-status"; // Yellow for Pending
    case "Debit":
      return "cancelled-status"; // Red for Cancel
    case "inactive":
      return "cancelled-status"; // Green for Success
    case "active":
      return "completed-status"; // Yellow for Pending
    case "registerd":
      return "upcoming-status"; // Red for Cancel
    case "Enrolled":
      return "pending-status"; // Red for Cancel
      case "withdrawal":
        return "cancelled-status"; // Red for Cancel
        case "Add":
          return "upcoming-status";
    default:
      return "upcoming-status"; // Gray for Unknown
  }
};
// Labels for each status

// Component to display a single row with the status
const PaymentStatus = ({ status }) => {
  return (

      <span
        style={{ fontSize: '14px', font:"normal" }}
        className={` rounded px-2 font-normal py-2 text-capitalize ${getStatusClass(status)}`}
      >
        {status}
      </span>

  );
};

export default PaymentStatus;
