import React, { useState } from "react";
import Header from "../header";
import Staking from "../../screens/Staking";
import { GoCopy } from "react-icons/go";
import { useSwitchChain, useAccount, useDisconnect } from "wagmi";
import {
  CopyToClipboard,
  PartnerIcon,
  CycleIcon,
} from "react-copy-to-clipboard";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Web3 from "web3";
const Hero = ({setStatment, set_refCount,set_refEarning}) => {
  const [selectedCurrency, setSelectedCurrency] = useState("MATIC");

  const notify = () => toast("Referral link s copied!");

  const [availBalance, set_availBalance] = useState(0);
  const [totalInvestment, set_totalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [perTokenPrice, set_perTokenPrice] = useState(0);
  const [levelEarning, setlevelEarning] = useState(0);

  const handleSelect = (currency) => {
    setSelectedCurrency(currency);
  };
  const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  const getBorderColor = (currency) => {
    return selectedCurrency === currency
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-[#456DA7]";
  };

  const [selectedButton, setSelectedButton] = useState(null);

  const handleBSelect = (button) => {
    setSelectedButton(button);
  };

  const getBBorderColor = (button) => {
    return selectedButton === button
      ? "tw-border-[#00F0FF] tw-border-2"
      : "tw-border-white";
  };

  function convert_to_usdt(_val)
  {
    let usdt_amount = Number(_val) * (Convert_To_eth(perTokenPrice));
    return usdt_amount.toFixed(10).replace(/\.?0+$/,"")  ;
  
  }

  function setHeroData(v1,v2,v3,v4,lE)
  {
    set_availBalance(v2)
    set_totalInvestment(v1)
    set_totalEarning(v3+v2)
    set_perTokenPrice(v4)
    setlevelEarning(lE)
  }

  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }
  return (
    <div className="   tw-bg-cover tw-relative tw-bg-center tw-w-full tw-h-auto">
      <Header />

      <div className="container tw-relative  tw-pb-44 tw-pt-6">
        <div className=" tw-text-center">
          <h1 className=" tw-pb-7 tw-text-[#456DA7]">
          Yousamaritan Lp Program
          </h1>
        </div>
        <div className="row    g-5 tw-items-center">
          <div className="col-lg-6">
           <div className=" row">
            <div className=" col-md-10 tw-mx-auto">
            <Staking setHeroData={setHeroData} setStatment={setStatment}  set_refCount={set_refCount} set_refEarning={set_refEarning}  />
            </div>
           </div>
          </div>
          <div className="col-lg-6 col-md-12">
            <div className=" row  g-4">
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-textColor tw-font-poppins">
                    Total Engagement
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {totalInvestment>0 ? Convert_To_eth(totalInvestment):0} SMT
                  </span>
                </div>
              </div>

              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins">
                    Total Bonus Earning
                  </h6>
                  
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {totalEarning>0 ?( ( Convert_To_eth(totalEarning))):0} DAI

                  </span>
                </div>
              </div>

              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="   tw-text-textColor tw-font-poppins">
                    Total Ref Earning
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}
                    {levelEarning>0 ? (Convert_To_eth(levelEarning)):0} DAI
                  </span>
                </div>
              </div>
              <div className=" col-md-6">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins">
                    Available Balance
                  </h6>
                  <span className="  tw-text-textColor tw-font-poppins tw-text-lg">
                    {" "}

                    {availBalance>0 ? (Convert_To_eth(availBalance)):0} DAI

                  </span>
                </div>
              </div>

              <div className=" col-md-12">
                <div className=" tw-border  tw-border-textColor tw-rounded-bl-3xl  tw-rounded-tr-3xl  p-4">
                  <h6 className="  tw-text-textColor  tw-font-poppins tw-flex tw-gap-3 tw-items-center">
                    My Link 
                    <CopyToClipboard
                        text={`${window.location.host}?ref=${address? address:""}`}
                      >
                    <GoCopy  onClick={notify} size={23} color="#456DA7" />
                    </CopyToClipboard>

                  </h6>
                  <span className="  tw-text-[#456DA7] tw-font-poppins tw-text-md">
                  {window.location.host}?ref={address? address.slice(0,3)+"..."+address.slice(39,42):""}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" tw-absolute tw-right-0  tw-hidden  md:tw-block tw-top-0">
        <img src={require("../../assets/images/WhiteBluePink.png")} alt=""  className=" tw-w-44" />
      </div>




      <ToastContainer />

     
     
    </div>
  );
};

export default Hero;
