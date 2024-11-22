//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

interface Token {
    function transfer(address to, uint tokens) external returns (bool success);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool) ;
      function balanceOf(address account) external view returns (uint256);
    function allowance(address owner, address spender) external view returns (uint256);

}
    interface Presale 
    {
        function get_curr_Stage() external view returns (uint);

    }

    contract Yousamaritan_LP
    {
        uint[10] price_arr =[0.00000001611 ether, 0.00000002549 ether, 0.00000004033 ether,0.00000006382 ether, 0.00000010098 ether, 0.00000015979 ether,0.00000025283 ether, 0.00000040005 ether, 0.00000063300 ether, 0.00000100160 ether];

        address  public owner;
        address Staking_token = 0x7Ed2D0e9C1a7F9f51115e0e70BDB55E7D652e35c; //YouSamaritan
        address Reward_Token = 0x51a61EC45a849360580Daaa52b1a30D699D1BB32; // DAI
        address Presale_contract = 0xeB4710354a8cbcEb0A2C3Aa30725E4bB4aE59Da7; // presale



        uint public totalusers;
        uint private id;

        // uint public per_day_divider= 1 days;
        uint public per_day_divider= 1 minutes;
        uint public totalbusiness; 
        uint public withdrawFee= 6 *10**6; 
        uint public penalty= 10 ether; 
        bool public doubleToken_promo;
        bool public doublDirectPercentage_promo;


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
            uint level1_percentage;
            uint level2_percentage;
            uint level3_percentage;

        }


        struct ref_data
        {
            uint count;
        }


        struct Data{

            mapping(uint=>allInvestments) investment;
            mapping(uint=>ref_data) referralLevel;
            address[] directs;

            uint noOfInvestment;
            uint totalInvestment;
            uint totalWithdraw_reward;
            bool investBefore;
            address upliner;

        }


        struct time_Apy
        {
            uint timeframe;
            uint APR;
            uint minimum_amount;
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
        uint[4]  firstlevelpercentage = [1.5 ether,6 ether,18 ether,36 ether];
        uint[2]  levelpercentage = [0.3 ether,0.1 ether];

        mapping(uint=>Data) public percentageOf;

        constructor(uint _id){
            
            owner=msg.sender;        
            id=_id;
            details[0].timeframe = 90 minutes;
            details[1].timeframe = 180 minutes;
            details[2].timeframe = 270 minutes;
            details[3].timeframe = 360 minutes;

            details[0].APR = 9;
            details[1].APR = 36;
            details[2].APR = 81;
            details[3].APR = 144;
                        
            details[0].minimum_amount = 120 ether;
            details[1].minimum_amount = 1200 ether;
            details[2].minimum_amount = 12000 ether;
            details[3].minimum_amount = 120000 ether;

        }

    

        function Stake(uint _investedamount,uint choose_val,address _referral) external  returns(bool success)
        {
            require(details[choose_val].APR > 0," apr iss");
            require(_investedamount > details[choose_val].minimum_amount);    

            // require(_investedamount > (details[choose_val].minimum_amount/get_Curr_pertokenPrice())*(10**18));    
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
                        user[owner].directs.push(msg.sender);
                    }
                }
                else
                {
                   
                    user[msg.sender].upliner = _referral;
                    user[_referral].directs.push(msg.sender);
                
                }
                address temp=user[msg.sender].upliner;
                for(uint i=0;i<3;i++)
                {
                    if(temp!=address(0))
                    {
                        user[temp].referralLevel[i].count++;
                        temp=user[temp].upliner;

                    }
                    else{
                        break;
                    }
                }
            }

            uint num = user[msg.sender].noOfInvestment;
            user[msg.sender].investment[num].investedAmount =_investedamount;
            user[msg.sender].investment[num].DepositTime=block.timestamp;
            user[msg.sender].investment[num].withdrawnTime=block.timestamp + details[choose_val].timeframe ;  
            
            user[msg.sender].investment[num].investmentNum=num;
            user[msg.sender].investment[num].apr=details[choose_val].APR;
            user[msg.sender].investment[num].timeframe=(details[choose_val].timeframe/per_day_divider);  
            user[msg.sender].investment[num].perTokenPrice=get_Curr_pertokenPrice(); 
            if(details[choose_val].timeframe == 90 minutes) 
            {
                user[msg.sender].investment[num].level1_percentage=firstlevelpercentage[0];  
            }
            else if(details[choose_val].timeframe == 180 minutes) 
            {
                user[msg.sender].investment[num].level1_percentage=firstlevelpercentage[1];  
            }
            else if(details[choose_val].timeframe == 270 minutes) 
            {
                user[msg.sender].investment[num].level1_percentage=firstlevelpercentage[2];  
            }
            else if(details[choose_val].timeframe == 360 minutes) 
            {
                user[msg.sender].investment[num].level1_percentage=firstlevelpercentage[3];  
            }
            user[msg.sender].investment[num].level2_percentage=levelpercentage[0];  
            user[msg.sender].investment[num].level3_percentage=levelpercentage[1];  

            user[msg.sender].totalInvestment+=_investedamount;
            user[msg.sender].noOfInvestment++;
            totalbusiness+=_investedamount;
            Token(Staking_token).transferFrom(msg.sender,owner,_investedamount);

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
                    rew  =  ((((user[msg.sender].investment[i].investedAmount * ((user[msg.sender].investment[i].apr) *10**18) )/ (100*10**18) )/(user[msg.sender].investment[i].timeframe)) * user[msg.sender].investment[i].perTokenPrice) / (10**18);

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
                     rew  =  ((((user[_add].investment[i].investedAmount * ((user[_add].investment[i].apr) *10**18) )/ (100*10**18) )/(user[_add].investment[i].timeframe)) * user[msg.sender].investment[i].perTokenPrice) / (10**18);


                    totalReward += depTime * rew;
                }
            

            return totalReward;
        }


        function Level_earning(address inv) public view returns( uint[3] memory arr1,uint  )
        { 

            uint[3] memory levelRewards;

            uint calc_rew; 
            address[] memory direct_members = user[inv].directs;
            uint next_member_count;
            uint totalEarned;


                for(uint j=0; j < 3;j++) //levels
                {            
                    for( uint k = 0;k < direct_members.length;k++) //members
                    {   

                        next_member_count+=user[direct_members[k]].directs.length;
                        for(uint i=0;i<user[direct_members[k]].noOfInvestment;i++)
                        {
                            uint temp_amount = user[direct_members[k]].investment[i].investedAmount;

                            if(j==0)
                            {
                                if(user[direct_members[k]].investment[i].apr==9)
                                {
                                    calc_rew +=  ((temp_amount * (firstlevelpercentage[0]) ) / (100 ether) );
                                }
                                else if(user[direct_members[k]].investment[i].apr==36)
                                {
                                    calc_rew +=  ((temp_amount * (firstlevelpercentage[1]) ) / (100 ether) );
                                }                                
                                else if(user[direct_members[k]].investment[i].apr==81)
                                {
                                    calc_rew +=  ((temp_amount * (firstlevelpercentage[2]) ) / (100 ether) );
                                }
                                else if(user[direct_members[k]].investment[i].apr==144)
                                {
                                    calc_rew +=  ((temp_amount * (firstlevelpercentage[3]) ) / (100 ether) );
                                }
                            }
                            else
                            {
                                calc_rew +=  ((temp_amount * (levelpercentage[j]) ) / (100 ether) );
                            }

                        }
                        


                    }

                    totalEarned+=calc_rew;
                    levelRewards[j]=calc_rew;
                    calc_rew=0;

                    address[] memory next_members=new address[](next_member_count) ;

                    for( uint m = 0;m < direct_members.length;m++) //members
                    {   
                        for( uint n = 0; n < user[direct_members[m]].directs.length; n++) //members
                        {   
                            next_members[calc_rew]= user[direct_members[m]].directs[n];
                            calc_rew++;
                        }
                    }
                    direct_members=next_members; 
                    next_member_count=0;
                    calc_rew=0;


                    
                }

            return (levelRewards,totalEarned);
        }

        function withdrawReward(uint level_rew, uint _id) external returns (bool success)
        {
            require(id==_id);
            uint Total_reward = get_TotalReward() + level_rew;
            require(Total_reward>0);         
            uint withdraw_fee=(Total_reward*(withdrawFee))/(100*10**6);
            Token(Reward_Token).transfer(owner,withdraw_fee);            
            Total_reward = Total_reward-withdraw_fee;

            Token(Reward_Token).transfer(msg.sender,Total_reward);                        
            user[msg.sender].totalWithdraw_reward += Total_reward;

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
                Token(Reward_Token).transfer(owner,(penalty_fee * user[msg.sender].investment[num].perTokenPrice) /10**18);            
                amount=amount-penalty_fee;
            }

            Token(Reward_Token).transfer(msg.sender,(amount * user[msg.sender].investment[num].perTokenPrice) /10**18);             
          
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
            return (((user[add].investment[num].investedAmount * (user[add].investment[num].apr * 1 ether)/ 100 ether)* user[msg.sender].investment[num].perTokenPrice) / (10**18)) - (getReward_perInv(num,add));
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


        function get_Curr_pertokenPrice() public view returns( uint price )
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
       function setID(uint val) public
        {
            require(msg.sender==owner);

            id=val;

        }
        function Updtae_penaltyFeePercentage(uint val)  public
        {
            require(msg.sender==owner);
            penalty = val;
        }
        
        function Updtae_withdrawFeePercentage(uint val)  public
        {
            require(msg.sender==owner);
            withdrawFee = val;
        }

        function Updtae_staking_APR(uint no,uint val)  public
        {
            require(msg.sender==owner);
            details[no].APR=val;
        }
        
        function Updtae_staking_MinInvestment(uint no,uint val)  public
        {
            require(msg.sender==owner);
            details[no].minimum_amount=val;
        }

        function Updtae_FirstRefLevelPercentage(uint no,uint val)  public
        {
            require(msg.sender==owner);
            firstlevelpercentage[no]=val;
        }   

        function Updtae_RefLevelPercentage(uint no,uint val)  public
        {
            require(msg.sender==owner);
            levelpercentage[no]=val;
        }   

    } 