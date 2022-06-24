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
import Poo from '../../assets/images/poo-icon.png';
import Delete from '../../assets/images/delete.png';
import { Box } from '@blockstack/ui';
import Pagination from './Pagination';
import {  LineChart, Line, BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Brush, AreaChart, Area,} from 'recharts';
const datasByRow = [];
let data01 = [];
//let data02 = [];
// let data03 = [];
// let data04 = [];
// let data05 = [];
// let data06 = [];

class Inputs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {zero:true, addressValid: false,  chainValid: false,  formValid: false, wallet_address:'', history:false, cookieDelete:false, wallet_name:'', wallet_chain:'', token:'', qty:'', token_value:'', token_price:'', token_average:'', token_acquire:'', token_change:'', token_rol:'',token_position:'', chain:'', temp1:'', temp2:'', temp3:''};
    this.handleClear = this.handleClear.bind(this);
    this.handleZeroClick = this.handleZeroClick.bind(this);
    this.handleBelowClick = this.handleBelowClick.bind(this);
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

  handleBelowClick({target}){
    this.props.onSearchBelow.call(null, target.checked);
  }
  
  render(){  
	  return  <div className='search-box container-fluid'>
              <div className="row">
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
              <div className="container-fluid row checkbox">
                <div className = 'col-md-6'>
                  <input type="checkbox" onClick={this.handleZeroClick.bind(this)}/>Remove zero values
                </div>
                <div className = 'col-md-6'>
                  <input type="checkbox" onClick={this.handleBelowClick.bind(this)}/>Remove below 10 USD
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
    } else if (this.props.type === "token_value" || this.props.type === "token_price"){
      return <div className="td">${this.props.placeholder}</div> 
    } else if (this.props.type === "token_average" || this.props.type === "token_acquire"){
      if (this.props.show){
        if (this.props.type==="token_acquire" && this.props.bought === "no") {
          return <div className="td">-${this.props.placeholder}</div> 
        } else {
          return <div className="td">${this.props.placeholder}</div> 
        }         
      } else {
        return <div className="noshow"></div>
      }
    } else if (this.props.type === "token_change"){
      if (this.props.placeholder!== "") {
        if (Number(this.props.placeholder) >= 0){
          return <div className="td change"><div className="change"><span className="green-arrow sort-icon"></span><span className="text-success"> {this.props.placeholder}%</span></div></div> 
        }else{
          return <div className="td change"><div className="change"><span className="red-arrow sort-icon"></span><span className="text-danger"> {this.props.placeholder}%</span></div></div> 
        }
      }else {
        return <div className="td change"><div className="change"><span className="text-danger">Can't get</span></div></div> 
      }
    } else if (this.props.type === "token_rol"){
      if (this.props.show){
        if (this.props.placeholder === "NaN") {
          return <div className="td small text-danger">Zero Division</div> 
        } else if (this.props.placeholder === "Infinity") {
          return <div className="td small text-danger">Infinity</div> 
        } else {
          return <div className="td small">{this.props.placeholder}%</div> 
        }
      } else {
        return <div className="noshow"></div>
      }      
    } else if (this.props.type === "qty"){
      if (this.props.bought === "no") {
        return <div className="td">-{this.props.placeholder}</div> 
      } else {
        return <div className="td">{this.props.placeholder}</div> 
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
            <Column type='tokenBought' placeholder={this.props.data.tokenBought} />
            <Column type='tokenSold' placeholder={this.props.data.tokenSold} />
            <Column type='qty' placeholder={this.props.data.qty} bought={this.props.data.bought_transaction}/>
            <Column type='token_value' placeholder={this.props.data.token_value} />
            <Column type='token_price' placeholder={this.props.data.token_price} />
            <Column type='token_average' placeholder={this.props.data.token_average} show={this.props.roi_complete}/>
            <Column type='token_acquire' placeholder={this.props.data.token_acquire} show={this.props.roi_complete} bought={this.props.data.bought_transaction}/>
            <Column type='token_change' placeholder={this.props.data.token_change} />
            <Column type='token_rol' placeholder={this.props.data.token_rol} show={this.props.roi_complete}/>
            <Column type='token_position' placeholder={this.props.data.token_position} />
          </div>
  }
}

