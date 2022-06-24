/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */


import React from 'react';

import Web3 from 'web3';
import {Transaction} from '@ethereumjs/tx'
import Common from '@ethereumjs/common';

import pancakeswapRouterABI from '../abi/pancakeswapRouterABI.json';
import apeswapRouterABI from '../abi/apeswapRouterABI.json';
import polyplayABI from '../abi/polyplayABI.json';
import busdABI from '../abi/busdABI.json';
import PancakeWallet from '../abi/pancakeWallet.json';

const datasByRow = [];

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data01:this.props.data01};
  }
  render(){
    return <div></div>
  }
}

class Loading extends React.Component {
  render(){
    if (this.props.loading) {
      return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
    } else {
      return <div className="py-1"></div>
    }
  }
}


class ChartCom extends React.Component {
  
  constructor(props) {
    super(props);

    const walletData = JSON.parse(JSON.stringify(PancakeWallet));
    //const walletData = JSON.parse(JSON.stringify(ApeWallet));
    
    this.state = { data01: datasByRow, loading:false, targetAccount:'', buyAmount:'', sellAmount:'', wallet:walletData, pancakeswapRouterABI:pancakeswapRouterABI.abi, apeswapRouterABI:apeswapRouterABI.abi, busdABI:busdABI.abi, polyplayABI:polyplayABI.abi};
    this.onCreate = this.onCreate.bind(this);   
    this.buyOnlyone = this.buyOnlyone.bind(this);  
    this.sellOnlyone = this.sellOnlyone.bind(this);     

  }

  componentDidMount(){       
     //const web3 = new Web3('https://bsc-dataseed1.binance.org:443');
    const web3 = new Web3('https://bsc-dataseed.binance.org/');

    // SPECIFY_THE_AMOUNT_OF_BNB_YOU_WANT_TO_BUY_FOR_HERE
    const originalAmountToBuyWith = '7.6';
    const bnbAmount = web3.utils.toWei(originalAmountToBuyWith, 'ether');

    // SPECIFY_THE_AMOUNT_OF_POLYPLAY_YOU_WANT_TO_SELL_FOR_HERE
    const originalAmountToSellWith = '1';
    const playAmount = web3.utils.toWei(originalAmountToSellWith, 'ether');

    const targetAccount = this.state.wallet[0]; // binance wallet
    //const targetAccount = {address:"0x23b6A96cE929eA950dA2338a3194584b9C5D9972", privateKey: "d701895d367fa1f6900602cdf6c2abb7a16ec7695896cebb2440d9d2f39da724"}; // metamask wallet
    
    console.log(`Buying Polyplay token for ${originalAmountToBuyWith} BNB from pancakeswap for address ${targetAccount.address}`);
    this.setState({targetAccount: targetAccount});
    this.setState({buyAmount: bnbAmount});   
    this.setState({sellAmount: playAmount});   
    //const res = this.buyOnlyone(targetAccount, bnbAmount);
  }
  
  async onCreate(start_date, end_date){
    

    this.setState({loading : false}) 
  }

  async buyOnlyone(targetAccount, buyAmount) {
    
    const web3 = new Web3('https://bsc-dataseed.binance.org/');
    const privateKey = Buffer.from(targetAccount.privateKey,      'hex',    );
    const tokenAddress = '0x9a3077f34cc30f9bf8e93a0369119bae0113d9cc'; // Polyplay token contract address
    const BUSDAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; //BUSD token address
    
    const pancakeSwapRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
    
    const contract = new web3.eth.Contract(this.state.pancakeswapRouterABI, pancakeSwapRouterAddress, {from: targetAccount.address});
    
    //const playToken = new web3.eth.Contract(this.state.polyplayABI, tokenAddress);
    //const playResult = await playToken.methods.balanceOf(targetAccount.address).call();    
    //const playBalance = web3.utils.fromWei(playResult); 

    const busdToken = new web3.eth.Contract(this.state.busdABI, BUSDAddress);
    const busdResult = await busdToken.methods.balanceOf(targetAccount.address).call();    
    const busdBalance = web3.utils.fromWei(busdResult); 

    const realAmount = (busdBalance*0.9).toString();;
    const amountIn = web3.utils.toWei(realAmount, 'ether');
    const amountOutMin = web3.utils.toWei('0.001', 'ether');

    busdToken.methods.approve(pancakeSwapRouterAddress, web3.utils.toHex(amountIn));

    const data = contract.methods.swapExactTokensForTokens(
        web3.utils.toHex(amountIn),
        web3.utils.toHex(amountOutMin),
        [BUSDAddress, tokenAddress],
        targetAccount.address,
        web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
    );

      
    const count = await web3.eth.getTransactionCount(targetAccount.address);
    const rawTransaction = {
        "from":targetAccount.address,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(290000),
        "to":pancakeSwapRouterAddress,
        "value":web3.utils.toHex('0'),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };
    //const common = new Common({ chain: Chain.Mainnet })
    const BSC_FORK = new Common.forCustomChain(
      'mainnet',
      {
          name: 'Binance Smart Chain Mainnet',
          networkId: 56,
          chainId: 56,
          url: 'https://bsc-dataseed.binance.org/'
      },
      'istanbul',
    );
    
    const transaction = new Transaction(rawTransaction, { 'common': BSC_FORK });
    const signedTx = transaction.sign(privateKey);
    
    await web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex')).on('receipt', console.log);
    
  }

