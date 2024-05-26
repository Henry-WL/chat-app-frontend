import React, { useState } from "react";
import ChatUsers from "./ChatUsers";
import ChatMessages from "./ChatMessages";

function ChatContainer() {
    const [chatId, setChatId] = useState('')
    const chatSelectHandler = (chatId) => {
        setChatId(chatId)
    }
  return (
    <div className="flex h-[calc(100vh-120px)] border-gray-100 border m-4">
      <ChatUsers selectChatHandler={chatSelectHandler} chatId={chatId}/>

      <ChatMessages chatId={chatId}/>
    </div>
  );
}

export default ChatContainer;
