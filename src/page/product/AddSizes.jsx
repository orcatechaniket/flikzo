import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { addSize } from "../../function/product";
import { toast } from "react-toastify";
const AddSizes = ({ product }) => {
    const params = useParams();
  const [sizes, setSizes] = useState({
    size: "",
    price: "",
    stock: "",
  });
 
  const { price, actualPrice } = sizes;
  const offerPercentage = ((actualPrice - price) / actualPrice) * 100;

  const onSubmit = (e ) => {
    e.preventDefault();

    const data = {
      size : sizes.size,
      price : sizes.price,
      actualPrice : sizes.actualPrice,
      stock : sizes.stock,
    };
    
    addSize(params.id , data)
      .then((res) => {
        toast.success(`${sizes.size} is created`);

      })
      .catch((err) => {
        toast.error(`${err}`);
      });
  };

  return (
    <>
      <div className="container add-size-container">
        <div className="row">
          <div className="form-group col-4">
            <label htmlFor="quantity">Size: {product?.unit}</label>
            <input
              type="number"
              id="actual"
              className="form-control"
              name="actual"
              onChange={(e) =>
                setSizes((prev) => ({
                  ...prev,
                  size: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group col-4">
            <label for="Name">Stock :</label>
            <input
              type="number"
              id="quantity"
              className="form-control"
              name="stock"
              onChange={(e) =>
                setSizes((prev) => ({
                  ...prev,
                  stock: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group col-4">
            <label htmlFor="quantity">Actual Price:</label>
            <input
              type="number"
              id="actual"
              className="form-control"
              name="actual"
              onChange={(e) =>
                setSizes((prev) => ({
                  ...prev,
                  actualPrice: e.target.value,
                }))
              }
            />
          </div>

          <div className="form-group col-4">
            <label htmlFor="quantity">Offer Price :</label>
            <input
              type="number"
              id="offerPrice"
              className="form-control"
              name="offerPrice"
              onChange={(e) =>
                setSizes((prev) => ({
                  ...prev,
                  price: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-group col-4 d-flex mt-3 red-container ">
            <label htmlFor="quantity">Offer Price :</label>
            <p className="">{Math.round(offerPercentage)} %</p>
          </div>
          <div className="d-flex justify-content-center">
            <button className="btn btn-success" onClick={ onSubmit}>Submit</button>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="table-responsive">
          <h5>Available Sizes :</h5>
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Size</th>
                <th scope="col">Stock</th>
                <th scope="col">Actual Price</th>
                <th scope="col">Offer Price</th>
                <th scope="col">Offer %</th>
<th scope="col"></th>
                <th scope="col"></th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
            {product?.sizes?.map((data) => (
                <tr>
                <th scope="row"></th>
                <td>{data.size}</td>
                <td>{data.stock}</td>
                <td>₹{data.actualPrice}</td>
                <td>₹{data.price}</td>
                <td>{data.offerPrice}%</td>
                <td>{product.subcategory?.name}</td>
                <td>{product.vendor?.storeName}</td>
                <td>
                  <AiTwotoneDelete />
                </td>
                {/* {data.images.map((img) => {
    const url = `http://localhost:8000/${img}`
    console.log(img)
    return ( <img style={{width :"100px"}} src={url} />)
  } )} */}
              </tr>
            ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AddSizes;
