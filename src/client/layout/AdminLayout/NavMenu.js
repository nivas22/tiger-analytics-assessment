import React from 'react';
import Aux from '../../hoc/_Aux';

const NavMenu = () => {
  return (
    <Aux>
      <header className='header'>
        <div className="content">
          <a href='#' className="b-brand">
            <div className="b-bg">
              <i className="feather icon-trending-up"/>
            </div>
            <span className="b-title">Tiger Analytics Assessment</span>
          </a>
        </div>
      </header>
    </Aux>
  );
}

export default NavMenu;