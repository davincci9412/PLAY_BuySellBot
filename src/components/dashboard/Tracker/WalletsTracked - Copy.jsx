import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';

const datasByRow = [];
const symbolByRow = [];
const tablesByRow = [];
const tokensByRow = [];
const tempsByRow = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = { addressValid: false, chainValid: false, formValid: false, wallet_address:'', wallet_hash:'', wallet_description:'', wallet_chain:'', token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'',token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value},  () => { this.validateField(e.target.name, e.target.value, false) });
  }
  handleClear() {
	  this.setState({wallet_address:'', wallet_hash:'', wallet_description:'', wallet_chain:'', addressValid: false,  chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_average:'', token_price:'', token_change:'', token_position:'', trend:'', chain:'', temp1:'', temp2:'', temp3:''});
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
    
  render(){
	return <div className='search-box row mb-5'>
	  <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} value={this.state.wallet_address} placeholder='Address' />	  
	  <Input name='wallet_description' change={this.handleChange.bind(this, 'wallet_description')} value={this.state.wallet_description} placeholder='Description' />
      <Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Chain' />
	  <div className='col-md-2'><AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/></div>	  
	</div>
  }
}

//<Input name='wallet_hash' change={this.handleChange.bind(this, 'wallet_hash')} value={this.state.wallet_hash} placeholder='Hash ID' />
class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: this.props.value };
  }
  render(){
    return <div className='col-md-4'>
      <input type='text' name={this.props.name} placeholder={this.props.placeholder} autoComplete="off" onChange={this.props.change} value={this.props.value} className='form-control'/>
    </div>
  }  
}
class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <div className='col-md-2'>
			<select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Chain</option>	 
        <option value="1">BSC chain</option>	 
        <option value="2">ETH chain</option> 
      </select>
	</div>
  }
}
class RenameButton extends React.Component {
	render(){
		return <td>
		  <div className="cursor "><ModalWindow index={this.props.uuid} old_description= {this.props.old_description} state={this.props.state} rename={this.props.onRename}/></div>
		</td>
	}
}
class DeleteButton extends React.Component {
	onClick() {
	  this.props.delete.call(null, this.props.uuid);
	}	
	render(){
		return <td>
		  <div className="cursor"><span onClick={this.onClick.bind(this)} className="underline">Remove</span><span className="fa fa-remove"></span></div>
		</td>
	}
}
class NotificationButton extends React.Component {
	onClick() {
	  this.props.notification.call(null, this.props.uuid);
	}	
	render(){
		return <td>
		  <div className="cursor"><span onClick={this.onClick.bind(this)} className="underline">Set Notification</span><span className="fa fa-bell-o"></span></div>
		</td>
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
		return <td><div className="input-group"><input type='text' name="buy_token_input" onChange={this.handleChange.bind(this, 'buy_token_input')} value={this.props.value} className='form-control' /><button type="button" className="input-group-postpend btn btn-success" onClick={this.onClick.bind(this)}>Go</button></div></td>		
	}
}

class AddButton extends React.Component {
	onClick(){
	  this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_hash, this.props.newData.wallet_description, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.tokens, this.props.newData.temps, this.props.newData.transaction_wallet, this.props.newData.transaction_crypto, this.props.newData.transaction_date,this.props.newData.transaction_qty, this.props.newData.transaction_amount, this.props.newData.transaction_opponent, this.props.newData.transaction_orientation, this.props.newData.transaction_token, this.props.newData.transaction_price, this.props.newData.trend, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
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
    if (this.props.type === "wallet_hash"){
      return <td><div className="addressCopy hash">
                <input type="text" ref={(input) => this.inputAddress = input} className="form-control" value={this.props.placeholder} onChange={this.onChange.bind(this)} readOnly/>
                <span className="fa fa-clone cursor" onClick={this.copyToClipboard}></span>{this.state.copySuccess}
              </div>
            </td> 
    } else if (this.props.type === "transaction_crypto"){
      return <td><span className="text-decoration">{this.props.placeholder}</span></td> 
    } else if (this.props.type === "transaction_qty"){
      if (this.props.orientation === "out") {
        return <td><span className="red-arrow text-danger">-{this.props.placeholder}</span></td> 
      } else {
        return <td><span >{this.props.placeholder}</span></td> 
      }
    } else if (this.props.type === "transaction_amount"){
      return <td><span>${this.props.placeholder}</span></td> 
    } else {
      return <td>{this.props.placeholder}</td> 
    }	
  }
}

