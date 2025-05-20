import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Listing from "../Api/Listing";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import toast from "react-hot-toast";
import DashboardLayout from "../common/DashboardLayout";
import ImageUpload from "../components/ImageUpload";


const Courses = () => {
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
      setListing(response?.data?.data?.Courseget
      );
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

  const navigate = useNavigate();
  const [lectures, setLectures] = useState([
    { title: "", subtitles: [{ subtitle: "", subcontent: "", videoLink: "", thumbnail: "" }] },
  ]);



  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const fetchCourseData = async (courseId) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.CourseGetId(courseId); // API call with selected course ID
      if (response?.data?.data) {
        setLectures(response.data.data?.lectures);
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

  // Handle course selection
  const handleCourseChange = (e) => {
    const courseId = e.target.value;
    setSelectedCourseId(courseId);
    fetchCourseData(courseId); // Call API with the selected course ID
  };



  // const addLecture = () => {
  //   setLectures((prevLectures) => [
  //     ...prevLectures,
  //     { title: "", subtitles: [{ subtitle: "", videoLink: "", suncontent: "" }] },
  //   ]);
  // };

  const addLecture = () => {
    setLectures((prevLectures) => [
      { title: "", subtitles: [{ subtitle: "", videoLink: "", subcontent: "", thumbnail: "" }] },
      ...prevLectures,
    ]);
  };

  const removeLecture = (lectureIndex) => {
    setLectures((prevLectures) =>
      prevLectures.filter((_, index) => index !== lectureIndex)
    );
  };

  const handleLectureChange = (index, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[index][field] = value;
    setLectures(updatedLectures);
  };



  const addSubtitle = (lectureIndex) => {
    const updatedLectures = [...lectures];
    updatedLectures[lectureIndex]?.subtitles?.unshift({ subtitle: "", videoLink: "", subcontent: "", thumbnail: "" });
    setLectures(updatedLectures);
  };

  const removeSubtitle = (lectureIndex, subtitleIndex) => {
    const updatedLectures = [...lectures];
    updatedLectures[lectureIndex].subtitles.splice(subtitleIndex, 1);
    setLectures(updatedLectures);
  };

  const handleSubtitleChange = (lectureIndex, subtitleIndex, field, value) => {
    const updatedLectures = [...lectures];
    updatedLectures[lectureIndex].subtitles[subtitleIndex][field] = value;
    setLectures(updatedLectures);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    const main = new Listing();

    try {
      const payload = { _id: selectedCourseId, lectures: lectures };
      const response = await main.Updatecourse(payload)
      if (response?.data) {
        navigate("/admin/course-content-list")
        toast.success(response.data.message || "Operation successful");
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
      <div className="card shadow">
        <div className="card-header" style={{ backgroundColor: '#ff875a', color: "#ffffff" }}>
          <h3 className="text-white">{"Add Course Content"}</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* Lectures Section */}
            <div className="mb-3">
              <label className="form-label">Course Name </label>
              <select
                value={selectedCourseId || ""}
                onChange={handleCourseChange}
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Course
                </option>
                {listing.map((option) => (
                  <option key={option._id} value={option._id} >
                    {option.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <label className="form-label">Lectures</label>
                <button
                  type="button"
                  className="btn btn-secondary ml-auto mb-3"
                  onClick={addLecture}
                >
                  <MdAdd Size={12} />
                </button>
              </div>
              {lectures?.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="mb-3 border p-3">
                  <div className="mb-2">
                    <label className="form-label">Lecture Title</label>
                  </div>
                  <div className="d-flex align-items-center mb-3 gap-3">
                    <input
                      type="text"
                      className="form-control"
                      value={lecture.title}
                      onChange={(e) =>
                        handleLectureChange(
                          lectureIndex,
                          "title",
                          e.target.value
                        )
                      }
                      placeholder="Enter lecture title"
                      required
                    />
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => removeLecture(lectureIndex)}
                    >
                      <RiSubtractFill Size={12} />
                    </button>

                  </div>
                  {lecture?.subtitles?.map(
                    (subtitle, subtitleIndex) => (
                      <div key={subtitleIndex} className="">
                        <label className="form-label">
                          Subtitle
                        </label>
                        <div className="d-flex align-items-center mb-3 gap-3">
                          <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={() => addSubtitle(lectureIndex)}
                          >
                            <MdAdd Size={12} />
                          </button>
                          <input
                            type="text"
                            className="form-control"
                            value={subtitle.subtitle}
                            onChange={(e) =>
                              handleSubtitleChange(
                                lectureIndex,
                                subtitleIndex,
                                "subtitle",
                                e.target.value
                              )
                            }
                            placeholder="Enter Sub Title"
                            required
                          />


                          <button
                            type="button"
                            className="btn btn-danger "
                            onClick={() =>
                              removeSubtitle(
                                lectureIndex,
                                subtitleIndex
                              )
                            }
                          >
                            <RiSubtractFill Size={12} />
                          </button>
                        </div>

                        <label className="form-label">
                          Video Link
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          value={subtitle.videoLink}
                          onChange={(e) =>
                            handleSubtitleChange(
                              lectureIndex,
                              subtitleIndex,
                              "videoLink",
                              e.target.value
                            )
                          }
                          placeholder="Enter video link"
                        />

                        <label className="form-label">
                          Thumbnail Link
                        </label>
                        <ImageUpload
                          value={subtitle.thumbnail}
                          onImageUpload={(url) =>
                            handleSubtitleChange(lectureIndex, subtitleIndex, "thumbnail", url)
                          }
                        />
                      </div>
                    )
                  )}
                </div>
              ))}
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

export default Courses;
