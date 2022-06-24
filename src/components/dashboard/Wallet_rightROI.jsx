import React from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import Poo from '../../assets/images/poo-icon.png';
import Delete from '../../assets/images/delete-icon.png';
import { Box } from '@blockstack/ui';
import Pagination from './Pagination';

const datasByRow = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zero:true, addressValid: false,  chainValid: false,  formValid: false, wallet_address:'', history:false, cookieDelete:false, wallet_name:'', wallet_chain:'', token:'', qty:'', token_value:'', token_price:'', token_average:'', token_acquire:'', token_change:'', token_rol:'',token_position:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
    this.handleZeroClick = this.handleZeroClick.bind(this);
    this.handleHoldingClick = this.handleHoldingClick.bind(this);
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      localStorage.setItem("wallet_address", JSON.stringify(datasByRow));
      this.state.cookieDelete = false;
    } else {
      if (!Array.isArray(JSON.parse(localStorage.getItem("wallet_address")))) {
        localStorage.setItem("wallet_address", JSON.stringify(datasByRow));
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
	  this.setState({wallet_address:'', history:false, wallet_name:'', wallet_chain:'', addressValid: false,  chainValid: false, formValid: false, token:'', qty:'', token_value:'', token_price:'', token_average:'', token_acquire:'', token_change:'', token_rol:'', token_position:'', chain:'', temp1:'', temp2:'', temp3:''});
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

  handleZeroClick({target}){
    this.props.onSearchZero.call(null, target.checked);    
  }

  handleHoldingClick({target}){
    this.props.onSearchHolding.call(null, target.checked);
  }
  
  render(){  
	  return  <div className='search-box row'>
              <div className="container-fluid row">
                <div className = 'col-md-7'>
                  <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} click={this.handleClick.bind(this)} value={this.state.wallet_address} placeholder='Address' />
                  <div id="history_view" className={this.state.history&&this.state.cookieDelete? 'history_view' : 'history_view close'}>
                      {                      
                        JSON.parse(localStorage.getItem("wallet_address")).reverse().map((data, i) => {
                          return <History key={i} uuid={i} data={data} history={this.state.history}  add={this.handleAdd.bind(this, data)}/>
                        })
                      }
                  </div>
                </div>          
                <div className='col-md-3'>
                  <Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Address Chain' />
                </div>
                <div className='col-md-2 text-right'>
                  <AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/>
                </div>
              </div>
            </div>
  }
  // render(){  
	//   return  <div className='search-box row'>
  //             <div className="container-fluid row">
  //               <div className = 'col-md-7'>
  //                 <Input name='wallet_address' change={this.handleChange.bind(this, 'wallet_address')} click={this.handleClick.bind(this)} value={this.state.wallet_address} placeholder='Address' />
  //                 <div id="history_view" className={this.state.history&&this.state.cookieDelete? 'history_view' : 'history_view close'}>
  //                     {                      
  //                       JSON.parse(localStorage.getItem("wallet_address")).reverse().map((data, i) => {
  //                         return <History key={i} uuid={i} data={data} history={this.state.history}  add={this.handleAdd.bind(this, data)}/>
  //                       })
  //                     }
  //                 </div>
  //               </div>          
  //               <div className='col-md-3'>
  //                 <Select name='wallet_chain' change={this.handleChange.bind(this, 'wallet_chain')} value={this.state.wallet_chain} placeholder='Select Address Chain' />
  //               </div>
  //               <div className='col-md-2 text-right'>
  //                 <AddButton newData={this.state} create={this.props.onCreate} clear={this.handleClear} disabled={!this.state.formValid}/>
  //               </div>
  //             </div>
  //             <div className="container-fluid row checkbox">
  //               <div className = 'col-md-6'>
  //                 <input type="checkbox" onClick={this.handleZeroClick.bind(this)}/>Remove zero values
  //               </div>
  //               <div className = 'col-md-6'>
  //                 <input type="checkbox" onClick={this.handleHoldingClick.bind(this)}/>Show current holdings
  //               </div>
  //             </div>	
  //           </div>
  // }
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
	return <input type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} onClick={this.props.click} autoComplete="off" value={this.props.value} className='form-control'/>
  }
}
class Select extends React.Component {
  constructor(props) {
	super(props);
	  this.state = { value: this.props.value };
  }
  render(){
	return <select type='text' name={this.props.name} placeholder={this.props.placeholder} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="">Select Address Chain</option>	 
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
		return <span className="cursor wallet-delete" onClick={this.onClick.bind(this)} ><img src={Delete} alt="Delete"/></span>
	}
}

