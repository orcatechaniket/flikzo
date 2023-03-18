import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getSubCategory } from "../../function/subCategory";

import "./home.css"
import HomeSection from "./HomeSection";
import SpecialOffer from "./SpecialOffer";
import TodayOffer from "./TodayOffer";

const Homepage = () => {

    const [activeTab, setActiveTab] = useState(0);
    const [subCategory, setSubCategory] = useState([]);
  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  useEffect(() => {
    getSubCategory()
      .then((res) => {
        setSubCategory(res.data.subcategory);
      })
      .catch((err) => {
        toast.error("Error in fetching the category");
      });
   
  }, []);

  return   <div className="tabs-container">
  <div className="tabs-list">
  <div
      className={`tab ${activeTab === 0 ? 'active' : ''}`}
      onClick={() => handleTabClick(0)}
    >
      Create Offer
    </div>
  
    <div
      className={`tab ${activeTab === 2 ? 'active' : ''}`}
      onClick={() => handleTabClick(2)}
    >
      Today's offer
    </div>
    <div
      className={`tab ${activeTab === 3 ? 'active' : ''}`}
      onClick={() => handleTabClick(3)}
    >
      Section
    </div>
  </div>
  <div className="tab-content">
    {activeTab === 0 && <SpecialOffer subCategory={subCategory}/>}
    {activeTab === 2 && <TodayOffer subCategory={subCategory}/>}
    {activeTab === 3 && <HomeSection subCategory={subCategory}/>}
  </div>
</div>
};

export default Homepage;
