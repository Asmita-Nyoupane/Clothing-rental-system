import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../../../context/DataProvider";
import ChatInput from "./ChatInput";
import { API } from "../../../service/api";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const { account, chats } = useContext(DataContext);
  console.log("dataprovider in chatcontainer", account);
  useEffect(() => {
    const fetchData = async () => {
      console.log("chat id", account._id, chats._id);
      try {
        const response = await API.allMessage({
          from: account._id,
          to: chats._id,
        });
        console.log("2nd time chat id", response.data);
        setMessages(response.data);
      } catch (err) {
        console.log("Error while fetching the messages", err);
      }
    };

    fetchData();
  }, [chats]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: chats._id,
      from: account._id,
      message: msg,
    });
    await API.sendMessage({
      from: account._id,
      to: chats._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  // useEffect(() => {
  //   const socketEventCallback = (msg) => {
  //     setArrivalMessage({ fromSelf: false, message: msg });
  //   };

  //   if (socket.current) {
  //     socket.current.on("msg-recieved", socketEventCallback);
  //   }

  //   return () => {
  //     if (socket.current) {
  //       socket.current.off("msg-recieved", socketEventCallback);
  //     }
  //   };
  // }, [socket]);

  useEffect(() => {
    if (socket.current) {
      console.log("Socket connected:", socket.current.connected);
      //   socket.current.off("msg-recieved");
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessage({
          fromSelf: false,
          message: msg,
        });
      });
    }
  }, []);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  return (
    <>
      {chats && (
        <Container>
          <div className="chat-headers">
            <div className="user-details">
              <div className="image">
                <img src={chats.image} alt="profile picture" />
              </div>
              <div className="username">
                <h4>{chats.name}</h4>
              </div>
            </div>
          </div>
          <div className="chat-messages">
            {messages.map((message) => {
              return (
                <div ref={scrollRef} key={uuidv4()}>
                  <div
                    className={`message ${
                      message.fromSelf ? "sended" : "recieved"
                    }`}
                  >
                    <div className="content ">
                      <p>{message.message}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <ChatInput handleSendMsg={handleSendMsg} />
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .image {
        img {
          height: 1rem;
        }
      }
      .username {
        h4 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 40%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #141111;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: #4f04ff21;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #00ff481f;
      }
    }
  }
`;
export default ChatContainer;
