import React from 'react';
export const Post = ({ post }) => {
 
  return (
    <>
    
         <img className='image' src={post.image} alt="post" />
         <h2 className="Price">Price: {post.rentPrice}</h2>
         
        
    </>
  );
};
