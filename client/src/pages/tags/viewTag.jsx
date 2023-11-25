import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import formatRelativeDate  from "../../../Config/dateConfig.js"

import Navbar  from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";


export default function ViewTag() {
    const [tag, setTag] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const id = window.location.pathname.split('/')[2];




    const accessToken = Cookies.get("access_token");
    console.log(id);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/tags/tag/${id}`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const data = await response.data;
                data.createdAt = formatRelativeDate(data.createdAt);
                data.updatedAt = formatRelativeDate(data.updatedAt);
                console.log(data.name)
                setTag(data);
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
        <div className="bg-gray-700">
            <Navbar/>
            <div  className="py-12 px-16">
                        <div className="">
                            <p><small>Created At: {tag.createdAt} | Updated At {tag.updatedAt} </small></p>
                            <h1 className="text-center text-3xl pb-12">{tag.name}</h1>
                            <div className="flex gap-12 items-center justify-center pt-24"> 
                                <div><a href={`/tag/${id}/delete`} className="btn btn-wide btn-error">Delete</a></div>
                                <div><a href={`/tag/${id}/update`} className="btn btn-wide btn-info">Update</a></div>
                            </div>
                        </div>
                    </div>
            <Footer/>
        </div>
    )



}