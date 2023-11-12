import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import  dompurify from "dompurify";
import { uploadBytes, ref, deleteObject } from  "firebase/storage"
import storageRef from "../../../firebase/firebaseStorage.js";

import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';

import Navbar  from "../../components/navbar";
import Footer from "../../components/footer";




export default function ViewBlog() {
    const [blog, setBlog] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const id = window.location.pathname.split('/')[2];
    const editorRef = useRef(null);


    const accessToken = Cookies.get("access_token");
    console.log(id);


    useEffect(() => {
        console.log("Gere")
        const fetchData = async () => {
            try {
                const response = await axios.get(`/blogs/blog/${id}`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                let {blog, name, imgUrl} = await response.data;
                blog = dompurify.sanitize(blog);
              
                setBlog({blog, name, imgUrl});
            } catch (error) {
                setError(true);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        
        }
        fetchData();
    },[])

    const deleteImg = ({imgPath}) => { 
        const imgRef = ref(storageRef, imgPath)
        
        deleteObject(imgRef).then(() => {
        // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);

        });
    }
    const uploadImg = (imgPath, img) => {
        console.log(imgPath)
        const imgRef = ref(storageRef, `images/${imgPath.split(" ").join("_")}`);


        uploadBytes(imgRef, img).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          axios.put('/blogs/blog/update/' + id, {
            name: blog.name,
            imgUrl: snapshot.metadata.fullPath,
            blog: editorRef.current.getContent()
          },{headers: {
            "Authorization": `Bearer ${accessToken}`
        }});
        });
    }


    function handleTitleChange(e) {
        setBlog({...blog, name: e.target.value});
        console.log(blog)
      }

    const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
    }

    const handleUpdatePost = () => {
        const file = selectedImage


        if (selectedImage) {
            deleteImg({imgPath: blog.imgUrl})
            uploadImg(file.name, file)
        } else {
            axios.put('/blogs/blog/update/' + id, {
                name: blog.name,
                blog: editorRef.current.getContent()
              },{headers: {
                "Authorization": `Bearer ${accessToken}`
            }});
        }

        
      };




    if (loading) {
        return <div>Loading...</div>;
      
    } 
    if (error) { 
        return <div>Error</div>;
    }

    return (
        <div className=''>
        <Navbar/>
      <div className='px-8 pt-12 flex items-center gap-12'>
          <label htmlFor="title" className="text-slate-200">Blog Title</label>
          <input onChange={handleTitleChange} value={blog.name} id='title' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>

      <div className='px-8 py-6'>
        <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
      </div>
      <div className='px-8'>
      <Editor
        apiKey='gx7vg9kfcsq72n1w1u6sj5fo67l5irgixisk6sai7h542hv8'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue={blog.blog}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | blocks | ' +
            'bold italic forecolor | image | code | link |  alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | table | help |',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;   }' 
          
        }}
      />
      </div>
      <button onClick={handleUpdatePost} className="btn btn-outline btn-secondary">Update</button>
      <Footer/>
    </div>
    )



}