class Table1 extends React.Component {
  render(){
	return  <div  className={this.props.show? 'table section-hide': 'table section-show'}>
					{
					  this.props.tables.map((data, i) => {
						  return <Row1 roi_complete = {this.props.roi_complete} key={i} uuid={i} timeStamp={new Date(data.timeStamp * 1000).toISOString().slice(0,10)} data={data} />
					  })
					}
          </div>
  }
}

class Row extends React.Component {
  render(){
	return  <div>
            <div className="tr">
              <Column type='token' placeholder={this.props.data.tokenName} uuid={this.props.uuid} offset={this.props.offset}/>
              <Column type='tokenBought' placeholder={this.props.data.tokenBought} />
              <Column type='tokenSold' placeholder={this.props.data.tokenSold} />
              <Column type='qty' placeholder={this.props.data.qty} />
              <Column type='token_value' placeholder={this.props.data.token_value} />
              <Column type='token_price' placeholder={this.props.data.token_price} />
              <Column type='token_average' placeholder={this.props.data.token_average} show={this.props.roi_complete} />
              <Column type='token_acquire' placeholder={this.props.data.token_acquire} show={this.props.roi_complete}/>
              <Column type='token_change' placeholder={this.props.data.token_change} />
              <Column type='token_rol' placeholder={this.props.data.token_rol} show={this.props.roi_complete}/>
              <Column type='token_position' placeholder={this.props.data.token_position} />
            </div>
            <Table1 tables = {this.props.data.tables} show={this.props.show} roi_complete={this.props.roi_complete}/>
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

  onPage = async(data, tokens) =>{
    const { currentPage, pageLimit } = data;
    const offset = (currentPage - 1) * pageLimit;
    tokens = this.props.search_list.slice(offset, currentPage * pageLimit)    
    this.setState({ current_tokens:tokens });
  }
  
  handleUp({target}){
    this.props.onSort.call(null, this.props.index, target.attributes.name.nodeValue, "asc");    
  }

  handleDown({target}){
    this.props.onSort.call(null, this.props.index, target.attributes.name.nodeValue, "desc");    
  }

  render(){   
    const totalRecords = this.props.search_list.length;
    if (totalRecords === 0) return null;

    return <div className="table">
              <div className={this.props.roi_complete? "roi table":"table"}>
                  <div className="tr thead">
                    <div className="td table-header">
                      <div className="flex">
                        <span className="text">Token</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="tokenSymbol" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="tokenSymbol" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two">
                      <div className="flex">
                        <span className="text">Total Tokens<br/>Bought</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="tokenBought" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="tokenBought" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two">
                      <div className="flex">
                        <span className="text">Total Tokens<br/>Sold</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="tokenSold" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="tokenSold" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two">
                      <div className="flex">
                        <span className="text">Balance<br/>QTY</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="qty" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="qty" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two">                      
                      <div className="flex">
                        <span className="text">Current<br/>Value</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_value" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_value" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two">                      
                      <div className="flex">
                        <span className="text">Current<br/>Price</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_price" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_price" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className={this.props.roi_complete?"td table-header two":"td table-header two noshow"}>
                      <div className="flex">
                        <span className="text">Average Buy<br/>Sell Price</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_average" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_average" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className={this.props.roi_complete?"td table-header two":"td table-header two noshow"}>
                      <div className="flex">
                        <span className="text">Money<br/>Invested</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_acquire" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_acquire" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header two change">
                      <div className="flex">
                        <span className="text">Price Change<br/>24hrs</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_change" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_change" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className={this.props.roi_complete?"td table-header small":"td table-header small noshow"}>
                      <div className="flex">
                        <span className="text">ROI</span>
                        <span className="sort"><span className="up-arrow sort-icon" name="token_rol" onClick={this.handleUp.bind(this)}></span><span className="down-arrow sort-icon" name="token_rol" onClick={this.handleDown.bind(this)}></span></span>
                      </div>
                    </div>
                    <div className="td table-header small price">PooCoin</div>
                  </div>
                  {
                    this.state.current_tokens.map((data, i) => {
                      return <Row key={i} offset={this.props.offset} show={this.props.show} roi_complete={this.props.roi_complete} uuid={i} data={data} />
                    })
                  }
              </div>
              <Pagination totalRecords={totalRecords} pageLimit={20} pageNeighbours={1} onPage={this.onPage} />
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
					<Table onSort={this.props.onSort} index={i} offset={offset} show={data.show} search_list={data.search_list} tokens={data.tokens} wallet_address={data.wallet_address} roi_complete={data.roi_complete} />      
          
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
      return <div className="py-1"></div>
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

class ChartCom extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, tables: datasByRow, tokens: datasByRow, temps: datasByRow, token_list:datasByRow, below:false, loading:false, pageLimit:20};
    this.onDelete = this.onDelete.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onShow = this.onShow.bind(this);
    this.onRename = this.onRename.bind(this);
    this.onCreate = this.onCreate.bind(this);
    this.onSearchZero = this.onSearchZero.bind(this);
    this.onSearchBelow = this.onSearchBelow.bind(this);
    this.onRefresh = this.onRefresh.bind(this);

    // axios.get(process.env.REACT_APP_SERVER_URL+'/address/getBNB', { params : {id:localStorage.getItem("id")}}).then( async res => {
    //   if (res.data.length>0){
    //     let tempArray = [];
    //     let temp=0;
    //     const results = res.data;
		// 		results.map((data, i)=>{     
    //       tempArray = data.price.split(",");          
    //       const start = data.start;   
    //       tempArray.map((element,j)=>{
    //         temp = new Date(Number(start)+j*60000);
    //         data01 = data01.concat([{date:temp.getMonth()+"/"+temp.getDay()+"-"+temp.getHours()+"-"+temp.getMinutes(), price:element}]);
    //         return j;
    //       })
    //       return i;
    //     })
    //     console.log(111);
    //     this.setState({data01:data01});
    //   }
    // }).catch(error => {   
    //   console.log(error);
    // }) 

    axios.get(process.env.REACT_APP_SERVER_URL+'/address/getPrice', { params : {id:localStorage.getItem("id")}}).then( async res => {
      if (res.data.length>0){
        let bnbArray = [];
        let btcArray = [];
        let ethArray = [];
        let solArray = [];
        let adaArray = [];
        let xrpArray = [];
        let temp=0;
        const results = res.data;
				results.map((data, i)=>{     
          bnbArray = data.bnb.split(",");          
          btcArray = data.btc.split(",");          
          ethArray = data.eth.split(",");          
          solArray = data.sol.split(",");          
          adaArray = data.ada.split(",");          
          xrpArray = data.xrp.split(",");          
          const start = data.start;   
          bnbArray.map((element,j)=>{
            temp = new Date(Number(start)+j*60000);
            data01 = data01.concat([{date:temp.getMonth()+"/"+temp.getDay()+"-"+temp.getHours()+"-"+temp.getMinutes(), bnb:element, btc:Number(btcArray[j])/100-60, eth:Number(ethArray[j])/10+70, sol:Number(solArray[j])*2+80, ada:Number(adaArray[j])*160, xrp:Number(xrpArray[j])*300+80}]);
            return j;
          })
          return i;
        })
        console.log(111);
        this.setState({data01:data01});
      }
    }).catch(error => {   
      console.log(error);
    }) 

  }

