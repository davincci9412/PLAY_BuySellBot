/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
//import { Box } from '@blockstack/ui';
//import Address from '../../../assets/images/address-icon.png';
import Delete from '../../../assets/images/delete-icon.png';
//import Bell from '../../../assets/images/blueBell-icon.png';
import Pagination from './Pagination';


const datasByRow = [];
const symbolByRow = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false, chainValid: false, formValid: false, wallet_address:'', history:false, cookieDelete:false, wallet_name:'', wallet_description:'', wallet_chain:'', token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      localStorage.setItem("wallet_address", JSON.stringify(symbolByRow));
      this.state.cookieDelete = false;
    } else {
      if (!Array.isArray(JSON.parse(localStorage.getItem("wallet_address")))) {
        localStorage.setItem("wallet_address", JSON.stringify(symbolByRow));
        this.state.cookieDelete = false;
      } else {
        this.state.cookieDelete = true;
      }
    }
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClick( e) {	  
    this.setState({history:!this.state.history});
  }
  handleAdd( e, wallet_address) {	  
    this.setState({wallet_address: wallet_address})
    this.setState({history:!this.state.history});
    this.validateField('wallet_address', wallet_address, false);
  }
  handleClear() {
	  this.setState({wallet_address:'', history:false, wallet_name:'', wallet_description:'', wallet_chain:'', addressValid: false,  chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
  }
  
  validateField(fieldName, value, valueExist) {
    if (value.length >=1 ) { valueExist = true; } else {valueExist = false; }
    switch(fieldName) {
      case 'wallet_address':
        this.setState({addressValid: valueExist}, ()=>{
          this.setState({addressValid: valueExist});
        })
        break;
      case 'wallet_chain':
        this.setState({chainValid: valueExist}, ()=>{
          this.setState({chainValid: valueExist});
        })
        break;        
      default:
        break;
    }
    this.setState({formValid: this.state.addressValid && this.state.chainValid}, ()=>{
      this.setState({formValid: this.state.addressValid && this.state.chainValid});
    })
  }

  handleBelowOne({target}){
    this.props.onBelowOne.call(null, target.checked);    
  }
  handleAboveThousand({target}){
    this.props.onAboveThousand.call(null, target.checked);    
  }
  handleBuy({target}){
    this.props.onBuy.call(null, target.checked);    
  }
  handleSell({target}){
    this.props.onSell.call(null, target.checked);
  }
  handleBNB({target}){
    this.props.onBNB.call(null, target.checked);
  }
    
  render(){
	  return  <div className='search-box container-fluid'>
              <div className="row">
                <div className='col-md-3'>
                  <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} click={this.handleClick.bind(this)} value={this.state.wallet_address} placeholder='Address' />
                  <div id="history_view" className={this.state.history&&this.state.cookieDelete? 'history_view' : 'history_view close'}>
                      {    
                        JSON.parse(localStorage.getItem("wallet_address")).reverse().map((data, i) => {
                          return <History key={i} uuid={i} data={data} history={this.state.history}  add={this.handleAdd.bind(this, data)}/>
                        })
                      }
                  </div>
                </div>	  
                <div className='col-md-2'><Input0 name='wallet_name' change={this.handleChange.bind(this, 'wallet_name')} value={this.state.wallet_name} placeholder='Name' /></div>	  
                <div className='col-md-4'><Input0 name='wallet_description' change={this.handleChange.bind(this, 'wallet_description')} value={this.state.wallet_description} placeholder='Description' /></div>
                <div className='col-md-2'><Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Chain' /></div>
                <div className='col-md-1'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/></div>	  
              </div>
              <div className="container-fluid row checkbox">
                <div className = 'col-md-4'>
                  <input type="checkbox" onClick={this.handleBelowOne.bind(this)}/>Transactions below 1 USD
                </div>
                <div className = 'col-md-4'>
                  <input type="checkbox" onClick={this.handleBuy.bind(this)}/>Buy transactions 
                </div>
                <div className = 'col-md-4'>
                  <input type="checkbox" onClick={this.handleBNB.bind(this)}/>Do not display BNB transactions
                </div>
              </div>
              <div className="container-fluid row checkbox">
                <div className = 'col-md-4'>
                  <input type="checkbox" onClick={this.handleAboveThousand.bind(this)}/>Transactions above 1000 USD
                </div>
                <div className = 'col-md-4'>
                  <input type="checkbox" onClick={this.handleSell.bind(this)}/>Sell transactions
                </div>
              </div>
            </div>
          
  }
}
class History extends React.Component {
	onClick() {
	  this.props.add.call(this, this.props.data);   
	}	
	render(){
		return <div className="cursor item" onClick={this.onClick.bind(this)} >{this.props.data}</div>
	}
}
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  render(){
    return  <input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} onClick={this.props.click} autoComplete="off" value={this.props.value} className='form-control'/>
  }  
}
class Input0 extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  render(){
    return  <input type='text' name={this.props.name} placeholder={this.props.placeholder} autoComplete="off" onChange={this.props.change} value={this.props.value} className='form-control'/>
  }  
}

