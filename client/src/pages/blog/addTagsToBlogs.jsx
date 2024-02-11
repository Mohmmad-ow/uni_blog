import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";


export default function AddTagsToBlogs() {
  const [data, setData] = useState();
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedToRemove, setSelectedToRemove] = useState([]);
  
  const id = window.location.pathname.split("/")[2];
  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/blogs/blog/${id}/add_tags`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const newData = organizeData(response.data);
        setData(newData);
      } catch (err) {
        console.log(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function organizeData(data) {
    const newData = { inBlog: [], notInBlog: [] };
    data.forEach(tag => {
      if (tag.Blogs.length > 0) {
        newData.inBlog.push(tag);
      } else {
        newData.notInBlog.push(tag);
      }
    });
    return newData;
  }

  function handleCheckboxChange(tagId) {
    setSelectedTags(prevSelectedTags => {
      if (prevSelectedTags.includes(tagId)) {
        // Tag was already selected, remove it
        return prevSelectedTags.filter(id => id !== tagId);
      } else {
        // Tag was not selected, add it
        return [...prevSelectedTags, tagId];
      }
    });
  }
  function handleCheckboxChangeToRemove(tagId) {
    setSelectedToRemove(prevSelectedTags => {
      if (prevSelectedTags.includes(tagId)) {
        // Tag was already selected, remove it
        return prevSelectedTags.filter(id => id !== tagId);
      } else {
        // Tag was not selected, add it
        return [...prevSelectedTags, tagId];
      }
    });
  }

  async function handleSubmit() {
    // Logic to handle submitting selected tags
    try {
      // Make API call to add/remove selected tags
      await axios.post(`/blogs/blog/${id}/add_tags`, {
        add: selectedTags,
        remove: data.inBlog.map(tag => tag.id)
      }, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Refresh data after changes
      const response = await axios.get(`/blogs/blog/${id}/add_tags`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const newData = organizeData(response.data);
      setData(newData);
    } catch (err) {
      console.log(err);
    }
  }

  if (loading) {
    return <>Loading...</>;
  }

  if (error) {
    return <>Error...</>;
  }

  return (
    <>
      <Navbar />
      <div className="flex gap-4 justify-center py-4">
        <div className="rounded-xl py-4 px-6  bg-green-400">
          <h5 className="text-white">Tags to add</h5>
          <div className="grid grid-cols-2 px-4 py-2 gap-4">
            {data && data.notInBlog.map(tag => (
              <div key={tag.id} className="bg-slate-700 py-2 px-4 rounded-xl flex gap-4 items-center">
                <input
                  className="checkbox checkbox-success"
                  type="checkbox"
                  id={`add-${tag.id}`}
                  checked={selectedTags.includes(tag.id)}
                  onChange={() => handleCheckboxChange(tag.id)}
                />
                <label htmlFor={`add-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl py-4 px-6  bg-red-400">
          <h5 className="text-white">Tags to remove</h5>
          <div className="grid grid-cols-2 px-4 py-2 gap-4">
            {data && data.inBlog.map(tag => (
              <div key={tag.id} className="bg-slate-700 py-2 px-4 rounded-xl flex gap-4 items-center">
                <input className="checkbox checkbox-error"
                  type="checkbox"
                  id={`remove-${tag.id}`}
                  checked={selectedToRemove.includes(tag.id)}
                  onChange={() => handleCheckboxChangeToRemove(tag.id)}
                />
                <label htmlFor={`remove-${tag.id}`}>{tag.name}</label>
              </div>
            ))}
          </div>
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Footer />
    </>
  );
}

