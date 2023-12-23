import { createContext, useContext, useState} from "react";
//  import { useHistory} from "react-router-dom";

const ChatContext = createContext();


const ChatProvider = ({ children})=>{
    //  const[user, setUser]= useState();
    const [account, setAccount] = useState({ name: "", phone: "", image: "" });
    const [ seletectedChat, setSelectedChat] = useState();
    const [ chats, setsChats]= useState()
    //  const history = useHistory();

    // useEffect(() => {
    //    const account = JSON.parse(localStorage.getItem("userInfo"));
    //     setAccount(account);
  
    //  if (!user) history.push("/");
      
    //  }, [history]);
  
   return <ChatContext.Provider value={{ account, setAccount, seletectedChat, setSelectedChat, chats, setsChats }}>{children}</ChatContext.Provider>
};
export const ChatState = () => {
  return useContext(ChatContext);
};


export default ChatProvider;
