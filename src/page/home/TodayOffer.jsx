import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  filterProductOnSubCategory,
  singleProduct,
} from "../../function/product";
import {
  createTodayOffer,
  deleteTodayOffer,
  getTodayOffer,
} from "../../function/todayOffer";

const TodayOffer = ({ subCategory }) => {
  const [product, setProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [preview, setPreview] = useState([]);
  const [offer, setOffer] = useState([]);
  useEffect(() => {
    offerList();
  }, []);
  useEffect(() => {
    Promise.all(selectedProducts.map((productId) => singleProduct(productId)))
      .then((res) => setPreview(res.map((response) => response.data.product)))
      .catch((err) => {
        toast.error(err);
      });
  }, [selectedProducts]);

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  const subCategoryChange = (e) => {
    filterProductOnSubCategory(e.target.value)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const offerList = () => {
    getTodayOffer()
      .then((res) => {
        setOffer(res.data.offerlist[0]);
        console.log(offer);
      })
      .catch((err) => {
        toast.error("Error in fetching offer list");
      });
  };

  const onSubmit = () => {
    const data = {
      products: selectedProducts,
    };
    createTodayOffer(data)
      .then((res) => {
        toast.success("Offer created");
        offerList();
      })
      .catch((err) => {
        toast.error("Error in creating");
      });
  };

  const deleteOffer = (id) => {
    deleteTodayOffer(id)
      .then((res) => {
        toast.error("Succesfully deleted");
        offerList();
      })
      .catch((err) => {
        toast.error("unable to delete");
      });
  };
  return (
    <div className="container">
      <div className="row today-offer">
        <div className="col-md-7">
          <form className="special-offer-form ">
            <div class="row">
              <div class="col">
                <select className="form-select" onChange={subCategoryChange}>
                  <option selected disabled value="">
                    Choose Subcategory...
                  </option>
                  {subCategory.map((data) => (
                    <option key={data?._id} value={data?._id}>
                      {data?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>

          <div className="container  product-select mt-4">
            <div className="row">
              {product?.map((data) => (
                <div className="col-2">
                  <div className="pro">
                    <input
                      type="checkbox"
                      id={data._id}
                      value={data._id}
                      name="checkbox"
                      checked={selectedProducts.includes(`${data._id}`)}
                      onChange={() => handleProductSelection(`${data._id}`)}
                    />
                    <label htmlFor={data._id}>
                      <img
                        style={{ width: "100%" }}
                        src={`https://www.flikzo.in/${data.images[0]}`}
                      />
                      <span>{data.name}</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container col-md-5 bg-gradient-success preview-selection">
          {/* Render a new section to show the selected products */}
          {preview.length > 0 && (
            <div className="container pt-3">
              <h5>Selected Products:</h5>
              <div className="row">
                {preview.map((product) => (
                  <div className="col-3 card mx-1 p-2 mt-2" key={product._id}>
                    <img
                      style={{ width: "100%" }}
                      src={`https://www.flikzo.in/${product.images[0]}`}
                      alt={product.name}
                    />
                    <p>{product.name}</p>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-center my-5">
                <button className="btn btn-success " onClick={onSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="container today-offer p-4 mt-4">
        <h5>Today's offer List</h5>

        <div className="row">
          {offer?.products?.map((product) => (
            <div className="col-1 card mx-1 p-2 m-2" key={product._id}>
              <Link className="link" to={`/products/${product._id}`}>
                <img
                  style={{ width: "100%" }}
                  src={`https://www.flikzo.in/${product.images[0]}`}
                  alt={product.name}
                />

                <p>{product.name}</p>
              </Link>
            </div>
          ))}
        </div>
        <button
          className="btn btn-danger"
          onClick={() => deleteOffer(offer._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodayOffer;
