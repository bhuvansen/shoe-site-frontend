import React from 'react'
import * as BiIcons from "react-icons/bi"
import "./ErrorAlert.css"
const ErrorAlert = ({message}) => {
  console.log("message", message)
  return (
   <>
    {/* {
      message && (
         <div className='error-icon'>
           {message.map((item,key)=>{
            return <div className='error-icon'>
              <BiIcons.BiError/>
              <span>{item.msg}</span>
              <br/>
            </div>
           })}
       </div>
      )
    } */}

    {
      message && message.map((item, index)=>{
        return <div className='error-icon'>
        <div className='container '>
        <BiIcons.BiError/>
              <span>{item.msg}</span>
        </div>
             
        </div>
      })
    }
   </>
  )
}

export default ErrorAlert