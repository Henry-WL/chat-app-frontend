import React, { useContext, useEffect, useState } from "react";
import authContext from "../../context/auth-context";
// import chat from "../../../../../Backend/models/chat";

function ChatUsers(props) {
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedChatStyle, setClickedChatStyle] = useState()

  const auth = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chats/${auth.userId}`
      );
      const data = await response.json();
      console.log(data);
      //   console.log('running!!!!')
      setChatUsers(data.chats);
      setIsLoading(false);
    };

    fetchData();
  }, []);

  // if (!isLoading && chatUsers.length !== 0) {
  //     console.log('in log')
  //     console.log(chatUsers)
  //     for (let i = 0; i < chatUsers.length; i++) {
  //         console.log(chatUsers[i])
  //         const chatUsersWithoutCurrentID = chatUsers[i].users.filter((user) => user.user !== auth.userId)
  //         console.log(chatUsersWithoutCurrentID, 'CHAT USERS WITHOUT CURRENT ID')

  //     }
  // }

  console.log(props.chatId, 'chat users')

  return (
    <div className="border-red-100 border-8 w-1/4 overflow-y-scroll">
      <div>{isLoading && <p>Loading...</p>}</div>

      {/* username is on top level of object atm, will be nested later so will need to go into the array in db and find users in chat */}
      {!isLoading && chatUsers && (
        <div className="flex-col flex-wrap justify-center text-center">
          {chatUsers.map((chat) => (
            <div className={` border-black border-2 flex m-2 space-x-10 p-4 ${props.chatId === chat._id ? "bg-lime-300" : "null"}`}>
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <button
                key={chat._id}
                onClick={() => props.selectChatHandler(chat._id)}
              >
                {chat.users[1].username}
              </button>
            </div>
          ))}
        </div>
      )}
      {/* <button className="btn">Button</button> */}
    </div>
  );
}

export default ChatUsers;
