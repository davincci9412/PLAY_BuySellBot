/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Bot project
 */

import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const datasByRow = [];

class Select extends React.Component {
  render(){
	return <select type='text' name={this.props.name} onChange={this.props.change} value={this.props.value} className='form-control'>	
        <option value="0">Select Number</option>	 
        <option value="1">1 (Day)</option>	 
        <option value="2">2 (Half Day)</option> 	 
        <option value="3">3 (Every 8 Hours)</option> 	 
        <option value="4">4 (Every 6 Hours)</option> 	 
        <option value="6">6 (Every 4 Hours)</option> 	 
        <option value="12">12 (Every 2 Hours)</option> 	 
        <option value="24">24 (Every Hour)</option> 	 
        <option value="48">48 (Every 30 Minutes)</option>  	 
        <option value="96">96 (Every 15 Minutes)</option>  	 
        <option value="144">144 (Every 10 Minutes)</option>  	 
        <option value="288">288 (Every 5 Minutes)</option>
      </select>
  }
}

class SaveButton extends React.Component {
  onClick(){    
    if (Number(this.props.newData.repeated_number) === 0 || this.props.newData.repeated_number === null) {
      toast.error("Input the repeated number.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
    } else {
      //Save the setting information to DB
      axios.get(process.env.REACT_APP_SERVER_URL+'/address/apeSave', { params : {id: this.props.newData.id, repeated_number: this.props.newData.repeated_number, slippage: this.props.newData.slippage}}).then( async res => {
        const result = await res.data   
        if (result !== "fail"){
          this.setState({repeated_number: result.apeRepeatedNumber});  
          this.setState({slippage: result.apeSlippage});  
          this.setState({id: result._id});   
          this.setState({start: result.apeActionStatus});  
          toast.info("Saved successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
        } else {
          toast.error("Did not save successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
        }   
      })
      .catch(error => {
        toast.error("Did not save successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
      })
    }    
	}
	render(){
		return <input type="submit" className="btn btn-success add" onClick={this.onClick.bind(this)} value="Save"/>
	}
}

class StartButton extends React.Component { 
  onClick(){    
    if (Number(this.props.newData.repeated_number) === 0 || this.props.newData.repeated_number === ""){
      toast.error("Select the repeated number.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
    } else {
      this.props.start.call(null, this.props.newData);      
    }
	}
	render(){
		return <input type="submit" className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled} value="Start"/>
	}
}

class StopButton extends React.Component {
  onClick(){    
    if (this.props.newData.start){
      this.props.stop.call(null, this.props.newData);      
    } else {
      toast.error("Trading was not started yet.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
    }
	}
	render(){
		return <input type="submit" className="btn btn-success add" onClick={this.onClick.bind(this)} disabled={this.props.disabled} value="Stop"/>
	}
}

class Apeswap extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { datas: datasByRow, addressValid: false,  chainValid: false,  formValid: false, id:"", slippage:"", repeated_number:"", start:""};
    this.onStart = this.onStart.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onSave = this.onSave.bind(this);

    //Get the setting information from DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/address/getApeSetting').then( async res => {
      const result = await res.data   
      if (result !== null){
        this.setState({repeated_number: result.apeRepeatedNumber});  
        this.setState({id: result._id});  
        this.setState({slippage: result.apeSlippage}); 
        this.setState({start: result.apeActionStatus}); 
      }    
    })
    .catch(error => {
      console.log(error)
    })   
  }

  componentDidMount(){       
     
  }

  handleChange(propertyName, e) {	  
    const change = {};
    change[propertyName] = e.target.value;
    this.setState(change);
    this.setState({[e.target.name]: e.target.value});
  }

  onStart( data ){
    //Make the start status of trading to the "settings" table of DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/address/apeStart', { params : {id: data.id, repeated_number: data.repeated_number, slippage: data.slippage}}).then( async res => {
      const result = await res.data   
      if (result !== "fail"){
        this.setState({start: 1});  
        toast.info("Started successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
        //location.reload(); 
      } else {
        toast.error("Did not start successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
      }   
    })
    .catch(error => {
      toast.error("Did not start successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
    })

  }

  onStop( data ){
    //Make the start status of trading to the "settings" table of DB
    axios.get(process.env.REACT_APP_SERVER_URL+'/address/apeStop', { params : {id: data.id, repeated_number: data.repeated_number, slippage: data.slippage}}).then( async res => {
      const result = await res.data   
      if (result !== "fail"){
        this.setState({start: 0});  
        toast.info("Stopped successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
        //location.reload();
      } else {
        toast.error("Did not stop successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
      }   
    })
    .catch(error => {
      toast.error("Did not stop successfully.", {position: toast.POSITION.TOP_RIGHT,  autoClose:3000});
    })  
  }

  onSave( id ){
    

  }
  
  render(){
	  return <div className="exchange wallet">
				<div className="container-fluid small" datas={this.state.datas} >
					<div className="mb-5">
            <div >
              <h1 className="text-center text-success">Apeswap Setting Status</h1>
              <div className='search-box'>
                <div className='container-fluid'>
                  <div className="row my-4">
                    <div className = 'col-md-8'>
                      <h4>Number of repetitions per day : </h4>
                    </div>          
                    <div className='col-md-4'>
                      <Select name='repeated_number' change={this.handleChange.bind(this, 'repeated_number')} value={this.state.repeated_number} />
                    </div>
                  </div>
                  <div className="row my-4">
                    <div className = 'col-md-8'>
                      <h4>Action status : </h4>
                    </div>          
                    <div className='col-md-4'>
                      <h4 className={this.state.start?"text-success":""}>{this.state.start?"Started":"No start"}</h4>
                    </div>
                  </div>
                  <div className="row mt-5">
                    <div className = 'col-md-4'>
                    </div>          
                    <div className='col-md-4 text-center'>
                      <SaveButton newData={this.state} save={this.onSave}/>
                    </div>
                    <div className = 'col-md-4'>
                    </div>
                  </div>
                </div>
              </div>
              <h1 className="text-center text-success mt-5">Apeswap Action Control</h1>
              <div className='search-box'>
                <div className='container-fluid'>
                  <div className="row">
                    <div className = 'col-md-2'>
                    </div>          
                    <div className='col-md-4 text-center'>
                      <StartButton newData={this.state} start={this.onStart} disabled={this.state.start}/>
                    </div>
                    <div className='col-md-4 text-center'>
                      <StopButton newData={this.state} stop={this.onStop} disabled={!this.state.start}/>
                    </div>
                    <div className = 'col-md-2'>
                    </div>
                  </div>
                </div>
              </div>
            </div>
					</div>					
				</div>
			</div>      
  }
}	
export default Apeswap;
