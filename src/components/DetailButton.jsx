import React from 'react'

const DetailButton = ({text, onClick}) => {
  return (
    <div>
        <p onClick={onClick} className='inline px-4 py-1 rounded-sm cursor-pointer border-2 border-[#5DB996] hover:border-[#118B50] hover:bg-[#118B50] hover:text-white transactions-text transition-colors duration-300'>{text}</p>
    </div>
  )
}

export default DetailButton