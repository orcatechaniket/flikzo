import React, { useEffect, useState } from 'react'
import {AiFillEdit,AiTwotoneDelete} from "react-icons/ai"

import {deleteSubCategory, getSubCategory} from "../../function/subCategory"

import { toast } from 'react-toastify'
import LoadingSpinner from '../../components/loadingSpinner/LoadingSpinner'

const ListSubCategory = () => {
useEffect(() => {

getAllSubCategory()
}, [])
  
  const [subcategory , setSubCategory] = useState([])

  const [loading, setLoading] = useState(false)
  const getAllSubCategory = () => {
    setLoading(true)
    getSubCategory().then((res) => {
      setLoading(false)
      setSubCategory(res.data.subcategory)
    }).catch((err) => {
      setLoading(false)
      toast.error(`${err.response.data.message}`)
    })
  }

  const deletesubcategory = (id) => {
    deleteSubCategory(id).then((res) => {
      toast.error("Deletion is succesfull")
      getAllSubCategory()
    }).catch((err) => {
      toast.error("Error in deletion")
    })
  }
  return (
    <div class="container mt-5 ">
    
    <div class="table-responsive"> <p className='text-center fw-bold fs-5 mb-5'>List</p>
      <table class="table table-hover">
        <thead>
          <tr>
          <th className='yellow'>Category</th>
            <th className='red'>Sub Category</th>
            <th className='green'>Description</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
       
        {loading ? <LoadingSpinner/> : <>
        <tbody>
        {subcategory.map((data) => (
          <tr>
            <td>{data.name}</td>
            <td>{data.category.name}</td>
            <td>{data.description}</td>
            <td><AiFillEdit/> <AiTwotoneDelete onClick={() => deletesubcategory(data._id)}/></td>
          </tr>
        ))}
        </tbody>
        </>}
      
      </table>
    </div>
  </div>
  )
}

export default ListSubCategory