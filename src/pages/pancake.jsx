/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React, { Component } from 'react';

import Menu from '../components/dashboard/Menu';
import Pancakeswap from '../components/dashboard/Pancakeswap';

class Pancake extends Component {
  componentDidMount() {
    // if (!this.props.auth.isAuthenticated) {
    //   this.props.history.push('/');
    // }
  }
  

  render() {
    return (
      <div className="flex-div">
        <Menu ActivePage={0} />
        <div className="main-body"> 
            <Pancakeswap />
        </div>
      </div>
    );
  }
}

export default Pancake;