class ShowButton extends React.Component {
	onClick(status) {
	  //this.props.onShow.call(null, this.props.uuid, this.props.show);    
    const wallet = document.getElementById("wallet"+this.props.uuid);
    if (wallet.classList.contains("show")){
      wallet.classList.remove("show");
      wallet.className += "hide";
      status = true;
    } else {
      wallet.classList.remove("hide");
      wallet.className += "show";
      status = false;
    }
    
    const objects = Array.prototype.slice.call( document.getElementsByClassName("token-name") ) 
    const start = this.props.start;
    const end = this.props.end;

    objects.map((name, i)=>{
      if (name !== undefined){
        if (i >= start && i <= end) { 
          const menu = name.parentElement.parentElement.getElementsByClassName("table")[0];
          // if (menu.classList.contains("section-show")) {
          //   menu.classList.remove("section-show");
          //   menu.className += " section-hide";
          // } else {
          //   menu.classList.remove("section-hide");
          //   menu.className += " section-show";
          // }

          if (status){
            menu.classList.remove("section-show");
            menu.classList.remove("section-hide");
            menu.className += " section-show";
          } else {
            menu.classList.remove("section-show");
            menu.classList.remove("section-hide");
            menu.className += " section-hide";
          }
        }	  
      }
      return i;
    })
    
	}	
	render(){
		return <div onClick={this.onClick.bind(this)} id={"wallet"+this.props.uuid} className="show" ><span className="address-show" >Show All Positions</span><span className="address-hide">Hide All Positions</span></div>
	}
}

class RenameButton extends React.Component {
	render(){
		return <span><ModalWindow index={this.props.uuid} old_name= {this.props.name} state={this.props.state} rename={this.props.onRename}/></span>
	}
}

class AddButton extends React.Component {
	onClick(){    
    if (localStorage.getItem("wallet_address") === null || localStorage.getItem("wallet_address") === "" || localStorage.getItem("wallet_address") === "[]") {
      this.props.newData.temp1 = [];
    } else {
      this.props.newData.temp1 = JSON.parse(localStorage.getItem("wallet_address"))
    }
    this.props.newData.temp1.map((data, i)=>{
      if (data === this.props.newData.wallet_address) this.props.newData.temp2 = "duplicate"
      return this.props.newData.temp2;
    })
    if (this.props.newData.temp2 !== "duplicate") this.props.newData.temp1.push(this.props.newData.wallet_address);
    localStorage.setItem("wallet_address", JSON.stringify(this.props.newData.temp1));
    this.props.newData.temp1 = this.props.newData.temp2 = '';
    this.props.create.call(null, this.props.newData.wallet_address, this.props.newData.wallet_name, this.props.newData.wallet_chain, this.props.newData.tables, this.props.newData.token, this.props.newData.qty, this.props.newData.token_value,this.props.newData.token_average, this.props.newData.token_price, this.props.newData.token_change, this.props.newData.token_position, this.props.newData.chain, this.props.newData.temp1, this.props.newData.temp2, this.props.newData.temp3);
    this.props.clear.call(null);
	}
	render(){
		return <input type="submit" className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled} value="Add"/>
	}
}

class Column extends React.Component {
  constructor(props) {
    super(props);
    this.state = { copySuccess: '' }
  }
  onChange(){ 
  }

