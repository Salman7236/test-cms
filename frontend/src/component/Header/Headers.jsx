import React from 'react';
import { Link } from 'react-router-dom';
import image from '../Assest/image/logo/icon-img.png';
import '../Header/Header.css';


export const Headers = () => {
  return (
    <header className='main-header'>
      <div className='container-fluid'>
        <div className='row align-items-center'>

          {/* Left section: menu + logo + text */}
          <div className='col d-flex align-items-center'>

            {/* Menu Button */}
            {/* <button className='menu-btn me-3'>
              <MdOutlineMenu size={20} />
            </button> */}

            {/* Logo and Text */}
            <Link to='/' className='d-flex align-items-center text-decoration-none'>
              <img src={image} className='logo me-2' alt="ftc-logo" />
              <span className="header-text">Complaint Management System</span>
            </Link>

            {/* <div className='col-3 d-flex align-items-center justify-content-end part3'>
              <button className='rounded-circle mr-3'> <CiLight /> </button>
            </div> */}
          </div>

        </div>
      </div>
    </header>
  );
};
