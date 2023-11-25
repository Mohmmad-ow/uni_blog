import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
export default function ViewYears() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/years/all', {headers: {
                "Authorization": `Bearer ${accessToken}`
            }})
            const result = await response.data;
            setData(result);
          } catch (error) {
            setError(error);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
      }
    
      if (error) {
        return <div>Error: {error.message}</div>;
      }

    return (
        <>
         <Navbar />
            <div>
                {data.map((year) => (
                    <div key={year.id} className="card bg-red-400 p-4 w-96  shadow-xl">
                        <h1>{year.name}</h1>
                    </div>
                ))}
            
            </div>
         <Footer />
        </>
    )
}