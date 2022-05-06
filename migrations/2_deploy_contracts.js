const DaiToken = artifacts.require('DaiToken')
const TokenFarm = artifacts.require('TokenFarm')

module.exports = async function(deployer, network, accounts) {
  // Deploy Mock DAI Token
  await deployer.deploy(DaiToken)
  const daiToken = await DaiToken.deployed()

  // Deploy TokenFarm
  await deployer.deploy(TokenFarm, daiToken.address)
  const tokenFarm = await TokenFarm.deployed()

  // Transfer 100 Mock DAI tokens to investor
  await daiToken.approve(tokenFarm.address, '1000000000000000000000000')
}
