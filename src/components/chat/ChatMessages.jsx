import React, { useContext, useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import authContext from "../../context/auth-context";

function ChatMessages(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [newMessageSent, setNewMessageSent] = useState("");

  const auth = useContext(authContext);
  const messagesEndRef = useRef(null)


  const newMessageSentHandler = (textInput) => {
    setNewMessageSent(textInput);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };


  // using route get chat id from url then load messages for specific chat
  useEffect(() => {
    const fetchChatData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chats/chatById/${props.chatId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
      );
      
      const data = await response.json();

      setIsLoading(false);
      setChatData(data.chat);
      scrollToBottom()
    };

    fetchChatData();
  }, [props.chatId, newMessageSent]);

  useEffect(() => {
    scrollToBottom();
  }, [chatData]);

  return (
    <div className="w-3/4 flex flex-col bg-gray-50">
      <div className="flex-1 relative overflow-y-auto">
        {/* Chat messages */}
        {isLoading && <p>Loading</p>}
        {!isLoading &&
          chatData &&
          chatData.messages.map((chat) => {
            const date = new Date(chat.time);
            const timeString = `${("0" + date.getUTCHours()).slice(-2)}:${(
              "0" + date.getUTCMinutes()
            ).slice(-2)}`;
            return (
              <div
                key={chat._id}
                className={` p-2
                  ${chat.sender._id === auth.userId
                    ? "chat chat-end"
                    : "chat chat-start"
                  }
                `}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header p-1">
                  {chat.sender.username}
                  <time className="text-xs opacity-50"> {timeString}</time>
                </div>
                <div
                  className={
                    chat.sender._id === auth.userId
                      ? "chat-bubble chat-bubble-primary opacity-50 text-white max-w-md"
                      : "chat-bubble chat-bubble-success opacity-80 text-white max-w-md"
                  }
                >
                  {chat.text}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
      </div>
      <div className="bg-white p-4 ">
        <ChatInput
          chatId={props.chatId}
          newMessageSentHandler={newMessageSentHandler}
        />
      </div>
    </div>
  )
}

export default ChatMessages;
