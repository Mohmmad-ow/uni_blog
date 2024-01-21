
import { useFetchUser } from "../context/authContext";
import { useState } from "react";
import logo from "../assets/react.svg";
import bars from "../assets/bars-solid.svg"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const {user,loading, dispatch, error} = useFetchUser();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const username = error ?  "not registered" : user != null ? user.username : "Loading..."

  return (
    <nav className="w-full px-12 bg-hue-main flex items-center justify-between">
      <div>
          <img src={logo} />
      </div>
      <button className={`text-slate-50 mx-auto md:hidden hover:outline outline-2 rounded-sm outline-offset-2 ${!isOpen ? "block" : "hidden"}`} onClick={toggleMenu}>
          <img src={bars} className="'md:w-6 w-6" alt="" />
      </button>
      <div className="lg:pl-16 md:pl-8">
          <h1 className="text-slate-50 text-xl">User: {username}</h1>
      </div>
      <ul className={`py-6 flex gap-4 ${isOpen ? "block" : "hidden"} md:flex `}>
          <li className="px-1 text-slate-50">
            <button className="text-slate-50 mx-auto md:hidden hover:outline outline-2 rounded-sm outline-offset-2" onClick={toggleMenu}>
              <img src={bars} className="'md:w-6 w-6" alt="" />
            </button>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="/">Home</a>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="/blogs/all">Blogs</a>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="#">About</a>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="#">Contact me</a>
          </li>
      </ul>
      
    </nav>
  );
}