import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { ChatState } from '../context/ChatProvider'
import SingleChat from './SingleChat'

 const ChatBox = ({ fetchAgain, setFetchAgain }) => {
  const {selectedChat} =ChatState() || {};
  return (
    <div
      style={{
        // display: selectedChat ? 'flex' : 'none',
        display:'flex',
        alignItems: 'center',
        flexDirection: 'column',
        padding: '3px',
        backgroundColor: 'white',
        width: '100%',
        borderRadius: '8px', 
        borderWidth: '1px',
        margin: 'auto', 
        maxWidth: '68%', 
      }}
    >
    <SingleChat/>
       {selectedChat && <SingleChat fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />} 
    </div>
  )
}
export default ChatBox
