import React from 'react'

const Button = (props) => {
  //props
  const {
    title,
    onClick,
    className
    } = props;


  return (
    <button className={`p-2 bg-[#F1C40F] text-[white] rounded-lg ${className}`} onClick={onClick}>{title}</button>
  )
}

export default Button