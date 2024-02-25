import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import dompurify from "dompurify";
import formatRelativeDate from "../../../Config/dateConfig.js";

import CreateLikeComp from "../likes/createLikes.jsx";

import Download from "../../utility/viewPicture.jsx";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import CreateCommentComponent from "../comment/createCommentComp.jsx";
import ViewCommentsComponent from "../comment/viewCommentsComponent.jsx";
import AddTagsToBlogs from "./addTagsToBlogs.jsx";
import PreviewTags from "../../components/previewTags.jsx";

export default function ViewBlog() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [viewTags, setViewTags] = useState(false); 

  const id = window.location.pathname.split("/")[2];

  const accessToken = Cookies.get("access_token");
  console.log(id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/blogs/blog/${id}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        // response.data.blog.Like = response.data.blog.Like.length;
        const data = await response.data.blog;

        data.blog = dompurify.sanitize(data.blog, {
          ADD_TAGS: ["iframe"],
        });

        data.createdAt = formatRelativeDate(data.createdAt);
        data.updatedAt = formatRelativeDate(data.updatedAt);
        setIsOwner(response.data.isSameUser);
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
        setError(true);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  async function handleNewComment() {
    const response = await axios.get(`/blogs/blog/${id}/comments`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.status === 200) {
      setData({ ...data, Comments: response.data });
    }
  }

  function handleAddLike() {
    console.log(data.hasLiked, "im here")
    if (data.hasLiked) {
      setData({...data, likeCount: data.likeCount-1, hasLiked: false})
      console.log("disliked")  
      return;
    }
    setData({...data, likeCount: data.likeCount+1, hasLiked: true})
    console.log("Liked")
    return;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error</div>;
  }

  return (
    <div className="bg-gray-700">
      <Navbar />
      <div className="py-12 ">
        <div className="px-16">
          <p>
            <small>
              Created At: {data.createdAt} | Updated At {data.updatedAt}{" "}
            </small>
          </p>
          <div className="flex justify-between items-center py-12">
            <div className="flex justify-center items-center gap-12">
              <div className="avatar">
                <div className="w-24 rounded-full ">
                  <Download imagePath={data.Profile.profile_pic} />
                </div>
              </div>
              <p className="text-center">
                Created By:{" "}
                <a
                  className="link link-warning link-hover"
                  href={`/profile/${data.Profile.id}`}
                >
                  <strong>{data.Profile.full_name}</strong>
                </a>
              </p>
            </div>
            <div className="w-24 h-12 flex gap-4 justify-center items-center">
              <CreateLikeComp handleAddLike={handleAddLike} BlogId={data.id} key={data.id} />
              <p className="text-3xl">{data.likeCount}</p>  
            </div>
          </div>
          <div>
            <PreviewTags tags={data.Tags} />
          </div>
          {isOwner && (
            <div>
              <button className="btn btn-wide btn-info" onClick={() => {setViewTags(!viewTags)}} type="button">{viewTags ? 'Hide' : 'Set Blog Tags'}</button>
              {viewTags &&
              <AddTagsToBlogs id={id} />}
          </div>
          )}
        </div>
        <div className="bg-black rounded-md mt-12 p-6">
          <h1 className="text-center text-2xl pb-12">{data.name}</h1>
          <div className="flex justify-center items-center mx-auto w-44 pt-12 ">
            {data.imgUrl ? <Download imagePath={data.imgUrl} /> : null}
          </div>
          <p
            className="pt-12"
            dangerouslySetInnerHTML={{ __html: data.blog }}
          ></p>
          {isOwner && (
            <div className="flex gap-12 items-center justify-center pt-24">
              <div>
                <a
                  href={`/blogs/${id}/delete`}
                  className="btn btn-wide btn-error"
                >
                  Delete
                </a>
              </div>
              <div>
                <a
                  href={`/blogs/${id}/update`}
                  className="btn btn-wide btn-info"
                >
                  Update
                </a>
              </div>
            </div>
          )}
        </div>
        <div className="px-4 py-4">
          <CreateCommentComponent
            onCreateComment={handleNewComment}
            blogId={data.id}
          />
          <h6 className="mx-4">Comments</h6>
          <hr className="mb-4" />
          {data.Comments && data.Comments.length > 0 ? (
            <ViewCommentsComponent
              className={"flex flex-col gap-4"}
              comments={data.Comments}
            />
          ) : null}
        </div>
      </div>
      <Footer />
    </div>
  );
}
