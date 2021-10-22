pragma solidity ^0.5.16;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ComptrollerInterface.sol";
import "./CTokenInterface.sol";

contract CompoundInteraction {
    //for more info on how to use these interfaces in this context:
    // https://stackoverflow.com/questions/64733976/i-am-having-a-difficulty-of-understanding-interfaces-in-solidity-what-am-i-miss

    //interacting with compound
    // https://medium.com/compound-finance/supplying-assets-to-the-compound-protocol-ec2cf5df5aa#afff
    // https://medium.com/compound-finance/borrowing-assets-from-compound-quick-start-guide-f5e69af4b8f4

    // transfer dai to this contract
    // dai.functions.transfer(<contract_address>, <amount>).transact({'from': str(accounts[0])})
    
    IERC20 dai;
    CErc20 cDai;
    address daiTokenAddress;
    IERC20 bat;
    CErc20 cBat;
    ComptrollerInterface comptroller;
    
    constructor (
        address _dai,
        address _cDai,
        address _bat,
        address _cBat,
        address _comptroller) public {
            dai = IERC20(_dai); //_dai is the dai erc20 token contract address
            cDai = CErc20(_cDai);
            daiTokenAddress = _cDai;
            bat = IERC20(_bat);
            cBat = CErc20(_cBat);
            comptroller = ComptrollerInterface(_comptroller);
    }
        
    function invest() external returns(uint) {
        dai.approve(address(cDai), 10000);
        uint mintResult =  cDai.mint(10000);
        return mintResult;
    }
    
    function cashOut() external {
        uint balance = cDai.balanceOf(address(this));
        cDai.redeem(balance);
    }
    
    function borrow() external {
        dai.approve(address(cDai), 10000);
        cDai.mint(10000);   
        
        address[] memory markets;
        markets[0] = daiTokenAddress;
        comptroller.enterMarkets(markets);
        
        cBat.borrow(100);
    }
    
    function payback() external {
        bat.approve(address(cBat), 150); //extra for interest
        cBat.repayBorrow(100);
        
        //optional
        uint balance = cDai.balanceOf(address(this));
        cDai.redeem(balance);
    }
}