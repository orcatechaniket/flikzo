import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getVendor } from "../../function/vendor";
import ReloadVendor from "./ReloadVendor";

const ListVendor = () => {
const [vendor , setVendor] = useState([])
const [loading , setLoading] = useState(false)
  useEffect(() => {
listVendor()
  }, [])
  
  const listVendor = () => {
    setLoading(true)
    getVendor().then((res) => {
      setVendor(res.data.vendor)
      setLoading(false)
    }).catch((err) => {
      toast.error("Error in fetching vendor")
    })
  }
  return (
    <>
    <div className="container">
      <div className="row mt-4">
      {loading ? <ReloadVendor /> : <> {vendor?.map((data) => (
      <div className="col-4">
      <div class="card ">
        <div class="card-header">{data?.storeName}</div>
        <div class="card-body">
          <p class="card-text">
          <p>Name : {data?.name}</p>
            <p>Email : {data?.email}</p>
            <p>Phone : {data?.phone}</p>
            <p>Category :  {data?.category?.name}</p>
          </p>
          <div className="m-auto">
          <button className="btn btn-primary me-3">Edit</button>
      <button className="btn btn-danger">Delete</button>
          </div>
         
        </div>
       
      </div>
      
      </div>
    ))}</>}
      </div>
    </div>
   
   
   
    </>
  );
};

export default ListVendor;
