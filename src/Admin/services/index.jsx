import React, { useEffect, useState } from "react";
import Header from "../header";
import { useSelector } from "react-redux";
import { HomeMain } from "../imagepath";
import { Footer4 } from "../footer4";
import Listing from "../Api/Listing";
import LoadingPage from "../../LoadingPage";
import VideoModal from "../student/studentCourses/VideoModal";
import Pagination from "../Admin/components/Pagination";
import HeadingPage from "../CommonCompontes/HeadingPage";
import NoDataPage from "../CommonCompontes/NoDataPage";

function Index() {
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const fetchMarketLists = async (page = 1, limit = 15) => {
    setLoading(true);
    try {
      const main = new Listing();
      const response = await main.OnlineGet(page, limit);
      setListing(response?.data?.data?.Courseget);
      setTotalPages(response?.data?.data.totalPages);
      setCurrentPage(response?.data?.data.currentPage);
      setTotalItems(response.data.data.totalCourse);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMarketLists();
  }, []);

  useEffect(() => {
    fetchMarketLists(currentPage, 15);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    fetchMarketLists(page, 15);
  };

  const mobileSidebar = useSelector((state) => state.sidebarSlice.expandMenu);

  useEffect(() => {
    document.body.className = "home-two";
    return () => {
      document.body.className = "";
    };
  }, []);

  // Pagination Logic


  return (
    <div className="main-wrapper">
      <Header />
      {/* Banner Section */}
      {/* Featured Courses Section */}
      <div className="page-content">
        <HeadingPage title={"Welcome to Our Online Courses"} />
        <section className=" py-3">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="">
                  {loading ? (
                    <LoadingPage /> // Show loading spinner
                  ) : listing.length > 0 ? ( // Check if data is available
                    <div className="row mt-2">
                      {listing.map((row, rowIndex) => (
                        <div
                          className="col-lg-4 col-md-4 mb-3 d-flex justify-content-center"
                          key={rowIndex}
                        >
                          <div className="card w-100 ">
                            <VideoModal videoLink={row?.video}  thumbnail={row?.thumbnail}/>
                            <div className="card-body">
                              <h5 className="card-title blog-limit">
                                {row.title || "Course Title"}
                              </h5>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>


                  ) : (
                    // Show "No Data Found" if the list is empty
                    <div className="text-center py-5">
                      <NoDataPage />
                    </div>
                  )}

                  <div className="col-md-12 mt-5">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </div>
      <Footer4 />
    </div>
  );
}

export default Index;
