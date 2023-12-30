
 import { useState } from "react";
import ChatBox from "../Chatbox";
 import  MyChats  from "../MyChats";
import { SideDrawer } from "../Miscellaneous/SideDrawer" ;
 import { ChatState } from "../../context/ChatProvider"; 

 const Chatpage = () => {
   const [fetchAgain, setFetchAgain] = useState(false);
const chatState = ChatState();
const { account } = chatState || {};

  return (
    <div style={{ width: "100%", textAlign:"left" }}>
      {account && <SideDrawer />}
     
        {/* {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} */}
         <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "91.5vh", padding: "10px" }}> 
          { account &&<MyChats fetchAgain={fetchAgain}/>}
          { account && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          )} 
          <MyChats/>
           <ChatBox/>
           </div> 
      
      
    </div>
  );
};

export default Chatpage;