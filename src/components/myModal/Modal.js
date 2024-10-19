import React from "react";

const Modal = ({ isOpen, onClose, children, className }) => {
  return (
    <>
      {isOpen && (
        <div className="tw-fixed tw-inset-0 tw-z-50 tw-overflow-y-auto">
          <div className="tw-flex tw-items-center tw-justify-center tw-min-h-screen tw-p-4 tw-text-center">
            <div
              className="tw-fixed tw-inset-0 tw-transition-opacity"
              aria-hidden="true"
            >
              <div
                onClick={onClose}
                className="tw-absolute tw-inset-0 tw-bg-black tw-opacity-75"
              />
            </div>

            <span
              className="tw-hidden sm:tw-inline-block sm:tw-align-middle sm:tw-h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div
              className={`tw-inline-block tw-align-bottom tw-bg-white tw-border-2 tw-border-white tw-border-opacity-20 tw-backdrop-blur-md tw-text-left tw-overflow-hidden tw-shadow-xl tw-transform tw-transition-all sm:tw-my-8 sm:tw-align-middle ${className}`}
            >
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
