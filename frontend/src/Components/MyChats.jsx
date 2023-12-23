import React from 'react'
import { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Toast , ListGroup} from 'react-bootstrap';
import { ChatState } from '../context/ChatProvider';
import { ChatLoading } from './ChatLoading';

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState([]);

   const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState()||[];

const fetchChats = async () => {
  // console.log(user._id);
  try {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };

    const { data } = await axios.get("/api/chat", config);
    setChats(data);
  } catch (error) {
    <Toast bg="danger" text="white" >
        <Toast.Header>
          <strong className="me-auto">failed to load the chat</strong>
        </Toast.Header>
        <Toast.Body>{error.message}</Toast.Body>
      </Toast>
  }
};

useEffect(() => {
  setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
  fetchChats();
  // eslint-disable-next-line
}, []);

return(
<>
<Card
    
      style={{
        display: selectedChat ? 'none' : 'flex',
        // flexDirection: 'column-reverse',
        alignItems: 'center',
        padding: '16px', // Adjust as needed
        backgroundColor: 'white',
        width: '30%',
        borderRadius: '8px',
        border: '1px solid #ccc',
      }}
    >
      <Card.Body >
        <Card.Title
           style={{
          // paddingBottom: '3px', 
          paddingLeft: '1px', // 
          fontSize: selectedChat ? '28px' : '30px',
          fontFamily: 'Work sans',
          // display: 'flex',
          width: '100%',
          padding:'0px',
          // justifyContent: 'space-between',
          // alignItems: 'center',
          }}
        >
          My Chats
        </Card.Title>
      </Card.Body>
    </Card>

    {/* <ListGroup className="overflow-auto">
    {chats.map((chat) => (
        <ListGroup.Item
          key={chat._id}
          onClick={() => setSelectedChat(chat)}
          style={{
            cursor: 'pointer',
            backgroundColor: selectedChat === chat ? '#38B2AC' : '#E8E8E8',
            color: selectedChat === chat ? 'white' : 'black',
            padding: '8px', // 
            borderRadius: '8px',
            marginBottom: '4px', 
          }}
        >
         
          </ListGroup.Item>
      ))}
    </ListGroup> */}
</>


);
}
export default MyChats;
