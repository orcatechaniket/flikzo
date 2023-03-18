import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { createSubCategory } from "../../function/subCategory";
import { getCategory } from "../../function/category";
const AddSubCategory = () => {
  const [subcategory, setSubCategory] = useState({
    name: "",
    category: "",
    description: "",
  });
  const onSubmit = (e) => {
    e.preventDefault()
    console.log(subcategory);
    const data ={ 
      name : subcategory.name,
      category : subcategory.category,
      description : subcategory.description
    }
  createSubCategory(data).then((res) => {
    toast.success(`${subcategory.name} is created`)
  }).catch((err) => {
    toast.error(`${err}`)
  })
  };

  const [category, setCategory] = useState([]);

  useEffect(() => {
    getCategory()
      .then((res) => {
        setCategory(res.data.category);
      })
      .catch((err) => {
        toast.error("Error in category fetching");
      });
  }, []);
  return (
    <div
      class="modal fade"
      id="exampleModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add Sub Category
            </h1>
            <button
             onClick={() => window.location.reload()}
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container ">
              <form>
                <div className="mb-3">
                  <label for="Name">Category</label>
                  <select
                    onChange={(e) =>
                      setSubCategory((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    class="form-select"
                  >
                  <option>jgsdj</option>
                    {category.map((data) => (
                      <option value={data._id}>{data.name}</option>
                    ))}
                  </select>
                </div>
                <div class="form-group mb-3">
                  <label for="Name">Sub Category</label>
                  <input
                    type="text"
                    class="form-control"
                    id="Name"
                    placeholder="Enter Category Name"
                    onChange={(e) =>
                      setSubCategory((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                  />
                </div>

                <div class="form-group">
                  <label for="des">Description :</label>
                  <input
                    type="text"
                    class="form-control"
                    id="des"
                    placeholder="Enter Description"
                    onChange={(e) =>
                      setSubCategory((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>
              </form>
              <button onClick={onSubmit} type="button" class="btn btn-primary mt-4">
              Save changes
            </button>
            </div>
          </div>
          <div class="modal-footer">
            <button
             onClick={() => window.location.reload()}
              type="button"
              class="btn btn-secondary"
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

export default AddSubCategory;
