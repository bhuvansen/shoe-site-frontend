import React from "react"
import "./InputFields.css"

const InputText = ({name, id, value, onChange, className, label}) => {
  return (
    <div className={`input-container mt-5 ${className}`}>
      <input
        type="text"
        id={id}
        className={`text-input`}
        placeholder="Enter your text"
        value={value}
        name={name}
        onChange={onChange}
      />
      <label htmlFor="newProductName" className="label">
        {label}
      </label>
    </div>
  )
}

export default InputText