class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Chain</option>	 
        <option value="1">BSC chain</option>	 
        <option value="2">ETH chain</option> 
      </select>
  }
}
class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}	
	render(){
		return <div className="td medium">
		  <div className="cursor text-center" onClick={this.onClick.bind(this)} autoComplete="off" ><img src={Delete} alt="Delete"/></div>
		</div> 
	}
}

class RenameButton extends React.Component {
	render(){
		return <div className="td">
		  <div className="cursor "><ModalWindow index={this.props.uuid} old_name= {this.props.name} state={this.props.state} rename={this.props.onRename}/></div>
		</div> 
	}
}
/*
class NotificationButton extends React.Component {
	onClick() {
	  this.props.notification.call(null, this.props.uuid);
	}	
	render(){
		return <div className="td half">
		  <div className="cursor text-center" ><img src={Bell} alt="Notification"/></div>
		</div> 
	}
}

class UpdateButton extends React.Component {
	onClick() {
	  this.props.update.call(null, this.props.uuid, this.state.buy_token_input);
	}
	handleChange(propertyName, e) {	  
		const change = {};
		change[propertyName] = e.target.value;
		this.setState(change);
	}
	render(){
		return <div className="td"><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} value={this.props.value} className='form-control' /><button type="button" className="input-group-postpend btn btn-success" onClick={this.onClick.bind(this)}>Go</button></div></div> 		
	}
}
*/
class AddButton extends React.Component {
	onClick(){
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      this.props.newData.temp1 = [];
    } else {
      this.props.newData.temp1 = JSON.parse(localStorage.getItem("wallet_address"))
    }
    this.props.newData.temp1.forEach((data, i)=>{
      if (data === this.props.newData.wallet_address) this.props.newData.temp2 = "duplicate"
    })
    if (this.props.newData.temp2 !== "duplicate") this.props.newData.temp1.push(this.props.newData.wallet_address);
    localStorage.setItem("wallet_address", JSON.stringify(this.props.newData.temp1));
	  this.props.newData.temp1 = this.props.newData.temp2 = ""
    this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_name, this.props.newData.wallet_description, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.temps, this.props.newData.transaction_wallet, this.props.newData.transaction_crypto, this.props.newData.transaction_date,this.props.newData.transaction_qty, this.props.newData.transaction_amount, this.props.newData.transaction_opponent, this.props.newData.transaction_orientation, this.props.newData.transaction_token, this.props.newData.transaction_price, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <button type="button" style={{ "width": "100%" }} className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled}>Add</button>
	}
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copySuccess: '' }
  }
  onChange(){ 
  }
  copyToClipboard = (e) => {
    this.inputAddress.select();
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    this.setState({ copySuccess: 'Copied!' });
  };
  render(){
    if (this.props.type === "gear"){
      return <div className="td no"><RenameButton uuid={this.props.uuid} name={this.props.name} state={this.props.datas} onRename={this.props.onRename}/></div>  
    } else if (this.props.type === "wallet_address"){
      return <div className="td long1"><div className="addressCopy hash">
                <input type="text" ref={(input) => this.inputAddress = input} className="form-control" value={this.props.placeholder} onChange={this.onChange.bind(this)} readOnly/>
                <span className="fa fa-clone cursor" onClick={this.copyToClipboard}></span>{this.state.copySuccess}
              </div>
            </div>  
    } else if (this.props.type === "wallet_description"){
      return <div className="td long2">{this.props.placeholder}</div>  
    } else if (this.props.type === "transaction_from" || this.props.type === "transaction_to"){
      if (this.props.fullwidth ==="1"){
        return <div className="td long"><div className="addressCopy hash">
                <input type="text" ref={(input) => this.inputAddress = input} className="form-control" value={this.props.placeholder} onChange={this.onChange.bind(this)} readOnly/>
                <span className="fa fa-clone cursor" onClick={this.copyToClipboard}></span>{this.state.copySuccess}
              </div>
            </div>  
      } else {
        return <div className="td"><a href={this.props.hash} rel="noreferrer" target="_blank" className="text-success">{this.props.placeholder.substring(0, 20).concat("...")}</a></div>  
      }
    } else if (this.props.type === "transaction_qty"){
      if (this.props.orientation) {
        return <div className="td medium"><span className="text-danger">-{this.props.placeholder}</span></div>  
      } else {
        return <div className="td medium"><span >{this.props.placeholder}</span></div>  
      }
    } else if (this.props.type === "transaction_amount"){
      if (this.props.orientation) {
        return <div className="td medium"><span className="text-danger">-${this.props.placeholder}</span></div>  
      } else {
        return <div className="td medium"><span>${this.props.placeholder}</span></div>
      }
    } else if (this.props.type === "transaction_token" || this.props.type === "transaction_date"){
      return <div className="td medium"><span>{this.props.placeholder}</span></div> 
    } else {
      return <div className="td">{this.props.placeholder}</div>  
    }	
  }
}

