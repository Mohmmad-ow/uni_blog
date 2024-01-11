import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import formatRelativeDate from "../../Config/dateConfig.js"; 

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import Download from "../utility/viewPicture.jsx";

export default function ViewProfile() {
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [isImageLoaded, setIsImageLoaded] = useState(false);
    



    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/profiles/profile/myprofile`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const data = await response.data;
                data.createdAt = formatRelativeDate(data.createdAt);
                data.updatedAt = formatRelativeDate(data.updatedAt);
                console.log(data)
                setData(data);
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
                            <p><small>Created At: {data.profile.createdAt} | Updated At {data.profile.updatedAt} </small></p>
                            <h2 className="text-center py-8">{data.profile.full_name}</h2>
                            <div className="flex justify-start gap-16 items-center">
                                <div className="avatar">
                                    <div className="w-24 rounded-full ">
                                        {isImageLoaded ? <div className="skeleton w-32 h-32 "></div>  : <Download imagePath={data.profile.profile_pic} handleImgLoaded={() => {setIsImageLoaded(true); console.log("Img is loaded")}} />}  
                                    </div>
                                </div>
                                <div>
                                    <h3>Degree: {data.degree.name}</h3>
                                    <h3>Major: {data.major.name}</h3>
                                    <h3>Year: {data.year.name}</h3>
                                </div>
                            </div>
                            <div className="flex gap-12 items-center justify-center pt-24"> 
                                <div><a href={`/profile/delete`} className="btn btn-wide btn-error">Delete</a></div>
                                <div><a href={`/profile/update`} className="btn btn-wide btn-info">Update</a></div>
                            </div>
                        </div>
                    </div>
            <Footer/>
        </div>
    )



}