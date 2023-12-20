// Details.jsx

import React, { useEffect, useState, useContext } from "react";
import { useParams,Link, useNavigate } from 'react-router-dom';
import { API } from "../../service/api";
import {DataContext }from "../../context/DataProvider";
import { Row, Col, Card ,Nav} from 'react-bootstrap';
// import './Details.css'; 
import Comments from "./Comments/Comments";

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
  const [activeTab, setActiveTab] = useState('details')

  return (
    <div className="container" style={{backgroundColor:'#ffe6e6'}}> {/* Add a container div */}
      
      <Row>
        {/* Column for the image */}
        <Col xs={12} md={6} className="mb-3">
          <img src={post.image} alt="post" fluid style={{ height: '400px' }} />
          <h2 className="name">Name: {post.name}</h2>
          
         
        </Col>
      
      {/* Column for the details */}
      <Col xs={12} md={4} className="mb-3">
      <Card className="details-box">
      <Card.Header>
          <Nav variant="tabs" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
            <Nav.Item>
              <Nav.Link eventKey="details">Details</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="comments">Comments</Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>

         <Card.Body>

         {activeTab === 'details' && (
         <>
 
       <h2 className="category"style={{color: 'brown', fontSize: '20px'}}>Category: {post.category}  </h2>
      <h2 className="type"style={{color: 'brown', fontSize: '20px'}}>Type: {post.type}</h2>
      <h2 className="Price"style={{color: 'brown', fontSize: '20px'}}>Price: {post.rentPrice}</h2>
      <h2 className="Gender"style={{color: 'brown', fontSize: '20px'}}>Gender: {post.gender}</h2>
      <h2 className="Size"style={{color: 'brown', fontSize: '20px'}}>Size: {post.size}</h2>
      <h2 className="Phone"style={{color: 'brown', fontSize: '20px'}}>Phone: {post.phone}</h2>
      <h2 className="Location"style={{color: 'brown', fontSize: '20px'}}>Location: {post.location}</h2>
      <h2 className="Date"style={{color: 'brown', fontSize: '20px'}}>Date: {new Date(post.createdDate).toDateString()}</h2>
      <h2 className="Description"style={{color: 'brown', fontSize: '20px'}}>Description: {post.description}</h2><br/>
      
        {
        account.name === post.name && 
        <>
        <Link to={`/Update/${post._id}`} >
        <button className="edit"style={{marginRight: '10px', margin: '5px',
    padding: '6px 15px',
    border: '1px solid #878787',
    borderRadius: '10px',
    backgroundColor: 'rgba(0, 0, 255, 0.589)', 
    color: '#fff'}}>Update</button>
        </Link>
        <button onClick={()=>deleteBlog()} className="delete" style={{ margin: '5px',
    padding: '5px',
    border: '1px solid #878787',
    borderRadius: '10px',
    backgroundColor: '#ff6961', 
    color: '#fff' }}>Delete</button>
         </> 
         }

         </>
          
         )}

         {activeTab === 'comments' && <Comments post={post} />}
          </Card.Body>
       </Card>
         </Col>
       
         {/* <Col md={6}>
       <Card className="comments-box">
         <Card.Body>
       <Comments  post = {post} />
       </Card.Body>
       </Card>
     </Col> */}

      {/* <Comments  post = {post} /> */}


     </Row>
    </div>
  );
    };

export default Details;
