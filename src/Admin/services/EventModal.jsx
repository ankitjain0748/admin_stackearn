import { useState } from "react";

function EventModal() {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const handleJoinNowClick = () => {
    setShowModal(true);
  };

  const [Regs, setRegs] = useState({
    email: "",
    name: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegs((prevState) => ({ ...prevState, [name]: value }));
  };
  const toggleModal = () => setShowModal(!showModal);
  const handleForms = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (loading) return;
    setLoading(true);

    const main = new Listing();
    try {
      const response = await main.EventData(Regs);
      if (response?.data?.status) {
        toast.success(response.data.message);
        setRegs({
          email: "",
          password: "",
          role: "user",
        });
        localStorage.setItem("token", response?.data?.token);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (<>
    <button
      onClick={() => handleJoinNowClick()} // Pass event ID to the function
      className="login-head button d-inline-flex align-items-center"
    >
      Join Now
      <i className="fa-solid fa-arrow-right-long ms-2"></i>
    </button>
    {showModal && (

      <div
        className="modal fade show d-block data-inding-id"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                Webniar Show
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={toggleModal}
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleForms}>
                <div className="row">
                  {/* Name Field */}
                  <div className="form-group col-md-4">
                    <label htmlFor="name">Name:</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={Regs.name}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="form-group col-md-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={Regs.email}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>

                  {/* Phone Number Field */}
                  <div className="form-group col-md-4">
                    <label htmlFor="phone">Phone Number:</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={Regs.phone}
                      onChange={handleChange}
                      required
                      className="form-control"
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={toggleModal}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleForms}
              >
                {loading ? "Loading..." : "Submit"
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    )}

  </>);
}

export default EventModal;