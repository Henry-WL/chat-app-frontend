import React, { useState } from "react";
import ChatUsers from "./ChatUsers";
import ChatMessages from "./ChatMessages";

function ChatContainer() {
    const [chatId, setChatId] = useState('')
    const chatSelectHandler = (chatId) => {
        console.log(chatId)
        setChatId(chatId)
    }
  return (
    <div className="flex h-full border-blue-100 border-8 m-4">
      <ChatUsers selectChatHandler={chatSelectHandler} chatId={chatId}/>

      <ChatMessages chatId={chatId}/>
    </div>
  );
}

export default ChatContainer;
