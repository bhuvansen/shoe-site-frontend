import React from "react"
import "./InputFields.css"
import * as BsIcons from 'react-icons/bs';

const InputText = ({name, id, value, onChange, className="", label, isError, errorMsg, type="text", fieldType="text", eyeClick, hidePassword}) => {
  return (
    <div className={`input-container mt-5 ${className}`}>
      <input
        type={type}
        id={id}
        className={`text-input ${isError? "error-input-box":""}`}
        placeholder="Enter your text"
        value={value}
        name={name}
        onChange={onChange}
      />
      <label htmlFor="newProductName" className={`label ${isError? "error-label":""}`}>
        {label}
      </label>
      {
        fieldType==="password" && (
          <div className={`eye-icon ${ isError ? "error-eye" : "" }`} onClick={eyeClick}>
            {hidePassword ? <BsIcons.BsFillEyeFill /> : <BsIcons.BsFillEyeSlashFill />}
          </div>
        )
      }
      
      {isError && (
        <span className={fieldType==="password" ? "password-error-styling" : "error-styling"}>{errorMsg}</span>
        )}
    </div>
  )
}

export default InputText
