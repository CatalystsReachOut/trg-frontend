import React from 'react'

const Card = ({children, className}) => {
  return (
    <div className={`p-3 bg-[#FFFFFF] rounded-lg ${className}`}>{children}</div>
  )
}

export default Card