  onClick(){  
    const index = this.props.uuid + this.props.offset;  
    const name = document.getElementsByClassName("token-name")[index];
    if (name !== undefined){
      const menu = name.parentElement.parentElement.getElementsByClassName("table")[0];
      if (menu.classList.contains("section-show")) {
        menu.classList.remove("section-show");
        menu.className += " section-hide";
      } else {
        menu.classList.remove("section-hide");
        menu.className += " section-show";
      }	  
    }
	}

  render(){
    if (this.props.type === "token"){
      return <div className="td token-name" onClick={this.onClick.bind(this)} >{this.props.placeholder}</div> 
    } else if (this.props.type === "token_value" || this.props.type === "token_price" || this.props.type === "token_average" || this.props.type === "token_acquire"){
      return <div className="td">${this.props.placeholder}</div> 
    } else if (this.props.type === "token_change"){
      if (this.props.placeholder!== "") {
        if (Number(this.props.placeholder) >= 0){
          return <div className="td"><div className="change"><span className="green-arrow sort-icon"></span><span className="text-success"> {this.props.placeholder}%</span></div></div> 
        }else{
          return <div className="td"><div className="change"><span className="red-arrow sort-icon"></span><span className="text-danger"> {this.props.placeholder}%</span></div></div> 
        }
      }else {
        return <div className="td"><div className="change"><span className="text-danger">Can't get</span></div></div> 
      }
    } else if (this.props.type === "token_rol"){
      if (this.props.placeholder === "NaN") {
        return <div className="td small text-danger">Zero Division</div> 
      } else if (this.props.placeholder === "Infinity") {
        return <div className="td small text-danger">Infinity</div> 
      } else {
        return <div className="td small">{this.props.placeholder}%</div> 
      }
    } else if (this.props.type === "token_position"){      
      return <div className="td small"><a href={this.props.placeholder} className="cursor" target="_blank" rel="noreferrer"><Box className="poo-icon cursor" as="img" src={Poo} alt="Price Graph" ></Box></a></div> 
    } else {
      return <div className="td">{this.props.placeholder}</div> 
    }	
  }
}

class Row1 extends React.Component {
  render(){
	return  <div className="tr opacity-05">
            <Column type='timeStamp' placeholder={this.props.timeStamp}/>
            <Column type='qty' placeholder={this.props.qty} />
            <Column type='token_value' placeholder={this.props.token_value} />
            <Column type='token_price' placeholder={this.props.token_price} />
            <Column type='token_average' placeholder={this.props.token_average} />
            <Column type='token_acquire' placeholder={this.props.token_acquire} />
            <Column type='token_change' placeholder={this.props.token_change} />
            <Column type='token_rol' placeholder={this.props.token_rol} />
            <Column type='token_position' placeholder={this.props.token_position} />
          </div>
  }
}

class Table1 extends React.Component {
  render(){
	return  <div  className={this.props.show? 'table section-hide': 'table section-show'}>
					{
					  this.props.tables.map((data, i) => {
						  return <Row1 key={i} uuid={i} timeStamp={new Date(data.timeStamp * 1000).toISOString().slice(0,10)} qty={data.qty} token_value={data.token_value} token_price={data.token_price} token_average={data.token_average} token_acquire={data.token_acquire} token_change={data.token_change} token_rol={data.token_rol} token_position={data.token_position} chain={data.chain} />
					  })
					}
          </div>
  }
}

class Row extends React.Component {
  render(){
	return  <div>
            <div className="tr">
              <Column type='token' placeholder={this.props.token} uuid={this.props.uuid} offset={this.props.offset}/>
              <Column type='qty' placeholder={this.props.qty} />
              <Column type='token_value' placeholder={this.props.token_value} />
              <Column type='token_price' placeholder={this.props.token_price} />
              <Column type='token_average' placeholder={this.props.token_average} />
              <Column type='token_acquire' placeholder={this.props.token_acquire} />
              <Column type='token_change' placeholder={this.props.token_change} />
              <Column type='token_rol' placeholder={this.props.token_rol} />
              <Column type='token_position' placeholder={this.props.token_position} />
            </div>
            <Table1 tables = {this.props.tables} show={this.props.show}/>
          </div>
  }
}

