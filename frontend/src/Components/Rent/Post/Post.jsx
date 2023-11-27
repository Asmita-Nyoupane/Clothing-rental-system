import React from 'react';
export const Post = ({ post }) => {
 
  return (
    <>
    
         <img className='image' src={post.image} alt="post" />
          <h2 className="category">Category: {post.category}</h2>
          <h2 className="Price">Price: {post.rentPrice}</h2>
          <h2 className="Gender">Gender: {post.gender}</h2>
          <h2 className="Size">Size: {post.size}</h2>
          <h2 className="name">Name: {post.name}</h2>
          <h2 className="Phone">Phone: {post.phone}</h2>
          <h2 className="Location">Location: {post.location}</h2>
          <h2 className="Date">Date: {post.createdDate}</h2>
        
    </>
  );
};
