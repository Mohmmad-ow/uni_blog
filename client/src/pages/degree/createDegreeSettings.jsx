/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreateDegreeSettings({handleReload}) {

    
    
    const [degree, setDegree] = useState("");
    const accessToken = Cookies.get("access_token");

    

    const handleAddDegree = async () => {
       
        try {
            axios.post("/degrees/create", {
                degree: degree
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            document.getElementById("degree").value = "";
            handleReload();
        } catch (error) {
            console.log(error);
        }
        
        return;
    }
    

    return (
        <div className="py-4 px-3 flex items-center justify-center flex-row gap-6">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="major">Degree</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="degree" name="createDegree" onChange={(e) => setDegree(e.target.value)} />
                </div>
                <button className="btn btn-accent" onClick={handleAddDegree} type="submit">Add</button>
            </div>
    )
}