class Row extends React.Component {
  render(){
    return  <tr>
      <Column type='wallet_address' placeholder={this.props.wallet_address} />
      <Column type='wallet_hash' placeholder={this.props.wallet_hash} />
      <Column type='wallet_description' placeholder={this.props.wallet_description} />
      <NotificationButton uuid={this.props.uuid} notification={this.props.onNotification} />
      <DeleteButton uuid={this.props.uuid} delete={this.props.onDelete} />
    </tr>
  }
}

/*<RenameButton uuid={this.props.uuid} onRename={this.props.onRename} old_description={this.props.wallet_description} state={this.props.datas}/>*/

class Table extends React.Component {
  render(){
	return <div className="">
        <h4 className="mt-4 mb-2">Wallets Tracked</h4>
        <table className="table table-bordered ">
          <thead>
            <tr>
              <th colSpan="1">Wallet</th>
              <th colSpan="1">Hash ID</th>
              <th colSpan="1">Descrption</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {
              this.props.datas.map((data, i) => {
              return <Row key={i} uuid={i} datas={this.props.datas} wallet_address={data.wallet_address} wallet_hash={data.wallet_hash} wallet_description={data.wallet_description} tables={data.tables} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
              })
            }
          </tbody>
        </table>
        <div className="row">
          {
            this.props.datas.map((data, i) => {
              if (data.tables !== undefined){
                return <Section key={i} uuid={i} sections = {data.tables} onDelete={this.props.onDelete} onRename={this.props.onRename}/>
              } else {
                return false;
              }
              
            })
          }
        </div>
      </div>
      
  }
}

class Row1 extends React.Component {
  render(){
	return  <tr>
    <Column type='transaction_wallet' placeholder={this.props.transaction_wallet} />
    <Column type='transaction_crypto' placeholder={this.props.transaction_crypto} />
    <Column type='transaction_date' placeholder={this.props.transaction_date} />
    <Column type='transaction_qty' placeholder={this.props.transaction_qty} orientation={this.props.transaction_orientation}/>
    <Column type='transaction_amount' placeholder={this.props.transaction_amount} />
	</tr>
  }
}
class Section extends React.Component{
  render(){
    return <div className="col-md-8">
      <h4 className="mt-4 mb-2">Transaction Log for Wallets Tracked</h4>
      <table className="table table-bordered ">
        <thead>
          <tr>
            <th>Wallet</th>
            <th>Crypto</th>
            <th>Date</th>
            <th>QTY</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {
            this.props.sections.map((data1, j) => {
              return <Row1 key={j} uuid={j} transaction_wallet={data1.transaction_wallet} transaction_crypto={data1.transaction_crypto} transaction_date={data1.transaction_date} transaction_qty={data1.transaction_qty} transaction_orientation={data1.transaction_orientation} transaction_amount={data1.transaction_amount} />
            })
          }
        </tbody>        
      </table>
    </div>
  }
}



