import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Box } from '@blockstack/ui';
import { logoutUser } from '../../actions/authActions';
import Profile from './Profile';

class Header extends Component {
  onLogout = e => {
    this.props.logoutUser();
    window.location.href = '/';
  };

  render() {
    return (
      <Box>
        {this.props.auth.isAuthenticated ? (
          <Profile username="User Name" language="Eng" onLogout={this.onLogout} />
        ) : null}
      </Box>
    );
  }
}

Header.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { logoutUser })(Header);
