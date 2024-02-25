import { useFetchUser } from "../context/authContext";
import logo from "../assets/react.svg";
import Download from "../utility/viewPicture";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
export default function Navbar() {

  const nav = useNavigate();

  function logout() {
    console.log("Logout")
    Cookies.remove("access_token");
    setTimeout(() => {
      nav("/login", {});
    }, 1000)
  }



  // eslint-disable-next-line no-unused-vars
  const { user, loading, dispatch, error } = useFetchUser();

  return (
    <div className="navbar lg:px-24 bg-hue-main">
      <div className=" navbar-start">
        <a href="/" className="btn btn-ghost text-xl">
          <img src={logo} alt="Logo" />
        </a>
      </div>
      <div className="navbar-center">
        <a href="/blogs/all" className="btn glass">
          Explore Blogs
        </a>
      </div>
      {user&&user.profileId ? (
        <div className="navbar-end gap-2">
            <h5><strong>{user.fullName}</strong></h5>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                {user.profileImg ? <Download imagePath={user.profileImg}  /> : null}
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a
                  href={`/profile/${user.profileId}`}
                  className="justify-between"
                >
                  Profile
                </a>
              </li>
              <li>
                <a href="/settings">Settings</a>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="navbar-end">
        <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 glass rounded-full">
                
              </div>
            </div>
            
             
              {user&&user.username ?
                <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                >

                <li>
                 <a href="/profile/create">Create Profile</a>
                </li>
                </ul>
              :
              <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
              <a
                href="/register"
                className="justify-between"
              >
                Register
              </a>
            </li>
            <li>
              <a href="/login">Login</a>
            </li>  
            </ul>
            }
             
          </div>
          </div>
      )}
    </div>
  );
}