class Table extends React.Component {
  constructor(props) {
    super(props);  
    this.state = { current_tokens: this.props.tokens, currentPage: null, totalPages: null, loading:false};       
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({current_tokens: nextProps.tokens});
  }

  onPage = async(data, tokens, tables1, temp1, roi_transactions, saved_roi, roi_tokens, tokens_main, temp3, qty_sum, acquire_sum) =>{
    roi_transactions = saved_roi = tokens_main = tokens =[];
    this.setState({ loading: true })
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    tokens = this.props.search_list.slice(offset, currentPage * pageLimit)
    
    if (tokens.length > 0){
      //Get the transaction list that respects the token buying information(acquired value)
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/getRoi', { params : {wallet_address: this.props.wallet_address}}).then( async res => {
        roi_transactions = await res.data; //get the roi transactions from the DB
        })
        .catch(error => {          
      }) 

      if (roi_transactions.length > 0){
        tokens.map((token, i)=>{
          if (currentPage === 1 && i===0){
            
          } else{
            this.props.temps.map((transaction, j)=>{
              if (token.tokenSymbol===transaction.tokenSymbol && Number(transaction.qty)>0 && transaction.to === this.props.wallet_address)  {
                temp1 = true
                roi_transactions.map((roi,l)=>{
                  if (transaction.hash === roi.hash) temp1 = false
                  return l;
                })
                if (temp1) saved_roi = saved_roi.concat(transaction)
              }
              return j
            })
          }
          return i;
        })        
      } 

      if (saved_roi.length>0){
        temp3 = { wallet_address:this.props.wallet_address, tables:saved_roi};
        await axios.post(process.env.REACT_APP_SERVER_URL+'/address/txRoi', temp3).then( async res => {
          const results = await res.data;
          if (results.length > 0){
            roi_transactions = roi_transactions.concat(results);
          }     
        })
        .catch(error => {
          console.log("Token acquired value addition failed")
        }) 
      } 

      if (roi_transactions.length > 0) {
        roi_tokens = [...new Map(roi_transactions.map(item => [item["tokenSymbol"], item])).values()]
        roi_tokens.map((token, i)=>{
          qty_sum = acquire_sum = 0;
          roi_transactions.map((transaction, j)=>{          
            if (transaction.tokenSymbol === token.tokenSymbol && transaction.token_acquire > 0){
              qty_sum = Number(qty_sum) + Number(transaction.qty);
              acquire_sum = Number(acquire_sum) + Number(transaction.token_acquire);
            }
            return j;
          })
          Number(qty_sum > 0)? roi_tokens[i].token_average = acquire_sum / qty_sum : roi_tokens[i].token_average = 0;
          return i;
        })
      }

