import React from 'react';
import Aux from "../../hoc/_Aux";
import './app.scss';
import NavMenu from './NavMenu';
import User from '../../pages/User'

const AdminLayout = () => {

  return (
    <Aux>
      <NavMenu />
      <div className="main-container">
        <div className="pcoded-wrapper">
          <div className="main-content">
            <div className="pcoded-inner-content">
              <User />
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default AdminLayout;