import React, { Component } from 'react'
import Web3 from 'web3'
import DaiToken from '../abis/DaiToken.json'
import TokenFarm from '../abis/TokenFarm.json'
import Navbar from './Navbar'
import Main from './Main'
import './App.css'

class App extends Component {

  // 组件未挂起之前运行
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {
    const web3 = window.web3

    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })

    const networkId = await web3.eth.net.getId()

    // Load DaiToken
    const daiTokenData = DaiToken.networks[networkId]
    if(daiTokenData) {
      // 创建合约
      const daiToken = new web3.eth.Contract(DaiToken.abi, daiTokenData.address)
      this.setState({ daiToken })
      // 调用查询余额
      // 获取空投余额   
      let daiTokenBalance = await daiToken.methods.balanceOf("0x23757A95D0A69AEA2b39d114FA21C66b77775FA4").call()
      this.setState({ daiTokenBalance: daiTokenBalance.toString() })
      // 获取当前合约
      let thisBalance = await daiToken.methods.balanceOf(this.state.account).call()
      this.setState({ thisBalance: thisBalance.toString() })
    } else {
      window.alert('DaiToken contract not deployed to detected network.')
    }


    // Load TokenFarm
    const tokenFarmData = TokenFarm.networks[networkId]
    if(tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(TokenFarm.abi, tokenFarmData.address)
      this.setState({ tokenFarm })
    } else {
      window.alert('TokenFarm contract not deployed to detected network.')
    }

    this.setState({ loading: false })
  }
  // 加载metamask
  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  transferTokens = (address) => {
    this.setState({ loading: true })
    this.state.tokenFarm.methods.transferTokens(address).send({ from: this.state.account }).on('transactionHash', (hash) => {
      this.setState({ loading: false })
      alert("获取空投成功！")
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      daiToken: {},
      tokenFarm: {},
      daiTokenBalance: '0',
      thisBalance: '0',
      loading: true
    }
  }

  render() {
    let content
    if(this.state.loading) {
      content = <p id="loader" className="text-center">Loading...</p>
    } else {
      content = <Main
        daiTokenBalance={this.state.daiTokenBalance}
        thisBalance={this.state.thisBalance}
        transferTokens={this.transferTokens}
      />
    }

    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '600px' }}>
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                </a>

                {content}

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
