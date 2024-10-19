import React from "react";
import { MdClose } from "react-icons/md";
import Modal from "../../components/myModal/Modal";

const HeroPopup = ({data, isModalOpen, setIsModalOpen, closeModal }) => {
  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="tw-rounded-md md:tw-w-[60%] tw-w-[100%] tw-bg-[#fff]"
      >
        <div className="">
          <div className="tw-flex tw-justify-between tw-pt-5 tw-p-4 tw-items-center">
            <div></div>
           
         
          <h1 className="tw-capitalize tw-font-poppins tw-text-center tw-font-bold tw-text-xl">
            Earning Statement
          </h1>
          {/* <div  className=" tw-w-10 tw-flex tw-justify-center tw-items-center tw-h-10 tw-bg-[#456DA7] tw-rounded-full"> */}
          <MdClose
              onClick={() => setIsModalOpen(false)}
              size={25}
              className="tw-cursor-pointer tw-text-black"
            />
          {/* </div> */}
          </div>
          
          <div className="tw-bg-white tw-mb-4 tw-mt-4 ">
            <form>
            <div className=" tw-overflow-x-auto " >
          <table className="tw-min-w-full tw-mb-0">
          <thead className="tw-border-t tw-text-center tw-border-b tw-border-[#456DA7] tw-bg-primary">
            <tr className="tw-rounded-lg tw-whitespace-nowrap">
              <th
                scope="col"
                className="tw-text-md tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                Sr no
              </th>
              <th
                scope="col"
                className="tw-text-md tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                Buy Address
              </th>
              <th
                scope="col"
                className="tw-text-md tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                Amount
              </th>
              <th
                scope="col"
                className="tw-text-md tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                Date
              </th>
              <th
                scope="col"
                className="tw-text-md tw-text-[#456DA7] tw-font-bold tw-px-6 tw-py-4"
              >
                My Reward
              </th>
            </tr>
          </thead>
          <tbody>
            <>


          {data? data.map((index, item)=>(

            <tr className="bg-white border-t rounded-md">
            <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
              <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                {index+1}
              </span>
            </td>
            <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
              <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                {item[0].slice(0,5)}
              </span>
            </td>
            <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
              <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
                  ${Number(item[1])}

              </span>
            </td>
            <td className="align-middle text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
              <span className="text-base text-black tw-font-poppins py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline bg-green-200 rounded-full">
              {Number(item[3])}
              </span>
            </td>
            <td   className="align-middle  cursor-pointer text-sm font-normal px-6 py-2 whitespace-nowrap text-center">
              <span  className="text-base text-black py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline tw-font-poppins bg-green-200 rounded-full">
         
                   $ {Number(item[2])}

              </span>
            </td>
          </tr>


          )):null}
              
              


            </>
          </tbody>
        </table>
        </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default HeroPopup;
