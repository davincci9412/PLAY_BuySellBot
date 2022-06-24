/**
 * Author : Vadim
 * Create Date : 8/16/2021
 * Email : snowfirst312@outlook.com
 * Skype : live:.cid.d66694e683af316e
 * Description : Spark project
 */

import React from 'react';
import icon0 from '../../assets/images/icon-menu.png';
import icon00 from '../../assets/images/icon-menu-close.png';
import icon1 from '../../assets/images/menu-address.png';
import icon2 from '../../assets/images/menu-address-active.png';
import icon3 from '../../assets/images/menu-tracker.png';
import icon4 from '../../assets/images/menu-tracker-active.png';
import { Link } from 'react-router-dom';

const Menu = ({ ActivePage }) => {
  return (
    <div className="menu-class">
      <div className="menu-title">
        <h1 className="title left">Bot</h1>
        <div onClick={menuClick}>
          <img src={icon0} className="menu-title-icon cursor hide" alt="Show" />
          <img src={icon00} className="menu-title-icon cursor show" alt="Close" />
        </div>
      </div>
      <Link to="/pancakeswap" className={ActivePage === 0 ? 'menu-item menu-address active' : 'menu-item menu-address'}>
        <img src={icon1} className="menu-icon opacity-05 no-active" alt="Setting"/>
        <img src={icon2} className="menu-icon opacity-05 active" alt="Setting"/>
        <span className="menu-text opacity-05">Pancakeswap</span>
      </Link>
      <Link to="/apeswap" className={ActivePage === 1 ? 'menu-item menu-tracker active' : 'menu-item menu-tracker'}>
        <img src={icon3} className="menu-icon opacity-05 no-active" alt="Status"/>
        <img src={icon4} className="menu-icon opacity-05 active" alt="Status"/>
        <span className="menu-text opacity-05">Apeswap</span>
      </Link>
    </div>
  );
};

export default Menu;

function menuClick(){
	const menu = document.getElementsByClassName("App")[0];
	if (menu.classList.contains("menu-close")) {
		menu.classList.remove("menu-close");
	} else {
		menu.className += " menu-close";
	}	  
}

