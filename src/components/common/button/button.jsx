import React from "react"
import "./button.css"
export default function Button({ Label, onClick, disabled }) {
  return (
    <>
      <button className="button" type='button' onClick={onClick} disabled={disabled}>{Label}</button>
    </>
  )
}