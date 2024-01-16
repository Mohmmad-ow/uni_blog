import { useEffect, useState } from "react";
// import Download from "../../utility/viewPicture";
import axios from "axios";
import Cookies from "js-cookie";
import DOMPurify from "dompurify";


import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import BlogDiv from "../../components/blogDiv";



const accessToken = Cookies.get("access_token") 

export default function ViewBlogsComponent({data}) {
    
 
      return (
        <div className="grid grid-cols-3 gap-12 p-12">
            {data.map((blog) => {
            blog.blog = DOMPurify.sanitize(blog.blog);
            blog.blog = blog.blog.length > 255 ? blog.blog.slice(0, 255) + "..." : blog.blog


            return (
                <BlogDiv blog={blog} key={blog.id}/>
            )
            })}
        </div>
      );
    

}