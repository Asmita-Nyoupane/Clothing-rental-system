import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { API } from "../../../service/api";
import { Post } from "./Post";
import { useLocation } from "../../../context/LocationProvider";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  const { userLocation, viewNearbyPosts } = useLocation();
  useEffect(() => {
    let response;
    const fetchData = async () => {
      if (
        viewNearbyPosts &&
        userLocation &&
        userLocation.latitude &&
        userLocation.longitude
      ) {
        response = await API.getNearbyPosts({
          category: category || "",
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
        });
      } else {
        response = await API.getAllPosts({ category: category || "" });
      }
      if (response.isSuccess) {
        setPosts(response.data);
      }
    };
    fetchData();
  }, [category, userLocation, viewNearbyPosts]);

  //
  return (
    <>
      <div className="card-container">
        {posts?.length ? (
          posts.map((post) => (
            <div key={post._id} className="card">
              <Link to={`details/${post._id}`}>
                <Post post={post} />
              </Link>
            </div>
          ))
        ) : (
          <div
            style={{
              backgroundColor: "lightgrey",
              margin: "30px 80px",
              fontSize: "15px",
            }}
          >
            No data available to display
          </div>
        )}
      </div>
    </>
  );
};

export default Posts;
