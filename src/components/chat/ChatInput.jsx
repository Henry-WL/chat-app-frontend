import React, { useState } from "react";

function ChatInput(props) {
  const [textInput, setTextInput] = useState("");

  const submitFormHandler = async (e) => {
    e.preventDefault();

    console.log("submit message");

    const response = await fetch(
      `http://localhost:3000/api/chats/${props.chatId}`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sendinguserId: "663e856213f3ee53bd09e3e0",
          text: textInput,
        }),
      }
    );

    setTextInput("");
  };

  return (
    <form className="flex" onSubmit={submitFormHandler}>
      <input
        placeholder="Send your message..."
        className="w-full"
        onChange={(e) => setTextInput(e.target.value)}
        value={textInput}
      />
      <button type="submit">X</button>
    </form>
  );
}

export default ChatInput;
