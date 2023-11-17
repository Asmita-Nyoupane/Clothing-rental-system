import React from 'react'

export const Clothe = (clothe) => {
  return (
    <div>
        <img src=""/>
        <h2 className="category">{clothe.Categories}</h2>
        <h2 className="Rent-Price">{clothe.rentPrice}</h2>
        <h2 className="Gender">{clothe.gender}</h2>
        <h2 className="clothes-Size">{clothe.size}</h2>
    </div>
  )
}
