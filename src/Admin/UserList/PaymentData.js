import React, { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function PaymentData({
    step,
    Id,
    referred_user_pay,
    first_user_pay,
    second_user_pay,
    lastTodayIncome,
    fetchMarketLists,
    payment_data,
}) {
   
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState({
        Id,
        referred_user_pay,
        data_user: "",
        withdrawal_reason: "",
        success_reasons: "",
        payment_data,
    });

    const toggleModal = () => {
        if (step === 2) {
          if (lastTodayIncome === 0) {
            toast.error("Insufficient amount in wallet.");
            return;
          }
        }
      
        setIsOpen((prev) => !prev);
      };
      

    const handleChange = ({ target: { name, value } }) => {
        setListing((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const calculateReferredUserPay = () => {
        const referredPay = Number(listing.referred_user_pay);
        const dataUser = Number(listing.data_user);

        if (isNaN(referredPay) || isNaN(dataUser)) {
            toast.error("Invalid input: Amount must be a number.");
            return null;
        }

        return step === 1 ? referredPay + dataUser : referredPay - dataUser;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const referredUserPay = calculateReferredUserPay();
            if (referredUserPay === null) {
                setLoading(false);
                return;
            }

            if (step === 2) {
                if (Number(listing.data_user) >
                    Number(lastTodayIncome || 0) 
                ) {
                    toast.error("Amount cannot be greater than the available balance.");
                    setLoading(false);
                    return;
                }
            }
            const main = new Listing();
            const response = await main.userpay({
                Id: listing.Id,
                payment_type: listing.withdrawal_reason ? "Debit" : "Credit",
                withdrawal_reason: listing.withdrawal_reason,
                page: listing.withdrawal_reason ? "withdrawal" : "Add",
                payment_Add: !listing.withdrawal_reason ? listing.data_user : "0",
                paymentWidthrawal: listing.withdrawal_reason ? listing.data_user : "0",
                success_reasons: listing.success_reasons,
                payment_key:listing.withdrawal_reason && listing.data_user,
                payment_data: Number(second_user_pay) + Number(first_user_pay) + Number(referred_user_pay),
            });

            if (response?.data) {
                toast.success(response.data.message || "Operation successful");
                toggleModal();
                fetchMarketLists();
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

    const reasonsToAdd = [
        "Affiliate Commission Payout",
        "Pending Commission Released",
        "Performance Bonus",
        "Referral Bonus",
        "Signup Bonus",
        "Previous Deduction Reversed",
        "Technical Issue Compensation",
        "Limited-Time Promotional Bonus",
        "Festival / Special Event Bonus",
    ];


    return (
        <div>
            {/* Payout Button */}
            <Link to="#" onClick={toggleModal}>
                {step === 1 ? "Add Money" : "Withdraw Money"}
            </Link>

            {/* Modal */}
            {isOpen && (
                <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <div
                        className="modal-dialog modal-dialog-centered modal-lg custom-modal-dialog" // Added custom-modal-dialog class for larger size
                        role="document"
                    >
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between align-items-center">
                                <h5 className="modal-title mt-2 mb-2">{step === 1 ? "Add Money" : "Withdraw Money"}</h5>
                                <button
                                    type="button"
                                    className="btn-close d-flex align-items-center justify-content-center  mt-2 mb-2"
                                    onClick={toggleModal}
                                    aria-label="Close"
                                    style={{ opacity: 1, visibility: "visible" }} // Ensures it's always visible
                                >
                                    <MdClose size={24} />
                                </button>
                            </div>

                            <div className="modal-body">
                                <h6 className="text-black text-[17px] mt-2  mb-2">
                                    Current Amount:{" "}
                                    {
                                        Number(
                                                lastTodayIncome || 0
                                        )}
                                </h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group mt-1">
                                        <label htmlFor="data_user">Amount</label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="data_user"
                                            min={"0"}
                                            name="data_user"
                                            value={listing.data_user}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    {step === 1 ? (
                                        <div className="form-group mt-1">
                                            <label htmlFor="success_reasons">Success Reasons</label>
                                            <select
                                                className="form-control"
                                                id="success_reasons"
                                                name="success_reasons"
                                                value={listing.success_reasons}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Choose a reason...</option>
                                                <option value="Affiliate Commission Payout">Affiliate Commission Payout</option>
                                                <option value="Pending Commission Released">Pending Commission Released</option>
                                                <option value="Performance Bonus">Performance Bonus</option>
                                                <option value="Referral Bonus">Referral Bonus</option>
                                                <option value="Signup Bonus">Signup Bonus</option>
                                                <option value="Previous Deduction Reversed">Previous Deduction Reversed</option>
                                                <option value="Technical Issue Compensation">Technical Issue Compensation</option>
                                                <option value="Limited-Time Promotional Bonus">Limited-Time Promotional Bonus</option>
                                                <option value="Festival / Special Event Bonus">Festival / Special Event Bonus</option>
                                            </select>
                                        </div>
                                    ) : (
                                        <div className="form-group mt-1">
                                            <label htmlFor="withdrawal_reason">Withdrawal Reason</label>
                                            <select
                                                className="form-control"
                                                id="withdrawal_reason"
                                                name="withdrawal_reason"
                                                value={listing.withdrawal_reason}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="" disabled>Select a reason</option>
                                                <option value="refund">Refund for Service Cancellation</option>
                                                <option value="billing_error">Adjustment for Billing Error</option>
                                                <option value="cashback_redemption">Reward or Cashback Redemption</option>
                                                <option value="operational_expense">Operational Expense</option>
                                                <option value="penalty">Penalty or Fine Payment</option>
                                                <option value="affiliate_payout">Payout for Affiliate/Partner</option>
                                                <option value="salary_payment">Salary/Commission Payment</option>
                                                <option value="tax_payment">Tax Deduction/Payment</option>
                                                <option value="miscellaneous">Miscellaneous Reason (Specify)</option>
                                            </select>
                                        </div>
                                    )}
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                        <button type="submit" className="btn btn-danger" disabled={loading}>
                                            {loading ? "Loading..." : step === 1 ? "Add Money" : "Withdraw Money"}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// ✅ Provide default values to prevent `undefined`
PaymentData.defaultProps = {
    first_user_pay: 0,
    second_user_pay: 0,
    referred_user_pay: 0,
    payment_data: 0,
};

// ✅ Remove `.isRequired` for optional props
PaymentData.propTypes = {
    Id: PropTypes.string.isRequired,
    fetchMarketLists: PropTypes.func.isRequired,
    first_user_pay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    second_user_pay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    referred_user_pay: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    payment_data: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
