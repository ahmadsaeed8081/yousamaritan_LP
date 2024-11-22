import React, { useState } from "react";
import HeroPopup from "../../screens/HeroPopup";
import Web3 from "web3";
const Brands = ({emb_earning, cso_earning,perTokenPrice,refCount,refEarning,l1_statement,l2_statement,l3_statement, l4_statement, l5_statement }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [choosed_statement, set_choosed_statement] = useState(0);
  const handleToggle = (val) => {

    set_choosed_statement(val)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  function convert_to_usdt(_val)
  {
    let usdt_amount = Number(_val) * (Convert_To_eth(perTokenPrice));
    return usdt_amount.toFixed(10).replace(/\.?0+$/,"")  ;
  
  }


  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }


  return (

    <>
    <div  className=" tw-flex  container mx-auto tw-flex-wrap tw-justify-center tw-gap-10 tw-items-center">
       <div 
                className="tw-border tw-p-4 tw-w-80 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-textColor"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8 tw-bg-[#F8A11D]">
                    <span className="tw-text-white tw-font-poppins tw-text-sm">5%</span>
                  </div>
                </div>
                <h4 className=" tw-text-[#456DA7] tw-text-[28px] tw-mt-2 tw-font-semibold tw-text-center">
                   Level 01
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-textColor tw-font-semibold ">Total Earnings</span>
                    <span className="tw-text-textColor tw-font-semibold ">Team</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-textColor  tw-font-semibold"  >{refEarning?(Number(refEarning[0])/10**18).toFixed(4):0} DAI</span>
                    <span className="tw-text-textColor tw-font-semibold">{refCount?Number(refCount[0]):0}</span>
                  </div>
                </div>
              </div>
              <div
              
                className="tw-border tw-p-4 tw-w-80 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-textColor"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8 tw-bg-[#F8A11D]">
                    <span className="tw-text-white tw-font-poppins tw-text-sm">3%</span>
                  </div>
                </div>
                <h4 className=" tw-text-[#456DA7] tw-text-[28px] tw-mt-2 tw-font-semibold tw-text-center">
                   Level 02
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-textColor tw-font-semibold ">Total Earnings</span>
                    <span className="tw-text-textColor tw-font-semibold ">Team</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-textColor  tw-font-semibold" >{refEarning?(Number(refEarning[1])/10**18).toFixed(4):0} DAI</span>
                    <span className="tw-text-textColor tw-font-semibold">{refCount?Number(refCount[1]):0}</span>
                  </div>
                </div>
              </div>
              <div
              
                className="tw-border tw-p-4 tw-w-80 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-textColor"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8 tw-bg-[#F8A11D]">
                    <span className="tw-text-white tw-font-poppins tw-text-sm">1%</span>
                  </div>
                </div>
                <h4 className=" tw-text-[#456DA7] tw-text-[28px] tw-mt-2 tw-font-semibold tw-text-center">
                   Level 03
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-textColor tw-font-semibold ">Total Earnings</span>
                    <span className="tw-text-textColor tw-font-semibold ">Team</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-textColor  tw-font-semibold" >{refEarning?(Number(refEarning[2])/10**18).toFixed(4):0} DAI</span>
                    <span className="tw-text-textColor tw-font-semibold">{refCount?Number(refCount[2]):0}</span>
                  </div>
                </div>
              </div>
              {/* <div
              
                className="tw-border tw-p-4 tw-w-80 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-textColor"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8 tw-bg-[#F8A11D]">
                    <span className="tw-text-white tw-font-poppins tw-text-sm">2%</span>
                  </div>
                </div>
                <h4 className=" tw-text-[#456DA7] tw-text-[28px] tw-mt-2 tw-font-semibold tw-text-center">
                Philanthropist
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-textColor tw-font-semibold ">Total Earnings</span>
                    <span className="tw-text-textColor tw-font-semibold ">Team</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-textColor  tw-font-semibold" onClick={()=>handleToggle(4)} >{cso_earning?Number(cso_earning):0} SMT</span>
                    <span className="tw-text-textColor tw-font-semibold">02</span>
                  </div>
                </div>
              </div>
              <div
              
                className="tw-border tw-p-4 tw-w-80 tw-rounded-tr-3xl tw-rounded-bl-3xl tw-border-textColor"
              >
                <div className="tw-flex tw-justify-end">
                  <div className="sm:tw-w-10 tw-w-8 tw-rounded-md tw-flex tw-justify-center tw-items-center sm:tw-h-10 tw-h-8 tw-bg-[#F8A11D]">
                    <span className="tw-text-white tw-font-poppins tw-text-sm">1%</span>
                  </div>
                </div>
                <h4 className=" tw-text-[#456DA7] tw-text-[28px] tw-mt-2 tw-font-semibold tw-text-center">
                Good Samaritan
                </h4>
                <div className="tw-w-full tw-flex-col tw-flex tw-justify-between tw-items-center">
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full tw-my-2">
                    <span className="tw-text-textColor tw-font-semibold ">Total Earnings</span>
                    <span className="tw-text-textColor tw-font-semibold ">Team</span>
                  </div>
                  <div className="tw-flex tw-justify-between tw-items-center tw-w-full">
                    <span className="tw-text-textColor  tw-font-semibold" onClick={()=>handleToggle(5)} >{emb_earning?Number(emb_earning):0}</span>
                    <span className="tw-text-textColor tw-font-semibold">02</span>
                  </div>
                </div>
              </div> */}
    </div>

    <HeroPopup setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}  data={choosed_statement==1 ? l1_statement : choosed_statement==2 ? l2_statement : choosed_statement==3 ? l3_statement : choosed_statement==4 ? l4_statement:choosed_statement==5 ? l5_statement:null}/>

    {/* {isExpanded && (
  <div onClick={() => setIsExpanded(false)} className="tw-fixed tw-inset-0 tw-z-50 tw-flex tw-items-center tw-justify-center tw-bg-[rgba(0,0,0,0.7)] tw-bg-opacity-75">
    <div className="tw-bg-white tw-rounded-lg tw-overflow-hidden tw-shadow-xl tw-transform tw-transition-all tw-w-full tw-max-w-4xl">
      <div className="tw-px-4 tw-py-5 tw-pt-6 tw-bg-white tw-flex tw-justify-center tw-items-center">
        <h2 className="tw-text-2xl tw-font-bold tw-text-[#456DA7]">Earning Statement</h2>
        
      </div>
      <div className="tw-overflow-x-auto tw-h-96 tw-overflow-y-auto">
        <table className="tw-min-w-full tw-mb-0 ">
          <thead className="text-center tw-border-b tw-border-[#456DA7] tw-bg-button-gradient">
            <tr className="tw-rounded-lg tw-whitespace-nowrap">
              <th
                scope="col"
                className=" tw-text-white tw-font-bold tw-px-6 tw-py-4"
              >
                Sr.No
              </th>
              <th
                scope="col"
                className="tw-text-white tw-font-bold tw-px-6 tw-py-4"
              >
                Buy Address
              </th>
              <th
                scope="col"
                className=" tw-text-white tw-font-bold tw-px-6 tw-py-4"
              >
                Amount
              </th>
              <th
                scope="col"
                className="tw-text-white tw-font-bold tw-px-6 tw-py-4"
              >
                Date
              </th>
              <th
                scope="col"
                className="tw-text-white tw-font-bold tw-px-6 tw-py-4"
              >
                My Reward
              </th>
            </tr>
          </thead>
          <tbody className=" ">
            <>
              <tr className="tw-bg-white tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white  tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white  tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
              <tr className="tw-bg-white tw-rounded-md">
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    1
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                  x
                  </span>
                </td>
                <td className="tw-align-middle  tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-font-poppins tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-bg-green-200 tw-rounded-full">
                    $10
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-3 tw-whitespace-nowrap tw-text-center">
                  <span className="tw-text-base tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    08/17/2024
                  </span>
                </td>
                <td className="tw-align-middle tw-font-semibold tw-px-6 tw-py-2 tw-whitespace-nowrap tw-text-center">
                  <span className=" tw-text-black tw-py-1 tw-px-2.5 tw-leading-none tw-text-center tw-whitespace-nowrap tw-align-baseline tw-font-poppins tw-bg-green-200 tw-rounded-full">
                    $3
                  </span>
                </td>
              </tr>
            </>
          </tbody>
        </table>
      </div>
    </div>
  </div>
)} */}

    </>    






  );
};

export default Brands;
