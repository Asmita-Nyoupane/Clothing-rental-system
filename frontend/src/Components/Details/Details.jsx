// Details.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams,Link, useNavigate } from 'react-router-dom';
import { API } from "../../service/api";
import {DataContext }from "../../context/DataProvider";
import './Details.css'; 

const Details = () => {
  const [post, setPost] = useState({});
  const { id } = useParams();
  const {account}= useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data);
      
      }
    };
    fetchData();
  }, [id]);
  const deleteBlog=async()=>{
    let response = await API.deletePost(post._id);
    if(response.isSuccess){
      navigate('/rent')
    }
  }

  return (
    <div className="container"> {/* Add a container div */}
      <img src={post.image} alt="post" />
      <h2 className="category">Category: {post.category}</h2>
      <h2 className="Price">Price: {post.rentPrice}</h2>
      <h2 className="Gender">Gender: {post.gender}</h2>
      <h2 className="Size">Size: {post.size}</h2>
      <h2 className="name">Name: {post.name}</h2>
      <h2 className="Phone">Phone: {post.phone}</h2>
      <h2 className="Location">Location: {post.location}</h2>
      <h2 className="Date">Date: {new Date(post.createdDate).toDateString()}</h2><br/>
        {
        account.name === post.name && 
        <>
        <Link to={`/Update/${post._id}`} >
        <button className="edit">Edit</button>
        </Link>
        <button onClick={()=>deleteBlog()} className="delete">Delete</button>
        
         </> 
         }
      
    </div>
  );
    };

export default Details;
