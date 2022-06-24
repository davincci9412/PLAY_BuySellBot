/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import store from './store';

import { ToastContainer } from 'react-toastify';
import Pancake from './pages/pancake';
import Ape from './pages/ape';
import Chart from './pages/chart';
import Register from './pages/register';
import Login from './pages/login';
import Init from './pages/init';
import 'react-toastify/dist/ReactToastify.css';
import Crontab from 'reactjs-crontab';
import 'reactjs-crontab/dist/index.css';
import axios from 'axios';

import pancakeswapRouterABI from './components/abi/pancakeswapRouterABI.json';
import apeswapRouterABI from './components/abi/apeswapRouterABI.json';
import polyplayABI from './components/abi/polyplayABI.json';
import busdABI from './components/abi/busdABI.json';
import PancakeWallet from './components/abi/pancakeWallet.json';
import ApeWallet from './components/abi/apeWallet.json';
import Web3 from 'web3';
import {Transaction} from '@ethereumjs/tx'
import Common from '@ethereumjs/common';

// Check for token to keep user logged in
// if (localStorage.jwtToken) {
//   // Set auth token header auth
//   const token = localStorage.jwtToken;
//   setAuthToken(token);
//   // Decode token and get user info and exp
//   const decoded = jwt_decode(token);
//   // Set user and isAuthenticated
//   store.dispatch(setCurrentUser(decoded));
//   // Check for expired token
//   const currentTime = Date.now() / 1000; // to get in milliseconds
//   if (decoded.exp < currentTime) {
//     // Logout user
//     store.dispatch(logoutUser());

//     // Redirect to login
//     window.location.href = './login';
//   }
// } 



class App extends Component {

  constructor(props) {
    super(props);    

    localStorage.setItem("pancakeswap_index", 0);
    localStorage.setItem("apeswap_index", 0);

    const pancakeWalletData = JSON.parse(JSON.stringify(PancakeWallet));
    const apeWalletData = JSON.parse(JSON.stringify(ApeWallet));

    const tasks = [
      {
        fn: this.timer_check,
        config: '* * * * *'
        // this runs every minutes
      }
    ];

    
    this.state = { tasks: tasks, pancakeWallet:pancakeWalletData, apeWallet:apeWalletData, pancakeswapRouterABI:pancakeswapRouterABI.abi, apeswapRouterABI:apeswapRouterABI.abi, busdABI:busdABI.abi, polyplayABI:polyplayABI.abi, id:"", slippage:"", trade_amount:"", repeated_number:"", start:""};
    this.timer_check = this.timer_check.bind(this);
    this.trading_start = this.trading_start.bind(this);
  }

  componentDidMount(){       
    

  }

