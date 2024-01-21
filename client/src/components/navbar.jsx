import { useFetchUser } from "../context/authContext";
import logo from "../assets/react.svg";
import Download from "../utility/viewPicture";
export default function Navbar2() {
  // eslint-disable-next-line no-unused-vars
  const {user,loading, dispatch, error} = useFetchUser();
  

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="navbar lg:px-24 bg-hue-main">
        <div className=" navbar-start">
            <a href="/" className="btn btn-ghost text-xl"><img src={logo} alt="Logo" /></a>
        </div>
        <div className="navbar-center">
            <a href="/blogs/all" className="btn glass">Explore Blogs</a>
        </div>
        <div className="navbar-end gap-2">
            <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                    <Download imagePath={user.profileImg}/>
                </div>
            </div>
            <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                <li>
                <a href={`/profile/${user.profileId}`} className="justify-between">
                    Profile
                    <span className="badge">New</span>
                </a>
                </li>
                <li><a href="/settings">Settings</a></li>
                <li><a href="/auth/logout">Logout</a></li>
            </ul>
            </div>
        </div>
        </div>
  );
}
