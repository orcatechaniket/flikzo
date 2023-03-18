import React, { useEffect, useState } from "react";
import { AiFillEdit, AiTwotoneDelete } from "react-icons/ai";
import { toast } from "react-toastify";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { deleteCategory, getCategory } from "../../function/category";
const CategoryList = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    listOfCategory()
  }, []);


  const listOfCategory = () => {
    setLoading(true)
    getCategory()
    .then((res) => {
      setLoading(false)
      setCategory(res.data.category);
    })
    .catch((err) => {
      setLoading(false)
      console.log(err);
    });
  } 
  const deletecategory = (id) => {
    deleteCategory(id)
    .then((res) => {
      toast.error("Succesfully deleted")
      listOfCategory()
    }).catch((err) => {
      toast.error("unable to delete")
    })

  } 
 
  return (
    <div className="container mt-5 ">
      <div className="table-responsive">
        {" "}
        <p className="text-center fw-bold fs-5 mb-5">List</p>
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="red">Category</th>

              <th></th>
            </tr>
          </thead>
          <tbody>
           {loading ? <LoadingSpinner/> : <>
           {category?.map((data) => (
              <tr key={data._id}>
                <td>{data?.name}</td>

                <td>
                  <AiFillEdit
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal2"
                  />{" "}
                  <AiTwotoneDelete onClick={() => deletecategory(data._id)} />
                </td>
              </tr>
            ))}
           </>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryList;
