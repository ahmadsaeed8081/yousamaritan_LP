//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
      function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

    }
    interface Presale {
        function get_curr_Stage() external view returns (uint);

    }

contract Yousamaritan_LP
    {
        uint[10] price_arr =[0.00000001611 ether, 0.00000002549 ether, 0.00000004033 ether,0.00000006382 ether, 0.00000010098 ether, 0.00000015979 ether,0.00000025283 ether, 0.00000040005 ether, 0.00000063300 ether, 0.00000100160 ether];

        address  public owner;
        address Staking_token=0x9092962cfdbF63147e0DBe03CA3e39c4BFC8324E; //YouSamaritan
        address Reward_Token=0x341343568948459e5b7017eDDb05110cfA3EF699; // DAI
        address Presale_contract=0xeB4710354a8cbcEb0A2C3Aa30725E4bB4aE59Da7; // presale



        uint public totalusers;
        // uint public per_day_divider= 1 days;
        uint public per_day_divider= 1 minutes;
        uint public totalbusiness; 
        uint public withdrawFee= 6 ether; 
        uint public penalty= 10 ether; 
        bool public doubleToken_promo;
        bool public doublDirectPercentage_promo;
        address[] public Cso_arr;
        address[] public Emb_arr;

        mapping(uint=>address) public All_investors;

        struct allInvestments{

            uint investedAmount;
            uint withdrawnTime;
            uint DepositTime;
            uint investmentNum;
            uint unstakeTime;
            bool unstake;
            uint reward;
            uint apr;
            uint timeframe;
            uint pending_rew;
            uint perTokenPrice;

        }


        struct ref_data
        {

            uint earning;
            uint count;

        }


        struct Data{

            mapping(uint=>allInvestments) investment;
            mapping(uint=>ref_data) referralLevel;
            address[] team;

            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
            address upliner;
            bool isCso;
            bool isEmb;
            uint Cso_Earning;
            uint Emb_Earning;
        }


        struct time_Apy
        {
            uint timeframe;
            uint APR;
            uint minim
        }
          struct refStatement_data1{

            address buyer;
            uint invest_amount;
            uint commission;
            uint time;

        }
        mapping(address=>Data) public user;
        mapping(uint=>time_Apy) public details;

        mapping (address => mapping (uint=>refStatement_data1[])) public user_statement;
        uint public perSMTPrice;
        constructor(){
            
            owner=msg.sender;        

            details[0].timeframe = 90 minutes;
            details[1].timeframe = 180 minutes;
            details[2].timeframe = 270 minutes;
            details[3].timeframe = 360 minutes;

            details[0].APR = 9;
            details[1].APR = 36;
            details[2].APR = 81;
            details[3].APR = 144;

        }

       
        function sendRewardToReferrals(address investor,uint _investedAmount)  internal  //this is the freferral function to transfer the reawards to referrals
        { 

            address temp = investor;       
            uint[] memory percentage = new uint[](5);
            percentage[0] = 5;
            percentage[1] = 3;
            percentage[2] = 1;

            uint remaining = _investedAmount;



                for(uint i=0;i<3;i++)
                {
                    
                    if(user[temp].upliner!=address(0))
                    {

                        temp = user[temp].upliner;
                        uint reward1 = ((percentage[i] * 1 ether) * _investedAmount)/100 ether;
                        
                        if(doublDirectPercentage_promo && i==0)
                        {
                            reward1*=2;
                        }

                        refStatement_data1 memory temp_data; 
                        temp_data.buyer=investor;
                        temp_data.invest_amount =  _investedAmount ;
                        temp_data.commission = reward1 ;
                        temp_data.time=block.timestamp;

                        user_statement[temp][i].push(temp_data);


                    
                            Token(Staking_token).transferFrom(msg.sender,temp,reward1);


                        user[temp].referralLevel[i].earning +=  reward1 ;                  
                        user[temp].referralLevel[i].count++;
                        remaining-=reward1;
                    } 
                    else
                    {
                        break;
                    }

                }
                
                temp = user[investor].upliner; 
                uint j=21;
                for(uint i=0;i<21;i++)
                {

                    
                    if(temp != address(0) &&  user[temp].isCso)
                    {




                        uint reward1 = ( 2 ether * _investedAmount)/100 ether;
                        
                        refStatement_data1 memory temp_data; 
                        temp_data.buyer=investor;
                        temp_data.invest_amount =_investedAmount ;
                        temp_data.commission = reward1 ;
                        temp_data.time=block.timestamp;
                        user_statement[temp][3].push(temp_data);


                        Token(Staking_token).transferFrom(msg.sender,temp,reward1);

                        

                        j=i+1;
                        user[temp].Cso_Earning+=  reward1  ;                  
                        remaining -= reward1;  
                        i=21;              
                    } 
                    else
                    {
                        temp = user[temp].upliner;
                    }

                }

                temp = user[investor].upliner; 

                for(uint i=0;i<j;i++)
                {

                    
                    if(temp != address(0) &&  user[temp].isEmb)
                    {



                        uint reward1 = ( 1 ether * _investedAmount)/100 ether;

                        refStatement_data1 memory temp_data; 
                        temp_data.buyer=investor;
                        temp_data.invest_amount = _investedAmount ;
                        temp_data.commission =  reward1 ;
                        temp_data.time=block.timestamp;

                        user_statement[temp][4].push(temp_data);



                        Token(Staking_token).transferFrom(msg.sender,temp,reward1);

                        

                        user[temp].Emb_Earning+=  reward1 ;               
                        remaining-=reward1;  
                        i=j;              
                    } 
                    else
                    {
                        temp = user[temp].upliner;
                    }

                }

                       
            

            
                                       
                Token(Staking_token).transferFrom(msg.sender,owner,remaining);

            

        }

        function Stake(uint _investedamount,uint choose_val,address _referral) external  returns(bool success)
        {
            require(details[choose_val].APR > 0," apr iss");
            require(_investedamount > 0,"value is not greater than 0");    
            require(Token(Staking_token).allowance(msg.sender,address(this))>=_investedamount,"allowance");

            if(user[msg.sender].investBefore == false)
            {   
                user[msg.sender].investBefore=true;
                totalusers++;                                     

                if(_referral==address(0) || _referral==msg.sender)                                         
                {
                    if(msg.sender!=owner)
                    {
                        user[msg.sender].upliner = owner;

                    }

                }
                else
                {
                   
                    user[msg.sender].upliner = _referral;
                    user[_referral].team.push(msg.sender);
                
                }
            }

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].withdrawnTime=block.timestamp + details[choose_val].timeframe ;  
            
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].investment[num].apr=details[choose_val].APR;
            user[msg.sender].investment[num].timeframe=(details[choose_val].timeframe/per_day_divider);  
            user[msg.sender].investment[num].perTokenPrice=get_pertokenPrice();  

            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;
            sendRewardToReferrals( msg.sender, _investedamount);


            return true;
            
        }

        function get_TotalReward() view public returns(uint){ 
            uint totalReward;
            uint depTime;
            uint rew;
            uint temp = user[msg.sender].noOfInvestment;
            for( uint i = 0;i < temp;i++)
            {   
                if(!user[msg.sender].investment[i].unstake)
                {
                    if(block.timestamp < user[msg.sender].investment[i].withdrawnTime)
                    {
                        depTime =block.timestamp - user[msg.sender].investment[i].DepositTime;
                    }
                    else
                    {    
                        depTime =user[msg.sender].investment[i].withdrawnTime - user[msg.sender].investment[i].DepositTime;
                    }                
                }
                else{
                    depTime =user[msg.sender].investment[i].unstakeTime - user[msg.sender].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[msg.sender].investment[i].investedAmount * ((user[msg.sender].investment[i].apr) *10**18) )/ (100*10**18) )/(user[msg.sender].investment[i].timeframe));


                    totalReward += depTime * rew;
                }
            }
            totalReward -= user[msg.sender].totalWithdraw_reward;

            return totalReward;
        }

        function getReward_perInv(uint i,address _add) view public returns(uint){ 
            uint totalReward;
            uint depTime;
            uint rew;

                if(!user[_add].investment[i].unstake)
                {
                    if(block.timestamp < user[_add].investment[i].withdrawnTime)
                    {
                        if(block.timestamp < user[_add].investment[i].withdrawnTime)
                        {
                            depTime =block.timestamp - user[_add].investment[i].DepositTime;
                        }
                        else
                        {    
                            depTime =user[_add].investment[i].withdrawnTime - user[_add].investment[i].DepositTime;
                        }                        
                    }
                    else
                    {    
                        depTime =user[_add].investment[i].withdrawnTime - user[_add].investment[i].DepositTime;
                    }     
                }
                else
                {
                    depTime =user[_add].investment[i].unstakeTime - user[_add].investment[i].DepositTime;
                }
                depTime=depTime/per_day_divider; //1 day
                if(depTime>0)
                {
                     rew  =  (((user[_add].investment[i].investedAmount * ((user[_add].investment[i].apr) *10**18) )/ (100*10**18) )/(user[_add].investment[i].timeframe));


                    totalReward += depTime * rew;
                }
            

            return totalReward;
        }



        function withdrawReward() external returns (bool success){
            uint Total_reward = get_TotalReward();
            require(Total_reward>0,"you dont have rewards to withdrawn");         
            uint withdraw_fee=(Total_reward*(withdrawFee))/(100*10**18);
            Token(Staking_token).transfer(owner,withdraw_fee);            
            Total_reward = Total_reward-withdraw_fee;

            Token(Reward_Token).transfer(msg.sender,(Total_reward * get_pertokenPrice())/10**18);                        
            user[msg.sender].totalWithdraw_reward+=Total_reward;

            return true;

        }

        


        function unStake(uint num) external  returns (bool success)
        {


            require(user[msg.sender].investment[num].investedAmount>0,"you dont have investment to withdrawn");             
            require(!user[msg.sender].investment[num].unstake ,"you have withdrawn");
            uint amount=user[msg.sender].investment[num].investedAmount;

           if(user[msg.sender].investment[num].withdrawnTime > block.timestamp)
            {
                uint penalty_fee=(amount*(penalty))/(100*10**18);
                Token(Staking_token).transfer(owner,penalty_fee);            
                amount=amount-penalty_fee;
            }
            Token(Staking_token).transfer(msg.sender,amount);             
          
            user[msg.sender].investment[num].unstake =true;    
            user[msg.sender].investment[num].unstakeTime =block.timestamp;    

            user[msg.sender].totalInvestment-=user[msg.sender].investment[num].investedAmount;


            return true;

        }

        function getTotalInvestment() public view returns(uint) {   
            
            return user[msg.sender].totalInvestment;

        }
        function get_pending_Rew(address add, uint num) public view returns(uint)
        {  
            return (user[add].investment[num].investedAmount * (user[add].investment[num].apr * 1 ether)/ 100 ether) - (getReward_perInv(num,add));
        }

        function getAll_investments() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint temp;
            uint currentIndex;
            
            for(uint i=0;i<num;i++)
            {
               if(!user[msg.sender].investment[i].unstake )
               {
                   temp++;
               }

            }
         
           allInvestments[] memory temp_arr =  new allInvestments[](temp) ;
            Invested =  new allInvestments[](temp) ;

            for(uint i=0;i<num;i++)
            {
               if( !user[msg.sender].investment[i].unstake ){

                   temp_arr[currentIndex]=user[msg.sender].investment[i];
                    temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);

                   currentIndex++;
               }

            }

            uint count=temp;
            for(uint i=0;i<temp;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }

        function getAll_investments_forReward() public view returns (allInvestments[] memory Invested)
        { 
            uint num = user[msg.sender].noOfInvestment;
            uint currentIndex;
            
         
            allInvestments[] memory temp_arr =  new allInvestments[](num) ;
            Invested =  new allInvestments[](num) ;

            for(uint i=0;i<num;i++)
            {

                temp_arr[currentIndex]=user[msg.sender].investment[i];
                temp_arr[currentIndex].reward=getReward_perInv(i,msg.sender);
                temp_arr[currentIndex].pending_rew=get_pending_Rew(msg.sender,i);

                currentIndex++;
               

            }

            uint count=num;
            for(uint i=0;i<num;i++)
            {
                count--;
                Invested[i]=temp_arr[count];

            }

            return Invested;

        }


        function referralLevel_earning(address _add) public view returns( uint[] memory arr1 )
        {
            uint[] memory referralLevels_reward=new uint[](3);
            for(uint i=0;i<3;i++)
            {
               
                referralLevels_reward[i] = user[_add].referralLevel[i].earning;


            }
            return referralLevels_reward ;


        }



        function referralLevel_count(address _add) public view returns( uint[] memory _arr )
        {
            uint[] memory referralLevels_reward=new uint[](3);
            for(uint i=0;i<3;i++)
            {

                referralLevels_reward[i] = user[_add].referralLevel[i].count;

            }
            return referralLevels_reward ;


        }

        function get_refStatement(address _add , uint _no) public view returns( refStatement_data1[] memory _arr )
        {
            return user_statement[_add][_no] ;
        }

        function transferOwnership(address _owner)  public
        {
            require(msg.sender==owner,"only Owner can call this function");
            owner = _owner;
        }

        function total_withdraw_reaward() view public returns(uint){


            uint Temp = user[msg.sender].totalWithdraw_reward;

            return Temp;
            

        }
        function get_currTime() public view returns(uint)
        {
            return block.timestamp;
        }
        
        function get_withdrawnTime(uint num) public view returns(uint)
        {
            return user[msg.sender].investment[num].withdrawnTime;
        }



       function withdrawFunds(uint _amount)  public
        {
            require(msg.sender==owner);

            uint bal = Token(Staking_token).balanceOf(address(this));
            require(bal>=_amount);

            Token(Staking_token).transfer(owner,_amount); 
        }

        function set_CSO(address _add)  public
        {
            require(msg.sender==owner);
            user[_add].isCso=true;

            Cso_arr.push(_add); 
        }
        
        function set_EMB(address _add)  public
        {
            require(msg.sender==owner);
            user[_add].isEmb=true;

            Emb_arr.push(_add); 
        }

        function getallCso() public view returns( address[] memory _arr )
        {
            return Cso_arr ;
        }


        function getallEmb() public view returns( address[] memory _arr )
        {
            return Emb_arr ;
        }
        function get_pertokenPrice() public view returns( uint price )
        {
            if(perSMTPrice==0)
            {
                return price_arr[Presale(Presale_contract).get_curr_Stage()];
            }
            else
            {
              return perSMTPrice;
            }
        }

        function setSMTPrice(uint val) public
        {
            require(msg.sender==owner);

            perSMTPrice=val;

        }


    } 