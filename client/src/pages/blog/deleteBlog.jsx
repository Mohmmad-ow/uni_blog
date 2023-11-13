import axios from "axios"
import Cookies from "js-cookie"
import { deleteObject, ref } from "firebase/storage"
import storageRef from "../../../firebase/firebaseStorage.js"

export default function DeleteBlog() {
    const token = Cookies.get('access_token')
    const handleDeletePost = async () => {
        const id = window.location.pathname.split('/')[2]
        const response = await axios.delete('/blogs/blog/delete/' + id, {headers: {
            "Authorization": `Bearer ${token}`
    }})
    const path = response.data.blog
    console.log(path)
        deleteImg(path)
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
    }



    return (
        <input type="button" className="btn btn-primary" onClick={handleDeletePost} value="Delete Post" />
    )


}