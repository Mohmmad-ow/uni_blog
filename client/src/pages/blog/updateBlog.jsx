import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import dompurify from "dompurify";
import { uploadBytes, ref, deleteObject } from "firebase/storage";
import storageRef from "../../../firebase/firebaseStorage.js";
import { useNavigate } from "react-router-dom";

import { Editor } from "@tinymce/tinymce-react";

import Navbar from "../../components/navbar";
import Footer from "../../components/footer";

export default function ViewBlog() {
  const [blog, setBlog] = useState({});
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const id = window.location.pathname.split("/")[2];
  const editorRef = useRef(null);

  const nav = useNavigate();
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/blogs/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        let { blog, name, imgUrl, description } = await response.data.blog;
        blog = dompurify.sanitize(blog, {
          ADD_TAGS: ["iframe"],
        });
        setBlog({ blog, name, imgUrl, description });
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const deleteImg = async (imgPath) => {
    const imgRef = ref(storageRef, imgPath);

    try {
      await deleteObject(imgRef);
    } catch (error) {
      console.log("Error deleting image:", error);
    }
  };

  const uploadImg = async (imgPath, img) => {
    const imgRef = ref(storageRef, `images/${imgPath.split(" ").join("_")}`);

    try {
      const snapshot = await uploadBytes(imgRef, img);
      console.log("Uploaded a blob or file!");

      await axios.put(`/blogs/blog/update/${id}`, {
        name: blog.name,
        imgUrl: snapshot.metadata.fullPath,
        blog: editorRef.current.getContent(),
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      nav(`/blogs/${id}`);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleTitleChange = (e) => {
    setBlog({ ...blog, name: e.target.value });
  };

  const handleImageUpload = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleUpdatePost = async () => {
    try {
      if (selectedImage) {
        if (blog.imgUrl) {
          await deleteImg(blog.imgUrl);
        }
        await uploadImg(selectedImage.name, selectedImage);
      } else {
        await axios.put(`/blogs/blog/update/${id}`, {
          name: blog.name,
          blog: editorRef.current.getContent(),
          description: blog.description,
        }, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        nav(`/blogs/${id}`);
      }
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="flex justify-center flex-col py-12">
      <Navbar />
      <div className="flex justify-center flex-col py-12 px-8">
        <div className="px-8 flex items-center gap-12">
          <label htmlFor="title" className="text-slate-200">
            Blog Title
          </label>
          <input
            onChange={handleTitleChange}
            id="title"
            value={blog.name}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-accent w-full max-w-xs"
          />
        </div>

        <div className="px-8 py-6 flex items-center gap-8">
          <label htmlFor="image" className="text-slate-200">
            Blog Image
          </label>
          <input
            type="file"
            id="image"
            onChange={handleImageUpload}
            className="file-input file-input-bordered file-input-success w-full max-w-xs"
          />
        </div>
        <Editor
          apiKey="gx7vg9kfcsq72n1w1u6sj5fo67l5irgixisk6sai7h542hv8"
          onInit={(evt, editor) => editorRef.current = editor}
          initialValue={blog.blog}
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | media | " +
              "bold italic forecolor | image | code | link |  alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | table | help |",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px;}",
          }}
        />
      </div>
      <div className="mx-auto pb-12">
        <button onClick={handleUpdatePost} className="btn btn-wide btn-outline btn-accent">
          Update
        </button>
      </div>
      <Footer />
    </div>
  );
}
