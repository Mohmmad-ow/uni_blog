/* eslint-disable no-unused-vars */
import React, { useState, useMemo, useEffect, useRef } from "react";
import debounce from "lodash.debounce";
import ChooseDates from "./chooseDate";
import logo from "../assets/filter-solid.svg";
import ChooseTags from "./chooseTags";
import axios from "axios";
import Cookies from "js-cookie";


export default function SearchForBlogs() {
    const accessToken = Cookies.get("access_token")
    const inputValueRef = useRef("");  // Ref to store the current input value
    const [tags, setTags] = useState([]);
    const [date, setDate] = useState({type: null, date: null})
    const [data, setData] = useState(null);
    const resultsContainerRef = useRef(null); // Reference for the search results container
    
    const debouncedResults = useMemo(() => {
        return debounce(
            async (value) => {
                if (value.length > 0) {
                    const response = await axios.post("/blogs/experiment", {
                    name: value,
                    tags: tags,
                    date: date
            
                   }, {headers: {
                        "Authorization": `Bearer ${accessToken}`
                    }});
                    setData(response.data)
                    console.log(response.data)
                }
            // setSearchTerm(value);
            
        }, 2000);
    }, []);

    

    useEffect(() => {
        // Add event listener when the component mounts
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Remove the event listener when the component unmounts
            document.removeEventListener("mousedown", handleClickOutside);
        };
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
    function onOpen() {
        debouncedResults.cancel();  // Cancel any pending debounced calls
    }

    const handleClickOutside = (event) => {
        if (resultsContainerRef.current && !resultsContainerRef.current.contains(event.target)) {
            setData(null); // Clear the search results
        }
    };
        
    async function handleSearch() {
        debouncedResults.cancel();  // Cancel any pending debounced calls
            const response = await axios.post("/blogs/experiment", {
            name: inputValueRef.current,
            tags: tags,
            date: date
           }, {headers: {
                "Authorization": `Bearer ${accessToken}`
            }});
            setData(response.data)
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
       <div className="flex flex-col justify-center mt-12 items-start">
            <div className="my-auto flex gap-4">
                <div className="dropdown">
                    <button tabIndex={0} role="button" className="btn btn-secondary">
                        Filter <img src={logo} alt="" />  
                    </button>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-4  bg-slate-500  rounded-box w-52" >
                        <li><ChooseTags onOpen={onOpen} handleSelectTag={handleTagsAdd} /></li>
                        <li><ChooseDates onOpen={onOpen} handleOneDate={handleOneDate} handleTwoDate={handleTwoDate} /></li>
                    </ul>
                </div>
                <div className="flex">
                    <input onChange={handleInputChange} type="text" placeholder="Type here" className="input rounded-r-none  input-success w-full max-w-xs" />
                    <button onClick={handleSearch} className="btn rounded-l-none input-bordered btn-success">Search</button>
                </div>
            </div>
            {data &&
                <div ref={resultsContainerRef} className="flex bg-gray-600 mt-6 p-2 flex-col gap-4 rounded-lg ">
                    {data.map((blog) => (
                        <div key={blog.id} className="card rounded-none w-96 bg-base-100 shadow-xl">
                            <a href={`/blogs/${blog.id}`} className="card-body">
                                <h2 className="card-title">{blog.name}</h2>
                                <p>{blog.description}</p>
                                
                            </a>
                        </div>
                    ))}
                </div>
            }
       </div>
    );
}


