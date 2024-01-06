import React, { useContext, useState } from "react";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { API } from "../../../service/api";
import { useParams } from "react-router-dom";
import { DataContext } from "../../../context/DataProvider";

const LikePost = () => {
  const { id } = useParams();
  const [likes, SetLikes] = useState(0);
  const [isLiked, SetIsLiked] = useState(false);
  const { account } = useContext(DataContext);
  console.log("post id", id);
  console.log("user id", account._id);
  const handleLike = async () => {
    const userId = account._id;
    if (!isLiked) {
      const response = await API.addLike({
        userId: userId,
        postId: id,
      });
      if (response.isSuccess) {
        SetLikes(likes + 1);
        SetIsLiked(true);
      }
    } else {
      const response = await API.removeLike({
        userId: userId,
        postId: id,
      });
      if (response.isSuccess) {
        SetLikes(likes - 1);
        SetIsLiked(false);
      }
    }
  };
  return (
    <div>
      <span style={{ fontSize: "20px" }} onClick={handleLike}>
        {isLiked ? <FcLike color="red" /> : <FaRegHeart />}
      </span>
      <span style={{ marginLeft: "5px" }}>{likes}Likes</span>
    </div>
  );
};

export default LikePost;
