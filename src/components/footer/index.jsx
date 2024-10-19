import React from "react";
import { FaTelegram } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <div className="  tw-bg-[#232323]">
        <div className="container  tw-py-8">
          <div className="row">
            <div className="col-md-8 mx-auto">
            <div className=" tw-text-center">
            <img
                src={require("../../assets/images/footer_logo.png")}
                className="tw-mx-auto"
              />
              <h1 className=" tw-text-center text-white  tw-font-bold">Token Address</h1>
              <div className=" ">
                <button className="  sm:tw-px-5 tw-px-3 tw-py-2 sm:tw-text-base tw-text-sm   mt-3 tw-bg-button-gradient tw-text-white m-0  tw-rounded-md">
                Smaritan: 0x2484b0c9f6C500EB763c8b1F95e5057560139279
                </button>
              </div>
            </div>

              <ul className=" tw-pt-3 tw-p-0 tw-flex   tw-justify-center tw-gap-5 tw-items-center">
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/twitter.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/youtube.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/telegram.png")} />
                  </Link>
                </li>
                <li>
                  <Link to={"#"}>
                    <img src={require("../../assets/images/bluec.png")} />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className=" tw-w-full tw-text-center  tw-bg-button-gradient">
        <p className=" sm:tw-text-lg tw-py-2.5  tw-text-sm tw-m-0 tw-text-white">
        Copyright © 2024. All rights reserved by Smaritan 
        </p>
      </div>
    </div>
  );
};

export default Footer;
