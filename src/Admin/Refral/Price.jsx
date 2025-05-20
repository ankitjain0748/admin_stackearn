import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";

const PricePercentageForm = () => {
  const [listing, setListing] = useState("");
  const [formData, setFormData] = useState({
    price: "",
    percentage: "",
  });
  const [loading, setLoading] = useState(false);

  const PaymentLisitng = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.Adminprofile();
      const data = response?.data?.data;
      setListing(data);
      setFormData({
        price: data?.adminUser?.ActiveUserPrice || "",
        percentage: data?.adminUser?.InActiveUserPercanetage || "",
      });
      localStorage && localStorage.setItem("percntage" , data?.adminUser?.InActiveUserPercanetage)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    PaymentLisitng();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from navigating to another URL

    if (loading) return;

    setLoading(true);
    const main = new Listing();

    try {
      const response = await main.userRefralmanagement({
        price: formData.price,
        percentage: Number(formData.percentage),
      });

      if (response?.data) {
        toast.success(response.data.message || "Operation successful");
        PaymentLisitng();
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
    <div className="container mt-5">


      <h2 className="mb-5 ">Active User Management</h2>

      <div className="col-xl-12 col-lg-12">
        {/* Dashboard Grid */}
        <div className="row justify-content-center">
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card dash-info flex-fill">
              <div className="card-body">
                <h5> Active User</h5>
                <h2>{listing?.activeCount || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card dash-info flex-fill">
              <div className="card-body">
                <h5>InActive User</h5>
                <h2>{listing?.inactiveCount || 0}</h2>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-6 d-flex">
            <div className="card dash-info flex-fill">
              <div className="card-body">
                <h5>Total User</h5>
                <h2>{listing?.inactiveCount + listing?.activeCount || 0}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="row align-items-end">

          {/* Price Field */}
          <div className="col-md-4 mb-3">
            <label htmlFor="price" className="form-label">
              Active User Price
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Enter price"
              required
              min="0"

            />
          </div>
          {/* Percentage Field */}
          <div className="col-md-4 mb-3">
            <label htmlFor="percentage" className="form-label">
              InActive User Percentage
            </label>
            <input
              type="number"
              className="form-control"
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              placeholder="Enter percentage"
              required
              min="0"
              max="100"
            />
          </div>

          {/* Submit Button */}
          <div className="col-md-4 mb-3 d-flex align-items-end">
            <button
              type="submit"
              className="login-head button  w-100"
              disabled={loading}
            >
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PricePercentageForm;
