import React from "react";
export const Post = ({ post }) => {
  return (
    <>
      <img className="image" src={post.image} alt="post" />
      <h4
        className="Price"
        style={{
          fontWeight: "bolder",
          textDecoration: "inherit",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        Rs {post.rentPrice}
      </h4>
      {/* <h4
        className="Type"
        style={{
          fontWeight: "lighter",
          textDecoration: "none",
          color: "black",
          textTransform: "capitalize",
        }}
      >
        {post.type}
      </h4> */}
    </>
  );
};
