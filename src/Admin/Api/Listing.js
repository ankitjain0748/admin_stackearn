import { Component } from 'react';
import Api from './Api';
class Listing extends Component {

    async adminlogin(data) {
        return Api.post("/admin/login", data)
    }

    async AdminDashboard() {
        return Api.get(`/admin/dashboard`)
    }

    async profileVerify() {
        return Api.get("/admin/token")
    }

    async contact(data) {
        return Api.post("/contact/contact-add", data)
    }

    async ContactGet(selectoption, search, page, limit) {
        return Api.get(`/contact/contact-get?selectoption=${selectoption}&search=${search}&page=${page}&limit=${limit}`);
    }

    async contactdelete(data) {
        return Api.post("/contact/contact_delete", data)
    }

    async subscribe(data) {
        return Api.post("/subscribe/subscribe-add", data)
    }

    async RefralGetCode(id, name, search, page, limit) {
        return Api.get(`/refral/get_refral?id=${id}&name=${name}&payment_date=${search}&page=${page}&limit=${limit}`)
    }

    async userListId(id) {
        return Api.get(`/user/userlist/${id}`)
    }



    async resetpassword(data) {
        return Api.post("/user/reset-password", data)
    }

    async DeleteUsers(data) {
        return Api.post("/user/delete", data)
    }

    async userProfile(data) {
        return Api.post("/user/profile", data)
    }

    async userProfileAdd(data) {
        return Api.post("/user/user-profile", data)
    }

    async userprfileget(data) {
        return Api.post("/user/profile-data", data)
    }
    async userprofileEdit(data) {
        return Api.post("/user/user-profile", data)
    }
    async UserAdminPay(id, search, page, limit) {
        return Api.get(`/user/user_admin_payment?id=${id}&payment_date=${search}&page=${page}&limit=${limit}`)
    }
    async userSocialAdd(data) {
        return Api.post("/user/user-social", data)
    }

    async userSocialEdit(data) {
        return Api.post("/user/user-social", data)
    }

    async userprfileId(data) {
        return Api.post("/user/profile_id", data)
    }

    async userBankData(data) {
        return Api.post("/user/bank-data", data)
    }

    async CreateInstructor(data) {
        return Api.post("/instrutor/instrutor_post", data)
    }



    async InstrutorGetId(Id) {
        return Api.get(`/instrutor/instrutor_get/${Id}`)
    }

    async UpdateInstructor(data) {
        return Api.post("/instrutor/instrutor_update", data)
    }


    async InstrutorDelete(data) {
        return Api.post("/instrutor/instrutor_delete", data)
    }


    async CreateCourse(data) {
        return Api.post("/course/course_post", data)
    }


    async CourseGetId(Id) {
        return Api.get(`/course/course_get/${Id}`)
    }

    async Updatecourse(data) {
        return Api.post("/course/course_update", data)
    }

    async UpdatePricecourse(data) {
        return Api.post("/course/course_price", data)
    }


    async courseDelete(data) {
        return Api.post("/course/course_delete", data)
    }


    async CreateOnline(data) {
        return Api.post("/course/online_post", data)
    }

    async OnlineGet() {
        return Api.get("/course/online_get")
    }

    async OnlineGetId(Id) {
        return Api.get(`/course/online_get/${Id}`)
    }

    async Updateonline(data) {
        return Api.post("/course/online_update", data)
    }

    async OnlineDelete(data) {
        return Api.post("/course/online_delete", data)
    }

    async ReviewCourseUser() {
        return Api.get("/review/reviewdata")
    }

    async PaymentAdd(data) {
        return Api.post("/payment/create", data)
    }

    async PaymentSave(data) {
        return Api.post("/payment/verify-payment", data)
    }

    async PaymentCourse(data) {
        return Api.get("/payment/payment_get", data)
    }

    // Rieview
    async ReviewSave(data) {
        return Api.post("/review/review_add", data)
    }

    async ReviewStatus(data) {
        return Api.post("/review/review_status", data)
    }

    async ReviewCourse(data) {
        return Api.post("/review/review_course", data)
    }

    // Blog Add 
    async BlogAdd(data) {
        return Api.post("/blog/create", data)
    }

    async BlogGet() {
        return Api.get(`/blog/get`)
    }

    async BlogGetId(Id) {
        return Api.get(`/blog/get/${Id}`)
    }

    async BlogDelete(data) {
        return Api.post("/blog/delete", data)
    }

    async blogupdate(data) {
        return Api.post("/blog/update", data)
    }

    async userRefralmanagement(data) {
        return Api.post("/user/refral-active", data)
    }
    async userwidthrawal(data) {
        return Api.post("/user/widthrawal", data)
    }

    async userpay(data) {
        return Api.post("/user/payment", data)
    }

