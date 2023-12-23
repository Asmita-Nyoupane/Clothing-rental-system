import React from 'react'
import { useState, useContext,  } from 'react';
import { Dropdown, Button, Modal, Form, Toast, Spinner  } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
 import { ChatState } from '../../context/ChatProvider';
import ProfileModal from './ProfileModal';


import { ChatLoading } from '../ChatLoading';



export const SideDrawer = () => {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  // const{ user, setSelectedChat, chats, }= ChatState();
  const { user, setSelectedChat, chats } = ChatState() || {};


  const [show, setShow] = useState(false);
  // const [search, setSearch] = useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const chatState = useContext(ChatState);

//   // Ensure that chatState is defined and has the 'account' property
   const { account } = chatState || {};

  const handleSearch = async () => {
  if(!search){
    alert("please senter something to search")
  }

  try {
    setLoading(true);

    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get(`/api/user?search=${search}`, config);

    setLoading(false);
    setSearchResult(data);
  } catch (error) {
   
       alert("Failed to Load the Search Results")
      
   
      };
    }
    const accessChat= async (userId)=>{
      try{
        setLoadingChat(true);
        const config={
          headers:{
            "content-type":"application/json",
            Authorization:`Bearer ${user.token}`,
          },
        };
        const { data} = await axios.post("/api/chat", { userId}, config);
        if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        handleClose();
      } catch(error){
        <Toast bg="danger" text="white" >
        <Toast.Header>
          <strong className="me-auto">Error fetching the chat</strong>
        </Toast.Header>
        <Toast.Body>{error.message}</Toast.Body>
      </Toast>
      }
    };
    

 

   
   
  
   const modalStyle = {
    // margin: 0,
    // transform: 'translateX(-100%)',
    position: 'fixed',
    top: 0,
     left: show ? 0 : '-100%',
     width: '20%',
     height: '100%',
    
    // boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    // transition: 'left 0.3s ease',
    // zIndex: 1000,
  };

   const modalContentStyle = {
     height: '100vh',
    //  overflowY: 'auto',
     width:'100%'
   };
     
    return (
    <>
       <div style={{ display:"flex", justifyContent:"space-between" , alignItems:"center", backgroundColor:"white", padding:"5px 10px", borderWidth:"5px"}}>
      <i className="fas fa-search" onClick={handleShow}></i>
      {/* { <span style={{padding:"4px", textAlign:"left" }}>
      Search User
      </span> } */} 
      
       
            
         
      <i className="fa fa-bell" aria-hidden="true"></i>
      <Dropdown>
      <Dropdown.Toggle variant="secondary" id="dropdown-basic">
        <i className="fa fa-user" aria-hidden="true" style={{ cursor: "pointer" }}></i>
      </Dropdown.Toggle>

      <Dropdown.Menu>
       <ProfileModal account={account}> 
       <Dropdown.Item href="#/action-1">My Profile</Dropdown.Item> 
       </ProfileModal> 

        
        <Dropdown.Divider />
        <Dropdown.Item href="#/action-2">LogOut</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
    </div> 

    {/* <Button variant="primary" onClick={handleShow}>
        {/* Open Drawer (Modal) */}
      {/* </Button> */} 

      <Modal show={show}  onHide={handleClose} animation={false} style={modalStyle}
  >
        <Modal.Header closeButton>
          <Modal.Title>Search Users</Modal.Title>
        </Modal.Header>
        <Modal.Body style={modalContentStyle}>
          
          <div style={{display:"flex", paddingBottom:"2px"}}>
          <Form.Control
                type="text"
                placeholder=" search by name or email "
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              
          </div>
          <Button onClick={handleSearch} style={{backgroundColor:"blue" ,}}  >  
            Go
          </Button><br></br>
          {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && (
      <Spinner animation="border" variant="primary" className="ml-auto d-flex" />
      )}
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
      
    </>
  )
    }
