import React, { useContext, useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import ChatInput from "./ChatInput";
import authContext from "../../context/auth-context";

function ChatMessages(props) {
  const [isLoading, setIsLoading] = useState(true);
  const [chatData, setChatData] = useState([]);
  const [newMessageSent, setNewMessageSent] = useState("");

  const auth = useContext(authContext);

  console.log(auth, "AUTH");

  const newMessageSentHandler = (textInput) => {
    setNewMessageSent(textInput);
  };

  // using route get chat id from url then load messages for specific chat
  useEffect(() => {
    const fetchChatData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chats/${props.chatId}`
      );
      const data = await response.json();

      console.log(data);
      setIsLoading(false);
      setChatData(data.chat);
    };

    fetchChatData();
  }, [props.chatId, newMessageSent]);

  return (
    <div className="border-green-100 border-8 w-3/4 overflow-y-scroll flex flex-col">
      <div className="flex-1 relative">
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
                className={
                  chat.sender === auth.userId
                    ? "chat chat-end"
                    : "chat chat-start"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {chat.sender}
                  {/* get chatters name */}
                  <time className="text-xs opacity-50">{timeString}</time>
                </div>
                <div
                  className={
                    chat.sender === auth.userId
                      ? "chat-bubble chat-bubble-success"
                      : "chat-bubble chat-bubble-primary"
                  }
                >
                  {chat.text}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            );
          })}
      </div>
      <div className="bg-white p-4 border-blue-500 border-2">
        <ChatInput
          chatId={props.chatId}
          newMessageSentHandler={newMessageSentHandler}
        />
      </div>
    </div>
  );
}

export default ChatMessages;
