import React, { useEffect, useRef, useState } from "react";
import Hero from "../../components/hero";
import Brands from "../../components/Brands";
import Footer from "../../components/footer";
import About from "../../components/About/About";
const Home = () => {
  const [refCount, set_refCount] = useState([]);
  const [refEarning, set_refEarning] = useState([]);

  const [l1_statement, set_l1_statement] = useState([]);
  const [l2_statement, set_l2_statement] = useState([]);
  const [l3_statement, set_l3_statement] = useState([]);
  const [l4_statement, set_l4_statement] = useState([]);
  const [l5_statement, set_l5_statement] = useState([]);
  const [cso_earning, set_cso_earning] = useState(0);
  const [emb_earning, set_emb_earning] = useState(0);

  const [perTokenPrice, set_perTokenPrice] = useState(0);

  function setStatment(l1,l2,l3,l4,l5,e1,e2,p1)
  {
    set_l1_statement(l1)
    set_l2_statement(l2)
    set_l3_statement(l3)
    set_l4_statement(l4)
    set_l5_statement(l5)
    set_cso_earning(e1)
    set_emb_earning(e2)
    set_perTokenPrice(p1)
  }

  return (
    <div className=" tw-overflow-x-hidden">

      <Hero setStatment={setStatment} set_refEarning={set_refEarning} set_refCount={set_refCount} />

      <div className="   tw-px-5 tw-relative">
        <div className="  tw-pb-10 tw-text-center">
          <h2 className="  tw-pt-16  sm:tw-pt-0 tw-text-[#456DA7]">
          Your Referral Reward
          </h2>
        </div>

        <Brands perTokenPrice={perTokenPrice} emb_earning={emb_earning} cso_earning={cso_earning} refCount={refCount} refEarning={refEarning} l1_statement={l1_statement} l5_statement={l5_statement} l2_statement={l2_statement} l3_statement={l3_statement} l4_statement={l4_statement} />

        <div className=" tw-absolute tw-left-0  tw-bottom-[30%]">
          <img
            src={require("../../assets/images/WhiteBluePinkLeft.png")}
            className=" sm:tw-w-44 tw-w-36"
            alt=""
          />
        </div>

      
      </div>

      <About />
      <Footer />
    </div>
  );
};

export default Home;
