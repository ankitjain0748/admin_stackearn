import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import LoadingPage from "../components/LoadingPage";
import Listing from "../Api/Listing";
import toast from "react-hot-toast";
import { MdOutlineModeEditOutline } from "react-icons/md";
import PricePercentageForm from "./Price";
import DashboardLayout from "../common/DashboardLayout";

const CourseTable = () => {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");

  const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.courseGet(searchQuery, page, limit);
      setListing(response?.data?.data?.Courseget);
      setTotalPages(response?.data.data.totalPages);
      setCurrentPage(response?.data.data.currentPage);
      setTotalItems(response.data.data.totalUsers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };




  useEffect(() => {
    fetchMarketLists(search, currentPage, 15);
  }, [currentPage]);

  const handleInputChange = (field, value, id) => {
    setListing(prevState =>
      prevState.map(item =>
        item._id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleSubmit = async (item) => {
    if (loading) return;

    setLoading(true);
    const main = new Listing();

    try {
      const response = await main.UpdatePricecourse(item);

      if (response?.data) {
        toast.success(response.data.message || "Operation successful");
        fetchMarketLists(); // Refresh the list after update
      } else {
        toast.error(response?.data?.message || "Unexpected error occurred.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="">
        <div className="settings-widget card-details">
          <div className="settings-menu p-0">
            <div className="profile-heading">
              <h3>Refral History</h3>
            </div>
            <div className="checkout-form">
              {/* Tab Content */}
              {loading ? (
                <LoadingPage />
              ) : (
                <>

                  <div className="tab-content">
                    {/* Today */}
                    <div className="tab-pane show active" id="today">
                      <div className="table-responsive custom-table">
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Course Name</th>
                              <th>Course Price</th>
                              <th>Direct User</th>
                              <th>First User</th>
                              <th>Second User</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listing && listing.length > 0 ? (
                              listing.map((row, index) => (
                                <tr key={index}>
                                  <td>{row.title}</td>
                                  <td>{row.discountPrice}</td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={row.directuser}
                                      onChange={(e) =>
                                        handleInputChange("directuser", e.target.value, row._id)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={row.firstuser}
                                      onChange={(e) =>
                                        handleInputChange("firstuser", e.target.value, row._id)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <input
                                      type="text"
                                      className="form-control"
                                      value={row.seconduser}
                                      onChange={(e) =>
                                        handleInputChange("seconduser", e.target.value, row._id)
                                      }
                                    />
                                  </td>
                                  <td>
                                    <Button
                                      variant="primary"
                                      onClick={() => handleSubmit(row)}
                                    >
                                      <MdOutlineModeEditOutline size={24} />
                                    </Button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="6" className="text-center py-5">
                                  <h4>No Courses Available</h4>
                                  <p>Please check back later or add new courses to display.</p>
                                </td>
                              </tr>
                            )}
                          </tbody>

                        </Table>
                      </div>
                    </div>
                  </div>
                  <PricePercentageForm />

                </>
              )}


              {/* /Tab Content */}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>


  );
};

export default CourseTable;
