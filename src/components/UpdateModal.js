import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const UpdateModal = ({ updata, viewClose, getData }) => {
  console.log(updata);
  const orderStatus = [
    "Order Placed",
    "Order Accepted",
    "Order Rejected",
    "Out For Delivery",
    "Delivered",
  ];
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const url = `https://www.flikzo.in/api/order/${updata._id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderStatus: data.orderStatus }),
      });

      const value = await response.json();
      toast.dark("Successfully updated");
      viewClose();
      getData();
    } catch (error) {}
  };
  return (
    <div>
      <div
        class="modal fade "
        id="staticBackdrop2"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdrop2Label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <div className="d-flex flex-row">
                <h5 class=" " id="staticBackdrop2Label">
                  Update Order Status
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
              <h5>Order Id: {updata?.orderId}</h5>
              <form onSubmit={handleSubmit(onSubmit)}>
                <select
                  {...register("orderStatus", { required: true })}
                  class="form-select"
                  aria-label="Default select example"
                  defaultValue={orderStatus[0]}
                >
                  {orderStatus.map((status, index) => (
                    <option value={status}>{status}</option>
                  ))}
                </select>

                <button type="submit" class="btn btn-primary">
                  Save changes
                </button>
              </form>
            </div>
            <div class="modal-footer"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateModal;
