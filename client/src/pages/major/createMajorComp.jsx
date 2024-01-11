import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";


export default function CreateMajorComponent() {

    
    
    const [major, setMajor] = useState("");
    const [degreeID, setDegreeID] = useState(null);
    
    
    const [degrees, setDegrees] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/degrees/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setDegrees(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])

    const handleAddMajor = () => {
        axios.post("/majors/create", {
            major: major,
            DegreeId: degreeID
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }

    return (
        <div className="py-8 px-6 flex items-center flex-col gap-12">
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="major">Major</label>
                    <input className="input input-accent input-bordered w-full max-w-xs" type="text" id="major" onChange={(e) => setMajor(e.target.value)} />
                </div>
                <div className="flex flex-row gap-6 items-center justify-center">
                    <label htmlFor="degree">degree</label>
                   {error ? <p>Error: {error.message}</p> : 
                        <select id="degree" className="select select-primary w-full max-w-xs">
                        <option disabled selected>What is the Degree?</option>
                        {loading == false ? degrees.map((degree) => (
                            <option onClick={() => {setDegreeID(degree.id)}} key={degree.id} value={degree.id}>{degree.name}</option>
                        )) : <option className="loading loading-spinner loading-md" ></option> }
                        </select>
                   }
                </div>
                <button className="btn w-[25%] btn-accent" onClick={handleAddMajor} type="submit">Add</button>
            </div>
    )
}