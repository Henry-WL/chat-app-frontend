import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import authContext from "../context/auth-context";

function Users() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const auth = useContext(authContext)

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("http://localhost:3000/api/users/");

      const data = await response.json();

      console.log(data);

      setUsers(data.users);

      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const addFriendHandler = async (authuid, uid) => {
    console.log(authuid, uid)

    const response = await fetch(
        `http://localhost:3000/api/chats/createChat`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            loggedInUser: authuid,
            addedUser: uid,
            // loggedInUser: authuid
          }),
        }
      );
    
  }

  return (
    <div className="flex flex-wrap p-5 gap-2 justify-center">
      {/* Users */}
      {isLoading && <p>Loading...</p>}
      {!isLoading &&
        users &&
        users.map((user) => {
            console.log(user)
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
                  {auth.userId !== user._id && <button className="btn btn-primary" onClick={() => addFriendHandler(auth.userId, user._id)}>Add Friend</button>}
                  <Link className="btn btn-primary" to={`/user/${user._id}`}>View profile</Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Users;
