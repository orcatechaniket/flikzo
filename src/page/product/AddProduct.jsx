import React, { useEffect, useState } from "react";
import { getSubCategory } from "../../function/subCategory";
import { getVendor } from "../../function/vendor";
import { toast } from "react-toastify";
import { createProduct } from "../../function/product";

const AddProduct = () => {
  const [vendor, setVendor] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectedSub, setSelectedSub] = useState({});
  const [selectedVendor, setSelectedVendor] = useState({});
  useEffect(() => {
    getSubCategory()
      .then((res) => {
        setSubCategory(res.data.subcategory);
      })
      .catch((err) => {
        toast.error("Error in fetching the category");
      });

    getVendor()
      .then((res) => {
        setVendor(res.data.vendor);
      })
      .catch((err) => {
        toast.error("Error in fetching the vendor");
      });
  }, []);

  const [product, setProduct] = useState({
    name: "",
    description: "",
    rating: "",
    images: "",
    unit : "",
  });
  const [images, setImages] = useState([]);

  const handleImageChange = (event) => {
    setImages([...images, ...event.target.files]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const {
      name,
      description,
     
      unit
    } = product;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("subcategory", selectedSub.subcategory);
    formData.append("vendor", selectedVendor.vendor);
    formData.append("unit", unit);
    images.forEach((image) => {
      formData.append("images", image);
    });

    createProduct(formData)
      .then((res) => {
        toast.success(`${res.data.name} is created`);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="product"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Add product
              </h1>
              <button
                onClick={() => window.location.reload()}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="container ">
                <form className="row ">
                  <div className="form-group">
                    <label for="Name">Name:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label for="Name">Description :</label>
                    <input
                      type="text"
                      id="price"
                      className="form-control"
                      name="price"
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="form-group col-4">
                    <label for="Name">Unit :</label>
                    <input
                      type="text"
                      id="unit"
                      className="form-control"
                      name="unit"
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          unit: e.target.value,
                        }))
                      }
                    />
                  </div>
                

             
                  <div className="form-group col-6">
                    <label for="Name">Subcategory :</label>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setSelectedSub((prev) => ({
                          ...prev,
                          subcategory: e.target.value,
                        }))
                      }
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      {subCategory.map((data) => (
                        <option key={data?._id} value={data?._id}>
                          {data?.name}
                        </option>
                      ))}
                    </select>
                    <div className="invalid-feedback">
                      Please select a valid Category.
                    </div>
                  </div>
                  <div className="form-group col-6">
                    <label for="Name">Vendor :</label>
                    <select
                      className="form-select"
                      onChange={(e) =>
                        setSelectedVendor((prev) => ({
                          ...prev,
                          vendor: e.target.value,
                        }))
                      }
                    >
                      <option selected disabled value="">
                        Choose...
                      </option>
                      {vendor?.map((data) => (
                        <option value={data?._id}>{data?.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group col-10">
                    <label htmlFor="images">Images:</label>
                    <input
                      type="file"
                      id="images"
                      className="form-control"
                      name="images"
                      multiple
                      onChange={handleImageChange}
                    />
                  </div>
                  <div className="preview">
                    {images.map((image) => (
                      <img
                        src={URL.createObjectURL(image)}
                        key={image.name}
                        alt="preview"
                      />
                    ))}
                  </div>
                </form>
                <button
                  onClick={handleSubmit}
                  type="button"
                  className="btn btn-primary mt-3"
                >
                  Submit
                </button>
              </div>
            </div>
            <div className="modal-footer">
              <button
                onClick={() => window.location.reload()}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
