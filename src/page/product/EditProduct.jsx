import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { updateSize } from "../../function/product";

const EditProduct = ({ product }) => {

  const params = useParams()
  const [sizes, setSizes] = useState(product.sizes);

// useEffect(() => {

// }, [sizes.actualPrice])


  const handleSizeChange = (index, field, value) => {
    const newSizes = [...sizes];
    newSizes[index][field] = value;
    setSizes(newSizes);

  };
 
  const onSubmit = (id) => {
    const index = sizes.findIndex((item) => item._id === id);
    console.log(index)
    const data = {
      size : sizes[index].size,
      price : sizes[index].price,
      actualPrice :sizes[index].actualPrice,
      stock : sizes[index].stock
    }
    
    updateSize(params.id , id , data)
    .then((res) => {
      toast.success(`${sizes.size} data is updated`)
    }).catch((err) => {
      toast.error("Error in updating size")
    })
  }

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <p>Name of Product : {product?.name} </p>
            <p>Category : {product.subcategory?.name}</p>
          </div>
          <div className="col-md-6">
            <p>Vendor Name : {product?.vendor?.name}</p>
            <p>Vendor Shop : {product?.vendor?.storeName}</p>
            <p>Quantity : {product?.quantity}</p>
          </div>
        </div>
        <div className="container mt-3">
          <h5>List of Sizes :</h5>
          {sizes.map((data, index) => (
            <div className="row edit-product-row my-4" key={index}>
              <div className="form-group col-4">
                <label htmlFor="quantity">Size: {product?.unit}</label>
                <input
                  type="number"
                  id="actual"
                  value={data.size}
                  className="form-control"
                  name="actual"
                  onChange={(e) =>
                    handleSizeChange(index, "size", e.target.value)
                  }
                />
              </div>
              <div className="form-group col-4">
                <label htmlFor="quantity">Stock :</label>
                <input
                  type="number"
                  id="quantity"
                  className="form-control"
                  value={data.stock}
                  name="stock"
                  onChange={(e) =>
                    handleSizeChange(index, "stock", e.target.value)
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
                  value={data.actualPrice}
                  onChange={(e) =>
                    handleSizeChange(index, "actualPrice", e.target.value)
                  }
                />
              </div>

              <div className="form-group col-4">
                <label htmlFor="quantity">Offer Price :</label>
                <input
                  type="number"
                  id="offerPrice"
                  className="form-control"
                  value={data.price}
                  name="offerPrice"
                  onChange={(e) =>
                    handleSizeChange(index, "price", e.target.value)
                  }
                />
              </div>
              
              <div className="d-flex justify-content-center">
                <button type="button" className="btn btn-primary mt-3"
                onClick={() => onSubmit(data._id)}
                >
                  Submit
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