  componentDidMount(){
    
    
    
  }

  onDelete(id) {
    const data_list = this.state.datas;
    data_list.splice(id, 1);
    this.setState({datas: data_list});
  }

  onSort(id, key, order) {
    const data_list = this.state.datas;
    data_list[id].search_list =data_list[id].search_list.sort(compareValues(key, order));
    const page_end = Number(this.state.pageLimit);
    data_list[id].tokens = data_list[id].search_list.slice(0, page_end);      
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
  
  async onCreate(wallet_address, wallet_name, wallet_chain, tables, tables1, tokens, tokens_main, temps, token_list, search_list, token_db, roi_transactions, roi_tokens, token_name, token_symbol, token_position, token_decimal, contract_address, token_bought, token_sold, chain, temp1, temp2, temp3, url1, url2, url3, url4, qty_sum, acquire_sum, show, running, roi_complete){
    tokens = tokens_main = tables = temps = token_list = tables1 = token_db = search_list = roi_tokens = roi_transactions = [];
    
    wallet_address = wallet_address.trim().toLowerCase();
	  this.setState({wallet_address:wallet_address});	

    roi_complete = false;
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
          //url4 = 'https://api.covalenthq.com/v1/56/address/'+wallet_address+'/balances_v2/?nft=true&no-nft-fetch=true&key=ckey_daca4efda85b4837961727b8cbb'
          url4 = 'https://api.bscscan.com/api?module=account&action=addresstokenbalance&address='+wallet_address+'&page=1&offset=1000&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          chain = 'binancecoin'
          token_position = 'https://poocoin.app/tokens/0xb8c77482e45f1f44de1745f52c74426c631bdd52';
          token_name = "Binance Coin"
          token_symbol = 'BNB'
          token_decimal = 18
          contract_address = "0xb8c77482e45f1f44de1745f52c74426c631bdd52"
          break;
        case '2':
          url1 = 'https://api.etherscan.io/api?module=account&action=txlist&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url2 = 'https://api.etherscan.io/api?module=account&action=tokentx&address='+wallet_address+'&startblock=0&endblock=999999999&sort=desc&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          url3 = 'https://api.etherscan.io/api?module=account&action=balance&address='+wallet_address+'&tag=latest&apikey=WT9GGT4T6QN21F6K8WKPWYP7NG68CPFXNQ'
          //url4 = 'https://api.covalenthq.com/v1/1/address/'+wallet_address+'/balances_v2/?nft=true&no-nft-fetch=true&key=ckey_daca4efda85b4837961727b8cbb'
          url4 = 'https://api.etherscan.io/api?module=account&action=addresstokenbalance&address='+wallet_address+'&page=1&offset=1000&apikey=536NCBDYVREIJDEM66KFETYK6N76PY89GT'
          chain = 'ethereum'
          token_position = 'https://poocoin.app/tokens/0x2170ed0880ac9a755fd29b2688956bd959f933f8';
          token_name = "Ethereum"
          token_symbol = 'ETH'
          token_decimal = 0;
          contract_address = ""
          break;
        default:
          break;
      }  
      
      //Check whether the wallet exists(the user inputs the wallet address on this page at first) or not and get all the DB data related with the wallet address
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/wallet', { params : {id:localStorage.getItem("id"), chain_id:wallet_chain, wallet_address: wallet_address, tokenName:token_name, tokenSymbol:token_symbol, tokenDecimal:token_decimal, contractAddress:contract_address}}).then( async res => {
        const result = await res.data;
        if (result.create !== "create" && result.status === 2){          
        //if (result.create !== "create"){          
            //Get the transaction list that respects the token buying information(acquired value)
          await axios.get(process.env.REACT_APP_SERVER_URL+'/address/getRoi', { params : {wallet_address: wallet_address}}).then( async res => {
            roi_transactions = await res.data; //get the roi transactions from the DB
            })
            .catch(error => {          
          })   
          roi_complete = true; 
          if (roi_transactions.length > 0) {
            roi_tokens = [...new Map(roi_transactions.map(item => [item["tokenSymbol"], item])).values()]
            roi_tokens.map((token, i)=>{
              qty_sum = acquire_sum = 0;
              roi_transactions.map((transaction, j)=>{          
                if (transaction.tokenSymbol === token.tokenSymbol && transaction.to ===wallet_address && transaction.token_acquire > 0){
                  qty_sum = Number(qty_sum) + Number(transaction.qty);
                  acquire_sum = Number(acquire_sum) + Number(transaction.token_acquire);
                }
                return j;
              })
              Number(qty_sum > 0)? roi_tokens[i].token_average = acquire_sum / qty_sum : roi_tokens[i].token_average = 0;
              return i;
            })
          }          
        } 
        tokens_main = tokens_main.concat([{wallet_address:result.wallet_address, tokenName:result.tokenName, tokenSymbol:result.tokenSymbol, tokenDecimal:result.tokenDecimal, qty:convert(result.qty), contractAddress:result.contractAddress}]);
      })
      .catch(error => {
      })  

      //Get the token balance list of the wallet by DB or API
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/tokenBalances', { params : {wallet_address: wallet_address}}).then( async res => {
        token_list = await res.data; //get the token balance list from the DB
        token_list = tokens_main.concat(token_list);
      }).catch(error => {          
      }) 

      //Get the tokens from DB
      await axios.get(process.env.REACT_APP_SERVER_URL+'/address/token', { params : {wallet_address: wallet_address}}).then( async res => {
        token_db = await res.data;         
      })
      .catch(error => {
      })
      if(!roi_complete){
        await axios.get(process.env.REACT_APP_SERVER_URL+'/address/transactions', { params:{wallet_address: wallet_address}}).then( async res => {
          const results = await res.data; //get the BNB transactions from the DB
          results.map((data, i) => {
            temp1 = (Number(data.value)/(10**token_decimal))
            tables = tables.concat([{ hash:data.hash, timeStamp:data.timeStamp, tokenName:token_name, tokenSymbol:token_symbol, tokenDecimal:token_decimal, from:data.from, to:data.to,  contractAddress:contract_address, qty:temp1, token_position:token_position}]);
            return i;
          })
        }).catch(error => {          
        }) 

        await axios.get(process.env.REACT_APP_SERVER_URL+'/address/tokenTransactions', { params : {wallet_address: wallet_address}}).then( async res => {
          const results = await res.data; //get the token transactions from the DB
          results.map((data, i) => {
            temp1 = Number(data.value)/(10**data.tokenDecimal)
            temps = temps.concat([{ hash:data.hash, timeStamp:data.timeStamp, tokenName:data.tokenName, tokenSymbol:data.tokenSymbol, tokenDecimal:data.tokenDecimal, qty:temp1, from:data.from, to:data.to, contractAddress:data.contractAddress.trim().toLowerCase()}]);
            return i;   
          })
        }).catch(error => {          
        }) 
      }      
      
      token_list.map(async(token, i)=>  {   
        temp3 = true;      
        token_db.map((data, j)=>{
          if (data.token_address.trim().toLowerCase().includes(token.contractAddress.trim().toLowerCase()) || data.token_address === token.tokenSymbol) { 
            token_list[i].token_price = convert(Number(data.token_price));
            token_list[i].token_value = convert((token_list[i].qty * data.token_price))
            token_list[i].token_change = convert(Number(Number(data.token_24h_change).toFixed(2)));
            token_list[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress.trim().toLowerCase();
            temp3 = false;
          } 
          return j  
        })  
        if (temp3) {
          token_list[i].token_price = 0;
          token_list[i].token_value = 0;
          token_list[i].token_change = "";
          token_list[i].token_position =  'https://poocoin.app/tokens/'+token.contractAddress.trim().toLowerCase();
        }   
        if (roi_tokens.length>0){
          roi_tokens.map((roi, j)=>{
            if (token.tokenSymbol === roi.tokenSymbol){
              token_list[i].token_average = convert(Number(roi.token_average));
              token_list[i].token_acquire = convert((Number(token.qty)* Number(roi.token_average)))
              if (token_list[i].token_value === 0) {
                token_list[i].token_rol = 0  
              } else {
                token_list[i].token_rol = Number(((token_list[i].token_acquire / token_list[i].token_value) * 100 ).toFixed(2))  
              }
            }
            return j;
          })
        }
        token_list[i].qty = convert(token_list[i].qty); 
      })

      token_list.map((token, i)=>{ 
        tables1=[];  
        if (roi_complete){
          token_bought = token_sold = 0;
          roi_transactions.map((roi, j)=>{
            if (roi.contractAddress.trim().toLowerCase() === token.contractAddress.trim().toLowerCase() && roi.to === wallet_address && roi.qty > 0) {
              token_bought = token_bought + Number(roi.qty);
              if (Number(roi.qty * Number(token.token_price)) === 0) {
                temp1 = 0
              } else {
                temp1 = (Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2)
              }
              tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, tokenBought:convert(roi.qty), tokenSold:0, qty:convert(roi.qty), token_value:convert((roi.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(roi.token_acquire)/Number(roi.qty))), token_acquire:convert(roi.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"yes"}]);
            } else if (roi.contractAddress.trim().toLowerCase() === token.contractAddress.trim().toLowerCase() && roi.from === wallet_address && roi.qty > 0){
              token_sold = token_sold + Number(roi.qty);
              if (Number(roi.qty * Number(token.token_price)) === 0) {
                temp1 = 0
              } else {
                temp1 = (Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2)
              }
              tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, tokenBought:0, tokenSold:convert(roi.qty), qty:convert(roi.qty), token_value:convert((roi.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(roi.token_acquire)/Number(roi.qty))), token_acquire:convert(roi.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"no"}]);
            }
            return j;
          })
          token_list[i].tokenBought = convert(token_bought);
          token_list[i].tokenSold = convert(token_sold);          
        } else {
          token_bought = token_sold = 0;
          if (i === 0 ){
            tables.map((table, j)=>{
              if (table.to === wallet_address && table.qty > 0) {
                token_bought = token_bought + Number(table.qty);
                if (Number(table.qty * Number(token.token_price)) === 0) {
                  temp1 = 0
                } else {
                  temp1 = (Number(table.token_acquire)/Number(table.qty * Number(token.token_price))*100).toFixed(2)
                }
                tables1 = tables1.concat([{timeStamp:table.timeStamp, tokenSymbol:table.tokenSymbol, tokenBought:convert(table.qty), tokenSold:0, qty:convert(table.qty), token_value:convert((table.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(table.token_acquire)/Number(table.qty))), token_acquire:convert(table.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"yes"}]);
              } else if (table.from === wallet_address && table.qty > 0){
                token_sold = token_sold + Number(table.qty);
                if (Number(table.qty * Number(token.token_price)) === 0) {
                  temp1 = 0
                } else {
                  temp1 = (Number(table.token_acquire)/Number(table.qty * Number(token.token_price))*100).toFixed(2)
                }
                tables1 = tables1.concat([{timeStamp:table.timeStamp, tokenSymbol:table.tokenSymbol, tokenBought:0, tokenSold:convert(table.qty), qty:convert(table.qty), token_value:convert((table.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(table.token_acquire)/Number(table.qty))), token_acquire:convert(table.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"no"}]);
              }
              return j;
            })
            token_list[i].tokenBought = convert(token_bought);
            token_list[i].tokenSold = convert(token_sold);   
          } else {
            if(temps.length >0){
              temps.map((roi, k)=>{
                if (roi.contractAddress.trim().toLowerCase() === token.contractAddress.trim().toLowerCase() && roi.to === wallet_address && roi.qty > 0) {
                  token_bought = token_bought + Number(roi.qty);
                  if (Number(roi.qty * Number(token.token_price)) === 0) {
                    temp1 = 0
                  } else {
                    temp1 = (Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2)
                  }
                  tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, tokenBought:convert(roi.qty), tokenSold:0, qty:(roi.qty), token_value:convert((roi.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(roi.token_acquire)/Number(roi.qty))), token_acquire:convert(roi.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"yes"}]);
                } else if (roi.contractAddress.trim().toLowerCase() === token.contractAddress.trim().toLowerCase() && roi.from === wallet_address && roi.qty > 0){
                  token_sold = token_sold + Number(roi.qty);
                  if (Number(roi.qty * Number(token.token_price)) === 0) {
                    temp1 = 0
                  } else {
                    temp1 = (Number(roi.token_acquire)/Number(roi.qty * Number(token.token_price))*100).toFixed(2)
                  }
                  tables1 = tables1.concat([{timeStamp:roi.timeStamp, tokenSymbol:roi.tokenSymbol, tokenBought:0, tokenSold:convert(roi.qty), qty:(roi.qty), token_value:convert((roi.qty * Number(token.token_price))), token_price:convert(token.token_price), token_average:convert((Number(roi.token_acquire)/Number(roi.qty))), token_acquire:convert(roi.token_acquire), token_rol:temp1, token_change:token.token_change, token_position:token.token_position, bought_transaction:"no"}]);
                }
                return k;
              })  
              token_list[i].tokenBought = convert(token_bought);
              token_list[i].tokenSold = convert(token_sold);               
            } 
          } 
        }
        
        token_list[i].tables = tables1;       
        return i;
      })  

      token_list.sort(compareValues('token_value', 'desc'));
      
      if (token_list.length > 0) {
        token_list.map((data, i) => {          
          if (this.state.zero ){
            if (Number(data.token_value) === 0){
            } else {
              search_list = search_list.concat(data)
            }          
          } else if (this.state.below){
            if (Number(data.qty) < 10){
              search_list = search_list.concat(data);
            }
          } else {
            search_list = search_list.concat(data);
          }
          return i;
        })
      }

      const page_end = Number(this.state.pageLimit);
      tokens = search_list.slice(0, page_end); 

      show = true;
      this.setState({datas: this.state.datas.concat([{ wallet_address:wallet_address, wallet_name:wallet_name, wallet_chain:wallet_chain, tokens:tokens, token_list:token_list, search_list:search_list, pageLimit:this.state.pageLimit, show:show, roi_complete:roi_complete}])})
      this.setState({loading : false}) 
    }    
  }

  onSearchZero(zero, search_list) {
    this.setState({zero: zero});
    const data_list = this.state.datas;
    if (zero){
      data_list.map((data, i)=>{
        search_list = []
        data.search_list.map((token, j)=>{
          if (Number(token.token_value) === 0){
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
        const page_end = Number(this.state.pageLimit);
        if (this.state.below){
          search_list = []
          data.token_list.map((token, j)=>{
            if (Number(token.token_value) < 10){
            } else {
              search_list = search_list.concat(token)
            }  
            return j;
          })
          data.search_list = search_list;
        } else {
          data.search_list = data.token_list;
        }        
        data.tokens = data.search_list.slice(0, page_end); 
        data_list[i] = data;
        return i;
      })      
    }
    this.setState({datas: data_list});
  }

  onSearchBelow(below, search_list) {
    this.setState({below: below});
    const data_list = this.state.datas;
    if (below){
      data_list.map((data, i)=>{
        search_list = []
        data.search_list.map((token, j)=>{
          if ( Number(token.token_value) < 10){
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
        const page_end = Number(this.state.pageLimit);
        if (this.state.zero){
          search_list = []
          data.token_list.map((token, j)=>{
            if (Number(token.token_value) === 0){
            } else {
              search_list = search_list.concat(token)
            }  
            return j;
          })
          data.search_list = search_list;
        } else {
          data.search_list = data.token_list;
        }    
        data.tokens = data.search_list.slice(0, page_end); 
        data_list[i] = data;
        return i;
      })      
    }
    this.setState({datas: data_list});
  }
  
  render(){
	  return <div className="exchange wallet">
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
						<Inputs onCreate={this.onCreate} onSearchZero={this.onSearchZero} onSearchBelow={this.onSearchBelow}/>
						<Loading loading={this.state.loading}/>
            <div className="line-chart-wrapper">
              <LineChart
                width={1500} height={800} data={this.state.data01}
                margin={{ top: 40, right: 40, bottom: 20, left: 0 }}
              >
                <CartesianGrid vertical={false} />
                <XAxis dataKey="date" label="Date" />
                <YAxis domain={['auto', 'auto']} label="Stock Price" labelStyle={{fontWeight: 'bold', color: '#666666'}} />
                <Tooltip
                  wrapperStyle={{
                    borderColor: 'white',
                    boxShadow: '2px 2px 3px 0px rgb(204, 204, 204)',
                  }}
                  contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#666666' }}
                />
                <Line dataKey="bnb" stroke="#ff7300" dot={false} />
                <Line dataKey="btc" stroke="#ff0000" dot={false} />
                <Line dataKey="eth" stroke="#ff00ff" dot={false} />
                <Line dataKey="sol" stroke="#ffff00" dot={false} />
                <Line dataKey="ada" stroke="#00ff73" dot={false} />
                <Line dataKey="xrp" stroke="#0073ff" dot={false} />
                <Brush dataKey="date" startIndex={data01.length - 20}>
                  <AreaChart>
                    <CartesianGrid />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Area dataKey="bnb" stroke="#ff7300" fill="#ff7300" dot={false} />
                  </AreaChart>
                </Brush>
              </LineChart>
            </div>
						<Group datas={this.state.datas} onDelete={this.onDelete} onRename={this.onRename} onSort={this.onSort} loding={this.state.loading} onShow={this.onShow}/>  
					</div>					
				</div>
			</div>      
  }
}	
export default ChartCom;

// function sleep(milliseconds) {
//   const date = Date.now();
//   let currentDate = null;
//   do {
//     currentDate = Date.now();
//   } while (currentDate - date < milliseconds);
// }
function convert(n){
  if (n !== undefined){
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
  } else {
    return 0;
  }
}
function compareValues(key, order = 'asc') {
  return function innerSort(a, b) {
    if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
      // property doesn't exist on either object
      return 0;
    }

    const varA = (typeof a[key] === 'string')
      ? a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string')
      ? b[key].toUpperCase() : b[key];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order === 'desc') ? (comparison * -1) : comparison
    );
  };
}

