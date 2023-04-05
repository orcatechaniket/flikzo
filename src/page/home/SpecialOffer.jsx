import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { filterProductOnSubCategory } from "../../function/product";
import { getSubCategory } from "../../function/subCategory";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { createOffer, deleteOffer, getOffer } from "../../function/offer";

const SpecialOffer = ({ subCategory }) => {
  const [offers, setOffers] = useState([]);
  const [product, setProduct] = useState([]);
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleProductSelection = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter((id) => id !== productId));
    } else {
      setSelectedProducts([...selectedProducts, productId]);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const getList = () => {
    getOffer()
      .then((res) => {
        setOffers(res.data.offerlist);
      })
      .catch((err) => {
        toast.error("Unable to fetch offers");
      });
  };

  const subCategoryChange = (e) => {
    console.log(e);

    filterProductOnSubCategory(e.target.value)
      .then((res) => {
        setProduct(res.data.product);
      })
      .catch((err) => {
        toast.error(err);
      });
  };
  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);
    formData.append("products", [selectedProducts]);

    createOffer(formData)
      .then((res) => {
        getList();
        console.log(product);
        toast.success("Offer created");
      })
      .catch((err) => toast.error("Error in creating in offer"));
  };
  const deleteoffer = (id) => {
    deleteOffer(id)
      .then((res) => {
        getList();
        toast.error("deleted");
      })
      .catch((err) => {
        toast.error("Error");
      });
  };
  return (
    <div>
      <form className="special-offer-form">
        <div class="row">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="Title"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
        <div class="form-group">
          <label htmlFor="images">Images:</label>
          <input
            type="file"
            id="images"
            className="form-control"
            name="images"
            onChange={onInputChange}
          />
        </div>
      </form>
      <div className="container product-select mt-4">
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
        <div className="container">
          {selectedProducts?.map((data) => (
            <p>{data}</p>
          ))}
        </div>
      </div>
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-success " onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className="table-responsive mt-5">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>

              <th scope="col">Products</th>
              <th scope="col"></th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {offers.map((data, idx) => (
              <tr key={data.id}>
                <td>{idx + 1}</td>
                <td>{data.name}</td>

                <td>
                  {data?.products?.map((a) => (
                    <>{a.name} ,</>
                  ))}
                </td>
                <td></td>
                <td>
                  <AiTwotoneDelete onClick={() => deleteoffer(data._id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialOffer;
