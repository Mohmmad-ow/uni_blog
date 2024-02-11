/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function CreateMajorSettings({handleReload}) {

    
    
    const [major, setMajor] = useState("");
    const accessToken = Cookies.get("access_token");

    

    const handleAddMajor = async () => {
       
        try {
            await axios.post("/majors/create", {
                major: major,
            }, {
                headers: {
                    "Authorization": `Bearer ${accessToken}`
                }
            });
            document.getElementById("major").value = "";
            handleReload();
        } catch (error) {
            console.log(error);
        }
        
        return;
    }
    

    return (
        <div className="pt-4 px-3 flex items-center flex-row gap-6">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="major">Major</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="major" name="createMajor" onChange={(e) => setMajor(e.target.value)} />
                </div>
                <button className="btn  btn-accent" onClick={handleAddMajor} type="submit">Add</button>
            </div>
    )
}