import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreateDegreeComponent() {

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [degree, setDegree] = useState("");
    const accessToken = Cookies.get("access_token");

    const handleAddDegree = () => {
        axios.post("/degrees/create", {
            degree: degree
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    };



    return (
        <div className="py-8 px-6 flex items-center flex-col gap-12">
            <div className="flex flex-row gap-6 items-center justify-center">
                <label htmlFor="degree">Degree</label>
                <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="degree" onChange={(e) => setDegree(e.target.value)} />
            </div>
            <button className="btn w-[25%] btn-accent" onClick={handleAddDegree} type="submit">Add</button>
        </div>
    )
}