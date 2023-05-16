import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProduct, deleteProduct } from "../../function/product";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import "../category/Category.css";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
const ListProduct = () => {
  const [products, seProducts] = useState([]);
  const [loading, setLoading] = useState(false)

  const getAllProduct = () => {
    setLoading(true)
    getProduct()
      .then((res) => {
        setLoading(false)
        seProducts(res.data.products);
        setFilteredProduct(res.data.products)
      })
      .catch((err) => {
        setLoading(false)
        toast.error("Error in fetching");
      });
  };

  const deleteproduct = (id) => {
    deleteProduct(id)
      .then((res) => {
        toast.error("Succesfully deleted");
        getAllProduct();
      })
      .catch((err) => {
        toast.error("unable to delete");
      });
  };

  useEffect(() => {
    getAllProduct();
  }, []);
  const [filteredProduct , setFilteredProduct] = useState(products);
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    if (products.length > 0) {
      const filtered = products?.filter(
        (product) =>
          product?.name?.toLowerCase().includes(query)
      );
      setFilteredProduct(filtered);
    }
  };


  return (
    <div className="table-responsive">
     {loading ? <LoadingSpinner/> : <>
     <div className="input-group m-3" >
        <input
          type="text"
          className="form-control w-25"
          
          placeholder="Enter product Name..."
          onChange={handleSearch}
        />
      </div>
      <table class="table">
    
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actual Price</th>
            <th scope="col">Offer Price</th>
            <th scope="col">Subcategory</th>
            <th scope="col">Vendor Shop</th>
            <th scope="col"></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
       
          {filteredProduct.map((data, idx) => (
            <tr>
              <th scope="row">{idx + 1}</th>
              <td>{data.name}</td>
              <td>{data.sizes?.quantity}</td>
              <td>₹{data.sizes?.actualPrice}</td>
              <td>₹{data.sizes?.price}</td>
              <td>{data.subcategory?.name}</td>
              <td>{data.vendor?.storeName}</td>
              <td className="p-0 m-0 ">
                {" "}
                <Link
                  className="text-decoration-none"
                  to={`/products/${data._id}`}
                >
                  Edit
                </Link>
              </td>
              <td>
                <AiFillEdit
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal2"
                />{" "}
               <AiTwotoneDelete onClick={() => deleteproduct(data._id)} />
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
      </>}
    </div>
  );
};

export default ListProduct;
