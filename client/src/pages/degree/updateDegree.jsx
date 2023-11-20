import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateDegree() {

    const id = window.location.pathname.split("/")[2];
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [degree, setDegree] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/degrees/degree/"+id, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setDegree(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setDegree({...degree,name: e.target.value  })
       console.log(degree)
    }
    const handleUpdateDegree = () => {
        axios.put("/degrees/degree/update/"+id, {
            degree: degree.name
        }, {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }
        })
    }


    if (loading) {
      return <div>Loading...</div>;
    
  } 
  if (error) { 
      return <div>Error</div>;
  }


    return (
        <div>
        <Navbar />
            <div>
                <div>
                    <label htmlFor="degree">Degree</label>
                    <input value={degree.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="degree" onChange={handleNameUpdate} />
                </div>
                <button className="btn btn-accent" onClick={handleUpdateDegree} type="submit">Update</button>
            </div>
        <Footer />
        </div>
    )


}