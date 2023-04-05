import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { singleProduct } from "../../function/product";
import AddSizes from "./AddSizes";
import EditProduct from "./EditProduct";
import "./Product.css";
import ProductDetail from "./ProductDetail";
const SingleProduct = () => {
  const params = useParams();
  const [product, setProduct] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
    
  const handleTabClick = (index) => {
    setActiveTab(index);
  };
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    singleProduct(params.id)
      .then((res) => {
        setLoading(false)
        setProduct(res.data.product);
      })
      .catch((err) => {
        setLoading(false)
        toast.error(err);
      });
  }, []);
  return (
    <div >
      <div className="container d-flex justify-content-around">
        <h1 className="title-blue">Product</h1>
      </div>
      <div className="tabs-container">
  <div className="tabs-list">
  <div
      className={`tab ${activeTab === 0 ? 'active' : ''}`}
      onClick={() => handleTabClick(0)}
    >
      Product Detail
    </div>
  
    <div
      className={`tab ${activeTab === 2 ? 'active' : ''}`}
      onClick={() => handleTabClick(2)}
    >
      Add sizes
    </div>
    <div
      className={`tab ${activeTab === 3 ? 'active' : ''}`}
      onClick={() => handleTabClick(3)}
    >
      Edit Product
    </div>
  </div>
  <div className="tab-content">
  {loading ? <LoadingSpinner/> : <>
  {activeTab === 0 && <ProductDetail  product={product}/>}
    {activeTab === 2 && <AddSizes product={product}/>}
    {activeTab === 3 && <EditProduct product={product}/>}
  </>}
  
  </div>
</div>
    </div>
  );
};

export default SingleProduct;
