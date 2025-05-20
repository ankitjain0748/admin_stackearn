import React from "react";

// Function to return Bootstrap classes for status badges
const getStatusClass = (status) => {
  switch (status?.toLowerCase()) {
    case "success":
      return "completed-status"; // Green for Success
    case "pending":
      return "pending-status"; // Yellow for Pending
    case "active":
      return "completed-status"; // Red for Cancel
      case "inactive":
      return "cancelled-status";
      case "failed":
      return "cancelled-status";
      case "paid":
      return "completed-status";
    default:
      return "upcoming-status"; // Gray for Unknown
  }
};

// Component to display a single row with the status
const EventRow = ({ status }) => {
  return (
    <tr>
      <td className="">
        <span
          style={{ fontSize: '14px'  }}
          className={` rounded px-3 py-2 text-capitalize font-bold ${getStatusClass(status)}`}
        >
          {status}
        </span>
      </td>
    </tr>
  );
};

export default EventRow;