      tokens.map(async(token, i)=>  {
        if (currentPage === 1 && i===0){
           
        } else {
          temp1 = true;      
          this.props.token_db.map((data, j)=>{
            if (data.token_address.includes(token.contractAddress) || data.token_address === token.tokenSymbol) { 
              tokens[i].token_change = Number(data.token_24h_change).toFixed(2);
              tokens[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress;
              temp1 = false;
            }   
            if (data.token_address.includes(token.contractAddress) && (Number(token.token_price) === 0 || token.token_price === null)) { 
              tokens[i].token_price = this.props.search_list[i].token_price = Number(data.token_price);
              tokens[i].token_value = this.props.search_list[i].token_value = (tokens[i].qty * data.token_price)
            }
            return j  
          })  
          if (temp1) {
            tokens[i].token_change = "";
            tokens[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress;
          }   
          if (roi_tokens.length>0){
            roi_tokens.map((roi, j)=>{
              if (token.tokenSymbol === roi.tokenSymbol){
                tokens[i].token_average = Number(roi.token_average);
                tokens[i].token_acquire =(Number(token.qty)* Number(roi.token_average))
                tokens[i].token_rol = ((tokens[i].token_acquire / tokens[i].token_value) * 100 ).toFixed(2)   
              }
              return j;
            })
          }  
        }
      })      

      tokens.map((token, i)=>{ 
        tables1=[];  
        if (currentPage === 1 && i===0){
          
        } else { 
          if(roi_transactions.length >0){
            roi_transactions.map((roi, k)=>{
              if (token.tokenSymbol === roi.tokenSymbol) tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, qty:roi.qty, token_value:Number(roi.qty * Number(token.token_price)), token_price:token.token_price, token_average:(Number(roi.token_acquire)/Number(roi.qty)), token_acquire:Number(roi.token_acquire), token_rol:(Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2), token_change:token.token_change, token_position:token.token_position}]);
              return k;
            })              
          }
          tokens[i].tables = tables1;
        }
        return i;
      })  
      this.setState({ current_tokens:tokens });
    }   
    this.setState({ loading: false })  
  }
  
  
  render(){    
    return <div className="table">
              <div className="table">
                  <div className="tr thead">
                    <div className="td table-header">TOKEN</div>
                    <div className="td table-header">QTY</div>
                    <div className="td table-header">VALUE</div>
                    <div className="td table-header two">CURRENT<br/>PRICE</div>
                    <div className="td table-header two">AVERAGE<br/>PRICE</div>
                    <div className="td table-header two">ACQUIRED<br/>VALUE</div>
                    <div className="td table-header two">24H<br/>CHANGE</div>
                    <div className="td table-header small" >ROI</div>
                    <div className="td table-header two small">PRICE<br/>GRAPH</div>
                  </div>
                  {
                    this.state.current_tokens.map((data, i) => {
                      return <Row key={i} offset={this.props.offset} uuid={i} table_id={data.index} show={this.props.show} token={data.tokenSymbol} wallet_address={data.wallet_address} qty={data.qty} token_value={data.token_value} token_price={data.token_price} token_average={data.token_average} token_acquire={data.token_acquire} token_change={data.token_change} token_rol={data.token_rol} token_position={data.token_position} chain={data.chain} tables={data.tables}/>
                    })
                  }
              </div>
              <Pagination totalRecords={this.props.search_list.length} pageLimit={20} pageNeighbours={1} onPage={this.onPage} />
              <Loading loading={this.state.loading} />
            </div>      
  }
}

class Group extends React.Component {
  constructor(props) {
    super(props);
    this.state = {datas:this.props.datas, show: false, new_name:''};
  }
  render(offset=0, start, end){
    return <div>
      {
        this.props.datas.map((data, i) => {
          if (i === 0) {
            start =0; end = data.tokens.length;
          } else {
            offset = offset + this.props.datas[i-1].tokens.length;
            start = offset;
            end = offset + data.tokens.length
          }
          if (data.wallet_name === "" ) {data.wallet_name = i+1;} 
          return <div key={i} uuid={i} className="transaction-section row mx-0 mb-4">
					<div className="wallet-header">
						<h4 className="mb-4">{data.wallet_name}
              <RenameButton uuid={i} name={data.wallet_name} state={this.props.datas} onRename={this.props.onRename}/>
              <DeleteButton uuid={i} delete={this.props.onDelete} />
            </h4>                    
						<h5 className="transaction cursor"><ShowButton start={start} end={end} uuid={i} show={data.show} onShow={this.props.onShow}/></h5>
					</div>					           
					<Table index={i} offset={offset} show={data.show} search_list={data.search_list} token_db={data.token_db} tokens={data.tokens} temps={data.temps} wallet_address={data.wallet_address} />      
          
				</div>
        })
      } 
    </div>
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
    return <span>
      <span variant="primary" onClick={this.handleShow} className="cursor address-icon"></span>
      <Modal show={this.state.show} onHide={this.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Rename your address</Modal.Title>
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
          <Button variant="secondary"  className="cursor" onClick={this.handleClose}>
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

class Wallet extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, tables: datasByRow, tokens: datasByRow, temps: datasByRow, token_list:datasByRow, holding:false, loading:false, pageLimit:20};
    this.onDelete = this.onDelete.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSearchZero = this.onSearchZero.bind(this);
    this.onSearchHolding = this.onSearchHolding.bind(this);
    this.onRefresh = this.onRefresh.bind(this);
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
  }

