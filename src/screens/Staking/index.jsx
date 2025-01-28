import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/header";
import { FaArrowRight } from "react-icons/fa6";
import Button from "../../components/Button";
import Footer from "../../components/footer";
import Tabs from "../../components/Tabs";
import { TiArrowSortedDown } from "react-icons/ti";
import StakingCounter from "../../components/StakingCounter";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  staking_address,
  usdt_address,
  ebm_address,
  staking_abi,
  token_abi,
} from "../../configs/Contracts";
import { useLocation } from "react-router-dom";
import { useSwitchChain, useAccount, useDisconnect } from "wagmi";

import { useSimulateContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { polygon, polygonAmoy } from "wagmi/chains";
import Web3 from "web3";


const Staking = ({setHeroData,setStatment, set_refCount,set_refEarning}) => {


  const chainId = process.env.REACT_APP_ENV == "production" ? polygon.id : polygonAmoy.id;

  const { switchChainAsync } = useSwitchChain();
  const { chainId: currentChainId } = useAccount();
  const { writeContractAsync,writeContract,data:hash, ...states } = useWriteContract();
  const [ref_add, set_ref] = useState("0x0000000000000000000000000000000000000000");

  const { address, isConnecting ,isConnected,isDisconnected} = useAccount()

  const [count, set_count] = useState(0);
  const [count1, set_count1] = useState(0);

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  // const notify = () => toast("Transaction Successfull!");








  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const dropdownRef = useRef(null);

  const [isOpen2, setIsOpen2] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState(null);
  const dropdownRef2 = useRef(null);


  const [isOpen3, setIsOpen3] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState(null);
  const dropdownRef3 = useRef(null);



  const [isOpen4, setIsOpen4] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState(null);
  const dropdownRef4 = useRef(null);


  const options = ["150 days", "Option 2", "Option 3"];
  const options2 = ["0", "60", "2323"];
  const options3 = ["7.78", "44.23", "3.54"];
  const options4 = ["7.78", "44.23", "3.54"];


  // const APRList = [
  //   { value: "3", lbl: "360 Days" ,APR: "144%" },
  //   { value: "2", lbl: "270 Days"  ,APR: "81%" },
  //   { value: "1", lbl: "180 Days"  ,APR: "36%" },
  //   { value: "0", lbl: "90 Days"  ,APR: "9%" },




  // ];
  const [ APRList,set_APRList] = useState([
    { value: "0", lbl: "90 Days"  ,APR: "9",min:0 },
    { value: "1", lbl: "180 Days"  ,APR: "36",min:0 },
    { value: "2", lbl: "270 Days"  ,APR: "81",min:0 },
    { value: "3", lbl: "360 Days" ,APR: "144",min:0 },



  ])

  const [ selectedAPR,set_selectedAPR] = useState(APRList[3])

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleToggle2 = () => {
    setIsOpen2(!isOpen2);
  };

  const handleToggle3= () => {
    setIsOpen3(!isOpen3);
  };

  const handleToggle4= () => {
    setIsOpen4(!isOpen4);
  };


  const handleOptionClick = (option) => {
    set_selectedAPR(option);
    setIsOpen(false);
  };

  const handleOption2Click = (option) => {
    setSelectedOption2(option);
    setIsOpen2(false);
  };


  const handleOption3Click = (option) => {
    setSelectedOption3(option);
    setIsOpen3(false);
  };


  const handleOption4Click = (option) => {
    setSelectedOption4(option);
    setIsOpen4(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      if (
        dropdownRef2.current &&
        !dropdownRef2.current.contains(event.target)
      ) {
        setIsOpen2(false);
      }
      if (
        dropdownRef3.current &&
        !dropdownRef3.current.contains(event.target)
      ) {
        setIsOpen3(false);
      }

      if (
        dropdownRef4.current &&
        !dropdownRef4.current.contains(event.target)
      ) {
        setIsOpen4(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);




  const calculateTimeLeft = () => {
    const difference = +new Date('2024-12-31T00:00:00') - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);





  const [totalReward, set_totalReward] = useState(0);
  const [totalwithdraw, set_totalwithdraw] = useState(0);

  const [totalusers, set_totalusers] = useState(0);
  const [totalbusiness, set_totalbusiness] = useState(0);
  const [totalInvestment, set_totalInvestment] = useState(0);
  const [totalEarning, set_totalEarning] = useState(0);
  const [USDTBalance, set_TokenBalance] = useState(0);

  const [EBMBalance, set_EBMBalance] = useState(0);
  const [MATICBalance, set_MATICBalance] = useState(0);


  const [choosed_Unstake_inv, set_choosed_Unstake_inv] = useState();
  const [allInvestments, set_investmentList] = useState([]);
  const [allInvestments_reward, set_allInvestments_reward] = useState([]);
  const [is_suspend, set_is_suspend] = useState(false);

  const [launch, set_launch] = useState(false);


  const [isCso, set_isCso] = useState(false);
  const [isEmb, set_isEmb] = useState(false);

  const [total_raised, set_totalRaised] = useState([]);
  const [curr_time, set_curr_time] = useState();
  const [min_stake, set_min_stake] = useState(0);
  const [perTokenPrice, set_perTokenPrice] = useState(0);

  const [totalLevelEarning, set_totalLevelEarning] = useState(0);

  const [LevelEarning, set_LevelEarning] = useState(0);

  const [penalty, set_penalty] = useState();
  const [curr_StageTime, set_curr_StageTime] = useState(0);
  const [curr_presale, set_curr_presale] = useState([]);
  const [perTokenIn_Matic, set_perTokenIn_Matic] = useState(0);
  const [NextStagePrice, set_NextStagePrice] = useState();





 
useEffect(()=>
{
  if((count1==0))
  {
    set_count1(count1+1);
  
    if(params.get("ref")!=null)
    {
      set_ref(params.get("ref"))

    }
    test();
  }

},[address])





  async function test()
  {  

    const web3= new Web3(new Web3.providers.HttpProvider("https://polygon-bor-rpc.publicnode.com"));
    const staking_contract=new web3.eth.Contract(staking_abi,staking_address);
    const USDT_contract=new web3.eth.Contract(token_abi,usdt_address);
    const EBM_contract=new web3.eth.Contract(token_abi,ebm_address);

    let USDTBalance;
    let EBMBalance;
    let totalReward;
    let totalEarning;
    let user;
    let allInvestments;
    let allInvestments_reward;
    let balance;
    let perTokenPrice
    let details=APRList;
    if(isConnected)
    {
       balance  =await  web3.eth.getBalance(address)

       USDTBalance = await USDT_contract.methods.balanceOf(address).call(); 
   
       EBMBalance = await EBM_contract.methods.balanceOf(address).call();    
       totalReward = await staking_contract.methods.get_TotalReward().call({ from: address });   
       totalEarning = await staking_contract.methods.get_TotalReward().call({ from: address }); 
       user = await staking_contract.methods.user(address).call();      
       allInvestments = await staking_contract.methods.getAll_investments().call({from: address});
      
        allInvestments_reward = await staking_contract.methods.getAll_investments_forReward().call({from: address});
       let ref_count = await staking_contract.methods.referralLevel_count(address).call(); 

       let data = await staking_contract.methods.Level_earning(address).call();    
      //  let l1_statement = await staking_contract.methods.get_refStatement(address,0).call();    
      //  let l2_statement = await staking_contract.methods.get_refStatement(address,1).call();    
      //  let l3_statement = await staking_contract.methods.get_refStatement(address,2).call();    
      //  let l4_statement = await staking_contract.methods.get_refStatement(address,3).call();    
      //  let l5_statement = await staking_contract.methods.get_refStatement(address,4).call();      
        perTokenPrice = await staking_contract.methods.get_Curr_pertokenPrice().call();   

        set_totalLevelEarning(data[1])
      //  setStatment(l1_statement,l2_statement,l3_statement,l4_statement,l5_statement,user[7],user[8],perTokenPrice)
       setHeroData(user?user[1]:0,totalEarning,user?user[2]:0,perTokenPrice,data[1])
       set_refEarning(data.arr1)
       set_refCount(ref_count)
       set_totalEarning(totalEarning + data[1] );


      }
  


    //staking 
    perTokenPrice = await staking_contract.methods.get_Curr_pertokenPrice().call();   
    let penalty = await staking_contract.methods.penalty().call();   

    let currTime = await staking_contract.methods.get_currTime().call();    
    let totalusers = await staking_contract.methods.totalusers().call();    
    let totalbusiness = await staking_contract.methods.getTotalInvestment().call();
    
    for(let j=0;j<4;j++)
    {
       let detail = await staking_contract.methods.details(j).call();
       console.log( detail)
       details[j].APR=Number(detail[1]);
       details[j].min=Number(detail[2])/10**18;


    }
    set_APRList(details)
    set_MATICBalance(balance)
    set_penalty(penalty)
    set_curr_time(currTime)
    set_TokenBalance(USDTBalance);
    set_perTokenPrice(perTokenPrice);
    set_EBMBalance(EBMBalance);
    set_totalInvestment(user?user[1]:0)
    set_totalwithdraw(user?user[2]:0)

    set_totalbusiness(totalbusiness)
    set_min_stake(0)
    set_totalusers(totalusers)
    set_investmentList(allInvestments);
    set_allInvestments_reward(allInvestments_reward)
    // setSelectedAmount(allInvestments[0]);
    
    
    if(allInvestments!=null)
    {
      if(allInvestments[0])
      {
        set_choosed_Unstake_inv(allInvestments[0][3])
  
      }   
    }
 
    set_totalReward(totalReward);
  }  























  const { isLoading: isConfirming, isSuccess: isConfirmed} =
  useWaitForTransactionReceipt({
    hash,
  })

  const [stakeAmount, setStakedAmount] = useState(0);

  async function stake1() {


    try {
        const tx = await writeContractAsync({
          abi: staking_abi,
          address: staking_address,
          functionName: "Stake", 
          args: [
            Convert_To_Wei(stakeAmount? Number(stakeAmount) : 0), selectedAPR.value,ref_add
          ],

        });

        set_count(1)

    } catch (err) {
        console.error(err);
    }
}

async function unstake1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "unStake", 
        args: [
          Number(selectedOption3[3])
        ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


async function claim1() {

  try {
      const tx = await writeContractAsync({
        abi: staking_abi,
        address: staking_address,
        functionName: "withdrawReward", 
        args: [
          totalLevelEarning,"78986868768767868787687690999"

          // totalLevelEarning,"8798789798798"
        ],

      });

      set_count(1)

  } catch (err) {
      console.error(err);
  }
}


useEffect(()=>{
  if(isConfirmed)
  {
    if(count==0)
    {
      stake1()

    }
    if(count==1)
    {
      set_count(0)
      // notify()
      setStakedAmount(0)
      test();
    }
  }


},[isConfirmed])

  async function SMT_approval () {
    try {
        const tx = await writeContractAsync({
          abi: token_abi,
          address: ebm_address,
          args: [staking_address,Convert_To_Wei( stakeAmount ? Number(stakeAmount) : "0")],
          functionName: "approve",

        }); 
        // stake1();
  
       } catch (err) {
        console.error(err);
    }
  }







  function Convert_To_eth(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.fromWei(val.toString(), "ether");
    return val;
  }

  function Convert_To_Wei(val) {
    const web3 = new Web3(
      new Web3.providers.HttpProvider("https://polygon.meowrpc.com")
    );

    val = web3.utils.toWei(val.toString(), "ether");
    return val;
  }



  async function stake()
  {
    
    if(is_suspend)
    {
      alert("Staking is Disable by the admin");
      return;
    }

    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }
    if(Number(totalInvestment)==0)
    {
      if(ref_add=="0x0000000000000000000000000000000000000000" )
        {
          alert("You can't stake without a referral link because this is a community base project.");
          return;
        }
    }
    
    if(stakeAmount==0 )
    {
      alert("kindly write amount to stake ");
      return;
    }

    if(((((Number(stakeAmount))*(Number(perTokenPrice)/10**18)))) < Number(selectedAPR.min) )
    {
      alert("Minimum Stake amount is "+ Number(selectedAPR.min) +" DAI worth of SMT");
      return;
    }


    if(Number(EBMBalance)/10**18 < Number(stakeAmount))
    {
      alert("You don't have sufficient balance");
      return;
    }
    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await SMT_approval?.();
    } 
    else 
    {
      await SMT_approval?.();
    }

  }


  async function unstake()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await unstake1?.();
    } 
    else 
    {
      await unstake1?.();
    }
    

  }

  async function claim()
  {
    if(isDisconnected)
    {
      alert("kindly connect your wallet ");
      return;
    }

    if (chainId != currentChainId )
    {
      await switchChainAsync({ chainId });
      await claim1?.();
    } 
    else 
    {
      await claim1?.();
    }
    

  }
  function convert_to_usdt(_val)
  {
    let usdt_amount = Number(_val) * (Number(perTokenPrice)/10**18);
    return usdt_amount.toFixed(10).replace(/\.?0+$/,"")  ;
  
  }





  const defaultTab = "Engage";

  const tabData = [
    {
      title: "Engage",
      content: (
        <>
          <div className="tw-border tw-border-textColor tw-rounded-md">
            <div className="tw-flex px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
              <div>
              <img src={require("../../assets/images/c5.png")} />
              </div>
              <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
              Samaritan
              </p>
            </div>

           <div className=" p-4 tw-border-b   tw-border-textColor tw-flex tw-flex-col tw-gap-3">
          
            <div className="tw-flex  tw-justify-between tw-items-center">
              <p className="tw-m-0  tw-text-md tw-text-textColor text-semibold tw-font-poppins "> Obligation</p>
              <p className="tw-m-0   text-bold tw-font-poppins tw-text-textColor tw-text-md">{selectedAPR.APR }%</p>
            </div>
            <div className="tw-flex  tw-justify-between tw-items-center">
              <p className="tw-m-0  tw-text-md tw-text-textColor text-semibold tw-font-poppins "> Min Engagement</p>
              <p className="tw-m-0   text-bold tw-font-poppins tw-text-textColor tw-text-md">{selectedAPR.min } DAI</p>
            </div>
            <div className="tw-flex  tw-pt-7   tw-gap-2  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-md tw-border-textColor"> DAI Value:</p>
            <p className="tw-m-0 tw-font-poppins tw-text-md tw-border-textColor">$ {((((Number(stakeAmount))*(Number(perTokenPrice)/10**18))).toFixed(2))}</p>
          </div>
           </div>

            <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
              <div className="tw-flex tw-flex-col tw-gap-4">
            
                <div>
                <div className=" pb-3">
              <label className=" tw-text-textColor font-blod">Choose Lockups Time</label>
           <div className=" tw-mt-2.5">
            <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef}
                  >
                    <button
                      onClick={handleToggle}
                      className="tw-border-textColor tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-4 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      <p className="tw-m-0 tw-border-textColor">
                        {selectedAPR.lbl || "Select an option"}
                      </p>
                      <p className="tw-m-0">
                      <TiArrowSortedDown color="black" size={20} />

                      </p>
                    </button>
                    {isOpen && (
                      <ul className="tw-absolute tw-bg-white tw-p-0 tw-z-30 tw-bg- tw-text-[black] black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                        {APRList.map((option,index) => (
                          <li
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                          >
                            {option.lbl}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
           </div>
        
       
             </div>
                  <div className="tw-flex tw-justify-between tw-items-center">
                    <p className=" tw-font-poppins  text-semibold tw-text-textColor">
                      Write Amount
                    </p>
                    
                  </div>
                  <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef2}
                  >
                    <button
                      // onClick={handleToggle2}
                      className=" tw-border-textColor tw-flex tw-items-center tw-justify-between tw-border tw-w-full tw-text-black tw-py-3 tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      {/* <p className="tw-m-0">
                        {selectedOption2 || "Select an option"}
                      </p> */}
                      <input 
                      className=" tw-w-full  tw-text-textColor tw-font-poppins  placeholder:tw-text-textColor tw-bg-transparent  tw-outline-none"
                      min={0}
                      value={stakeAmount}
                      max={EBMBalance>0?(Number(EBMBalance)/10**18):0}
                      onChange={(e)=>setStakedAmount(e.target.value)}
                      />
                      
                      
                      <div className="tw-flex tw-items-center tw-gap-2">
                        <p className="tw-text-sm tw-m-0  text-bold tw-text-textColor">SMT</p>
                        <button className=" text-white tw-bg-button-gradient tw-py-1.5 tw-px-1 tw-text-sm tw-rounded-md"
                        onClick={(e)=>setStakedAmount(EBMBalance>0?(Number(EBMBalance)/10**18):0)}
                        >
                          Max
                        </button>
                      </div>
                    </button>
                  </div>


                </div>
              </div>

              <div>
                <Button onClick={stake} label={"Consent"} className={"tw-w-full  tw-text-white tw-font-zen-dots"} />
              </div>
            </div>
          </div>
        </>
      ),
    },
    {
      title: "Disengage",
      content:(
        <>
        <div className="tw-border tw-border-textColor tw-rounded-md">
          <div className="tw-flex px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
            Samaritan
            </p>
          </div>

          <div className="tw-flex p-4  tw-justify-between tw-items-center">
            <p className="tw-m-0  tw-text-textColor  tw-font-zen-dots">Penalty</p>
            <p className="tw-m-0  tw-font-zen-dots tw-text-textColor "> { Number(penalty)/10**18 }%</p>
          </div>

          <div className="tw-flex-col tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-textColor ">Previous Engagement</label>
              <div
                  className="tw-relative tw-mt-2 tw-w-full tw-inline-block"
                  ref={dropdownRef3}
                >
                  <button
                    onClick={handleToggle3}
                    className="tw-border-textColor tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-4 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                  >
                    <p className="tw-m-0 tw-border-textColor">
                    {selectedOption3 ? Convert_To_eth(selectedOption3[0]):"Select an option"}
                    </p>
                    <p className="tw-m-0">
                    <TiArrowSortedDown color="black" size={20} />

                    </p>
                  </button>
                  {isOpen3 && (
                    <ul className="tw-absolute tw-p-0 tw-z-20 tw-bg-white tw-text-black tw-shadow-lg tw-rounded-md tw-mt-2 tw-w-full">
                    
                    {allInvestments?(

                      allInvestments.map((item,index) => (
                        <li
                        onClick={() => {
                          handleOption3Click(item);
                          // setSelectedAmount(item);
                          // set_choosed_Unstake_inv(Number(item[index][3]));
                        
                        }}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {Convert_To_eth(item[0])} SMT
                        </li>
                      ))
                      ):(null)}

                    </ul>
                  
                  )}
                </div>
                <StakingCounter time={selectedOption3 ? Number(selectedOption3[1]):0}/>
                <div className="tw-flex  tw-pt-7   tw-gap-2  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor"> DAI Value:</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor">$ {selectedOption3 ?( ((((Number(selectedOption3[0]))*(Number(selectedOption3[10])))/10**36).toFixed(2))):0}</p>
          </div>

             </div>
            <div>
              <Button  onClick={unstake}  label={"Disengage"} className={"tw-w-full  text-white tw-font-zen-dots"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
    {
      title: "Reward",
      content:(
        <>
        <div className="tw-border tw-border-textColor tw-rounded-md">
          <div className="tw-flex tw-mb-4 px-4 tw-py-3 tw-border-b  tw-border-textColor tw-justify-between tw-items-center">
            <img src={require("../../assets/images/c5.png")} />
            <p className="tw-m-0  tw-text-textColor tw-text-2xl tw-font-bold">
            Samaritan
            </p>
          </div>

          <div className="tw-flex px-4   tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">Total Earning</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#2E94CB]">$ {totalEarning? ( ((Number(totalEarning)/10**18) + (Number(totalwithdraw)/10**18)).toFixed(2)):0}</p>
          </div>


          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">Total withdraw</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#2E94CB]">$ {totalwithdraw? ((Number(totalwithdraw)/10**18).toFixed(2)):0}</p>
          </div>
          <div className="tw-flex px-4  tw-pt-1 tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-textColor">Available Balance</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-text-[#2E94CB]">$ {totalEarning?( (Number(totalEarning)/10**18).toFixed(2)):0}</p>
          </div>
          <div className="tw-flex-col   tw-flex tw-justify-between tw-h-96 tw-p-6 tw-py-10">
             <div>
              <label className=" tw-text-textColor">Engagement History</label>
           <div className=" tw-mt-2.5">
            <div
                    className="tw-relative tw-w-full tw-inline-block"
                    ref={dropdownRef4}
                  >
                    <button
                      onClick={handleToggle4}
                      className="tw-border-textColor tw-flex tw-justify-between tw-border tw-w-full tw-text-black tw-py-4 tw-items-center tw-px-4 tw-rounded-md tw-text-[17.15px] tw-leading-3"
                    >
                      <p className="tw-m-0 tw-border-textColor">
                      {selectedOption4 ? Convert_To_eth(selectedOption4[0]):"Select an option"}
                      </p>
                      <p className="tw-m-0">
                      <TiArrowSortedDown color="black" size={20} />

                      </p>
                    </button>
                    {isOpen4 && (
                    <ul className="tw-absolute tw-bg-white tw-p-0 tw-z-30 tw-bg- tw-text-[black] black tw-shadow-md tw-rounded-md tw-mt-2 tw-w-full">
                    {allInvestments_reward?(
                      allInvestments_reward.map((item,index) => (
                        <li
                          key={index}
                          onClick={() => handleOption4Click(item)}
                          className="tw-py-2 tw-px-4 tw-cursor-pointer tw-text-black hover:tw-bg-button-gradient"
                        >
                          {Convert_To_eth(item[0])}

                        </li>
                      ))
                     ):(null)}
                      

                    </ul>
                  )}
                  </div>
           </div>
           <div className="tw-flex  tw-pt-7   tw-gap-2  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor"> Earn Reward:</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor">$ {selectedOption4 ?( ((Number(selectedOption4[6])/10**18).toFixed(2))):0}</p>
          </div>


          <div className="tw-flex  tw-pt-7   tw-gap-2  tw-justify-between tw-items-center">
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor"> Pending Reward:</p>
            <p className="tw-m-0 tw-font-poppins tw-text-sm tw-border-textColor">$ {selectedOption4 ? ((Number(selectedOption4[9])/10**18).toFixed(2)):0}</p>
          </div>
         
             </div>
            <div>
              <Button onClick={claim} label={"Claim"} className={"tw-w-full text-white tw-font-zen-dots"} />
            </div>
          </div>
        </div>
      </>
      ),
    },
  ];

  return (
    <div className="tw-bg-center  tw-relative  tw-bg-cover tw-w-full tw-h-auto">
      
      <div className="container md:tw-py-24 tw-py-3">
        <div className="row tw-items-center">
          <div className="col-lg-12 col-md-12 tw-mx-auto">
            <div className="mx-auto mt-8  mb-24">
              <Tabs tabs={tabData} defaultTab={defaultTab} />
            </div>
          </div>
        </div>
      </div>
     
    </div>
  );
};

export default Staking;
