import axios from "axios"
import Cookies from "js-cookie"
import { deleteObject, ref } from "firebase/storage"
import storageRef from "../../../firebase/firebaseStorage.js"
import { useNavigate } from "react-router-dom";

export default function DeleteBlog() {
    const nav = useNavigate();
    const token = Cookies.get('access_token')
    const handleDeletePost = async () => {
        const id = window.location.pathname.split('/')[2]
        const response = await axios.delete('/blogs/blog/delete/' + id, {headers: {
            "Authorization": `Bearer ${token}`
    }})
    const path = response.data.blog
     path ? deleteImg(path) : nav("/blogs/all")
     
    }

    const deleteImg = (imgPath) => { 
        console.log(imgPath)
        const imgRef = ref(storageRef, imgPath)
        
        deleteObject(imgRef).then(() => {
        // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);

        });
        nav("/blogs/all")
        
    }



    return (
        <div>
            Are you sure you want to delete this Blog? 
            <input type="button" className="btn btn-primary" onClick={handleDeletePost} value="Delete Post" />
        </div>
    )


}