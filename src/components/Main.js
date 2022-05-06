import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div id="content" className="mt-3">

        <table className="table table-borderless text-muted text-center">
          <thead>
            <tr>
              <th scope="col">空投</th>
            </tr>
          </thead>
        </table>

        <div className="card mb-4" >

          <div className="card-body">

            <form className="mb-3" onSubmit={(event) => {
                event.preventDefault()
                let address
                address = this.input.value
                this.props.transferTokens(address)
              }}>
              <div>
                <label className="float-left"><b>输入地址</b></label>
                <span className="float-right text-muted">
                  空投余额: {window.web3.utils.fromWei(this.props.daiTokenBalance, 'Ether')}
                </span>
              </div>
              <div className="input-group mb-4">
                <input
                  type="text"
                  ref={(input) => { this.input = input }}
                  className="form-control form-control-lg"
                  placeholder="您的地址"
                  required />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg">获取100 WMS!</button>
            </form>   
            <span className="float-right text-muted">
              您的余额: {window.web3.utils.fromWei(this.props.thisBalance, 'Ether')}
            </span>
          </div>
        </div>

      </div>
    );
  }
}

export default Main;
