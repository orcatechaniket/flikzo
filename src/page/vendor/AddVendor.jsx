import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCategory } from "../../function/category";
import { createVendor } from "../../function/vendor";

const AddVendor = () => {
const [category, setCategory] = useState([])

const [vendor , setVendor] = useState({
  storeName : "",
  name : "",
  email : "",
  password : "",
  phone : "",
  category : ""
})
  useEffect(() => {
getCategory().then((res) => {
  setCategory(res.data.category)
}).catch((err) => {
  toast.error("Error in fetching the category")
})
  }, [])

  const onSubmit = () => {

    const data = {
      storeName : vendor.storeName,
  name : vendor.name,
  email : vendor.email,
  password : vendor.password,
  phone : vendor.phone,
  category : vendor.category
    }
    createVendor(data).then((res) => {
      toast.success("Vendor is Created")
    }).catch((err) => {
      toast.error("Error in creating")
    })
  }
  return (
    <div
      class="modal fade"
      id="vendor"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              Add Vendor
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form class="row g-3 needs-validation" novalidate>
              <div class="col-md-8">
                <label for="validationCustom01" class="form-label">
                  Store Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom01"
                  required
                  onChange={(e) =>
                  setVendor((prev) => ({ ...prev, storeName: e.target.value }))
                }
                />
                <div class="valid-feedback">Looks Good!</div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom02" class="form-label">
                  Owner Name :
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom02"
                  onChange={(e) =>
                  setVendor((prev) => ({ ...prev, name: e.target.value }))
                }
                />
                <div class="valid-feedback">Looks good!</div>
              </div>
              <div class="col-md-6">
                <label for="validationCustomUsername" class="form-label">
                  Phone
                </label>
                <div class="input-group has-validation">
                  <input
                    type="number"
                    class="form-control"
                    id="validationCustomUsername"
                    onChange={(e) =>
                  setVendor((prev) => ({ ...prev, phone: e.target.value }))
                }
                  />
                  <div class="invalid-feedback">Please enter a number.</div>
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">
                  Email
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  onChange={(e) =>
                  setVendor((prev) => ({ ...prev, email: e.target.value }))
                }
                />
                <div class="invalid-feedback">Please provide a valid city.</div>
              </div>
              <div class="col-md-6">
                <label for="validationCustom03" class="form-label">
                  Password
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="validationCustom03"
                  onChange={(e) =>
                  setVendor((prev) => ({ ...prev, password: e.target.value }))
                }
                />
               
              </div>
              <div class="col-md-4">
                <label for="validationCustom04" class="form-label">
                  Category
                </label>
                <select class="form-select" id="validationCustom04" 
                  onChange={(e) =>
                  setVendor((prev) => ({ ...prev, category: e.target.value }))
                }>
                <option selected disabled value="">
                    Choose...
                  </option>
                {category?.map((data) => (
                  <option value={data?._id}>{data?.name}</option>
                ))}
                  
                 
                </select>
                <div class="invalid-feedback">
                  Please select a valid Category.
                </div>
              </div>
            </form>
           <button onClick={onSubmit} className="btn btn-primary mt-4">
            Submit
           </button>
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

export default AddVendor;
