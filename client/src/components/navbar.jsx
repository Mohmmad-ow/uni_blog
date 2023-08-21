import { useFetchUser } from "../context/authContext";
import { useState } from "react";
import logo from "../assets/react.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const {user, dispatch, error, loading} = useFetchUser();
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
          <FontAwesomeIcon icon={faBars} />
      </button>
      <div className="lg:pl-16 md:pl-8">
          <h1 className="text-slate-50">User: {username}</h1>
      </div>
      <ul className={`py-6 ${isOpen ? "block" : "hidden"} md:flex `}>
          <li className="px-1 text-slate-50">
            <button className="text-slate-50 mx-auto md:hidden hover:outline outline-2 rounded-sm outline-offset-2" onClick={toggleMenu}>
              <FontAwesomeIcon icon={faBars} />
            </button>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="#">Home</a>
          </li>
          <li className="px-1 hover:text-gray-500 text-slate-50">
            <a href="#">Blog</a>
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
