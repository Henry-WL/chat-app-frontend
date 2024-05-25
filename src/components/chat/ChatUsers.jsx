import React, { useContext, useEffect, useState } from "react";
import authContext from "../../context/auth-context";
import { IoMdStarOutline } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import { IoTrashOutline } from "react-icons/io5";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function ChatUsers(props) {
  const [chatUsers, setChatUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [clickedChatStyle, setClickedChatStyle] = useState();

  const auth = useContext(authContext);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chats/${auth.userId}`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        }
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

  console.log(props.chatId, "chat users");

  const notify = () =>
    toast.error("This icon is for display purposes only", {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      // transition: Bounce,
    });

  return (
    <div className="flex flex-col h-full border-gray-100 border-r w-1/4">
      <div className="flex-1 overflow-y-scroll">{isLoading && <p>Loading...</p>}

      {/* username is on top level of object atm, will be nested later so will need to go into the array in db and find users in chat */}
      {!isLoading && chatUsers && (
        <div className="flex-col flex-wrap justify-center text-center">
          {chatUsers.map((chat) => (
            <div
              className={` flex space-x-10 p-4 cursor-pointer ${
                props.chatId === chat._id
                  ? "bg-purple-100 border-purple-400 border-l-4"
                  : "null"
              }`}
              key={chat._id}
              onClick={() => props.selectChatHandler(chat._id)}
            >
              <div className="avatar online">
                <div className="w-12 rounded-full">
                  <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </div>
              <button>
                {chat.users[1].user === auth.userId
                  ? chat.users[0].username
                  : chat.users[1].username}
              </button>
            </div>
          ))}
        </div>
      )}
      </div>
      {/* <button className="btn">Button</button> */}
      <div className="w-full p-4 flex justify-center">
        <div className="p-2">
          <IoMdStarOutline
            className="h-6 w-6 cursor-pointer"
            onClick={notify}
          />
        </div>
        <div className="p-2">
          <BsSend className="h-6 w-6 cursor-pointer" onClick={notify} />
        </div>
        <div className="p-2">
          <CiFileOn className="h-6 w-6 cursor-pointer" onClick={notify} />
        </div>
        <div className="p-2">
          <MdErrorOutline className="h-6 w-6 cursor-pointer" onClick={notify} />
        </div>
        <div className="p-2">
          <IoTrashOutline className="h-6 w-6 cursor-pointer" onClick={notify} />
        </div>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          // transition: Bounce,
        />
      </div>
    </div>
  );
}

export default ChatUsers;
