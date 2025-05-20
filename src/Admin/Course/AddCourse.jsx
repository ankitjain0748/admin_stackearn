import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { MdAdd } from "react-icons/md";
import { RiSubtractFill } from "react-icons/ri";
import ImageUpload from "../components/ImageUpload";
import ReactQuillEditor from "../common/ReactQuillEditor";
import DashboardLayout from "../common/DashboardLayout";

const AddCourse = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [lectures, setLectures] = useState([]);

  const { Id } = useParams();

  const [courseDetails, setCourseDetails] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPrice: "",
    level: "",
    thumbnail: "",
    courseImage: "",
    duration: "",
    InstrutorId: "",
    Id: Id,
    courseVideo: "",
    sub_content: ""
  });

  const categoryOptions = [
    { value: "web-development", label: "Web Development" },
    { value: "data-science", label: "Data Science" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
  ];

  const levelOptions = [
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourseDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addLecture = () => {
    setLectures((prevLectures) => [
      ...prevLectures,
      { title: "", subtitles: [{ subtitle: "" }] },
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
    updatedLectures[lectureIndex]?.subtitles?.push({ subtitle: "" });
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

  const fetchCourseData = async () => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.CourseGetId(Id);
      if (response?.data?.data) {
        setCourseDetails(response.data.data);
        if (response.data.data.lectureFiles) {
          setLectures(response.data.data.lectureFiles);
        }
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
      const payload = { ...courseDetails, lectureFiles: lectures };
      const response = Id
        ? await main.Updatecourse(payload)
        : await main.CreateCourse(payload);

      if (response?.data) {
        navigate("/admin/course-list")
        toast.success(response.data.message || "Operation successful");
        if (!Id) {
          setCourseDetails({
            title: "",
            description: "",
            category: "",
            price: "",
            discountPrice: "",
            level: "",
            courseImage: "",
            duration: "",
            courseVideo: "",
            sub_content: "",
            thumbnail: ""
          });
          setLectures([]);
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


  const [insturor, setinstrutor] = useState([]);


  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");

  const fetchMarketLists = async (searchQuery = "", page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.InstrutorGet(searchQuery, page, limit);
      setinstrutor(response?.data?.data?.Instructorget || []);
      setTotalPages(response?.data?.data?.totalPages || 1);
      setCurrentPage(response?.data?.data?.currentPage || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketLists(search, currentPage, 15);
  }, [currentPage]);




  // Handle rich-text input
  const handleBioChange = (value) => {
    setCourseDetails((prevState) => ({
      ...prevState,
      description: value, // Save the rich-text content
    }));
  };

  return (
    <DashboardLayout>
      <div className="card shadow">
        <div className="card-header" style={{ backgroundColor: '#ff875a', color: "#ffffff" }}>
          <h3>{Id ? "Edit Course" : "Add Course"}</h3>
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
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Course Short Description</label>
              <textarea
                className="form-control"  // Bootstrap class for styling
                required
                name="sub_content"
                value={courseDetails.sub_content}
                onChange={handleInputChange}
                placeholder="Enter course short content"
                rows="6"  // Adjust height
              >
              </textarea>

            </div>
            {/* Description */}
            <div className="mb-3">

              <ReactQuillEditor
                desc={courseDetails.description}
                handleBioChange={handleBioChange}
              />

            </div>

            {/* Category */}
            <div className="mb-3">
              <label className="form-label">Category</label>
              <select
                value={courseDetails?.category || ""}
                onChange={(e) =>
                  setCourseDetails((prevState) => ({
                    ...prevState,
                    category: e.target.value,
                  }))
                }
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select category
                </option>
                {categoryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Level */}
            <div className="mb-3">
              <label className="form-label">Level</label>
              <select
                value={courseDetails?.level || ""}
                onChange={(e) =>
                  setCourseDetails((prevState) => ({
                    ...prevState,
                    level: e.target.value,
                  }))
                }
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select level
                </option>
                {levelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>


            <div className="mb-3">
              <label className="form-label">Instructor </label>
              <select
                value={courseDetails?.InstrutorId || ""}
                onChange={(e) =>
                  setCourseDetails((prevState) => ({
                    ...prevState,
                    InstrutorId: e.target.value,
                  }))
                }
                className="form-select"
                required
              >
                <option value="" disabled>
                  Select Instrutor
                </option>
                {insturor.map((option) => (
                  <option key={option._id} value={option._id} >
                    {option.firstName} {option?.lastName}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div className="mb-3">
              <label className="form-label">Base Price</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={courseDetails.price}
                onChange={handleInputChange}
                placeholder="Enter course price"
                required
              />
            </div>

            {/* Discount Price */}
            <div className="mb-3">
              <label className="form-label">Sale Price</label>
              <input
                type="number"
                className="form-control"
                name="discountPrice"
                value={courseDetails.discountPrice}
                onChange={handleInputChange}
                placeholder="Enter Sale price"
              />
            </div>

            {/* Lectures Section */}
            <div className="mb-3">
              <div className="d-flex justify-content-between align-items-center mt-3">
                <label className="form-label">Lectures</label>
                <button
                  type="button"
                  className="btn btn-secondary ml-auto mb-3"
                  onClick={addLecture}
                >
                  <MdAdd size={12} />
                </button>
              </div>

              {lectures?.map((lecture, lectureIndex) => (
                <div key={lectureIndex} className="mb-3 border p-3">
                  <label className="form-label">Lecture Title</label>
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
                      <RiSubtractFill size={24} />
                    </button>
                  </div>
                  <label className="form-label">
                    Subtitle
                  </label>
                  {lecture?.subtitles?.map(
                    (subtitle, subtitleIndex) => (
                      <div key={subtitleIndex} className="mb-2">


                        <div className="d-flex align-items-center mb-3 gap-3">
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
                            placeholder="Enter subtitle"
                            required
                          />
                          <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() =>
                              removeSubtitle(
                                lectureIndex,
                                subtitleIndex
                              )
                            }
                          >
                            <RiSubtractFill size={24} />
                          </button>

                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
            {/* Course Image */}
            <div className="mb-3">
              <label className="form-label">Course Image</label>

              <ImageUpload
                value={courseDetails.courseImage}
                onImageUpload={(url) =>
                  setCourseDetails((prevState) => ({
                    ...prevState,
                    courseImage: url,
                  }))
                }
              />
            </div>


            <div className="mb-3">
              <label className="form-label">Course Video thumbnail</label>

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
              <label className="form-label">Course Video</label>
              <input
                value={courseDetails.courseVideo}
                type="text"
                className="form-control"
                name="courseVideo"
                onChange={handleInputChange}
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
                  : Id ? "Update Course " : "Add Course "}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AddCourse;