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
import { Box, Flex } from '@blockstack/ui';
import Menu from '../components/dashboard/Menu';
import Token from '../components/dashboard/Exchange/Token';
import Header from '../components/common/Header.jsx';
import Footer from '../components/common/Footer.jsx';

import { logoutUser } from '../actions/authActions';

class Arbitrage extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={2} />
        <Box className="main-body">          
          <Box>
            <Header/>
			<Token
              TableFields={['Token', 'Buy', 'Transfer', 'Sell', 'Buffer', 'TOTOAL']}
            />  
			<Footer/>			
          </Box>
        </Box>
      </Flex>
    );
  }
}

Arbitrage.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Arbitrage);