class ModalWindow extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {datas:this.props.state, show: false};
    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSave = this.handleSave.bind(this);
  }
  handleClose = () => this.setState({show:false});
  handleShow = () => this.setState({show:true});
  handleSave = () => {
    this.props.state[this.props.index].wallet_description = this.state.new_description;
    this.setState({show:false});
	  this.props.rename.call(null, this.props.state);
  }
  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
  } 
  
  render (){
    return <span><span variant="primary" onClick={this.handleShow} className="underline">Change description</span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Change your description</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="form-group">
          <label>Current Description: </label>
          <input type='text' className='form-control' value={this.props.old_description} placeholder='Description'  readOnly/>
        </div>
        <div className="form-group">
          <label>New Description: </label>
          <input type='text' name='new_description' value={this.state.name} onChange={this.handleChange.bind(this, 'new_description')} className='form-control' placeholder='New Description' />
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.handleSave.bind(this)}>
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
    this.state = { datas:datasByRow, symbols:symbolByRow, tables:tablesByRow, tokens:tokensByRow, temps:tempsByRow, loading:false};
    this.onDelete = this.onDelete.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
  }
  
  onRename(data_list) {
    this.setState({datas: data_list});
  }

  async onUpdate(id, buy_token_input) {
	
  }
  
  async onRefresh(id, transaction, status, trend){
	
  }
   

  async onCreate(wallet_address, wallet_hash, wallet_description, wallet_chain, tables, tokens, temps, transaction_wallet, transaction_crypto, transaction_date, transaction_qty, transaction_amount, transaction_opponent, transaction_orientation, transaction_token, transaction_price, trend, chain, temp1, temp2, temp3){
	  this.setState({loading : true})

    switch(wallet_chain) {
      case '1':
        temp1 = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        temp2 = 'https://api.bscscan.com/api?module=account&action=txlist&address='+wallet_address+'&startblock=1&endblock=99999999&sort=asc&apikey=DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        temp3 = 'https://api.bscscan.com/api?module=stats&action=bnbprice&apikey=DV5UTGPGHM6Y79Y9EBMQ554FJWSFS579EU'
        chain = 'binancecoin'
        //token = 'BNB'
        break;
	    case '2':
        temp1 = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        temp2 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=99999999&sort=asc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        temp3 = 'https://api.etherscan.io/api?module=stats&action=ethprice&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
        chain = 'ethereum'
        //token = 'ETH'
        break;      
      default:
        break;
    }
    
    await fetch(temp1).then(async response => {
      const data = await response.json();
      if (data.message === "OK"){
        transaction_price = Number(data.result.ethusd).toFixed(2);
      } else{
        transaction_price = "Invalid Wallet";
      } 
    })
    .catch(error => {
      transaction_price = "Invalid Wallet"	
    })

    await fetch(temp2).then(async response => {
      const datas = await response.json();
      
      if (datas.message === "OK") {
        datas.result.map((data, i) => {
          transaction_date = new Date(data.timeStamp * 1000).toISOString().slice(0,10);
          //transaction_date = trend.getFullYear() + '-' + trend.getMonth() + '-' + trend.getDate();

          transaction_qty = (Number(data.value)/1000000000000000000);
          transaction_amount = (transaction_qty * transaction_price).toFixed(2);          
          transaction_qty =  transaction_qty.toFixed(15).replace(/0+$/, "");
          if (transaction_qty.toString() === "0.") transaction_qty = 0;
          if (data.from.toLowerCase() === wallet_address.trim().toLowerCase()) {
            transaction_orientation = "out";
            transaction_opponent = data.to.toLowerCase();
          } else {
            transaction_orientation="in";
            transaction_opponent = data.from.toLowerCase();
          }  
            
          temps = this.state.temps.concat([{ transaction_wallet:wallet_address.trim().toLowerCase(), transaction_crypto:transaction_crypto, transaction_date:transaction_date, transaction_qty:transaction_qty, transaction_amount:transaction_amount, transaction_opponent:transaction_opponent, transaction_orientation:transaction_orientation, transaction_token:transaction_token, transaction_price:transaction_price, trend:trend, chain:chain, temp1:temp1, temp2:temp2, temp3:temp3}])
          this.setState({temps:temps})

          tables = this.state.tables.concat(transaction_opponent)
          this.setState({tables:tables})
          return this.state;
        })
        tokens = tables.filter((value, index)=>tables.indexOf(value)===index);
      } 
      
    })
    .catch(error => {
      transaction_wallet = "No Transaction"	
    })

    

/*
    await fetch(temp3).then(async response => {
      const data = await response.json();
      if (data.message === "OK"){
        token_price = data.result.ethusd;
        token_value =(Number(qty) * Number(token_price)).toFixed(2) ;
      } else{
        token_price = token_value = "Invalid Wallet";
      } 
      return this.state;
    })
    .catch(error => {
      token_price = token_value="Invalid Wallet"	
    })

    await fetch("https://api.coingecko.com/api/v3/coins/"+chain+"/market_chart?vs_currency=usd&days=2").then(async response => {
      const data = await response.json();
      token_change = 0;
      data["prices"].map(function(object, i){
        if (i===23) {	
          token_change = token_change + object[1]; 
        }
        return token_change;
      })     
      token_change = ((token_price - token_change)/token_change * 100 ).toFixed(2);    
      (token_change >= 0 ) ? trend="positive": trend="negative";      
    })
    .catch(error => {
      token_change="Invalid Wallet";
    })
*/
    if (temps !== undefined)   {
      temps = temps.reverse();
    } 
//tables = this.state.tables.concat([{ transaction_wallet:transaction_wallet, transaction_crypto:transaction_crypto, transaction_date:transaction_date, transaction_qty:transaction_qty, transaction_amount:transaction_amount, trend:trend, chain:chain, temp1:temp1, temp2:temp2, temp3:temp3}])
    this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_hash:wallet_hash, wallet_description:wallet_description, wallet_chain:wallet_chain, tables:temps}])})
    this.setState({loading : false})
    this.setState({temps: tempsByRow});
    this.setState({tables: tempsByRow});

  }


  render(){
    return  <div className="exchange wallet">
          <div className="top-bar">
            <h3 className="page-title">Address Tracker</h3>
            <button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
          </div>
          <div className="container-fluid small" datas={this.state.datas} >
            <div className="mb-5">
              <h4>Add new address</h4>
              <Inputs onCreate={this.onCreate}/>
              <Loading loading={this.state.loading}/>
              <div>
                <Table datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} />
              </div>
            </div>				
          </div>
        </div>
        
  }
}
	
export default WalletsTracked;  
