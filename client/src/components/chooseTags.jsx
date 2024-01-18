import { useState, useEffect } from "react";
import Cookies from "js-cookie";
export default function ChooseTags() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const accessToken = Cookies.get("access_token");

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('/tags/all', {headers: {
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
    
    if (error) {
        return <>Error</>
    }
    if (loading) {
        return <>Loading...</>
    }
    return (
        <div className="bg-inherit">
            <button
                className="btn bg-transparent"
                onClick={() => document.getElementById("my_modal_2").showModal()}
            >
                Choose Tags
            </button>
            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <h3>Choose Tags</h3>
                    <div>
                    {data.map((tag) => {
                        return (<div>
                            <label htmlFor={tag.id}>{tag.name}</label> <input id={tag.id} type="checkbox" value={tag.id} className="checkbox checkbox-info" /> 
                        </div>)
                    })}
                    <input type="checkbox"  checked="checked" className="checkbox checkbox-info" />
                    </div>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
}
