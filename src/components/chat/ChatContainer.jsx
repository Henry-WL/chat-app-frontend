import React from "react";
import ChatUsers from "./ChatUsers";
import ChatMessages from "./ChatMessages";

function ChatContainer() {
  return (
    <div className="flex h-80 border-blue-100 border-8 m-4">
      <ChatUsers />

      <ChatMessages />
    </div>
  );
}

export default ChatContainer;
