import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import DashboardLayout from "../common/DashboardLayout";
import ImageUpload from "../components/ImageUpload";

const AddOnlineCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { Id } = useParams();

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    content: "",
    video: "",
    Id: Id,
    thumbnail: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.OnlineGetId(Id);
      if (response?.data?.data) {
        setCourseDetails(response.data.data);
      } else {
        toast.error("Failed to fetch course details.");
      }
    } catch (error) {
      console.error("Error fetching course data:", error);
      toast.error("Unable to load course data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const main = new Listing();

    try {
      const payload = { ...courseDetails };
      const response = Id
        ? await main.Updateonline(payload)
        : await main.CreateOnline(payload);

      if (response?.data) {
        navigate("/admin/online-list")
        toast.success(response.data.message || "Operation successful");
        if (!Id) {
          setCourseDetails({
            title: "",
            content: "",
            video: "",
            thumbnail: ""
          });
        }
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

  useEffect(() => {
    if (Id) fetchCourseData();
  }, [Id]);




  return (
    <DashboardLayout>
      <div className="card shadow">
        <div className="card-header text-white" style={{ backgroundColor: '#ff875a' }}>
          <h3>{Id ? "Edit Online Video" : "Add Online Video"}</h3>
        </div>

        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Course Title */}
            <div className="mb-3">
              <label className="form-label">Course Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={courseDetails.title}
                onChange={handleInputChange}
                placeholder="Enter  video title"
                required
              />
            </div>

            {/* Description */}

            <div className="mb-3">
              <label className="form-label">Online Video Thumbnail</label>
              <ImageUpload
                value={courseDetails.thumbnail}
                onImageUpload={(url) =>
                  setCourseDetails((prevState) => ({
                    ...prevState,
                    thumbnail: url,
                  }))
                }
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Online Video</label>
              <input
                type="text"
                className="form-control"
                name="video"
                placeholder="Enter video links"
                value={courseDetails.video}
                onChange={handleInputChange}
                required
              />
            </div>
            {/* Submit Button */}
            <div className="mt-4">
              <button
                type="submit"
                className="login-head button cursor-pointer"
                disabled={loading}
              >
                {loading
                  ? "Loading..."
                  : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddOnlineCourse;
