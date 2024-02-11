/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

export default function ViewDegreeSettings() {

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
            const response = await axios.get('/degrees/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
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

    const handleUpdateDegree = async (degreeId, degree) => {
      await axios.put("/degrees/degree/update/"+degreeId, {
          degree: degree.name
      }, {
          headers: {
              "Authorization": `Bearer ${accessToken}`
          }
      })
      setUpdate(true);
      return;
  }

  function handleInputChange(e) {
    const newData = data.map((degree) => {
        if (e.target.id == degree.id) {
            degree.name = e.target.value;
            return degree
        } else {
            return degree;
        }
    })
    setData(newData);
 }
 async function handleDeleteDegree(degreeId) {
  await axios.delete("/degrees/degree/delete/" + degreeId, {
    headers: {
      "Authorization": `Bearer ${accessToken}`
    }
  });
  setUpdate(true);
  setIsDeleting(-1); // Reset the deleting state after deletion
}

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
              <div className="flex gap-4 mt-12 px-8 flex-col justify-center items-center">

                {data.map((degree) => {
                  if (isDeleting === degree.id) {
                    return (
                    <div key={degree.id} className="flex justify-center items-center gap-4">
                        <p>Are you sure you want to delete this major?</p>
                        <button className="btn btn-warning" onClick={() => handleDeleteDegree(degree.id)}>Yes</button>
                        <button className="btn btn-accent" onClick={() => setIsDeleting(-1)}>No</button>
                    </div>
                    );
                } else {
                  return (
                      <div className={`flex justify-between items-center ${isEditing === degree.id ? "gap-0" : "gap-12"} bg-green-400 rounded-xl text-white py-2 px-4 w-full`} key={degree.id}>
                          {isEditing === degree.id ?
                            <input className="w-32" type="text" value={degree.name} onChange={handleInputChange} name={degree.name} id={degree.id} />  
                           :
                            <p>{degree.name}</p>}
                          <div className="flex justify-center gap-2 items-center">
                              {isEditing === degree.id ? 
                                  <button onClick={()=> {handleUpdateDegree(degree.id, degree)}} className="btn btn-accent">Update</button>
                              :
                                  <button onClick={() => {setIsEditing(degree.id)}} className="btn btn-accent">Edit</button> 
                              }
                              { isEditing !== degree.id ?
                                  <button onClick={() => {setIsDeleting(degree.id)}} className="btn btn-warning">Delete</button>
                              :
                                  <button onClick={() => {setIsEditing(-1)}} className="btn btn-warning">Cancel</button>
                              }
                          </div>
                      </div>
                  )
                }
            })}
            
              </div>
    )
}

