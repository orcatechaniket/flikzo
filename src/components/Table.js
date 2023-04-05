import React, { useContext, useEffect, useState } from "react";
import { StatusContext } from "../App";
import ViewModal from "./ViewModal";
import UpdateModal from "./UpdateModal";
import { toast } from "react-toastify";

const Table = () => {
  const { val } = useContext(StatusContext);
  const [orders, setOrders] = useState([]);
  const orderStatus = [
    "Order-Placed",
    "Order-Accepted",
    "Order-Rejected",
    "Out-For-Delivery",
    "Delivered",
  ];
  const [viewdata, setViewdata] = useState({});
  const [updata, setUpdata] = useState({});
  const viewClose = () => {
    setUpdata({});
  };
  const getData = () => {
    fetch(
      `https://www.flikzo.in/api/order/filter?status=${orderStatus[val]}`
    )
      .then((response) => response.json())
      .then((data) => {
        setOrders(data.ordersfound);
        console.log(data.ordersfound);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    getData();
  }, [val]);
  function confirmDeleteOrder(orderId) {
    const confirmation = window.confirm(
      "Are you sure you want to delete this order?"
    );
    if (confirmation) {
      deleteOrder(orderId);
    }
  }
  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `https://www.flikzo.in/api/order/${orderId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      toast.error("Deleted Order");
      getData();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div>
      <table className="mx-2 table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">OrderID</th>
            <th scope="col">Date</th>
            <th scope="col">Bill</th>
            <th scope="col">Operations</th>
          </tr>
        </thead>
        <tbody>
          {orders?.map((order, index) => (
            <tr key={index}>
              <th scope="row">{index + 1}</th>
              <td>{order?.user?.name}</td>
              <td>{order?.orderId}</td>
              <td>{order?.date.split("T")[0]}</td>
              <td>₹ {order?.bill.total}</td>
              <td>
                <button
                  type="button"
                  className="mx-2 btn btn-info btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  onClick={() => setViewdata(order)}
                >
                  View
                </button>
                <button
                  type="button"
                  className="mx-2 btn btn-danger btn-sm"
                  onClick={() => confirmDeleteOrder(order._id)}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="mx-2 btn btn-warning btn-sm"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop2"
                  onClick={() => setUpdata(order)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {viewdata && <ViewModal data={viewdata} />}
      {updata && (
        <UpdateModal updata={updata} viewClose={viewClose} getData={getData} />
      )}
    </div>
  );
};

export default Table;
