import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  createSection,
  getSections,
  deleteSection,
} from "../../function/homesection";
import {
  filterProductOnSubCategory,
  singleProduct,
} from "../../function/product";

const HomeSection = ({ subCategory }) => {
  const [product, setProduct] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [preview, setPreview] = useState([]);
  const [list, setList] = useState([]);
  const [sub, setSub] = useState();
  const subCategoryChange = (e) => {
    setSub(e.target.value);
    filterProductOnSubCategory(e.target.value)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };
  useEffect(() => {
    Promise.all(selectedProducts.map((productId) => singleProduct(productId)))
      .then((res) => setPreview(res.map((response) => response.data.product)))
      .catch((err) => {
        toast.error(err);
      });
  }, [selectedProducts]);

  const onSubmit = () => {
    const data = {
      title: sub,
      products: selectedProducts,
    };
    createSection(data)
      .then((res) => {
        toast.success("Offer created");
        getList();
      })
      .catch((err) => {
        toast.error("Error in creating");
      });
  };

  useEffect(() => {
    getList();
  }, []);
  const getList = () => {
    getSections()
      .then((res) => {
        setList(res.data.sections);
      })
      .catch((err) => {
        toast.error("Error in fetching sections");
      });
  };

  const deleteSectio = (id) => {
    deleteSection(id)
      .then((res) => {
        toast.error("Succesfully deleted");
        getList();
      })
      .catch((err) => {
        toast.error("unable to delete");
      });
  };

  return (
    <div>
      <div className="row today-offer">
        <div className="col-md-7">
          <form className="special-offer-form ">
            <div class="row">
              <div class="col">
                <label>Select a Title</label>
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
            <div className="row mb-3">
              {product?.map((data) => (
                <div className=" col-3 card">
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
      <div className="container today-offer-list">
        <div className="row">
          {list?.map((data) => (
            <div className="mb-3" key={data._id}>
              <div className="d-flex justify-content-between">
                <h5>{data?.title?.name}</h5>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteSectio(data._id)}
                >
                  Delete
                </button>
              </div>

              <div className="row">
                {data?.products?.map((product) => (
                  <div
                    className="col-md-1 col-3 card mx-1 p-2 mt-2"
                    key={product._id}
                  >
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
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
