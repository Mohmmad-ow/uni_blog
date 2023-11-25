import axios from "axios"
import Cookies from "js-cookie"

export default function DeleteMajor() {
    const token = Cookies.get('access_token')
    const handleDeleteMajor = async () => {
        const id = window.location.pathname.split('/')[2]
        const response = await axios.delete('/majors/major/delete/' + id, {headers: {
            "Authorization": `Bearer ${token}`
    }})
    const path = response.data.blog
    console.log(path)
    }

    
    return (
        <input type="button" className="btn btn-primary" onClick={handleDeleteMajor} value="Delete Major" />
    )


}