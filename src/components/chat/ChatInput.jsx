import React, { useContext, useState } from "react";
import authContext from "../../context/auth-context";

function ChatInput(props) {
  const [textInput, setTextInput] = useState("");
  const auth = useContext(authContext)
//   console.log(auth)

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
          sendinguserId: auth.userId,
          text: textInput,
        }),
      }
    );

    setTextInput("");
    props.newMessageSentHandler(textInput)
  };

//   Add Fiile upload

  return (
    <form className="flex position" onSubmit={submitFormHandler}>
      <input
        placeholder="Send your message..."
        className="w-full focus:outline-none ="
        onChange={(e) => setTextInput(e.target.value)}
        value={textInput}
      />
      <button type="submit">X</button>
    </form>
  );
}

export default ChatInput;
