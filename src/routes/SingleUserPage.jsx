import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import authContext from "../context/auth-context";

function singleUserPage() {
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const { userId } = useParams();

  const auth = useContext(authContext);

  console.log(auth)

  useEffect(() => {
    const fetchSingleUser = async () => {
      const response = await fetch(`http://localhost:3000/api/users/${userId}`);

      const data = await response.json();

      console.log(data.user[0]);

      setUser(data.user[0]);
      setIsLoading(false);
    };

    fetchSingleUser();
  }, []);

  const formSubmitHandler = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + auth.token
      },
      body: JSON.stringify({
        // sendinguserId: auth.userId,
        email: email,
        username: username,
      }),
      
    });
    // setIsLoading(true);
    setEmail("");
    setUsername("");

    if (username !== "") {
      auth.setUsername(username);
    }

    const data = await response.json();

    console.log(data.user);
    // console.log(data.user[0])

    setUser(data.user);

    // setIsLoading(false);
  };

  return (
    <div className="flex justify-center p-10">
      {isLoading && <p>Loading...</p>}

      {!isLoading && user && (
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
              {/* <button className="btn btn-primary">Add Friend</button> */}

              {auth.userId === userId && (
                <form onSubmit={formSubmitHandler}>
                  <div>
                    <label className="input input-bordered flex items-center gap-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                      </svg>
                      <input
                        type="text"
                        className="grow"
                        placeholder={user.email}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                      </svg>
                      <input
                        type="text"
                        className="grow"
                        placeholder={user.username}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </label>
                    <label className="input input-bordered flex items-center gap-2 mt-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="w-4 h-4 opacity-70"
                      >
                        <path
                          fillRule="evenodd"
                          d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <input
                        type="password"
                        className="grow"
                        // value="password"
                        placeholder=""
                      />
                    </label>

                    <button className="btn btn-primary m-2" type="submit">
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default singleUserPage;
