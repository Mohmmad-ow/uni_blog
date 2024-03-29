import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import formatRelativeDate  from "../../../Config/dateConfig.js"



// eslint-disable-next-line react/prop-types
export default function ViewYearComponent({id}) {
    const [year, setYear] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);




    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/years/year/${id}`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const data = await response.data;
                data.createdAt = formatRelativeDate(data.createdAt);
                data.updatedAt = formatRelativeDate(data.updatedAt);
                console.log(data.name)
                setYear(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        
        } 
        fetchData();
    },[])

    if (loading) {
        return <div>Loading...</div>;
      
    } 
    if (error) { 
        return <div>Error</div>;
    }

    return (
        <div  className="py-12 px-16">
            <div className="">
                <p><small>Created At: {year.createdAt} | Updated At {year.updatedAt} </small></p>
                <h1 className="text-center text-3xl pb-12">{year.name}</h1>
                <div className="flex gap-12 items-center justify-center pt-24"> 
                    <div><a href={`/year/${id}/delete`} className="btn btn-wide btn-error">Delete</a></div>
                    <div><a href={`/year/${id}/update`} className="btn btn-wide btn-info">Update</a></div>
                </div>
            </div>
        </div>
    )



}