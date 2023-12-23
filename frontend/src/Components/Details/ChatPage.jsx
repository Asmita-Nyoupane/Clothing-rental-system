
// import { useState } from "react";
import { Chatbox } from "../Chatbox";
 import  MyChats  from "../MyChats";
import { SideDrawer } from "../Miscellaneous/SideDrawer" ;
 import { ChatState } from "../../context/ChatProvider"; 

 const Chatpage = () => {
//   const [fetchAgain, setFetchAgain] = useState(false);
const chatState = ChatState();
const { account } = chatState || {};

  return (
    <div style={{ width: "100%", textAlign:"left" }}>
      <SideDrawer />
     
        {/* {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} */}
         <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "91.5vh", padding: "10px" }}> 
         {/* { account &&<MyChats/>}
          { account && <Chatbox/>} */}
          <MyChats/>
          <Chatbox/>
           </div> 
      
      
    </div>
  );
};

export default Chatpage;