import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import DashboardLayout from "../common/DashboardLayout";
import ImageUpload from "../components/ImageUpload";

const AddWebinar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { Id } = useParams();

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    content: "",
    webnair_date: "",
    webnair_time: "",
    webniar_end_time: "",
    place: "",
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
      const response = await main.WebniargetId(Id);
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
        ? await main.Webniarupdate(payload)
        : await main.WebniarAdd(payload);

      if (response?.data) {
        navigate("/admin/webniar-list")
        toast.success(response.data.message || "Operation successful");
        if (!Id) {
          setCourseDetails({
            title: "",
            content: "",
            video: "",
            webinar_date: "",
            place: ""
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
      <div className="main-wrapper data-maanage">
        <div className="card shadow ">
          <div className="card-header text-white" style={{ backgroundColor: '#ff875a' }}>
            <h3>{Id ? "Edit Webniar" : "Add Webniar"}</h3>
          </div>

          <div className="card-body">
            <form onSubmit={handleSubmit}>

              <div className="mb-3">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-control cursor-pointer"
                  name="webnair_date"
                  placeholder="Enter webinar date"
                  value={courseDetails.webnair_date || new Date().toISOString().split('T')[0]}
                  onChange={handleInputChange}
                  required
                  min={new Date().toISOString().split('T')[0]} // Prevent past dates
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                />

              </div>

              <div className="mb-3">
                <label className="form-label">Webinar Start Time</label>
                <input
                  type="time"
                  className="form-control cursor-pointer"
                  name="webnair_time"
                  placeholder="Enter webinar time"
                  value={courseDetails.webnair_time}
                  onChange={handleInputChange}
                  required
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Webinar End Time</label>
                <input
                  type="time"
                  className="form-control cursor-pointer"
                  name="webniar_end_time"
                  placeholder="Enter webinar end time"
                  value={courseDetails.webniar_end_time}
                  onChange={handleInputChange}
                  required
                  onClick={(e) => e.target.showPicker && e.target.showPicker()}
                />
              </div>


              {/* Course Title */}
              <div className="mb-3">
                <label className="form-label">Webniar  Title</label>
                <input
                  type="text"
                  className="form-control cursor-pointer"
                  name="title"
                  value={courseDetails.title}
                  onChange={handleInputChange}
                  placeholder="Enter  webniar title"
                  required
                />
              </div>


              <div className="mb-3">
                <label className="form-label">Webniar  Content</label>
                <textarea
                  type="text"
                  className="form-control cursor-pointer"
                  name="content"
                  value={courseDetails.content}
                  onChange={handleInputChange}
                  placeholder="Enter  webniar content"
                  required
                  rows={4}
                />
              </div>
              {/* Description */}

              <div className="mb-3">
                <label className="form-label">Webniar  Video Thumbnail</label>
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
                <label className="form-label">Webniar  Video</label>
                <input
                  type="text"
                  className="form-control cursor-pointer"
                  name="video"
                  placeholder="Enter webniar links"
                  value={courseDetails.video}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Webniar Place</label>
                <input
                  type="text"
                  className="form-control cursor-pointer"
                  name="place"
                  placeholder="Enter webniar Palace"
                  value={courseDetails.place}
                  onChange={handleInputChange}
                  required
                />
              </div>


              {/* Submit Button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="login-head button"
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
      </div>
    </DashboardLayout>


  );
};
export default AddWebinar;
