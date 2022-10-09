import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import API from "../../../backend"
import { handleNonEmptyFieldCSS } from "../../../common/utils"
import Button from "../button/button"
import { isAuthenticated } from "../../../API/authentication"
import axios from "axios"
import { updatedashboardState } from "../../../store/action/dashboard-action"
import "./AdminCategory.css"
import Table from 'react-bootstrap/Table';
import { useState } from "react"
import * as MdIcons from "react-icons/md"
import { updateFieldState } from "../../../store/action/form-action"
import Popup from "../Modal/Modal"

const AdminCategories = () => {
  const [addCategoryVisible, setAddCategoryVisible] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)    
  const [successfullCreation, setSuccessfullCreation] = useState(false)
  const [selectedCatforDelete, setSelectedCatforDelete] = useState() 
  const dashboardForm = useSelector((state) => state.dashboardReducer)
  const dispatch = useDispatch()
  const { user, token } = isAuthenticated()

  const onInputChange = (event) => {
    let name = event.target.name
    let value = event.target.value
    dispatch(updatedashboardState(name, value))
    handleNonEmptyFieldCSS(event)
  }

  const createCategory = () => {
    axios.post(
      `${API}category/create/${user._id}`,
      {
        name: dashboardForm.newCategoryName,
      },
      {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }
    ).then((data)=>{
      dispatch(updateFieldState("showModal", true))
      setSuccessfullCreation(true)
      dispatch(updatedashboardState("existingCategories", [...dashboardForm.existingCategories, data.data.category]))
    })
  }
  
  useEffect(() => {
    axios.get(
      `${API}categories`
    ).then((response)=>{
      dispatch(updatedashboardState("existingCategories", response.data))
    })
  }, [])
  
  useEffect(() => {
    handleNonEmptyFieldCSS(null, true)
  }, [addCategoryVisible])

  const deleteConfirmation=(name, id)=>{
    setConfirmDelete(true)
    setSelectedCatforDelete([name, id])
    dispatch(updateFieldState("showModal", true))
  }

  const deleteCategory=()=>{
    axios.delete(`${API}category/${selectedCatforDelete[1]}/${user._id}`,
    {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      }).then(()=>{
      dispatch(updatedashboardState("existingCategories", dashboardForm.existingCategories.filter((data)=>data._id!==selectedCatforDelete[1])))
      setConfirmDelete(false)
      setSelectedCatforDelete("")
      })
  }
 
  return (
    <>
      <div className="mt-5">
        <h1>Categories</h1>
        {!addCategoryVisible && (<Button Label="Add New Category" onClick={()=>setAddCategoryVisible(true)}></Button>)}
      </div>
      {addCategoryVisible && (
      <form className="form-login">
        <div className="input-container mt-5">
          <input
            type="text"
            id="newCategoryName"
            className="text-input"
            placeholder="Enter your text"
            value={dashboardForm.newCategoryName}
            name="newCategoryName"
            onChange={onInputChange}
          />
          <label htmlFor="newCategoryName" className="label">
            Category Name
          </label>
        </div>
        <Button Label="Add" onClick={createCategory} />
        <Button Label="Cancel" onClick={()=>setAddCategoryVisible(false)} />
      </form>)}
    <div className="existing-category">
    {dashboardForm.existingCategories.length>0 ? (
      <Table striped bordered hover>
        <thead>
          <tr >
            <th>S No</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {dashboardForm.existingCategories.map((item, index)=>{
        return(
          <tr key={item._id}>
            <td >{index+1}</td>
            <td>{item.name}</td>
            <td className="action-col">
              <td className="cursor-pointer"><MdIcons.MdModeEditOutline /></td>
              <td className="cursor-pointer" onClick={()=>deleteConfirmation(item.name, item._id)}><MdIcons.MdDelete /></td>
            </td>
          </tr>
          )
        })}
        </tbody>
      </Table>):(<h3 className="mt-5">No Categories present</h3>)}
    </div>
    {successfullCreation && (
      <Popup
        title="Category created succesfully"
        content=""
        onClick={()=>setSuccessfullCreation(false)}
        buttonLabel="OK"
        secondButtonReq = {false}
    />)}
    {confirmDelete && (
      <Popup
        title="Warning"
        content={`Are you sure you want to delete ${selectedCatforDelete[0]}`}
        onClick={deleteCategory}
        buttonLabel="Confirm"
        buttonLabelSecondary = "No"
        secondButtonReq = {true}
        secondButtonAction={()=>{
          setConfirmDelete(false)
          setSelectedCatforDelete("")
        }}
    />)}
    </>
  )
}

export default AdminCategories
