import React, { useEffect, useState, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { Row, Col, Card, Nav } from "react-bootstrap";
import LocationMap from "./LocationMap";
import Comments from "./Comments/Comments";
import RatePost from "./Rating/RatePost";
import Rating from "./Rating/rating";

const Details = () => {
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const { account, setChats } = useContext(DataContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("details");
  console.log("post id in details page", id);
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
  // console.log("Post Info", post);
  const initiateChat = async () => {
    if (!account) {
      console.error("User not authenticated. Cannot initiate chat.");
      navigate("/login");
    }

    const { userId, name, profilePic } = post;
    if (!post || !account) {
      console.error("No post or account data found. Cannot initiate chat.");
      return;
    }
    if (!userId) {
      console.error("Post does not have a valid userId property.");
      return;
    }
    try {
      setChats({
        _id: userId,
        name,
        image: profilePic,
      });
      navigate("/chatPage");
    } catch (error) {
      console.error("Error initiating chat:", error);
    }
  };

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
  // // after rating complete handleRatingComplete called which display the updated rating
  const handleRatingComplete = (update) => {
    // setUserRating(updatedPost.totalRating);
    console.log("update the rating", update.totalRating);
  };

  return (
    <div
      className="container"
      //  style={{ backgroundColor: "#ffe6e6" }}
    >
      <Row>
        {/* Column for the image */}
        <Col xs={12} md={6} className="mb-3">
          <img src={post.image} alt="post" style={{ height: "400px" }} />
          <h4 className="name">Name: {post.name}</h4>
          <h5 className="Date" style={{ right: "30px" }}>
            Date: {new Date(post.createdDate).toDateString()}
            {console.log("acountName", account)}
          </h5>

          <Link to="/chatPage">
            <button
              className="chat"
              onClick={initiateChat}
              style={{
                marginRight: "10px",
                margin: "5px",
                padding: "6px 15px",
                border: "1px solid #878787",
                borderRadius: "10px",
                backgroundColor: "rgba(0, 0, 255, 0.589)",
                color: "#fff",
              }}
              // disabled={!account || !account._id}
            >
              Chat Now
            </button>
          </Link>
          <RatePost PostId={id} onRatingComplete={handleRatingComplete} />
          {/* <Rating stars={post.totalRating} /> */}
        </Col>

        {/* Column for the details */}
        <Col xs={12} md={4} className="mb-3">
          <Card className="details-box">
            <Card.Header>
              <Nav
                variant="tabs"
                activeKey={activeTab}
                onSelect={(selectedKey) => setActiveTab(selectedKey)}
              >
                <Nav.Item>
                  <Nav.Link eventKey="details">Details</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="comments">Comments</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="location">Location</Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            <Card.Body>
              {activeTab === "details" && (
                <>
                  <h2
                    className="category"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Category: {post.category}{" "}
                  </h2>
                  <h2
                    className="type"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Type: {post.type}
                  </h2>
                  <h2
                    className="Price"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Price: {post.rentPrice}
                  </h2>

                  <h2
                    className="Gender"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Gender: {post.gender}
                  </h2>
                  <h2
                    className="Size"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Size: {post.size}
                  </h2>

                  <h2
                    className="Description"
                    style={{ color: "black", fontSize: "20px" }}
                  >
                    Description: {post.description}
                  </h2>
                  <br />
                  {console.log("account.name", account.name)}
                  {console.log("Post.name", post.name)}
                  {console.log("role🤑", account.role)}
                  {account.name === post.name ? (
                    <>
                      <Link to={`/Update/${post._id}`}>
                        <button
                          className="edit"
                          style={{
                            marginRight: "10px",
                            margin: "5px",
                            padding: "6px 15px",
                            border: "1px solid #878787",
                            borderRadius: "10px",
                            backgroundColor: "rgba(0, 0, 255, 0.589)",
                            color: "#fff",
                          }}
                        >
                          Update
                        </button>
                      </Link>
                    </>
                  ) : null}
                  {account.role === "admin" || account.name === post.name ? (
                    <>
                      <button
                        onClick={() => deleteBlog()}
                        className="delete"
                        style={{
                          margin: "5px",
                          padding: "5px",
                          border: "1px solid #878787",
                          borderRadius: "10px",
                          backgroundColor: "#ff6961",
                          color: "#fff",
                        }}
                      >
                        Delete
                      </button>
                    </>
                  ) : null}
                </>
              )}

              {activeTab === "comments" && <Comments post={post} />}
              {activeTab === "location" && post.location.coordinates && (
                <LocationMap coordinate={post.location.coordinates} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Details;
