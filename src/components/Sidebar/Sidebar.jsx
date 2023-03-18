import React from "react";
import "./Sidebar.css";
import { AiFillDashboard } from "react-icons/ai";
import {
  MdCategory,
  MdProductionQuantityLimits,
  MdAddToHomeScreen,
} from "react-icons/md";
import {SiInstacart} from "react-icons/si"
import { GoFileSubmodule } from "react-icons/go";
import { FaPeopleCarry } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggle }) => {
    const location  = useLocation()
  return (
    <div className={`${toggle ? "d-none" : "col sidebar-column"}`}>
      <div className="brand">
        <h4>Flikzo</h4>
        <hr/>
      </div>
      <ul>
        <li  className={location.pathname === "/" ? "active" : ""}>
        <Link className="link" to="/">
          <AiFillDashboard />
          DashBoard
          </Link>
        </li>
        <li  className={location.pathname === "/category" ? "active" : ""}>
        <Link className="link" to="/category">
          <MdCategory />
          Category</Link>
        </li>
        <li  className={location.pathname === "/sub-category" ? "active" : ""}>
        <Link className="link" to="/sub-category">
          <GoFileSubmodule />
          Subcategory</Link>
        </li>
        <li  className={location.pathname === "/vendor" ? "active" : ""}>
        <Link className="link" to="/vendor">
          <FaPeopleCarry />
          Vendor
          </Link>
        </li>
        <li  className={location.pathname === "/products" || location.pathname === "/products/:id" ? "active" : ""}>
        <Link className="link" to="/products">
          <MdProductionQuantityLimits />
          Products</Link>
        </li>
        <li  className={location.pathname === "/home-page" ? "active" : ""}>
        <Link className="link" to="/home-page">
          <MdAddToHomeScreen />
          Home PAge</Link>
        </li>
        <li  className={location.pathname === "/orders" ? "active" : ""}>
        <Link className="link" to="/orders">
          <SiInstacart />
          Orders</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
