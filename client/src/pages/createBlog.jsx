/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import storageRef from "../../firebase/firebaseStorage.js";
import { uploadBytes, ref } from "firebase/storage";
import axios from 'axios';


import { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Cookies from "js-cookie";


export default function createBlog() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [selectedImage,  setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const editorRef = useRef(null);

  const accessToken = Cookies.get("access_token") 


  function handleTitleChange(e) {
    setTitle(e.target.value);
  }

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  const handleImageUpload = (e) => {
    const image = e.target.files[0];
    setSelectedImage(image);
  } 
  
  const handleFileUpload = (e) => {
    const file = selectedImage.split(" ").join("_")
    console.log(title, editorRef.current.getContent())
    const imgRef = ref(storageRef, `images/${file.name}`);
    console.log(file)
    uploadBytes(imgRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
      axios.post('/blogs/create', {
        name: title,
        image: snapshot.metadata.fullPath,
        blog: editorRef.current.getContent()
      },{headers: {
        "Authorization": `Bearer ${accessToken}`
    }});
    });
  };
  
  return (
    <div className=''>
      <div className='px-8 pt-12 flex items-center gap-12'>
          <label htmlFor="title" className="text-slate-200">Blog Title</label>
          <input onChange={handleTitleChange} id='title' type="text" placeholder="Type here" className="input input-bordered w-full max-w-xs" />
      </div>

      <div className='px-8 py-6'>
        <input type="file" onChange={handleImageUpload} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
        {/* <input type="button"onClick={handleFileUpload} className="btn btn-success" value="Upload" /> */}
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
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;   }' 
          
        }}
      />
      </div>
      <button onClick={handleFileUpload} className="btn btn-outline btn-secondary">Secondary</button>
    </div>
  );
}