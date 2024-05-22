import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authContext from "../context/auth-context";

function Users() {
  const [users, setUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useContext(authContext);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users/");

      const data = await response.json();

      // console.log(data.users);

      setUsers(data.users);

      setIsLoading(false);
    };

    const fetchChats = async () => {
      const response = await fetch(
        `http://localhost:3000/api/chats/${auth.userId}`
      );
      const data = await response.json();
      // console.log(data.chats);
      //   console.log('running!!!!')
      setChats(data.chats);
      setIsLoading(false);
    };

    fetchUsers();
    fetchChats();
  }, []);

  const handleDisableButton = (e) => {
    console.log('first')
    e.currentTarget.disabled = true;
    console.log('clicked')
  }

  const addFriendHandler = async (
    authuid,
    uid,
    loggedInUserUsername,
    addedUserUsername
  ) => {
    console.log(authuid, uid);

    const response = await fetch(`http://localhost:3000/api/chats/createChat`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        loggedInUser: authuid,
        loggedInUserUsername,
        addedUser: uid,
        addedUserUsername,
        // loggedInUser: authuid
      }),
    });
  };

  // if (!isLoading && chats.length !== 0 && users.length !== 0) {
  //   for (let i = 0; i< chats.length; i++) {
  //     // console.log(chats[i].users)
  //     // if (chats[i].)
  //     if (chats[i].users.find(u => u.user === auth.userId)) {
  //       console.log(i, 'chat pos')
  //     }
  //   }

  // }

  return (
    <div className="flex flex-wrap p-5 gap-2 justify-center">
      {/* Users */}
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        users &&
        users.map((user, index) => {
          // console.log(user);
          let disabled = false;
          for (let i = 0; i < chats.length; i++) {
            if (chats[i].users.find((u) => u.user === user._id)) {
              disabled = true;
            }
          }
          return (
            <div className="card w-96 bg-base-100 shadow-xl">
              <figure className="px-10 pt-10">
                <img
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                  alt="Shoes"
                  className="rounded-xl"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title">{user.email}</h2>
                <p>{user.username}</p>
                <div className="card-actions">
                  {auth.userId !== user._id && (
                    <button
                      className="btn btn-primary"
                      disabled={disabled}
                      onClick={(e) => {addFriendHandler(auth.userId, user._id, auth.username, user.username); handleDisableButton(e)}}>
                      Add Friend
                    </button>
                  )}
                  <Link className="btn btn-primary" to={`/user/${user._id}`}>
                    View profile
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Users;
