import React, { useEffect, useState } from "react";
import StudentSidebar from "../sidebar";
import { Link } from "react-router-dom";
import Listing from "../Api/Listing";
import LoadingPage from "../components/LoadingPage";
import Email from "./Email";

const Support = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const ContactList = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.ContactEmail();
      setListing(response?.data?.data?.contactget);
      setLoading(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    ContactList();
  }, []);

  const handleCheckboxChange = (id) => {
    if (selectedUsers.includes(id)) {
      setSelectedUsers(selectedUsers.filter((userId) => userId !== id));
    } else {
      setSelectedUsers([...selectedUsers, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]); // Deselect all
    } else {
      setSelectedUsers(listing.map((user) => user._id)); // Select all user IDs
    }
    setSelectAll(!selectAll);
  };

  useEffect(() => {
    // Sync the "Select All" checkbox with the selected rows
    if (selectedUsers.length === listing.length && listing.length > 0) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedUsers, listing]);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <div className="main-wrapper">
          <div className="page-content mt-5">
            <div className="container">
              <div className="row">
                <StudentSidebar />
                <div className="col-xl-9 col-lg-9">
                  <div className="settings-widget card-details">
                    <div className="settings-menu p-0">
                      <div className="profile-heading">
                        <h3>Supports </h3>
                      </div>
                      <Email />
                      <div className="checkout-form">
                        <div className="tab-content">
                          <div className="tab-pane show active" id="today">
                            <div className="table-responsive custom-table">
                              <table className="table table-nowrap mb-0">
                                <thead>
                                  <tr>
                                    <th className="text-left align-middle">
                                      <input
                                        type="checkbox"
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                      />{" "}
                                      Select All
                                    </th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Page</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {listing &&
                                    listing.map((user, index) => (
                                      <tr key={index}>
                                        <td>
                                          <input
                                            type="checkbox"
                                            checked={selectedUsers.includes(user._id)}
                                            onChange={() =>
                                              handleCheckboxChange(user._id)
                                            }
                                          />
                                        </td>
                                        <td>{user?.name}</td>
                                        <td>{user?.email}</td>
                                        <td>
                                          {user?.role}
                                        </td>
                                      </tr>
                                    ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="dash-pagination">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <p>Page 1 of 2</p>
                      </div>
                      <div className="col-6">
                        <ul className="pagination">
                          <li className="active">
                            <Link to="#">1</Link>
                          </li>
                          <li>
                            <Link to="#">2</Link>
                          </li>
                          <li>
                            <Link to="#">
                              <i className="bx bx-chevron-right" />
                            </Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Support;
