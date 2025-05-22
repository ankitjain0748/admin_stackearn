import './App.css';
import "./css/style.css"
import "./css/Admin.css"

import 'bootstrap/dist/css/bootstrap.min.css';
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminLogin from "./Admin/Login/AdminLogin.jsx";
import AdminDashboard from "./Admin/AdminDashboard/AdminDashboard.jsx";
import List from "./Admin/ContactList/List.jsx";
import WebniarView from "./Admin/Webniar/WebniarList.jsx"
import WebniarAdd from "./Admin/Webniar/AddWebinar.jsx"
import SubscribeHistory from "./Admin/Subscribe/SubscribeHistory.js";
import UserList from "./Admin/UserList/UserList.jsx";


import AdminChangePassword from "./Admin/setting/studentChangePassword.jsx";
import AdminLinkedAccount from "./Admin/setting/studentLinkedAccount.jsx";
import AdminProfile from "./Admin/setting/studentSetting.jsx";
import AdminSocialProfile from "./Admin/setting/studentSocialProfile.jsx";
import ProfileId from "./Admin/UserList/ProfileId.js";
import Instrtour from "./Admin/Instrutor/Instrtour.jsx";
import AddInstrtour from "./Admin/Instrutor/AddInstrtour.jsx";
import ViewProfile from "./Admin/Instrutor/ViewProfile.jsx";
import AddCourses from "./Admin/Course/AddCourse.jsx";
import CourseDetails from "./Admin/Course/CourseDetails.jsx";
import CourseLists from "./Admin/Course/Courses.jsx";
import PaymentList from "./Admin/Payment/List.js"
import AdminPayment from "./Admin/Payment/Adminpayment.js"
import ReviewLists from "./Admin/ReviewList/ReviewList.jsx"
import BlogView from "./Admin/BlogAdd/BlogView.jsx"
import BlogAdd from "./Admin/BlogAdd/AddBlog.jsx"
import BlogDetails from "./Admin/BlogAdd/BlogDetails.jsx"

import CourseContentList from "./Admin/CourseContent/Courses.jsx"
import OnlineContent from "./Admin/OnlineAddCourse/Courses.jsx"
import AddCourseOnlineContent from "./Admin/OnlineAddCourse/AddOnlineCourse.jsx"
import CourseTable from "./Admin/Refral/CourseTable.jsx";
import GalleryAdd from "./Admin/GalleryAdd/AddGallery.jsx";
import GalleryView from "./Admin/GalleryAdd/GalleryView.jsx";
import Terms from "./Admin/setting/Terms.jsx";
import Policy from "./Admin/setting/Policy.jsx";
import BestSelllingCourse from "./Admin/OnlineAddCourse/BestSelllingCourse.jsx";
import VideoAdd from "./Admin/Video/VideoAdd.jsx";
import VideoList from "./Admin/Video/VideoList.jsx";
import EventData from "./Admin/Webniar/EventData.jsx";
import NewsLetter from "./Admin/Email/NewsLetter.jsx";
import UserEmail from "./Admin/Email/UserEmail.jsx";
import AdminSupport from "./Admin/Email/Support.jsx"
import Payout from './Admin/payout/Payout.jsx';
function App() {
  return (
    <>
      <Toaster className="top-right" />
      <BrowserRouter >
        <Routes>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/" element={<AdminLogin />} />


          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/admin-contact" element={<List />} />
          <Route path="/admin/payout" element={<Payout />} />
          <Route path="/admin/subsribe" element={<SubscribeHistory />} />

          <Route
            path="/admin/user"
            element={<UserList />}
          />
          <Route path="/admin/admin-setting" element={<AdminProfile />} />

          <Route
            path="/admin/admin-change-password"
            element={<AdminChangePassword />}
          />
          <Route path="/admin/admin-social-profile" element={<AdminSocialProfile />} />

          <Route path="/admin/admin-linked-accounts" element={<AdminLinkedAccount />} />

          <Route path="/admin/user-profile-Id/:id" element={<ProfileId />} />

          <Route path="/admin/instructor" element={<Instrtour />} />
          <Route path="/admin/add/instructor" element={<AddInstrtour />} />
          <Route path="/admin/add/instructor/:Id" element={<ViewProfile />} />

          <Route path="/admin/update/instructor/:Id" element={<AddInstrtour />} />

          <Route path="/admin/add-course" element={<AddCourses />} />
          <Route path="/admin/update-course/:Id" element={<AddCourses />} />
          <Route path="/admin/course-list" element={<CourseLists />} />
          <Route path="/admin/course-details/:Id" element={<CourseDetails />} />
          <Route path="/admin/course-content-list" element={<CourseContentList />} />
          <Route path="/admin/payment-list" element={<PaymentList />} />
          <Route path="/admin/review-list" element={<ReviewLists />} />
          <Route path="/admin/blog-list" element={<BlogView />} />
          <Route path="/admin/blog-add" element={<BlogAdd />} />
          <Route path="/admin/blog-update/:Id" element={<BlogAdd />} />
          <Route path="/admin/blog-details/:Id" element={<BlogDetails />} />

          <Route path="/admin/gallery-list" element={<GalleryView />} />
          <Route path="/admin/gallery-add" element={<GalleryAdd />} />
          <Route path="/admin/gallery-update/:Id" element={<GalleryAdd />} />
          <Route path="/admin/online-list" element={<OnlineContent />} />
          <Route path="/admin/add-online-content" element={<AddCourseOnlineContent />} />
          <Route path="/admin/update-online-content/:Id" element={<AddCourseOnlineContent />} />

          <Route path="/admin/webniar-list" element={<WebniarView />} />
          <Route path="/admin/add-webniar" element={<WebniarAdd />} />
          <Route path="/admin/update-webinar/:Id" element={<WebniarAdd />} />
          <Route path="/admin/payment-data" element={<AdminPayment />} />
          <Route path="/admin/admin-policy" element={<Policy />} />

          <Route path="/admin/admin-term" element={<Terms />} />

          <Route
            path="/admin/admin-refral"
            element={<CourseTable />}
          />

          <Route path="/admin/best_course" element={<BestSelllingCourse />} />
          <Route path="/admin/video_add" element={<VideoAdd />} />
          <Route path="/admin/video_list" element={<VideoList />} />
          <Route path="/admin/video_add/:Id" element={<VideoAdd />} />
          <Route path="/admin/event_data/:Id" element={<EventData />} />
          <Route path="/admin/email" element={<UserEmail />} />
          <Route path="/admin/user_support" element={<AdminSupport />} />
          <Route path="/admin/news_letter" element={<NewsLetter />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
