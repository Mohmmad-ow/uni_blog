import { useEffect, useState } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import Navbar from "../../components/navbar"
import Footer from "../../components/footer"

export default function UpdateMajor() {

    const id = window.location.pathname.split("/")[2];
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [major, setMajor] = useState(null);
    const accessToken = Cookies.get("access_token");


    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get("/majors/major/"+id, {
               headers: {
                   "Authorization": `Bearer ${accessToken}`
               }
               
           })
           console.log(response.data)
           setMajor(response.data)
          } catch (error) {
            setError(true)
          } finally {
            setLoading(false)
          }
        }
        fetchData();
    
    }, [])

    function handleNameUpdate(e) {
       setMajor({...major,name: e.target.value  })
       console.log(major.name)
    }
    const handleUpdateMajor = () => {
        axios.put("/majors/major/update/"+id, {
            major: major.name
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
                    <label htmlFor="major">Major</label>
                    <input value={major.name} className="input input-accent input-bordered w-full max-w-xs" type="text" id="major" onChange={handleNameUpdate} />
                </div>
                <button className="btn btn-accent" onClick={handleUpdateMajor} type="submit">Update</button>
            </div>
        <Footer />
        </div>
    )


}