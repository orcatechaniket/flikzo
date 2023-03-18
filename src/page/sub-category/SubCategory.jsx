import React from 'react'
import AddSubCategory from './AddSubCategory'
import ListSubCategory from './ListSubCategory'

const SubCategory = () => {
  return (
    <div>
    <div className="container d-flex justify-content-around">
      <h1 className="title-blue">Sub Category</h1>
      <div
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        className="add-button"
      >
        <p> + Add</p>
      </div>
      <AddSubCategory />
    </div>
    <ListSubCategory />
  </div>
  )
}

export default SubCategory