import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import Comments from "./comments/Comments";
import LocationMap from "./LocationMap";
import "./Details.css";

const Details = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  console.log("Account Name:", account.name);
  console.log("Post Name:", post.name);

  if (account.name === post.name) {
    console.log("User is the author of the post.");
  } else {
    console.log("User is not the author of the post.");
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let response = await API.getPostById(id);
        if (response.isSuccess) {
          setPost(response.data);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);
  if (loading) {
    return <div>Loading...</div>; // Display loading message
  }
  if (!post) {
    return <div>No data found for this post.</div>;
  }
  const deleteBlog = async () => {
    if (!post) {
      console.error("No post data found. Cannot delete post.");
      return;
    }
    try {
      let response = await API.deletePost(post._id);
      console.log("API Response:", response); // Log the response
      if (response.isSuccess) {
        navigate("/rent");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  try {
    return (
      <div className="container">
        {/* Add a container div */}
        <img src={post.image} alt="post" />
        <h2 className="category">Category: {post.category}</h2>
        <h2 className="type">Type: {post.type}</h2>
        <h2 className="Price">Price: {post.rentPrice}</h2>
        <h2 className="Gender">Gender: {post.gender}</h2>
        <h2 className="Size">Size: {post.size}</h2>
        <h2 className="name">Name: {post.name}</h2>
        <h2 className="Phone">Phone: {post.phone}</h2>

        <h2 className="Date">
          Date: {new Date(post.createdDate).toDateString()}
        </h2>
        <h2 className="Description">Description: {post.description}</h2>
        <br />

        {account.name === post.name && (
          <>
            <Link to={`/Update/${post._id}`}>
              <button className="edit">Edit</button>
            </Link>
            <button onClick={() => deleteBlog()} className="delete">
              Delete
            </button>
          </>
        )}
        {post.location.coordinates && (
          <LocationMap coordinate={post.location.coordinates} />
        )}
        <Comments post={post} />
      </div>
    );
  } catch (error) {
    console.error("Error rendering Details component:", error);
    return <div>Error rendering details. Please check the console.</div>;
  }
};

export default Details;
