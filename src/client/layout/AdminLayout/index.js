import React from 'react';
import Aux from "../../hoc/_Aux";
import './app.scss';
import NavMenu from './NavMenu';
import Product from '../../pages/Product'

const AdminLayout = () => {

  return (
    <Aux>
      <NavMenu />
      <div className="main-container">
        <div className="pcoded-wrapper">
          <div className="main-content">
            <div className="pcoded-inner-content">
              <Product />
            </div>
          </div>
        </div>
      </div>
    </Aux>
  );
}

export default AdminLayout;