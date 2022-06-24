import React, { Component } from 'react';
import ChartCom from '../components/dashboard/ChartCom';
import Menu from '../components/dashboard/Menu';

class Chart extends Component {
  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push('/');
    // }
  }

  render() {
    
    return (
      <div className="flex-div">
        <Menu ActivePage={1} />
        <div className="main-body"> 
		      <ChartCom/>
        </div>
      </div>
    );
  }
}

export default Chart;