    async AdminPayments(selectedOption, search, payment_date, page, limit) {
        return Api.get(`/payment/admin/get?selectedOption=${selectedOption}&payment_date=${payment_date}&search=${search}&page=${page}&limit=${limit}`)
    }

    async GalleryAdd(data) {
        return Api.post("/gallery/create", data)
    }

    async GalleryGetId(Id) {
        return Api.get(`/gallery/get/${Id}`)
    }

    async galleryDelete(data) {
        return Api.post("/gallery/delete", data)
    }

    async galleryupdate(data) {
        return Api.post("/gallery/update", data)
    }

    async WebniarAdd(data) {
        return Api.post("/course/webniar_post", data)
    }

    async WebniarGet(search, page, limit) {
        return Api.get(`/course/webniar_get_data?search=${search}&page=${page}&limit=${limit}`)
    }
    async courseGet(search, page, limit) {
        return Api.get(`/course/course_get?search=${search}&page=${page}&limit=${limit}`)
    }

    async PaymentList(selectedOption, search, username, payment_date, page, limit) {
        return Api.get(`/payment/paymentget?selectedOption=${selectedOption}&search=${search}&username=${username}&payment_date=${payment_date}&page=${page}&limit=${limit}`)
    }

    async OnlineGet(search, page, limit) {
        return Api.get(`/course/online_get?search=${search}&page=${page}&limit=${limit}`)
    }

    async InstrutorGet(search, page, limit) {
        return Api.get(`/instrutor/instrutor_get?search=${search}&page=${page}&limit=${limit}`)
    }



    async ReviewGet(search, page, limit) {
        return Api.get(`/review/review_get?search=${search}&page=${page}&limit=${limit}`)
    }

    async subscribeGet(selectedOption, search, page, limit) {
        return Api.get(`/subscribe/subscribe-list?selectedoption=${selectedOption}&search=${search}&page=${page}&limit=${limit}`)
    }

    async BlogGet(search, page, limit) {
        return Api.get(`/blog/get?search=${search}&page=${page}&limit=${limit}`)
    }

    async GalleryGet(search, page, limit) {
        return Api.get(`/gallery/get?search=${search}&page=${page}&limit=${limit}`)
    }

    async userList(selectedOption = "", search, page, limit) {
        return Api.get(`/user/profile?selectedoption=${selectedOption}&search=${search}&page=${page}&limit=${limit}`,)
    }


    async VideoGets(search, page, limit) {
        return Api.get(`/course/video_traning_get?search=${search}&page=${page}&limit=${limit}`)
    }

    async PaymentCourseData(search, page, limit) {
        return Api.get(`/payment/payment_course?search=${search}&page=${page}&limit=${limit}`)
    }
    async webniardata() {
        return Api.get("/course/webniar_get_data")
    }


    async WebniargetId(Id) {
        return Api.get(`/course/webniar_get/${Id}`)
    }

    async Webniarupdate(data) {
        return Api.post("/course/webniar_update", data)
    }

    async Webniardelete(data) {
        return Api.post("/course/webniar_delete", data)
    }



    async subscribedelete(data) {
        return Api.post("/subscribe/subscriber_delete", data)
    }



    async UserRefral(search = "", page = 1, limit = 15) {
        return Api.get(`/user/referrals?search=${search}&page=${page}&limit=${limit}`);
    }

    async PassiveUserRefral(search = "", page = 1, limit = 15) {
        return Api.get(`/user/month_reffrals?search=${search}&page=${page}&limit=${limit}`);
    }


    async Adminprofile() {
        return Api.get(`/user/adminprofile`)
    }

    async VideoAdds(data) {
        return Api.post("/course/video_traning_add", data)
    }


    async VideogetId(Id) {
        return Api.get(`/course/video_traning_get_by_id/${Id}`)
    }

    async Videoupdate(data) {
        return Api.post("/course/video_traning_update", data)
    }

    async Videodelete(data) {
        return Api.post("/course/video_traning_delete", data)
    }

    async ContactEmail(email, page, limit) {
        return Api.get(`/subscribe/contact-email?search=${email}&page=${page}&limit=${limit}`)
    }

    async UserEmail(email, page, limit) {
        return Api.get(`/subscribe/user-email?email=${email}&page=${page}&limit=${limit}`)
    }

    async SubscribeEmail() {
        return Api.get("/subscribe/subscribe-email")
    }

    async WebniarEmail(data) {
        return Api.post("/subscribe/webniar_email", data)
    }

    async PromptionEmail(data) {
        return Api.post("/subscribe/promotion_email", data)
    }

    async OfferCourseEmail(data) {
        return Api.post("/subscribe/offer_email", data)
    }



    render() {
        return (
            <div>
                <>

                </>
            </div>
        )
    }
}

export default Listing;