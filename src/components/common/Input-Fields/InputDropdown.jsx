import React from "react"

const InputDropdown = ({ name, id, value, onChange, className, label, list }) => {
  return (
    <div className={`input-container mt-5 ${className}`}>
      <select id={id} className={`text-input`} name={name} value={value} onChange={onChange}>
        <option value=""></option>
        {list.map((item, index) => {
          return (
            <option key={index} value={item._id}>
              {item.name}
            </option>
          )
        })}
      </select>
      <label htmlFor="newProductCategory" className="label">
        {label}
      </label>
    </div>
  )
}

export default InputDropdown
