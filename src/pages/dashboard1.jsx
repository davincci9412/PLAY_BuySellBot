import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box, Flex } from '@blockstack/ui';

import Menu from '../components/dashboard/Menu';
//import Footer from '../components/dashboard/Footer';
import Wallet1 from '../components/dashboard/Wallet1';
import { logoutUser } from '../actions/authActions';

class Dashboard extends Component {
  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  render() {
    const WalletContents = [
      ['BTC', 7, 19.5, 19.5, 19.5, 18, 1],
      ['Safe Moon', 10, 19.5, 19.5, 19.5, -9, 0],
    ];
    return (
      <Flex alignItems="stretch">
        <Menu ActivePage={0} />
        <Box
          flex={['0 0 100%', '0 0 calc(100% - 230px)']}
          maxWidth={['100%', 'calc(100% - 230px)']}
        >
          <Box>          
            <Wallet1 WalletName="Wallet" TableContents={WalletContents} />
          </Box>
        </Box>
      </Flex>
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
