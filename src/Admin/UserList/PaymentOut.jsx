import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Listing from "../Api/Listing";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";

export default function PaymentOut({
    Id,
    fetchMarketLists,
    first_user_pay,
    second_user_pay,
    referred_user_pay,
    lastTodayIncome,
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [listing, setListing] = useState({
        Id,
        transactionId: "",
        amount: "",
        paymentMethod: "",
        withdrawal_reason: "",
        payment_income: "",
        payment_key: "",
    });

    // Toggle modal and reset form when closing
    const toggleModal = () => {
        if (!isOpen && lastTodayIncome === 0) {
            toast.error("Insufficient amount in wallet.");
            return;
        }
        setIsOpen(!isOpen);
    };

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setListing({
                Id,
                transactionId: "",
                amount: "",
                paymentMethod: "",
                withdrawal_reason: "",
                payment_income: "",
                payment_key: "",
            });
        }
    }, [isOpen, Id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setListing((prev) => ({ ...prev, [name]: value }));
    };

    // Calculate referred user pay
    const calculateReferredUserPay = () => {
        const referredPay = Number(second_user_pay || 0) + Number(first_user_pay || 0) + Number(referred_user_pay || 0);
        const dataUser = Number(listing.amount);

        if (isNaN(referredPay) || isNaN(dataUser)) {
            throw new Error("Invalid data: referred_user_pay or data_user is not a number");
        }
        return referredPay - dataUser;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (!listing.transactionId || !listing.amount || !listing.paymentMethod || !listing.withdrawal_reason || !listing.payment_income) {
            toast.error("All fields are required.");
            setLoading(false);
            return;
        }

        if (Number(listing.amount) > Number(lastTodayIncome || 0)) {
            toast.error("Amount cannot be greater than the available balance.");
            setLoading(false);
            return;
        }

        // Ensure payment_key is set before submission
        setListing((prev) => ({ ...prev, payment_key: prev.transactionId }));

        try {
            const referredUserPay = calculateReferredUserPay();
            const main = new Listing();

            const response = await main.userpay({
                Id: listing.Id,
                payment_type: listing.withdrawal_reason ? "Debit" : "Credit",
                withdrawal_reason: listing.withdrawal_reason,
                page: "payout",
                payoutpayment: listing.withdrawal_reason ? listing.amount : "0",
                payment_key: listing.amount, // Ensuring correct key
                payment_data: Number(second_user_pay) + Number(first_user_pay) + Number(referred_user_pay),
                payment_income: listing.payment_income,
                transactionId: listing.transactionId,
                paymentMethod: listing.paymentMethod,
                payment_Add: !listing.withdrawal_reason ? listing.amount : "0",
            });

            if (response?.data) {
                toast.success(response.data.message || "Operation successful");
                fetchMarketLists();
                toggleModal();
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
        <div>
            {/* Payout Button */}
            <Link to="#" onClick={toggleModal}>Payout</Link>

            {/* Modal */}
            {isOpen && (
                   <div
                   className="modal fade show d-block"
                   tabIndex="-1"
                   style={{
                       display: 'block',
                       backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
                   }}
                   role="dialog"
               >

                   <div
                       className="modal-dialog modal-dialog-centered modal-lg custom-modal-dialog" // Added custom-modal-dialog class for larger size
                       role="document"
                   >
                        <div className="modal-content">
                            <div className="modal-header d-flex justify-content-between align-items-center">
                                <h5 className="modal-title">Payment Payout</h5>
                                <button type="button" className="text-gray-600 hover:text-gray-900" onClick={toggleModal} aria-label="Close">
                                    <MdClose size={24} />
                                </button>
                            </div>
                            <div className="modal-body">
                                <h6 className="text-black">Current Amount: {Number(lastTodayIncome || 0)}</h6>
                                <form onSubmit={handleSubmit}>
                                    <div className="row">
                                        <FormInput label="Transaction ID" name="transactionId" value={listing.transactionId} handleChange={handleChange} />
                                        <FormInput label="Amount" name="amount" type="number" value={listing.amount} handleChange={handleChange} min="0" />
                                    </div>
                                    <div className="row">
                                        <FormSelect label="Payment Method" name="paymentMethod" value={listing.paymentMethod} handleChange={handleChange} options={[
                                            { value: "", text: "Select Payment Method" },
                                            { value: "googlePay", text: "Google Pay" },
                                            { value: "phonePe", text: "PhonePe" },
                                        ]} />
                                        <FormSelect label="Income Type" name="payment_income" value={listing.payment_income} handleChange={handleChange} options={[
                                            { value: "", text: "Select Income" },
                                            { value: "passive", text: "Passive Income" },
                                            { value: "direct", text: "Direct Income" },
                                        ]} />
                                    </div>
                                    <div className="row">
                                        <FormSelects label="Payment Reason" name="withdrawal_reason" value={listing.withdrawal_reason} handleChange={handleChange} options={[
                                            { value: "", text: "Choose a reason..." },
                                            { value: "Daily Income Processed", text: "Daily Income Processed" },
                                            { value: "Manual Payout Adjustment", text: "Manual Payout Adjustment" },
                                            { value: "Overpayment Refund", text: "Overpayment Refund" },
                                            { value: "Special Bonus Payout", text: "Special Bonus Payout" },
                                            { value: "Performance-Based Payout", text: "Performance-Based Payout" },
                                            { value: "Affiliate Commission Processed", text: "Affiliate Commission Processed" },
                                            { value: "Monthly Passive Payout Processed", text: "Monthly Passive Payout Processed" },
                                        ]} />
                                    </div>

                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={toggleModal}>Cancel</button>
                                        <button type="submit" className="btn btn-danger" disabled={loading}>{loading ? "Loading..." : "Pay"}</button>
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

// Reusable Form Components
const FormInput = ({ label, name, type = "text", value, handleChange, ...rest }) => (
    <div className="form-group col-md-6">
        <label htmlFor={name}>{label}</label>
        <input type={type} className="form-control" id={name} name={name} value={value} onChange={handleChange} {...rest} required />
    </div>
);

const FormSelect = ({ label, name, value, handleChange, options }) => (
    <div className="form-group col-md-6">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" id={name} name={name} value={value} onChange={handleChange} required>
            {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
        </select>
    </div>
);

const FormSelects = ({ label, name, value, handleChange, options }) => (
    <div className="form-group col-md-12">
        <label htmlFor={name}>{label}</label>
        <select className="form-control" id={name} name={name} value={value} onChange={handleChange} required>
            {options.map((opt) => <option key={opt.value} value={opt.value}>{opt.text}</option>)}
        </select>
    </div>
);

// Modal Styles
const modalStyles = { backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: "0", left: "0", width: "100%", height: "100%" };

