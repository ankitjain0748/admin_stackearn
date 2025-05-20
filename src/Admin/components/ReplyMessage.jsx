import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MdOutlineMessage } from 'react-icons/md';

// ReplyMessage Component
const ReplyMessage = ({ item, message, wordLimit }) => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const truncateMessage = (text, limit) => {
    const words = text?.split(' ');
    return words?.length > limit
      ? words?.slice(0, limit)?.join(' ') + '...'
      : text;
  };

  return (
    <>
      <div
        style={{ cursor: 'pointer' }}
        onClick={handleShow}
        className="reply-data rounded p-1 d-flex align-items-center justify-content-center"
      >
        <MdOutlineMessage size={20} />
      </div>

      {show && (
        <div>
          <p onClick={handleShow} style={{ cursor: 'pointer' }} className='mt-0 mb-0'>
            {truncateMessage(message, wordLimit)}
          </p>
          {/* Bootstrap Modal */}
          <div
            className={`modal fade ${show ? 'show' : ''}`}
            style={{ display: show ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Reply  Message</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={handleClose}
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body mt-3">

                  <form>
                    <div className="mb-3">
                      <label htmlFor="formFrom" className="form-label">From</label>
                      <input type="text" className="form-control" id="formFrom" value="admin@example.com" readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formTo" className="form-label">To</label>
                      <input type="text" className="form-control" id="formTo" value={item?.email} readOnly />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formMessage" className="form-label">Message</label>

                      {item?.message}                </div>
                    <div className="mb-3">
                      <label htmlFor="formMessage" className="form-label">Reply Message</label>
                      <textarea className="form-control" id="formMessage" rows="3" placeholder="Enter your reply here"></textarea>
                    </div>
                  </form>
                </div>
                <div className="modal-footer">
                  <button className="btn btn-secondary" onClick={handleClose}>
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </>
  );
};

export default ReplyMessage;
