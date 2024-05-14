import React, { useEffect, useState } from "react";

function ChatUsers(props) {
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/chats");
      const data = await response.json();
      console.log(data);
      setChatUsers(data.chats);
      setIsLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="border-red-100 border-8 w-1/4">
      Users on left
      <div>{isLoading && <p>Loading...</p>}</div>

      {/* username is on top level of object atm, will be nested later so will need to go into the array in db and find users in chat */}
      {!isLoading && chatUsers && <div>{chatUsers.map((chat) => <p key={chat._id} onClick={() => props.selectChatHandler(chat._id)}>{chat.username}</p>)}</div>}
    </div>
  );
}

export default ChatUsers;
