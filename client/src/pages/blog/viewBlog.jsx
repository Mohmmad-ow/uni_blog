import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import  dompurify from "dompurify";
import formatRelativeDate  from "../../../Config/dateConfig.js"

import Download from "../../utility/viewPicture.jsx";
import Navbar  from "../../components/navbar";
import Footer from "../../components/footer";


export default function ViewBlog() {
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const id = window.location.pathname.split('/')[2];




    const accessToken = Cookies.get("access_token");
    console.log(id);

    useEffect(() => {
        console.log("Gere")
        const fetchData = async () => {
            try {
                const response = await axios.get(`/blogs/blog/${id}`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const data = await response.data;
                data.blog = dompurify.sanitize(data.blog);
                data.createdAt = formatRelativeDate(data.createdAt);
                data.updatedAt = formatRelativeDate(data.updatedAt);
                console.log(data.blog)
                console.log("here", data)
                setBlog(data);
            } catch (error) {
                setError(true);
                setLoading(false);
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
                            <p><small>Created At: {blog.createdAt} | Updated At {blog.updatedAt} </small></p>
                            <h1 className="text-center text-3xl pb-12">{blog.name}</h1>
                            <figure className="flex justify-center items-center"><Download imagePath={blog.imgUrl} /></figure>
                            <p className="" dangerouslySetInnerHTML={{__html: blog.blog}} ></p>
                        </div>
                    </div>
            <Footer/>
        </div>
    )



}