import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';


// import { useFetchUser } from "../context/authContext"
import storageRef from "../../firebase/firebaseStorage.js";
import { uploadBytes, ref, deleteObject } from "firebase/storage";
import formatRelativeDate  from "../../Config/dateConfig.js";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";

export default function UpdateProfile() {
    const navigate = useNavigate()
    const [data, setData] =  useState(null)
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const [img, setImg] = useState(null)
    const [selectData, setSelectData] = useState(null)
    const [userData, setUserData] = useState(null)
    const accessToken = Cookies.get("access_token")





    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`/profiles/profile/myprofile`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                const response2 = await axios.get('/utility/profile', {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }})
                const result = await response2.data;
                setSelectData(result)
                const data = await response.data;
                console.log(data)
                setData(prevData =>( {...prevData, full_name: data.profile.full_name}));
                data.createdAt = formatRelativeDate(data.createdAt);
                data.updatedAt = formatRelativeDate(data.updatedAt);
                setUserData(data);
            } catch (error) {
                setError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [])

    function handleAxiosPost(snapshot) {
        if (snapshot) {
            axios.put('/profiles/profile/update', {
                full_name: data.full_name,
                profile_pic: snapshot.metadata.fullPath,
                DegreeId: data.degreeId,
                MajorId: data.majorId, 
                YearId: data.yearId
              },{headers: {
                "Authorization": `Bearer ${accessToken}`
            }});
        } else {
            axios.put('/profiles/profile/update', {
                full_name: data.full_name,
                DegreeId: data.degreeId,
                MajorId: data.majorId, 
                YearId: data.yearId
              },{headers: {
                "Authorization": `Bearer ${accessToken}`
            }});
        }
    }

    const deleteImg = async () => { 
        const imgRef = ref(storageRef, userData.profile.profile_pic)
        
        deleteObject(imgRef).then(() => {
        // File deleted successfully
        }).catch((error) => {
            // Uh-oh, an error occurred!
            console.log(error);

        });
    }


    async function handleUpdateProfile() {
        if (img) {
            const imgPath = `profile_pics/${img.name.split(" ").join("_")}`
            const imgRef = ref(storageRef, imgPath);
            await deleteImg()
            await uploadBytes(imgRef, img).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                handleAxiosPost(snapshot)
              });
    
        } else {
             handleAxiosPost()
        }
        return navigate('/profile')
    }

    function handleNameChange(e) {
        console.log(e.target.value)
      setData({...data, full_name: e.target.value});  
    }



    if (selectData == null) {
        return (
            <div>
                <Navbar />
                <div className="lg:w-[80%] md:w-[90%] w-full rounded-lg py-4 px-4 bg-gradient-to-tr from-yellow-400 to-orange-700 mx-auto my-24">
                    <h1 className="text-center text-white text-2xl">Profile</h1>
                    <div className="w-full flex justify-center py-12">
                        <p className="text-white text-xl">Loading...</p>
                    </div>
                </div>
                <Footer />
            </div>
        )
    }

    return (
        <div>
        <Navbar />
        <div className="lg:w-[80%] md:w-[90%] w-full rounded-lg py-4 px-4 bg-gradient-to-tr from-yellow-400 to-orange-700 mx-auto my-24">
                <h1 className="text-center text-white text-2xl">Profile</h1>

                <div className="w-full flex justify-center py-12">
                    <input value={data.full_name || ""} onChange={handleNameChange} className="w-[80%] input input-bordered input-secondary" placeholder="Enter your full name" type="text"  id="full_name" />
                </div>
                <div className="flex flex-row">
                    <div className="w-[50%] border-r-2 pr-6 border-gray-900">
                       

                    <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="degree">Degree</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="degree" defaultValue={"default"} className="select select-primary w-full max-w-xs">
                                    <option disabled value={"default"}>What is the Degree?</option>
                                    {loading == false ? selectData.degrees.map((degree) => (
                                        <option onClick={() => setData({...data, degreeId: degree.id})} key={degree.id} value={degree.id}>{degree.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                        <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="major">Major</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="major" defaultValue={"default"} className="select select-primary w-full max-w-xs">
                                    <option disabled value={"default"}>What is the major?</option>
                                    {loading == false ? selectData.majors.map((major) => (
                                        <option onClick={() => {setData({...data, majorId: major.id})}} key={major.id} value={major.id}>{major.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                        <div className="flex flex-row gap-6 py-6 items-center justify-center">
                            <label className="text-slate-200" htmlFor="year">Year</label>
                            {error ? <p>Error: {error.message}</p> : 
                                    <select id="year" defaultValue={"default"} className="select select-primary w-full max-w-xs">
                                    <option disabled value={"default"}>What is the Year?</option>
                                    {loading == false ? selectData.years.map((year) => (
                                        <option onClick={() => {setData({...data, yearId: year.id})}} key={year.id} value={year.id}>{year.name}</option>
                                    )) : <option className="loading loading-spinner loading-md" ></option> }
                                    </select>
                            }
                        </div>
                    </div>
                    <div>
                        <div className='px-8 py-6 flex items-center gap-8'>
                            <label htmlFor="image" className="text-slate-200">Profile Pic</label>
                            <input type="file" id="image" onChange={(e) => {setImg(e.target.files[0])}} className="file-input file-input-bordered file-input-success w-full max-w-xs" />
                        </div>
                    </div>
                </div>
                

               

                <button onClick={handleUpdateProfile} className="btn w-full btn-lg rounded-none mt-44" type="submit">Update Profile</button>
            </div>
        <Footer />
        </div>
    )



}