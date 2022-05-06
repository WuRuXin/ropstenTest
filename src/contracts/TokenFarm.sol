pragma solidity ^0.5.0;

import "./DaiToken.sol";

contract TokenFarm {
    string public name = "Drop Token";
    address public owner;
    DaiToken public daiToken;
    bool private flag;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public logAddress;

    constructor(DaiToken _daiToken) public {
        daiToken = _daiToken;
        owner = msg.sender;
    }

    // 防止重入
    modifier lock() {
        require(!flag, "flag is true");
        flag = true;
        _;
        flag = false;
    }

    // 向指定地址转账100 token
    function transferTokens(address _to) public lock{
        // 判断该账号是否已经领取过
        // require(!logAddress[_to], "already get token");
        // logAddress[_to] = true;

        // 向TokenFarm地址转移_amount个daiToken
        daiToken.transferFrom(owner, _to, 100 * 10**18);

        // 存储转账信息,单位为10**18
        stakingBalance[_to] = stakingBalance[_to] + 100;

        stakers.push(_to);
    }
}
