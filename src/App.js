// import React, { useState } from "react";
// import Sidebar from "./components/Sidebar/Sidebar";
// import "./App.css";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Category from "./page/category/Category";
// import SubCategory from "./page/sub-category/SubCategory";
// import Vendor from "./page/vendor/Vendor";
// import Product from "./page/product/Product";
// import AddProduct from "./page/product/AddProduct";
// import SingleProduct from "./page/product/SingleProduct";
// import Homepage from "./page/home/Homepage";
// import Dashboard from "./page/dashboard/Dashboard";
// import Login from "./page/login/Login";
// const App = () => {
//   const [toggle, setToggle] = useState(false);
//   const sidebar = () => {
//     setToggle(!toggle);
//   };

//   const [login, setLogin] = useState(true);
//   return (
//     <div className="container-fluid ">
//       <BrowserRouter>
//         <ToastContainer />
//         <div className="row main-container">
//           <Sidebar toggle={toggle} />
//           <div className="col">
//             <div className="navbar">
//               <button className="btn btn-primary" onClick={sidebar}>
//                 Click
//               </button>
//               jsdhfvjsd
//             </div>
//             <Routes>
//               <Route path="/login" element={<Login />} />
//               <Route path="/" element={<Dashboard />} />
//               {/* <Route path="/" element={<Dashboard/>} /> */}
//               <Route path="/category" element={<Category />} />
//               <Route path="/sub-category" element={<SubCategory />} />
//               <Route path="/vendor" element={<Vendor />} />
//               <Route path="/products" element={<Product />} />
//               <Route path="/products/:id" element={<SingleProduct />} />
//               <Route path="/home-page" element={<Homepage />} />
//             </Routes>
//           </div>
//         </div>
//       </BrowserRouter>
//     </div>
//   );
// };

// export default App;

import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Category from "./page/category/Category";
import SubCategory from "./page/sub-category/SubCategory";
import Vendor from "./page/vendor/Vendor";
import Product from "./page/product/Product";
import AddProduct from "./page/product/AddProduct";
import SingleProduct from "./page/product/SingleProduct";
import Homepage from "./page/home/Homepage";
import Dashboard from "./page/dashboard/Dashboard";
import Login from "./page/login/Login";
import Users from "./page/user/Users";
import Orders from "./page/order/Orders";
export const StatusContext = createContext();
const App = () => {
  const [toggle, setToggle] = useState(false);
  const sidebar = () => {
    setToggle(!toggle);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    if (username === "flikzo@admin.com" && password === "Flikzo@360") {
      setIsLoggedIn(true);
      <Navigate to="/" replace />;
    } else {
      setIsLoggedIn(false);
    }
  }, []);
  const [val, setVal] = useState(0);
  const value = { val, setVal };
  if (!isLoggedIn) {
    <Navigate to="/login" replace />;
  }
  return (
    <div className="container-fluid ">
      <StatusContext.Provider value={value}>
        <BrowserRouter>
          <ToastContainer />
          <div className="row main-container">
            {isLoggedIn && <Sidebar toggle={toggle} />}
            <div className={`col ${isLoggedIn ? "" : "full-width"}`}>
              {isLoggedIn && (
                <div className="navbar">
                  <button className="btn btn-primary" onClick={sidebar}>
                    Click
                  </button>
                  jsdhfvjsd
                </div>
              )}
              <Routes>
                {!isLoggedIn ? (
                  <Route
                    path="/login"
                    element={<Login setIsLoggedIn={setIsLoggedIn} />}
                  />
                ) : (
                  <Route path="/" element={<Dashboard />} />
                )}

                {!isLoggedIn ? (
                  <Route path="/*" element={<Navigate to="/login" />} />
                ) : (
                  <>
                    <Route
                      path="/"
                      element={<Dashboard setIsLoggedIn={setIsLoggedIn} />}
                    />
                    <Route path="/category" element={<Category />} />
                    <Route path="/sub-category" element={<SubCategory />} />
                    <Route path="/vendor" element={<Vendor />} />
                    <Route path="/products" element={<Product />} />
                    <Route path="/products/:id" element={<SingleProduct />} />
                    <Route path="/home-page" element={<Homepage />} />
                    <Route path="/user" element={<Users />} />
                    <Route path="/orders" element={<Orders />} />
                  </>
                )}
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </StatusContext.Provider>
    </div>
  );
};

export default App;
