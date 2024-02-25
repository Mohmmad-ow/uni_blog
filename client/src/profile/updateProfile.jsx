import { useState,useEffect } from "react"
import axios from "axios"
import Cookies from "js-cookie"
import { useNavigate } from 'react-router-dom';


// import { useFetchUser } from "../context/authContext"
import storageRef from "../../firebase/firebaseStorage.js";
import { uploadBytes, ref, deleteObject } from "firebase/storage";

import Navbar from "../components/navbar.jsx";
import Footer from "../components/footer.jsx";
import OptionSelectBox from "./optionSelectBox.jsx";

export default function UpdateProfile() {
    // util
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true)
    // const [error, setError] = useState(false);
    
    // select options from api
    const [selectData, setSelectData] = useState(null)

    // user prev options from api
    const [userData, setUserData] = useState(null)

    // new img
    const [img, setImg] = useState(null)

    // new data
    const [data, setData] =  useState(null)



    const accessToken = Cookies.get("access_token")





    useEffect(() => {
        const fetchData = async () => {
            try {
                // old profile options req
                const response = await axios.get(`/profiles/profile/v2/myprofile`, {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }});
                
                // profile options from api req 
                const response2 = await axios.get('/utility/profile', {headers: {
                    "Authorization": `Bearer ${accessToken}`
                }})
                // set options
                setSelectData(response2.data)

                const data = await response.data;
                console.log(data)
                console.log(data)
                setData({full_name: data.profile.full_name});
                setUserData(data.profile);
            } catch (error) {
                // setError(true);
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
            userData.profile.profile_pic ? await deleteImg() : null;
            // await deleteImg()
            await uploadBytes(imgRef, img).then((snapshot) => {
                console.log('Uploaded a blob or file!');
                handleAxiosPost(snapshot)
              });
    
        } else {
             handleAxiosPost()
        }
        return navigate('/profile/' + userData.id)
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
                       
                        {/* select Degree */}
                        <OptionSelectBox handleSelectOption={(e) => {setData({...data, degreeId: e.target.value})}}
                        name={"degree"} options={selectData.degrees} selectedOption={userData.Degree ? userData.Degree : null} loading={loading} />
                        {/* select Major */}
                        <OptionSelectBox handleSelectOption={(e) => {setData({...data, majorId: e.target.value})}}
                        name={"major"} options={selectData.majors} selectedOption={ userData.Major ? userData.Major : null} loading={loading} />
                        {/* select Year */}
                        <OptionSelectBox handleSelectOption={(e) => {setData({...data, yearId: e.target.value})}}
                        name={"year"} options={selectData.years} selectedOption={userData.Year ? userData.Year : null} loading={loading} />
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