class Row extends React.Component {
  render(){
    return  <div className="tr">
	    <Column type='gear' placeholder={this.props.wallet_address} uuid={this.props.uuid} name={this.props.wallet_name} datas={this.props.datas} onRename={this.props.onRename}/>
      <Column type='wallet_address' placeholder={this.props.wallet_address} />
      <Column type='wallet_description' placeholder={this.props.wallet_description} />
      {/*<NotificationButton uuid={this.props.uuid} notification={this.props.onNotification} />*/}
      <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
    </div>
  }
}

/*<RenameButton uuid={this.props.uuid} onRename={this.props.onRename} old_description={this.props.wallet_description} state={this.props.datas}/>*/

class Table extends React.Component {
  render(){
	return <div className="">
		<div className="wallet-header mb-4">
			<h4 className="mb-4">Addresses Tracked</h4> 
			{/*<h5 className="transaction cursor">Show All Address ID</h5>*/}
		</div>
        <div className="table one">
            <div className="tr thead">
			        <div className="td table-header no" ></div>
              <div className="td table-header long1" >ADDRESS</div>
              <div className="td table-header long2" >DESCRIPTION</div>
              <div className="td table-header medium no"></div>
            </div>
            {
              this.props.datas.map((data, i) => {
              return <Row key={i} uuid={i} datas={this.props.datas} wallet_address={data.wallet_address} wallet_name={data.wallet_name} wallet_description={data.wallet_description} tables={data.tables} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
              })
            }
        </div>
        {
          this.props.datas.map((data, i) => {
            if (data.tables !== undefined){
              return <Section key={i} uuid={i} tables = {data.tables} search_list={data.search_list} transactions={data.transactions} wallet_address={data.wallet_address} name={data.wallet_name} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
            } else {
              return false;
            }              
          })
        }
      </div>
      
  }
}

class Row1 extends React.Component {
  render(){
  const hash_link = "https://bscscan.com/tx/"+this.props.data1.hash;
	return  <div className="table">
      <div className="tr">
        <Column type='transaction_token' placeholder={this.props.data1.transaction_token} />
        <Column type='transaction_from' placeholder={this.props.data1.transaction_from} hash={hash_link}/>
        <Column type='transaction_to' placeholder={this.props.data1.transaction_to} hash={hash_link}/>
        <Column type='transaction_date' placeholder={this.props.data1.transaction_date} />
        <Column type='transaction_qty' placeholder={this.props.data1.transaction_qty} orientation={this.props.data1.transaction_orientation}/>
        <Column type='transaction_amount' placeholder={this.props.data1.transaction_amount} orientation={this.props.data1.transaction_orientation} />
      </div>
      <div className="tr no-display">
      <Column type='transaction_from' placeholder={this.props.data1.transaction_from} fullwidth="1"/>
      <Column type='transaction_to' placeholder={this.props.data1.transaction_to} fullwidth="1"/>
    </div>
  </div>
  }
}
class Section extends React.Component{  
  constructor(props) {
    super(props);  
    this.state = { current_transactions: this.props.transactions, currentPage: null, totalPages: null, loading:false};       
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({current_transactions: nextProps.transactions});
    this.setState({currentPage:1});
  }

