import React from 'react'
import { ChatState } from '../context/ChatProvider'


 const SingleChat = ({ fetchAgain, setFetchAgain}) => {
    const { account, selectedChat, setSelectedChat}=  ChatState()||[];
  return (
    <>
        {selectedChat? (
          <>

          </>
          
        ):(
         <p>click on the user </p>
        )}
    </>
  )
}
export default SingleChat;
