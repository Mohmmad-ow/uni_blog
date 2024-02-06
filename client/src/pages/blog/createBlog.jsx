/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import storageRef from "../../../firebase/firebaseStorage.js";
import { uploadBytes, ref } from "firebase/storage";
import axios from 'axios';


import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from "js-cookie";


import Navbar from "../../components/navbar.jsx";
import Footer from "../../components/footer.jsx";

export default function createBlog() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage,  setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const editorRef = useRef(null);

  const accessToken = Cookies.get("access_token") 


  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
  } 
  
  const handlePostUpdate = () => {
   if (selectedImage) {
    handlePostUpdateWithPicture();
   } else {
    handlePostUpdateWithoutPicture();
   }
  };

  const handlePostUpdateWithPicture = () => {
    const file = selectedImage;
    console.log(title, editorRef.current.getContent())
    const imgRef = ref(storageRef, `images/${file.name.split(" ").join("_")}`);
    console.log(file)
    uploadBytes(imgRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      axios.post('/blogs/create', {
        name: title,
        imgUrl: snapshot.metadata.fullPath,
        blog: editorRef.current.getContent(),
        description: description
      },{headers: {
        "Authorization": `Bearer ${accessToken}`
    }});
    });
  }
  const handlePostUpdateWithoutPicture = () => {
    
      axios.post('/blogs/create', {
        name: title,
        blog: editorRef.current.getContent(),
        description: description
      },{headers: {
        "Authorization": `Bearer ${accessToken}`
    }});

    };
  
  
  return (
    <>
    <Navbar />
    <div className='flex justify-center flex-col py-12'>
      <div className='px-8 flex items-center gap-12'>
          <label htmlFor="title" className="text-slate-200">Blog Title</label>
          <input onChange={handleTitleChange} id='title' type="text" placeholder="Type here" className="input input-bordered input-accent w-full max-w-xs" />
      </div>

      <div className='px-8 py-6 flex items-center gap-8'>
        <label htmlFor="image" className="text-slate-200">Blog Image</label>
        <input type="file" id="image" onChange={handleImageUpload} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
      </div>
      <div className='px-8 py-6 flex items-center gap-8'>
        <label htmlFor="description" className="text-slate-200">Blog Description</label>
        <textarea id="description" onChange={(e) => {setDescription(e.target.value)}} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
      </div>
      <div className='px-8'>
      <Editor
        apiKey='gx7vg9kfcsq72n1w1u6sj5fo67l5irgixisk6sai7h542hv8'
        onInit={(evt, editor) => editorRef.current = editor}
        initialValue="<p>This is the initial content of the editor.</p>"
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}' 
          
        }}
      />
      </div>
      <button onClick={handlePostUpdate} className="btn btn-accent btn-wide mt-12 mx-auto btn-lg">Post</button>
    </div>
    <Footer />
    </>
  );
}