  onPage = async(data, transactions) =>{
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    transactions = this.props.search_list.slice(offset, currentPage * pageLimit)
    this.setState({current_transactions: transactions });
  }

  render(){
    const current_transactions = this.state.current_transactions;
    const totalRecords = this.props.search_list.length;
    if (totalRecords === 0) return null;

    return <div className="transaction-section table hide">
	  <div className="wallet-header mb-4">
			<h4 className="mb-4">Transaction Log for Address{(this.props.name)?[this.props.name]:""} Tracked</h4> 
			<h5 className="transaction cursor"  onClick={showClick}><span className="address-show">Show All Address ID</span><span className="address-hide">Hide All Address ID</span></h5>
	  </div>
	  <div className="table two">
          <div className="tr thead">
            <div className="td table-header medium">TOKEN</div>
            <div className="td table-header ">FROM</div>
            <div className="td table-header ">TO</div>
            <div className="td table-header medium">AGE</div>
            <div className="td table-header medium">QTY</div>
            <div className="td table-header medium">AMOUNT</div>
          </div>
          {
            current_transactions.map((data1, j) => {
              return <Row1 key={j} uuid={j} data1={data1} />
            })
          }       
      </div>
      <Pagination totalRecords={totalRecords} pageLimit={100} pageNeighbours={1} onPage={this.onPage} />
      <Loading loading={this.state.loading} />
    </div>
  }
}

class ModalWindow extends React.Component {  
  constructor(props) {
    super(props);
    this.state = {datas:this.props.state, show: false, new_name:''};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});
  handleSave = () => {
    this.props.state[this.props.index].wallet_name = this.state.new_name;
    this.setState({show:false});
	  this.props.rename.call(null, this.props.state);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  } 
  
  render (){
    return <span><span variant="primary" onClick={this.handleShow} className="cursor address-icon"></span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change the name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Current Name: </label>
          <input type='text' className='form-control' value={this.props.old_name} placeholder='Name'  readOnly/>
        </div>
        <div className="form-group">
          <label>New Name: </label>
          <input type='text' name='new_name' onChange={this.handleChange.bind(this, 'new_name')} className='form-control' placeholder='New Name' />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className="cursor" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" className="cursor" onClick={this.handleSave.bind(this)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </span>
  }
}

class Loading extends React.Component {
  render(){
    if (this.props.loading) {
      return <div className="justify-content-center navbar mb-3"><img width="100" height="100" src="/2.gif" alt="Please wait for loading"/></div>
    } else {
      return <div></div>
    }
  }
}

class WalletsTracked extends React.Component {
  constructor(props) {
    super(props);
    this.state = { datas:datasByRow, symbols:symbolByRow, tables:datasByRow, tokens:datasByRow, temps:datasByRow, loading:false, pageLimit:100, below:false, above:false, buy:false, sell:false, bnb:false};

    this.onDelete = this.onDelete.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
    this.onBelowOne = this.onBelowOne.bind(this);
    this.onAboveThousand = this.onAboveThousand.bind(this);
    this.onBuy = this.onBuy.bind(this);
    this.onSell = this.onSell.bind(this);
    this.onBNB = this.onBNB.bind(this);

    
  }