  async sellOnlyone(targetAccount, sellAmount) {
    
    const web3 = new Web3('https://bsc-dataseed.binance.org/');
    const privateKey = Buffer.from(targetAccount.privateKey,      'hex',    );
    const tokenAddress = '0x9a3077f34cc30f9bf8e93a0369119bae0113d9cc'; // Polyplay token contract address
    //const WBNBAddress = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c'; // WBNB token address
    const BUSDAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; //BUSD token address
    
    const amountIn = web3.utils.toWei('1.1', 'ether');
    const amountOutMin = web3.utils.toWei('0', 'ether'); //"0.000" + Math.random().toString().slice(5,6);
    //const pancakeSwapRouterAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
    const apeSwapRouterAddress = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7';
    //const pancakeSwapRouterAddress = '0x838845a95b54ac243fd6d9209fe65b03bcb45565'; // play-busd liquidity pool address
    
    //const contract = new web3.eth.Contract(this.state.pancakeswapRouterABI, pancakeSwapRouterAddress, {from: targetAccount.address});
    const contract = new web3.eth.Contract(this.state.apeswapRouterABI, apeSwapRouterAddress, {from: targetAccount.address});
    const data = contract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
        web3.utils.toHex(amountIn),
        web3.utils.toHex(amountOutMin),
        [tokenAddress, BUSDAddress],
        targetAccount.address,
        web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
    );

    const count = await web3.eth.getTransactionCount(targetAccount.address);
    const rawTransaction = {
        "from":targetAccount.address,
        "gasPrice":web3.utils.toHex(5000000000),
        "gasLimit":web3.utils.toHex(290000),
        //"to":pancakeSwapRouterAddress,
        "to":apeSwapRouterAddress,
        "value":web3.utils.toHex('0'),
        "data":data.encodeABI(),
        "nonce":web3.utils.toHex(count)
    };
    //const common = new Common({ chain: Chain.Mainnet })
    const BSC_FORK = new Common.forCustomChain(
      'mainnet',
      {
          name: 'Binance Smart Chain Mainnet',
          networkId: 56,
          chainId: 56,
          url: 'https://bsc-dataseed.binance.org/'
      },
      'istanbul',
    );
    
    const transaction = new Transaction(rawTransaction, { 'common': BSC_FORK });
    const signedTx = transaction.sign(privateKey);
    
    await web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex')).on('receipt', console.log);

  }
  render(){
	  return <div className="exchange wallet">
				<div className="container-fluid small">
					<div className="mb-5">
						<Loading loading={this.state.loading}/>   
            <div className="container-fluid row">
              <div className="col-md-3">
                <input type="submit" className="btn btn-success add" onClick={this.buyOnlyone.bind(this, this.state.targetAccount, this.state.buyAmount)} value="Buy"/>
              </div>
              <div className="col-md-3">
                <input type="submit" className="btn btn-success add" onClick={this.sellOnlyone.bind(this, this.state.targetAccount, this.state.sellAmount)} value="Sell"/>
              </div>
              <div className="col-md-2">
                
              </div>
            </div>  
            <Group data01={this.state.data01} loding={this.state.loading}/>  
					</div>					
				</div>
			</div>      
  }
}	
export default ChartCom;


