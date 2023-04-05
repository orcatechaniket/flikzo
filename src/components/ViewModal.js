import React from "react";
import { Link } from "react-router-dom";

const ViewModal = ({ data }) => {
  console.log(data);
  const products = data.products;
  console.log(products);
  return (
    <div>
      <div
        class="modal fade modal-lg"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div className="d-flex flex-row">
                <h5 class=" " id="staticBackdropLabel">
                  Order ID: {data.orderId}
                </h5>
              </div>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p className="mb-0">Status: {data?.orderStatus}</p>
              <p className="mb-0">Total: ₹{data?.bill?.total}</p>
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Date: {data?.date?.split("T")[0]}</th>
                    <th scope="col">Items: {data?.products?.length}</th>
                  </tr>
                </thead>
                <tbody>
                  {products?.map((product, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {product.product.name}
                        {"("}
                        {product.quantity}
                        {product.product.unit}
                        {")"}
                      </td>
                      <td>₹{product.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <h6 className="mb-0">Address: </h6>
              <div class="container text-left">
                <div class="row">
                  <div class="col">
                    Complete Address: {data?.address?.completeAddress}
                  </div>
                  <div class="col">Floor: {data?.address?.floor}</div>
                </div>
                <div class="row">
                  <div class="col">Nearby: {data?.address?.nearby}</div>
                  <div class="col">District: {data?.address?.district}</div>
                </div>
                <div class="row">
                  <div class="col">State: {data?.address?.state}</div>
                  <div class="col">Phone: {data?.address?.phone}</div>
                </div>
              </div>
              <Link
                to={`https://www.google.com/maps?q=${data?.address?.latitude}%2C${data?.address?.longitude}`}
              >
                <button className="btn btn-primary">Get direction</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewModal;
