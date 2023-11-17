import React from 'react'
import {useState, useEffect} from 'react'
import { useSearchParams } from 'react-router-dom';
import {API} from '../../../service/api';
import { Clothe } from './Clothe';


export const Clothes = () => {
    const[clothes,setClothes]=useState([]);
     const[searchParams]=useSearchParams();
     const category=searchParams.get('category');

  useEffect(()=>{
  const fetchData=async()=>{
     let response=await API.getAllClothes({category:category||'' });
     if (response.isSucess()){
         setClothes(response.data)
     }
  }
  fetchData()
  },[category])
  return (
   <>
  <div className='card-container'>
     {
    clothes && clothes.length>0?clothes.map(clothe=>(
        <Clothe clothe={clothe}/>
    )): <div style={{backgroundColor:'lightgray', margin:'30px 80px', fontSize:'15px'}}>No data available to display</div>
}
</div>
   </>
  )
}
