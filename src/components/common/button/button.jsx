import React from "react"
import "./button.css"
export default function Button({ Label, onClick }) {
  return (
    <>
      <button className="button" type='button' onClick={onClick}>{Label}</button>
    </>
  )
}