import React from 'react'
import AddProduct from './AddProduct'
import ListProduct from './ListProduct'

const Product = () => {
  return (
    <div>  <div className="container d-flex justify-content-around">
    <h1 className="title-blue">Product</h1>
    <div
      type="button"
      data-bs-toggle="modal"
      data-bs-target="#product"
      className="add-button"
    >
      <p> + Add</p>
    </div>
    {/* <AddCategory /> */}
 <AddProduct/>
  </div>
  {/* <CategoryList /> */}
  <ListProduct/>
  </div>
  )
}

export default Product