  componentDidMount() {
    //Get the history of the user from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/tracker/history', { params : {user_id:localStorage.getItem("id")}}).then( async res => {
      const historys = await res.data   
      if (historys.length > 0){
        historys.map(async (history, i)=>{
          await this.onCreate.call(null, history.wallet_address, history.wallet_name, history.wallet_description, history.wallet_chain, true )
          return i;
        })
      }    
    })
    .catch(error => {
      console.log(error)
    })
  }

  onDelete(id) {
    const data_list = this.state.datas;
    const wallet_address = data_list[id].wallet_address;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
    axios.get(process.env.REACT_APP_SERVER_URL+'/tracker/delete', { params : {user_id:localStorage.getItem("id"), wallet_address:wallet_address}}).then( async res => {
      const result = await res.data;
      if (result.status === "ok"){
        console.log("ok")
      } else {
        console.log("fail")
      } 
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  onRename(data_list) {
    this.setState({datas: data_list});
  }

  async onUpdate(id, buy_token_input) {	
  }
  
  async onRefresh(id, transaction, status){	
  }   

  async onCreate(wallet_address, wallet_name, wallet_description, wallet_chain, page_loading, tables, temps, token_db, transactions, search_list, transaction_token, transaction_orientation, transaction_price, chain, temp1, temp2, temp3, url1, url2, days, hours, minutes, below_search, sell_search, running){
	  wallet_address = wallet_address.trim().toLowerCase();    
    this.setState({wallet_address : wallet_address})
    tables = temps = search_list = [];

    running = true;
    if (this.state.datas.length > 0){
      this.state.datas.map((data, i)=>{
        if (data.wallet_address === wallet_address){
          running = false;
          alert("The wallet is already existed on screen.")
        }
        return i;
      })
    }

    if (running){
      this.setState({loading : true})
      switch(Number(wallet_chain)) {
        case 1:
          url1 = 'https://api.bscscan.com/api?module=account&action=txlist&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          url2 = 'https://api.bscscan.com/api?module=account&action=tokentx&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          chain = 'binancecoin'
          transaction_token = 'BNB'
          break;
        case 2:
          url1 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url2 = 'https://api.etherscan.io/api?module=account&action=tokentx&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          chain = 'ethereum'
          transaction_token = 'ETH'
          break;
        default:
          break;
      }
      
      //Get the token list from DB
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/token').then( async res => {
        token_db = await res.data   
        token_db.forEach((token, i)=>{
          if (token.token_id === "binancecoin") {
            transaction_price = token.token_price;          
          }
        })
      })
      .catch(error => {
        console.log(error)
      })

      await axios.get(process.env.REACT_APP_SERVER_URL+'/tracker/transactions', { params:{wallet_address: wallet_address}}).then( async res => {
        const results = await res.data; //get the BNB transactions from the DB
        results.map((data, i) => {
          temp2 = Number(data.value)/1000000000000000000
          temp3 = Math.floor(Date.now()/1000) - Number(data.timeStamp)
          days = Math.floor(temp3/60/60/24);
          hours = Math.floor(temp3/60/60- days*24);
          minutes = Math.floor(temp3/60- days*24 - hours*60);
          if (days === 0) {
            temp3 = hours +" h " + minutes + " m" 
          } else {
            temp3 = days +" d " + hours + " h";
          }
          (data.from === wallet_address)?  transaction_orientation = true : transaction_orientation = false;  
          tables = tables.concat([{ hash:data.hash, transaction_token: transaction_token, transaction_from: data.from, transaction_to:data.to, transaction_date:temp3, transaction_qty:convert(temp2), transaction_orientation:transaction_orientation, transaction_amount:convert(Number(temp2) * Number(transaction_price)), transaction_price:convert(transaction_price)}]);
          return i;
        })
      }).catch(error => {          
      }) 

      await axios.get(process.env.REACT_APP_SERVER_URL+'/tracker/tokenTransactions', { params : {wallet_address: wallet_address}}).then( async res => {
        const results = await res.data; //get the token transactions from the DB
        results.map((data, i) => {
          temp1 = 10**data.tokenDecimal;
          temp2 = Number(data.value)/temp1
          //temp2 = (Number(data.value)/temp1).toFixed(8).replace(/0+$/, "").replace(/.\s*$/, "") 
          temp3 = Math.floor(Date.now()/1000) - Number(data.timeStamp)
          days = Math.floor(temp3/60/60/24);
          hours = Math.floor(temp3/60/60- days*24);
          minutes = Math.floor(temp3/60- days*24 - hours*60);
          if (days === 0){
            temp3 = hours +" h " + minutes + " m"
          } else {
            temp3 = days +" d " + hours + " h"
          }
          if (data.from === wallet_address){
            transaction_orientation = true;
          } else {
            transaction_orientation = false;                
          }
          temps = temps.concat([{ hash:data.hash, contractAddress:data.contractAddress, transaction_decimal:data.tokenDecimal, transaction_token: data.tokenSymbol, transaction_from: data.from, transaction_to:data.to, transaction_date:temp3, transaction_qty:convert(temp2), transaction_orientation:transaction_orientation}]);
          return i;
        })
      }).catch(error => {          
      }) 

      if (temps.length > 0){    
		  temps.map(async(data, i)=>  {
        if (data.transaction_token !== "BNB"){
          temp1 = false;
          token_db.map((token, j)=>{
          if (token.token_address.includes(data.contractAddress)) { 
            temps[i].transaction_price = convert(token.token_price);
            temps[i].transaction_amount = convert(Number(data.transaction_qty) * Number(token.token_price));
            temp1 = true;
          }  
          return j;
          })          
          if (!temp1) {
          temps[i].transaction_price = 0;
          temps[i].transaction_amount = 0;
          } 
        }
		  })  
	  }

      tables = tables.concat(temps);
      temps = [];
      below_search = false;
      sell_search = false;
      //check below one dollar
      if (this.state.below){
        tables.map((table, i)=>{
          if (Number(table.transaction_amount) >= 1 ){
            search_list = search_list.concat(table);         
          }
          return i;
        })
        below_search = true;
      } else {
        search_list = search_list.concat(tables);
      }
      //check above 1000 dollars
      if (search_list.length > 0 ){
        if (this.state.above){    
          if (!below_search){
            search_list.map((table, i)=>{
              if (Number(table.transaction_amount) >= 1000 ){
                temps = temps.concat(table);         
              }
              return i;
            })
            search_list = []
            search_list = temps;
            temps = [];
          }    
        } 
      } 
      //check the sell transactions
      if (search_list.length > 0 ){
        if (this.state.sell){ 
          search_list.map((table, i)=>{
            if (table.transaction_from === wallet_address){
              temps = temps.concat(table);         
            }
            return i;
          })
          sell_search = true;
          search_list = []
          search_list = temps;
          temps = [];
        } 
      } 
      //check the buy transactions
      if (search_list.length > 0 ){
        if (this.state.buy && sell_search){  
          if (!sell_search){ 
            search_list.map((table, i)=>{
              if (table.transaction_to === wallet_address){
                temps = temps.concat(table);         
              }
              return i;
            })
            search_list = []
            search_list = temps;
            temps = [];
          }
        } 
      } 
      //check the BNB remove
      if (search_list.length > 0 ){
        if (this.state.bnb){ 
          search_list.map((table, i)=>{
            if (table.transaction_token !== "BNB"){
              temps = temps.concat(table);         
            }
            return i;
          })
          search_list = []
          search_list = temps;
          temps = [];
        } 
      } 

      const page_end = Number(this.state.pageLimit);
      transactions = search_list.slice(0, page_end); 
      
      const history = {user_id: localStorage.getItem("id"), wallet_address:wallet_address.trim().toLowerCase(), wallet_name:wallet_name, wallet_description:wallet_description, wallet_chain:wallet_chain}
      if (!page_loading){
      await axios.post(process.env.REACT_APP_SERVER_URL+'/tracker/add', history).then( async res => {
          const result = await res.data;
          if (result.status === "ok"){
            console.log("ok")
          } else {
            console.log("fail")
          } 
        })
        .catch(error => {
          console.log(error);
        }) 
      }

      this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address.trim().toLowerCase(), wallet_name:wallet_name, wallet_description:wallet_description, wallet_chain:wallet_chain, tables:tables, search_list, transactions:transactions, pageLimit:this.state.pageLimit}])})
      this.setState({loading : false})
    }   
  }

  belowSearch(search_list, tables){
      if (tables.length > 0){
        tables.map((table, j)=>{
          if (Number(table.transaction_amount) >= 1){
            search_list = search_list.concat(table)
          } 
          return j;
        })
        return search_list;
      }
  }
  onBelowOne(below, search_list, data_list) {
    this.setState({below: below});
    data_list = this.state.datas;
    data_list.map((data, i)=>{
      search_list = []      
      if (below){
        // data.search_list.map((table, j)=>{
        //   if (Number(table.transaction_amount) <= 1){
        //     search_list = search_list.concat(table)
        //   } 
        //   return j;
        // })
        search_list = this.belowSearch(search_list, data.search_list)
        data.search_list = search_list;
      } else {
        search_list = search_list.concat(data.tables);
        if (this.state.buy){
          if (search_list.length > 0) {
            search_list = this.buySearch([], search_list) 
          } else {
            search_list = this.buySearch(search_list, data.tables) 
          }
        }
        if (this.state.above){
          if (search_list.length > 0) {
            search_list = this.aboveSearch([], search_list) 
          } else {
            search_list = this.aboveSearch(search_list, data.tables) 
          }
        }
        if (this.state.sell){
          if (search_list.length > 0) {
            search_list = this.sellSearch([], search_list) 
          } else {
            search_list = this.sellSearch(search_list, data.tables) 
          }
        }
        if (this.state.bnb){
          if (search_list.length > 0) {
            search_list = this.bnbSearch([], search_list) 
          } else {
            search_list = this.bnbSearch(search_list, data.tables) 
          }
        }
        data.search_list = search_list;
      }
      const page_end = Number(this.state.pageLimit);
      data.transactions = data.search_list.slice(0, page_end); 
      data_list[i] = data;
      return i;
    })    
    this.setState({datas: data_list});
  }
  aboveSearch(search_list, tables){
    if (tables.length > 0){
      tables.map((table, j)=>{
        if (Number(table.transaction_amount) >= 1000){
          search_list = search_list.concat(table)
        } 
        return j;
      })
      return search_list;
    }
  }
  onAboveThousand(above, search_list, data_list) {
    this.setState({above: above});
    data_list = this.state.datas;
    data_list.map((data, i)=>{
      search_list = []      
      if (above){
        search_list = this.aboveSearch(search_list, data.search_list)
        data.search_list = search_list;
      } else {
        search_list = search_list.concat(data.tables);
        if (this.state.buy){
          if (search_list.length > 0) {
            search_list = this.buySearch([], search_list) 
          } else {
            search_list = this.buySearch(search_list, data.tables) 
          }
        }
        if (this.state.below){
          if (search_list.length > 0) {
            search_list = this.belowSearch([], search_list) 
          } else {
            search_list = this.belowSearch(search_list, data.tables) 
          }
        }
        if (this.state.sell){
          if (search_list.length > 0) {
            search_list = this.sellSearch([], search_list) 
          } else {
            search_list = this.sellSearch(search_list, data.tables) 
          }
        }
        if (this.state.bnb){
          if (search_list.length > 0) {
            search_list = this.bnbSearch([], search_list) 
          } else {
            search_list = this.bnbSearch(search_list, data.tables) 
          }
        }
        data.search_list = search_list;
      }
      const page_end = Number(this.state.pageLimit);
      data.transactions = data.search_list.slice(0, page_end); 
      data_list[i] = data;
      return i;
    })   
    this.setState({datas: data_list});
  }
  buySearch(search_list, tables){
    if (tables.length > 0){
      tables.map((table, j)=>{
        if (table.transaction_to === this.state.wallet_address){
          search_list = search_list.concat(table)
        } 
        return j;
      })
      return search_list;
    }
  }
  onBuy(buy, search_list, data_list) {
    this.setState({buy: buy});
    data_list = this.state.datas;
    data_list.map((data, i)=>{
      search_list = []      
      if (buy){
        search_list = this.buySearch(search_list, data.tables)
        data.search_list = search_list;
      } else {
        search_list = search_list.concat(data.tables);
        if (this.state.below){
          if (search_list.length > 0) {
            search_list = this.belowSearch([], search_list) 
          } else {
            search_list = this.belowSearch(search_list, data.tables) 
          }
        }
        if (this.state.above){
          if (search_list.length > 0) {
            search_list = this.aboveSearch([], search_list) 
          } else {
            search_list = this.aboveSearch(search_list, data.tables) 
          }
        }
        if (this.state.sell){
          if (search_list.length > 0) {
            search_list = this.sellSearch([], search_list) 
          } else {
            search_list = this.sellSearch(search_list, data.tables) 
          }
        }
        if (this.state.bnb){
          if (search_list.length > 0) {
            search_list = this.bnbSearch([], search_list) 
          } else {
            search_list = this.bnbSearch(search_list, data.tables) 
          }
        }
        data.search_list = search_list;
      }
      const page_end = Number(this.state.pageLimit);
      data.transactions = data.search_list.slice(0, page_end); 
      data_list[i] = data;
      return i;
    }) 
    this.setState({datas: data_list});
  }
  sellSearch(search_list, tables){
    if (tables.length > 0){
      tables.map((table, j)=>{
        if (table.transaction_from === this.state.wallet_address){
          search_list = search_list.concat(table)
        } 
        return j;
      })
      return search_list;
    }
  }
  onSell(sell, search_list, data_list) {
    this.setState({sell: sell});
    data_list = this.state.datas;
    data_list.map((data, i)=>{
      search_list = []      
      if (sell){
        search_list = this.sellSearch(search_list, data.tables)
        data.search_list = search_list;
      } else {
        search_list = search_list.concat(data.tables);
        if (this.state.below){
          if (search_list.length > 0) {
            search_list = this.belowSearch([], search_list) 
          } else {
            search_list = this.belowSearch(search_list, data.tables) 
          }
        }
        if (this.state.above){
          if (search_list.length > 0) {
            search_list = this.aboveSearch([], search_list) 
          } else {
            search_list = this.aboveSearch(search_list, data.tables) 
          }
        }
        if (this.state.buy){
          if (search_list.length > 0) {
            search_list = this.buySearch([], search_list) 
          } else {
            search_list = this.buySearch(search_list, data.tables) 
          }
        }
        if (this.state.bnb){
          if (search_list.length > 0) {
            search_list = this.bnbSearch([], search_list) 
          } else {
            search_list = this.bnbSearch(search_list, data.tables) 
          }
        }
        data.search_list = search_list;
      }
      const page_end = Number(this.state.pageLimit);
      data.transactions = data.search_list.slice(0, page_end); 
      data_list[i] = data;
      return i;
    })      
    this.setState({datas: data_list});
  }
  bnbSearch(search_list, tables){
    if (tables.length > 0){
      tables.map((table, j)=>{
        if (table.transaction_token !== "BNB"){
          search_list = search_list.concat(table)
        } 
        return j;
      })
      return search_list;
    }
  }
  onBNB(bnb, search_list, data_list) {
    this.setState({bnb: bnb});
    data_list = this.state.datas;
    data_list.map((data, i)=>{
      search_list = []      
      if (bnb){
        search_list = this.bnbSearch(search_list, data.tables)
        data.search_list = search_list;
      } else {
        search_list = search_list.concat(data.tables);
        if (this.state.below){
          if (search_list.length > 0) {
            search_list = this.belowSearch([], search_list) 
          } else {
            search_list = this.belowSearch(search_list, data.tables) 
          }
        }
        if (this.state.above){
          if (search_list.length > 0) {
            search_list = this.aboveSearch([], search_list) 
          } else {
            search_list = this.aboveSearch(search_list, data.tables) 
          }
        }
        if (this.state.sell){
          if (search_list.length > 0) {
            search_list = this.sellSearch([], search_list) 
          } else {
            search_list = this.sellSearch(search_list, data.tables) 
          }
        }
        if (this.state.buy){
          if (search_list.length > 0) {
            search_list = this.buySearch([], search_list) 
          } else {
            search_list = this.buySearch(search_list, data.tables) 
          }
        }
        data.search_list = search_list;
      }
      const page_end = Number(this.state.pageLimit);
      data.transactions = data.search_list.slice(0, page_end); 
      data_list[i] = data;
      return i;
    })
    this.setState({datas: data_list});
  }

  render(){
    return  <div className="exchange wallet tracker">
          <div className="top-bar">
            <h3 className="page-title">Address Tracker</h3>
            <button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
          </div>
          <div className="container-fluid small" datas={this.state.datas} >
            <div className="mb-5">
              <h4>Add new address</h4>
              <Inputs onCreate={this.onCreate} onBelowOne={this.onBelowOne} onAboveThousand={this.onAboveThousand} onBuy={this.onBuy} onSell={this.onSell} onBNB={this.onBNB}/>
              <Loading loading={this.state.loading}/>
              <Table datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} />
            </div>				
          </div>
        </div>
        
  }
}
	
export default WalletsTracked;  

function showClick(){
	const menu = document.getElementsByClassName("transaction-section")[0];
	if (menu.classList.contains("hide")) {
		menu.classList.remove("hide");
	} else {
		menu.className += " hide";
	}	  
}

function convert(n){
  const sign = +n < 0 ? "-" : "",
      toStr = n.toString();
  if (!/e/i.test(toStr)) {
      return n;
  }
  const [lead,decimal,pow] = n.toString()
      .replace(/^-/,"")
      .replace(/^([0-9]+)(e.*)/,"$1.$2")
      .split(/e|\./);
  return +pow < 0 
      ? sign + "0." + "0".repeat(Math.max(Math.abs(pow)-1 || 0, 0)) + lead + decimal
      : sign + lead + (+pow >= decimal.length ? (decimal + "0".repeat(Math.max(+pow-decimal.length || 0, 0))) : (decimal.slice(0,+pow)+"."+decimal.slice(+pow)))
}
// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }

// function arrayUnique(array) {
//   const a = array.concat();
//   a.map((data, i)=>{
//     a.map((data1,j)=>{
//       if(a[i].hash===a[j].hash) a.splice(j--, 1)
//     })
//   })
//   return a;
// }
