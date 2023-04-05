import React from 'react'
import AddVendor from './AddVendor'
import ListVendor from './ListVendor'
import ReloadVendor from './ReloadVendor'

const Vendor = () => {
  return (
    <div>
    <div className="container d-flex justify-content-around">
      <h1 className="title-blue">Vendor</h1>
      <div
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#vendor"
        className="add-button"
      >
        <p> + Add</p>
      </div>
      <AddVendor />
    </div>
    <ListVendor/>
  </div>
  )
}

export default Vendor