import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import ChooseDates from "./chooseDate";
import logo from "../assets/filter-solid.svg";
import ChooseTags from "./chooseTags";

export default function SearchForBlogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const inputValueRef = useRef("");  // Ref to store the current input value

    const debouncedResults = useMemo(() => {
        return debounce((value) => {
            setSearchTerm(value);
        }, 1000);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, [debouncedResults]);

    function handleInputChange(e) {
        inputValueRef.current = e.target.value;  // Update ref value
        debouncedResults(inputValueRef.current);
    }
        
    function handleSearch() {
        debouncedResults.cancel();  // Cancel any pending debounced calls
        setSearchTerm(inputValueRef.current);  // Set searchTerm immediately
    }

    return (
        <div className="h-[100vh] flex justify-center items-start my-auto">
            <div className="my-auto flex gap-4">
                <div className="dropdown">
                    <button tabIndex={0} role="button" className="btn btn-secondary">
                        Filter <img src={logo} alt="" />  
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-4  bg-slate-500  rounded-box w-52" >
                        <li><ChooseTags /></li>
                        <li><ChooseDates /></li>
                    </ul>
                </div>
                <div className="flex">
                    <input onChange={handleInputChange} type="text" placeholder="Type here" className="input rounded-r-none  input-success w-full max-w-xs" />
                    <button onClick={handleSearch} className="btn rounded-l-none input-bordered btn-success">Search</button>
                </div>
            </div>
        </div>
    );
}


