import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import authContext from "../context/auth-context";

function NavbarComponent() {
  // const auth = useContext(authContext)
  const { username, isLoggedIn, logout, userId } = useContext(authContext);
  // console.log(state)

    // const auth = useContext(authContext)

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
              <Link to={"/users"}>Users</Link>
            </li>
              
                
            </ul>
          </div>
          {/* <a className="btn btn-ghost text-xl">chatMe</a> */}
          <Link to="/" className="btn btn-ghost text-xl">chatMe</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li> */}
            <li>
              <Link to={"/users"} className="btn">All Users</Link>
            </li>
            {/* <input type="checkbox" value="dark" className="toggle theme-controller"/> */}
          </ul>
        </div>
        <div className="navbar-end">
          {isLoggedIn && (
            <a className="btn m-2" onClick={() => logout()}>
              Logout
            </a>
          )}
          {userId && <Link className="btn" to={`/user/${userId}`}>{username}</Link>}
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default NavbarComponent;
