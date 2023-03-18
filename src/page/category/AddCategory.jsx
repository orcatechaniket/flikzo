import React, { useState } from "react";
import { toast } from "react-toastify";
import { createCategory } from "../../function/category";
const AddCategory = () => {
  const [category, setCategory] = useState("");
 
 
  const onSubmit = () => {
    const data = {
      name : category
    }
    createCategory(data).then((res) => {
      toast.success(res.data)
    }).catch((err) => {
      toast.error(err.response.data.message)
    })
 }




  return (
    <div
      className="modal fade"
      id="exampleModal1"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">
              Add Category
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
              <form>
                <div className="form-group">
                  <label htmlFor="Name">Name:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Name"
                    placeholder="Enter Category Name"
                    onChange={(e) =>
                      setCategory( e.target.value )
                    }
                  />
                </div>
                
              </form>
              <button onClick={onSubmit} type="button" className="btn btn-primary mt-3">
              Submit
            </button>
            </div>
          
          </div>
          <div className="modal-footer">
            <button onClick={() => window.location.reload()}
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
  );
};

export default AddCategory;
