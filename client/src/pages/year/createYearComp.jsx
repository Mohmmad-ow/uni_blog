import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { useFetchUser } from "../../context/authContext";
import axios from "axios"
import Cookies from "js-cookie"


export default function CreateYearsComponent() {

    const nav = useNavigate();
    const {user, error, loading} = useFetchUser();
    const [year, setYear] = useState("");
    const accessToken = Cookies.get("access_token");

    const handleAddYear = () => {
        axios.post("/years/create", {
            year: year
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }

    if (loading) {
        return <>Loading...</>
    }
    if (error) {
        nav("/login");
        return;
    }
    if (user&& !user.Profile) {
        console.log(user)
        nav("/profile/create");
        return;
    }
    return (
            <div className="py-8 px-6 flex items-center flex-col gap-12">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="year">Year</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="year" onChange={(e) => setYear(e.target.value)} />
                </div>
                <button className="btn w-[25%] btn-accent" onClick={handleAddYear} type="submit">Add</button>
            </div>
    )



}