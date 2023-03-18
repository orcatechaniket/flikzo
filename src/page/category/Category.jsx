import React from "react";
import AddCategory from "./AddCategory";
import CategoryList from "./CategoryList";
import "./Category.css";
const Category = () => {
  
  return (
    <div>
      <div className="container d-flex justify-content-around">
        <h1 className="title-blue">Category</h1>
        <div
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal1"
          className="add-button"
        >
          <p> + Add</p>
        </div>
        <AddCategory />
     
      </div>
      <CategoryList />
    </div>
  );
};

export default Category;
