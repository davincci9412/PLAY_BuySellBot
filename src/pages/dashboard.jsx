/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Menu from '../components/dashboard/Menu';
import Wallet from '../components/dashboard/Wallet';
import { logoutUser } from '../actions/authActions';

class Dashboard extends Component {
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
            <Wallet WalletName="Wallet" />
        </div>
      </div>
    );
  }
}

export default Dashboard;
