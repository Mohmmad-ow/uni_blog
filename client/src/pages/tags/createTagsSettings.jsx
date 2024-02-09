/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"

export default function CreateTagsComponent({handleReload}) {

    
    
    const [tag, setTag] = useState("");
    
    const accessToken = Cookies.get("access_token");

    const handleAddTag = async () => {
       
        await axios.post("/tags/create", {
            tag: tag
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        });
        document.getElementById("tag").value = "";

        handleReload();
        return;
    }


    return (
        <div className="py-4 px-3 flex items-center justify-center flex-row gap-6">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="tag">Tag</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="tag" onChange={(e) => setTag(e.target.value)} />
                </div>
                <button className="btn w-auto btn-accent" onClick={handleAddTag} type="submit">Add</button>
            </div>
    )



}