import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewMajorsSettings() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(-1);
  const [update, setUpdate] = useState(false);
  const [isDeleting, setIsDeleting] = useState(-1);

  const accessToken = Cookies.get("access_token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/majors/all', {
          headers: {
            "Authorization": `Bearer ${accessToken}`
          }
        });
        const result = await response.data;
        setData(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setUpdate(false);
        setIsEditing(-1);
      }
    };
    fetchData();
  }, [update]);

  const handleUpdateMajor = async (majorId, major) => {
    await axios.put("/majors/major/update/" + majorId, {
      tag: major.name
    }, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    setUpdate(true);
  };

  function handleInputChange(e) {
    const newData = data.map((major) => {
      if (e.target.id == major.id) {
        major.name = e.target.value;
        return major;
      } else {
        return major;
      }
    });
    setData(newData);
  }

  const handleDeleteMajor = async (majorId) => {
    await axios.delete("/majors/major/delete/" + majorId, {
      headers: {
        "Authorization": `Bearer ${accessToken}`
      }
    });
    setUpdate(true);
    setIsDeleting(-1); // Reset the deleting state after deletion
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex gap-4 mt-16 px-8 flex-col justify-center items-center">
      {data.map((major) => {

        if (isDeleting === major.id) {
          return (
            <div key={major.id} className="flex justify-center items-center gap-4">
              <p>Are you sure you want to delete this major?</p>
              <button className="btn btn-warning" onClick={() => handleDeleteMajor(major.id)}>Yes</button>
              <button className="btn btn-accent" onClick={() => setIsDeleting(-1)}>No</button>
            </div>
          );
        } else {
          
          return (
            <div className={`flex justify-between items-center ${isEditing === major.id ? "gap-0" : "gap-12"} bg-green-400 rounded-xl text-white py-2 px-4 w-full`} key={major.id}>

              {isEditing === major.id ? (
                <input className="w-32" type="text" value={major.name} onChange={handleInputChange} name={major.name} id={major.id} />
              ) : (
                <p>{major.name}</p>
              )}
              <div className="flex justify-center gap-2 items-center">
                {isEditing === major.id ? (
                  <button onClick={() => { handleUpdateMajor(major.id, major) }} className="btn btn-accent">Update</button>
                ) : (
                  <button onClick={() => { setIsEditing(major.id) }} className="btn btn-accent">Edit</button>
                )}
                {isEditing !== major.id ? (
                  <button onClick={() => { setIsDeleting(major.id) }} className="btn btn-warning">Delete</button>
                ) : (
                  <button onClick={() => { setIsEditing(-1) }} className="btn btn-warning">Cancel</button>
                )}
              </div>

            </div>
          )
        }
      })}
    </div>
  );
}