  timer_check=()=> {
    //Get the pancakeswap setting information from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/address/getPancakeSetting').then( async res => {
      const result = await res.data   
      if (result !== null){
        if (result.pancakeActionStatus) {
          const repeatedInterval = 1440 / result.pancakeRepeatedNumber;
          if (Number(localStorage.getItem("pancakeswap_index")) >= repeatedInterval){
            this.trading_start("1");
            localStorage.setItem("pancakeswap_index", 1);
          } else {
            localStorage.setItem("pancakeswap_index", Number(localStorage.getItem("pancakeswap_index"))+1);
          }  
        }  else {
          console.log("Pancakeswap trading not start_________"+new Date());
        }        
      }  else {
        console.log("Pancakeswap setting page not prepared_________"+new Date());
      }  
    })
    .catch(error => {
      console.log(error)
    })  

    //Get the apeswap setting information from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/address/getApeSetting').then( async res => {
      const result = await res.data   
      if (result !== null){
        if (result.apeActionStatus) {
          const repeatedInterval = 1440 / result.apeRepeatedNumber;
          if (Number(localStorage.getItem("apeswap_index")) >= repeatedInterval){
            this.trading_start("2");
            localStorage.setItem("apeswap_index", 1);
          } else {
            localStorage.setItem("apeswap_index", Number(localStorage.getItem("apeswap_index"))+1);
          }  
        }  else {
          console.log("Apeswap trading not start_________"+new Date());
        }        
      }  else {
        console.log("Apeswap setting page not prepared_________"+new Date());
      }  
    })
    .catch(error => {
      console.log(error)
    })  
  }
  
  trading_start = async(type)=>{
    const web3 = new Web3('https://bsc-dataseed.binance.org/');
    const playAddress = '0x9a3077f34cc30f9bf8e93a0369119bae0113d9cc'; //Polyplay token contract address
    const BUSDAddress = '0xe9e7cea3dedca5984780bafc599bd69add087d56'; //BUSD token address

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
    
    let routerAddress;
    let contract;
    if (Number(type) === 1){
      console.log("1_________"+new Date());
      routerAddress = '0x10ED43C718714eb63d5aA57B78B54704E256024E'; //Pancakeswap router address
      
      this.state.pancakeWallet.map(async(targetAccount, i)=>{
        contract = new web3.eth.Contract(this.state.pancakeswapRouterABI, routerAddress, {from: targetAccount.address});

        const playToken = new web3.eth.Contract(this.state.polyplayABI, playAddress);
        const playResult = await playToken.methods.balanceOf(targetAccount.address).call();    
        const playBalance = web3.utils.fromWei(playResult); 
  
        const busdToken = new web3.eth.Contract(this.state.busdABI, BUSDAddress);
        const busdResult = await busdToken.methods.balanceOf(targetAccount.address).call();    
        const busdBalance = web3.utils.fromWei(busdResult); 
  
        let data;
        if ((2*playBalance) > busdBalance) {
          const realAmount = parseInt(playBalance*0.8).toString();;
          const amountIn = web3.utils.toWei(realAmount, 'ether');
          const amountOutMin = web3.utils.toWei('0.001', 'ether');
          data = contract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            web3.utils.toHex(amountIn),
            web3.utils.toHex(amountOutMin),
            [playAddress, BUSDAddress],
            targetAccount.address,
            web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
          );
        } else {
          const realAmount = (busdBalance*0.9).toString();;
          const amountIn = web3.utils.toWei(realAmount, 'ether');
          const amountOutMin = web3.utils.toWei('0.001', 'ether');

          busdToken.methods.approve(routerAddress, web3.utils.toHex(amountIn));
          data = contract.methods.swapExactTokensForTokens(
            web3.utils.toHex(amountIn),
            web3.utils.toHex(amountOutMin),
            [BUSDAddress, playAddress],
            targetAccount.address,
            web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
          );
        }
        const privateKey = Buffer.from(targetAccount.privateKey, 'hex');      
        const count = await web3.eth.getTransactionCount(targetAccount.address);
        const rawTransaction = {
            "from":targetAccount.address,
            "gasPrice":web3.utils.toHex(5000000000),
            "gasLimit":web3.utils.toHex(290000),
            "to":routerAddress,
            "value":web3.utils.toHex('0'),
            "data":data.encodeABI(),
            "nonce":web3.utils.toHex(count)
        };
        
        
        const transaction = new Transaction(rawTransaction, { 'common': BSC_FORK });
        const signedTx = transaction.sign(privateKey);
        
        await web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex')).on('receipt', console.log);
        // web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex'), function(error, hash) {
        //   console.log("The hash of your transaction is: " + hash);
        // });

        return i;
      })        
    } else {
      console.log("2_________"+new Date());
      routerAddress = '0xcF0feBd3f17CEf5b47b0cD257aCf6025c5BFf3b7'; //Apeswap router address
      
      this.state.apeWallet.map(async(targetAccount, i)=>{
        contract = new web3.eth.Contract(this.state.apeswapRouterABI, routerAddress, {from: targetAccount.address});

        const playToken = new web3.eth.Contract(this.state.polyplayABI, playAddress);
        const playResult = await playToken.methods.balanceOf(targetAccount.address).call();    
        const playBalance = web3.utils.fromWei(playResult); 
  
        const busdToken = new web3.eth.Contract(this.state.busdABI, BUSDAddress);
        const busdResult = await busdToken.methods.balanceOf(targetAccount.address).call();    
        const busdBalance = web3.utils.fromWei(busdResult); 
  
        let data;
        if ((2*playBalance) > busdBalance ) {
          const realAmount = parseInt(playBalance*0.8).toString();
          const amountIn = web3.utils.toWei(realAmount, 'ether');
          const amountOutMin = web3.utils.toWei('0.001', 'ether');
          data = contract.methods.swapExactTokensForTokensSupportingFeeOnTransferTokens(
            web3.utils.toHex(amountIn),
            web3.utils.toHex(amountOutMin),
            [playAddress, BUSDAddress],
            targetAccount.address,
            web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
          );
        } else {
          const realAmount = (busdBalance*0.9).toString();
          const amountIn = web3.utils.toWei(realAmount, 'ether');
          const amountOutMin = web3.utils.toWei('0.001', 'ether');

          busdToken.methods.approve(routerAddress, web3.utils.toHex(amountIn));
          data = contract.methods.swapExactTokensForTokens(
            web3.utils.toHex(amountIn),
            web3.utils.toHex(amountOutMin),
            [BUSDAddress, playAddress],
            targetAccount.address,
            web3.utils.toHex(Math.round(Date.now()/1000)+60*20),
          );
        }
        const privateKey = Buffer.from(targetAccount.privateKey, 'hex');      
        const count = await web3.eth.getTransactionCount(targetAccount.address);
        const rawTransaction = {
            "from":targetAccount.address,
            "gasPrice":web3.utils.toHex(5000000000),
            "gasLimit":web3.utils.toHex(290000),
            "to":routerAddress,
            "value":web3.utils.toHex('0'),
            "data":data.encodeABI(),
            "nonce":web3.utils.toHex(count)
        };
        
        
        const transaction = new Transaction(rawTransaction, { 'common': BSC_FORK });
        const signedTx = transaction.sign(privateKey);
        
        await web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex')).on('receipt', console.log);
        // web3.eth.sendSignedTransaction('0x' + signedTx.serialize().toString('hex'), function(error, hash) {
        //   console.log("The hash of your transaction is: " + hash);
        // });

        return i;
      })  
    }   
    
  }
  

  render() {   

    return (
      <Provider store={store}>
        <React.Fragment>
          <Router>
            <div className="App">            
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/pancakeswap" component={Pancake} />
                <Route exact path="/apeswap" component={Ape} />
                <Route exact path="/chart" component={Chart} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/init" component={Init} />
                <Redirect to="/pancakeswap" />
              </Switch>
              <ToastContainer />
            </div>
          </Router>
          <Crontab
            tasks={this.state.tasks}
            timeZone='UTC' // UTC timezone.
            dashboard={{ hidden: true }}
          />
        </React.Fragment>
      </Provider>
      
    );
  }
}

export default App;
