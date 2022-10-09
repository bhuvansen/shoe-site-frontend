import React from "react"
import Modal from "react-bootstrap/Modal"
import "./Modal.css"
import { useDispatch, useSelector } from "react-redux"
import { updateFieldState } from "../../../store/action/form-action"
import Button from "../button/button"

const Popup = ({ title, onClick, content, buttonLabel, buttonLabelSecondary, secondButtonReq=false, secondButtonAction }) => {
  const form = useSelector((state) => state.formReducer)
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(updateFieldState("showModal", false))
  }

  return (
    <>
      <Modal
      show={form.showModal}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      className="popUp"
    >
    
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
      <Button Label={buttonLabel} onClick={onClick}/>
      {secondButtonReq && (<Button Label={buttonLabelSecondary} onClick={secondButtonAction}/>)}
      </Modal.Footer>
    </Modal>
    </>
  )
}

export default Popup
