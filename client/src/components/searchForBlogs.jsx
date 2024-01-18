/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import ChooseDates from "./chooseDate";
import logo from "../assets/filter-solid.svg";
import ChooseTags from "./chooseTags";
import axios from "axios";
import Cookies from "js-cookie";


export default function SearchForBlogs() {
    const [searchTerm, setSearchTerm] = useState("");
    const inputValueRef = useRef("");  // Ref to store the current input value
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState({type: null, date: null})
    
    const debouncedResults = useMemo(() => {
        return debounce((value) => {
            setSearchTerm(value);
        }, 1000);
    }, []);

    const accessToken = Cookies.get("access_token")
    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    }, [debouncedResults]);

    function handleInputChange(e) {
        inputValueRef.current = e.target.value;  // Update ref value
        debouncedResults(inputValueRef.current);
    }
        
    async function handleSearch() {
        debouncedResults.cancel();  // Cancel any pending debounced calls
        setSearchTerm(inputValueRef.current);  // Set searchTerm immediately
       const response = await axios.post("/blogs/experiment", {
        name: inputValueRef.current,
        tags: tags,
        date: date

       }, {headers: {
            "Authorization": `Bearer ${accessToken}`
        }});
        console.log(response.data)

    }

    function handleTagsAdd(newTags) {
        document.getElementById("my_modal_2").close()
        setTags([...newTags]);

    }

    function handleOneDate() { 
        document.getElementById("my_model_1").close()
        setDate([document.getElementById("oneDate").value])

    }

    function handleTwoDate() {
        document.getElementById("my_model_1").close()

        const firstDate = document.getElementById("dateOne").value;
        const secondDate = document.getElementById("dateTwo").value;

        setDate([firstDate, secondDate])

    }

    return (
        <div className="h-[100vh] flex justify-center items-start my-auto">
            <div className="my-auto flex gap-4">
                <div className="dropdown">
                    <button tabIndex={0} role="button" className="btn btn-secondary">
                        Filter <img src={logo} alt="" />  
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-4  bg-slate-500  rounded-box w-52" >
                        <li><ChooseTags handleSelectTag={handleTagsAdd} /></li>
                        <li><ChooseDates handleOneDate={handleOneDate} handleTwoDate={handleTwoDate} /></li>
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


