import React, { useContext } from "react";
import { StatusContext } from "../App";

const Tabs = () => {
  const { val, setVal } = useContext(StatusContext);
  return (
    <div>
      <ul class="nav nav-pills nav-fill">
        <li class="nav-item" onClick={() => setVal(0)}>
          <a
            class={`nav-link ${val === 0 ? "active" : ""}`}
            aria-current="page"
            href="#"
          >
            Order Placed
          </a>
        </li>
        <li class="nav-item" onClick={() => setVal(1)}>
          <a
            class={`nav-link ${val === 1 ? "active" : ""}`}
            aria-current="page"
            href="#"
          >
            Order Accepted
          </a>
        </li>
         <li class="nav-item" onClick={() => setVal(5)}>
          <a class={`nav-link ${val === 5 ? "active" : ""}`} href="#">
            Order Cancelled
          </a>
        </li>
        <li class="nav-item" onClick={() => setVal(2)}>
          <a class={`nav-link ${val === 2 ? "active" : ""}`} href="#">
            Order Rejected
          </a>
        </li>
        <li class="nav-item" onClick={() => setVal(3)}>
          <a class={`nav-link ${val === 3 ? "active" : ""}`} href="#">
            Out For Delivery
          </a>
        </li>
        <li class="nav-item" onClick={() => setVal(4)}>
          <a class={`nav-link ${val === 4 ? "active" : ""}`} href="#">
            Delivered
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Tabs;