  onShow(id) {
    const data_list = this.state.datas;
    data_list[id].show = !data_list[id].show;
    this.setState({datas: data_list});
  }

  onRename(data_list) {
    this.setState({datas: data_list});
  }
    
  async onRefresh(id, token_position, status, chain, temp1, temp2, temp3){
    
  }
  
  async onCreate(wallet_address, wallet_name, wallet_chain, tables, tables1, tokens, tokens_main, temps, token_list, search_list, token_db, roi_transactions, saved_roi, roi_tokens, token, token_position, token_decimal, contract_address, chain, temp1, temp2, temp3, url1, url2, url3, url4, qty_sum, acquire_sum, show, running){
    tokens = tokens_main = tables = temps = token_list = tables1 = token_db = search_list = saved_roi = roi_tokens = roi_transactions = [];
    
    wallet_address = wallet_address.trim().toLowerCase();
	  this.setState({wallet_address:wallet_address});	

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
      switch(wallet_chain) {
        case '1':
          url1 = 'https://api.bscscan.com/api?module=account&action=txlist&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          url2 = 'https://api.bscscan.com/api?module=account&action=tokentx&address='+wallet_address+'&startblock=1&endblock=99999999&sort=desc&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          url3 = 'https://api.bscscan.com/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          url4 = 'https://api.covalenthq.com/v1/56/address/'+wallet_address+'/balances_v2/?nft=true&no-nft-fetch=true&key=ckey_daca4efda85b4837961727b8cbb'
          chain = 'binancecoin'
          token_position = 'https://poocoin.app/tokens/0xb8c77482e45f1f44de1745f52c74426c631bdd52';
          token = 'BNB'
          token_decimal = 18
          contract_address = "0xb8c77482e45f1f44de1745f52c74426c631bdd52"
          break;
        case '2':
          url1 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url2 = 'https://api.etherscan.io/api?module=account&action=tokentx&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url3 = 'https://api.etherscan.io/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url4 = 'https://api.covalenthq.com/v1/1/address/'+wallet_address+'/balances_v2/?nft=true&no-nft-fetch=true&key=ckey_daca4efda85b4837961727b8cbb'
          chain = 'ethereum'
          token_position = 'https://poocoin.app/tokens/0x2170ed0880ac9a755fd29b2688956bd959f933f8';
          token = 'ETH'
          token_decimal = 0;
          contract_address = ""
          break;
        default:
          break;
      }  
        
      //Check whether the wallet exists(the user inputs the wallet address on this page at first) or not and get all the DB data related with the wallet address
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/wallet', { params : {id:localStorage.getItem("id"), chain_id:wallet_chain, wallet_address: wallet_address}}).then( async res => {
        const result = await res.data;
        if (result.status === "exist"){          
          //Get the transaction list that respects the token buying information(acquired value)
          await axios.get(process.env.REACT_APP_SERVER_URL+'/address/getRoi', { params : {wallet_address: wallet_address}}).then( async res => {
            roi_transactions = await res.data; //get the roi transactions from the DB
            })
            .catch(error => {          
          })              
        }
      })
      .catch(error => {
      })  

      //Get the token balance list of the wallet by DB or API
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/tokenBalances', { params : {wallet_address: wallet_address}}).then( async res => {
        token_list = await res.data; //get the token balance list from the DB
      }).catch(error => {          
      }) 

      //Get the tokens from DB
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/token', { params : {wallet_address: wallet_address}}).then( async res => {
        token_db = await res.data;         
      })
      .catch(error => {
      })

      //Get all the transactions by API
      await fetch(url1).then(async response => {
        const data1 = await response.json();
        if (data1.message === "OK"){
          if (data1.result.length >= 1) {
            data1.result.map((data, i) => {
              if (data.to === wallet_address && Number(data.value) > 0) {
                temp1 = (Number(data.value)/(10**token_decimal))
                tables = tables.concat([{ hash:data.hash, timeStamp:data.timeStamp, tokenSymbol:token, tokenDecimal:token_decimal, contractAddress:contract_address, qty:temp1, token_position:token_position}]);
                //if (data.timeStamp > Number(timeStamp)) new_transactions[tables.length-1] = tables[tables.length-1]
              }            
              return i;
            })
          }
        } 
      })
      .catch(error => {
        //temp1="Transaction is not existed"	
      })
  
      //Get all the token transactions by API
      await fetch(url2).then(async response => {
        const res = await response.json();
        if (res.message === "OK"){
          if (res.result.length >= 1) {
            res.result.map((data, i) => {
              temp1 = Number(data.value)/(10**data.tokenDecimal)
              temps = temps.concat([{ hash:data.hash, timeStamp:data.timeStamp, tokenSymbol:data.tokenSymbol, tokenDecimal:data.tokenDecimal, qty:temp1, from:data.from, to:data.to, contractAddress:data.contractAddress}]);
              return i;
            })
          }
        } 
      })
      .catch(error => {
        //temp1="Transaction is not existed"	
      })    
      
      if (token_list.length > 0) {
        token_list.map((data, i) => {
          if (data.tokenSymbol === "BNB") {
            tokens_main = tokens_main.concat(data);
            token_list.splice(i, 1);
          }
          return i
        })
        token_list.map((data, i) => {
          temp1 = true
          temps.map((temp, j)=>{
            if (data.tokenSymbol === temp.tokenSymbol) temp1=false
            return j
          })
          if (temp1) token_list.splice(i, 1)
          return i;
        })
        token_list = tokens_main.concat(token_list);

        // token_list.map((data, i) => {
          
        //   if (this.state.zero ){
        //     if (Number(data.qty) ===0 || Number(data.token_value === 0)){
        //     } else {
        //       search_list = search_list.concat(data)
        //     }          
        //   } else if (this.state.holding){
        //     if (Number(data.qty) >= 1){
        //       search_list = search_list.concat(data);
        //     }
        //   } else {
        //     search_list = search_list.concat(data);
        //   }
        //   return i;
        // })
        search_list = token_list
      }

      const page_end = Number(this.state.pageLimit);
      tokens = search_list.slice(0, page_end); 

      if (roi_transactions.length > 0){
        tokens.map((token, i)=>{
          if (i === 0){
            
          } else{
            temps.map((transaction, j)=>{
              if (token.tokenSymbol===transaction.tokenSymbol && Number(transaction.qty) > 0 && transaction.to === wallet_address)  {
                temp1 = true
                roi_transactions.map((roi,l)=>{
                  if (token.tokenSymbol===roi.tokenSymbol) temp1 = false;
                  return l;
                })
                if (temp1) saved_roi = saved_roi.concat(transaction)
              }
              return j
            })
          }
          return i;
        })        
      } else {
        tokens.map((token, i)=>{
          if (i === 0){
            saved_roi = saved_roi.concat(tables);
          } else{
            temp3 = temp2 = 0;
            temps.map((transaction, j)=>{
              if (token.tokenSymbol===transaction.tokenSymbol && Number(transaction.qty) > 0 && transaction.to === wallet_address)  {
                saved_roi = saved_roi.concat(transaction)
              }
              return j
            })
          }
          return i;
        })
      }

      if (saved_roi.length>0){
        temp3 = { wallet_address:wallet_address, tables:saved_roi};
        await axios.post(process.env.REACT_APP_SERVER_URL+'/address/txRoi', temp3).then( async res => {
          const results = await res.data;
          if (results.length > 0){
            roi_transactions = roi_transactions.concat(results);
          }     
        })
        .catch(error => {
          console.log("Token acquired value addition failed")
        }) 
      } 

      if (roi_transactions.length > 0) {
        roi_tokens = [...new Map(roi_transactions.map(item => [item["tokenSymbol"], item])).values()]
        roi_tokens.map((token, i)=>{
          qty_sum = acquire_sum = 0;
          roi_transactions.map((transaction, j)=>{          
            if (transaction.tokenSymbol === token.tokenSymbol && transaction.token_acquire > 0){
              qty_sum = Number(qty_sum) + Number(transaction.qty);
              acquire_sum = Number(acquire_sum) + Number(transaction.token_acquire);
            }
            return j;
          })
          Number(qty_sum > 0)? roi_tokens[i].token_average = acquire_sum / qty_sum : roi_tokens[i].token_average = 0;
          return i;
        })
      }

      tokens.map(async(token, i)=>  {    
        temp3 = true;      
        token_db.map((data, j)=>{
          if (data.token_address.includes(token.contractAddress) || data.token_address === token.tokenSymbol) { 
            tokens[i].token_change = Number(data.token_24h_change).toFixed(2);
            tokens[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress;
            temp3 = false;
          }   
          if (data.token_address.includes(token.contractAddress) && Number(token.token_price) === 0) { 
            tokens[i].token_price = search_list[i].token_price = Number(data.token_price);
            tokens[i].token_value = search_list[i].token_value = (tokens[i].qty * data.token_price)
          }
          return j  
        })  
        if (temp3) {
          tokens[i].token_change = "";
          tokens[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress;
        }   
        if (roi_tokens.length>0){
          roi_tokens.map((roi, j)=>{
            if (token.tokenSymbol === roi.tokenSymbol){
              tokens[i].token_average = Number(roi.token_average);
              tokens[i].token_acquire =(Number(token.qty)* Number(roi.token_average))
              tokens[i].token_rol = ((tokens[i].token_acquire / tokens[i].token_value) * 100 ).toFixed(2)   
            }
            return j;
          })
        }  
      })

      tokens.map((token, i)=>{ 
        tables1=[];  
        if(roi_transactions.length >0){
          roi_transactions.map((roi, k)=>{
            if (token.tokenSymbol === roi.tokenSymbol ) tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, qty:roi.qty, token_value:(roi.qty * Number(token.token_price)), token_price:token.token_price, token_average:(Number(roi.token_acquire)/Number(roi.qty)), token_acquire:roi.token_acquire, token_rol:(Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2), token_change:token.token_change, token_position:token.token_position}]);
            return k;
          })              
        } 
        tokens[i].tables = tables1;
        return i;
      })  
      
      show = true;
      this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_name:wallet_name, wallet_chain:wallet_chain, tokens:tokens, search_list:search_list, token_db:token_db, temps:temps, pageLimit:this.state.pageLimit, show:show}])})
      this.setState({loading : false}) 
    }    
  }

  onSearchZero(zero, search_list, data_list) {
    this.setState({zero: zero});
    data_list = this.state.datas;
    if (zero){
      data_list.map((data, i)=>{
        search_list = []
        data.token_list.map((token, j)=>{
          if (Number(token.qty) ===0 || Number(token.token_value) === 0){
          } else {
            search_list = search_list.concat(token)
          }  
          return j;
        })
        data.search_list = search_list;
        const page_end = Number(this.state.pageLimit);
        data.tokens = search_list.slice(0, page_end); 
        data_list[i] = data;
        return i;
      })      
    } else {
      data_list.map((data, i)=>{
        data.search_list = data.token_list;
        const page_end = Number(this.state.pageLimit);
        data.tokens = data.search_list.slice(0, page_end); 
        data_list[i] = data;
        return i;
      })      
    }
    this.setState({datas: data_list});
  }

  onSearchHolding(holding) {
    this.setState(holding, holding);
    if (holding){
    } else {
    }
    const data_list = this.state.datas;
    this.setState({datas: data_list});
  }
  
  render(){
	  return <div className="exchange wallet">
				<div className="top-bar">
					<h3 className="page-title">My Address</h3>
					<button className="refresh btn" onClick={this.onRefresh}>Refresh</button>
				</div>
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
						<h4>Add Address</h4>
						<Inputs onCreate={this.onCreate} onSearchZero={this.onSearchZero} onSearchHolding={this.onSearchHolding}/>
						<Loading loading={this.state.loading}/>
						<Group datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} loding={this.state.loading} onShow={this.onShow}/>  
					</div>					
				</div>
			</div>      
  }
}	
export default Wallet;

// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }

