import React from "react";
import User16 from "../../assert/course-02.jpg";
import { useSelector } from "react-redux";

function ProfileIcon() {
  const users = useSelector(state => state.users.users);
  const listing = users?.[0] || "";
  const profile = users?.[1] || "";
  return (
    <div className="user-profile d-flex align-items-center gap-2">
      <img
        src={profile?.profileImage || User16}
        alt="User"
        className="rounded-circle border"
        style={{ width: "40px", height: "40px", objectFit: "cover" }}
      />
      <div className="d-flex flex-column">
        <span className="text-dark fw-semibold">

          {profile?.firstname && profile?.lastname
            ? `${profile.firstname} ${profile.lastname}`
            : listing?.name}
        </span>
        <span className="text-muted" style={{ fontSize: "0.85rem" }}>
          {listing?.email}
        </span>
      </div>
    </div>


  );
}

export default ProfileIcon;