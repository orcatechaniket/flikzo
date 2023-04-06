import React from "react";
import "./Sidebar.css";
import { AiFillDashboard } from "react-icons/ai";
import {
  MdCategory,
  MdProductionQuantityLimits,
  MdAddToHomeScreen,
} from "react-icons/md";
import { SiInstacart } from "react-icons/si";
import { GoFileSubmodule } from "react-icons/go";
import { FaPeopleCarry } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ toggle }) => {
  const location = useLocation();
  return (
    <div className={`${toggle ? "d-none" : "col sidebar-column"}`}>
      <div className="brand">
        <h4>Flikzo</h4>
        <hr />
      </div>
      <ul>
        <Link className="link" to="/">
          <li className={location.pathname === "/" ? "active" : ""}>
            <AiFillDashboard />
            DashBoard
          </li>
        </Link>
        <Link className="link" to="/category">
          <li className={location.pathname === "/category" ? "active" : ""}>
            <MdCategory />
            Category
          </li>
        </Link>
        <Link className="link" to="/sub-category">
          <li className={location.pathname === "/sub-category" ? "active" : ""}>
            <GoFileSubmodule />
            Subcategory
          </li>
        </Link>
          <Link className="link" to="/vendor">
        <li className={location.pathname === "/vendor" ? "active" : ""}>
            <FaPeopleCarry />
            Vendor
        </li>
          </Link>
          <Link className="link" to="/products">
        <li
          className={
            location.pathname === "/products" ||
            location.pathname === "/products/:id"
              ? "active"
              : ""
          }
        >
            <MdProductionQuantityLimits />
            Products
        </li>
          </Link>
          <Link className="link" to="/home-page">
        <li className={location.pathname === "/home-page" ? "active" : ""}>
            <MdAddToHomeScreen />
            Home PAge
        </li>
          </Link>
          <Link className="link" to="/orders">
        <li className={location.pathname === "/orders" ? "active" : ""}>
            <SiInstacart />
            Orders
        </li>
          </Link>
          <Link className="link" to="/user">
        <li className={location.pathname === "/user" ? "active" : ""}>
            <SiInstacart />
            Users
        </li>
          </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
