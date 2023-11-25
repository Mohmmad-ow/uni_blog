import axios from "axios"
import Cookies from "js-cookie"

export default function DeleteYear() {
    const token = Cookies.get('access_token')
    const handleDeleteYear = async () => {
        const id = window.location.pathname.split('/')[2]
        const response = await axios.delete('/years/year/delete/' + id, {headers: {
            "Authorization": `Bearer ${token}`
    }})
    const path = response.data.blog
    console.log(path)
    }

    



    return (
        <input type="button" className="btn btn-primary" onClick={handleDeleteYear} value="Delete Year" />
    )


}