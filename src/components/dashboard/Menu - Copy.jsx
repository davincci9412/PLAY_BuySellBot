import React from 'react';
import icon from '../../assets/images/Logo-Spark.png';
import icon0 from '../../assets/images/icon-menu.png';
import icon1 from '../../assets/images/menu-address.png';
import icon2 from '../../assets/images/menu-address-active.png';
import icon3 from '../../assets/images/menu-tracker.png';
import icon4 from '../../assets/images/menu-tracker-active.png';
import icon5 from '../../assets/images/menu-exchange.png';
import icon6 from '../../assets/images/menu-exchange-active.png';
import { Box, Text } from '@blockstack/ui';
import { Link } from 'react-router-dom';

const Menu = ({ ActivePage }) => {
  return (
    <Box flex="0 0 304px" className="menu-class">
      <div className="menu-title"><Text className="title"></Text><Text className="menu-title-icon cursor"></Text></div>
	  <div className="menu-sub-title opacity-03">by minr.tech</div>
      <Link to="/dashboard" className={ActivePage === 0 ? 'menu-item active' : 'menu-item'}>
        <Text className="menu-icon menu-address  opacity-05"></Text>
        <Text className=" opacity-05">My Address</Text>
      </Link>
      <Link to="/tracker" className={ActivePage === 1 ? 'menu-item active' : 'menu-item'}>
        <Text className="menu-icon menu-tracker  opacity-05"></Text>
        <Text className=" opacity-05">Address Tracker</Text>
      </Link>
      <Link to="/exchange" className={ActivePage === 2 ? 'menu-item active' : 'menu-item'}>
        <Text className="menu-icon menu-exchange  opacity-05"></Text>
        <Text className=" opacity-05">Exchange Arbitrage</Text>
      </Link>
    </Box>
  );
};

export default Menu;
