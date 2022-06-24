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
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';
import WalletsTracked from '../components/dashboard/Tracker/WalletsTracked';
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
        <Menu ActivePage={1} />
        <div className="main-body">          
          <WalletsTracked />
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);

