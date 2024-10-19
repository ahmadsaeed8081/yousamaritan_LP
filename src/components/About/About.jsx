import React from 'react'
import Button from '../Button'
import { FaArrowRight } from 'react-icons/fa6'
// import EBM_Avenue from '../EBM_avenue'
const About = () => {
  return (
    <div  id='aboutSection'  className='  tw-relative tw-py-20  tw-w-full tw-h-auto'>
          
      <div className='container'>
        <div className='row   g-5 tw-items-center'>
            <div className='col-lg-7 col-md-12'>
              <span className='  tw-text-textColor tw-font-semibold tw-text-[18px] sm:tw-justify-start tw-justify-center tw-flex tw-items-center tw-gap-4'>  <p className='  tw-font-syne m-0 tw-w-16 tw-h-0.5  tw-bg-green'></p> Liquidity</span>
              <h1 className="  tw-text-textColor  tw-font-bold tw-font-syne tw-pt-4">
              How to Engage ?
          
            </h1>
           <ul className=' tw-p-0  tw-leading-5'>
            <li>
            <h2 className="  tw-text-textColor  tw-font-bold tw-font-syne tw-pt-4">
            
            Add Samaritan Tokens
          
            </h2>
            <p className=" tw-text-black   tw-leading-8 tw-pt-4 tw-text-xl">
            You will need tokens in your wallet to engage. Once you purchase SMT tokens, make sure that you add the SMT token to your MetaMask/TrustWallet Wallet so you can view your Smaritan balance.  </p>
            </li>
            <li>
            <h2 className="  tw-text-textColor tw-font-bold tw-font-syne tw-pt-4">
            
            Connect & Verify Wallet
          
            </h2>
            <p className=" tw-text-black    tw-leading-8 tw-pt-4 tw-text-xl">
            Click the "Connect Wallet" button at the upper right corner of the site and make sure you have the Polygon network selected in your MetaMask/Trust Wallet..</p>
            </li>
            <li>
            <h2 className="  tw-text-textColor tw-font-bold tw-pt-4 tw-font-syne">
            
            Stake Wallet
          
            </h2>
            <p className=" tw-text-black  tw-leading-8 tw-pt-4 tw-text-xl">
            You'll need the 'Liquidity' and scroll to the top of the page to bring up the Liquidity interface on the site.</p>
            </li>
           </ul>
        
           
            <Button
                   
                rIcons={<FaArrowRight color="#fff" />}
                label={" More Details"}
                className={"  tw-text-white tw-mt-7 tw-font-semibold"}
                
              />




            </div>
            <div className='col-lg-5 col-md-12'>
              <div className='row'>
                <div className="col-md-12 tw-mx-auto">
                   <div className=' tw-relative '> 
                    <img src={require('../../assets/images/about.png')}   className=' tw-w-full' alt='' />
                    
                   
                   </div>
                </div>
              </div>
            </div>

          

        </div>

         
      </div>
     
      {/* <EBM_Avenue/> */}
     
    </div>
  )
}

export default About