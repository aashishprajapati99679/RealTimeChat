import React, { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { setAuthUser } from '../redux/userSlice';
import { BiArrowBack } from 'react-icons/bi';
import { MdEdit } from 'react-icons/md';
import { FaCamera } from 'react-icons/fa';

const EdithData = () => {
    const { authUser } = useSelector((store) => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [about, setAbout] = useState(authUser?.about || 'In search of happiness............');
    const [name, setName] = useState(authUser?.fullName || '');
    const [profilePhoto, setProfilePhoto] = useState(authUser?.profilePhoto || '');

    const [editAbout, setEditAbout] = useState(false);
    const [editName, setEditName] = useState(false);

    const handleSave = async (updatedFields = {}, file = null) => {
        try {
            axios.defaults.withCredentials = true;
            
            let payload;
            let headers = { "Content-Type": "application/json" };
            
            if (file) {
                payload = new FormData();
                payload.append('fullName', name);
                payload.append('about', about);
                payload.append('profilePhoto', file); // Multer expects 'profilePhoto'
                headers = { "Content-Type": "multipart/form-data" };
            } else {
                payload = {
                    fullName: name,
                    about: about,
                    profilePhoto: profilePhoto,
                    ...updatedFields
                };
            }

            const res = await axios.put(`http://localhost:8080/api/v1/user/update`, payload, { headers });
            if (res.data.success) {
                toast.success(res.data.message);
                const updatedUser = res.data.user;
                if (file) {
                    setProfilePhoto(updatedUser.profilePhoto);
                }
                dispatch(setAuthUser(updatedUser));
                localStorage.setItem("authUser", JSON.stringify(updatedUser));
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    const handlePhotoEdit = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            handleSave({}, file);
        }
    }

    const logoutHandler = async () => {
        try {
            axios.defaults.withCredentials = true;

            const res = await axios.get(
                "http://localhost:8080/api/v1/user/logout"
            );

            toast.success(res.data.message);
            localStorage.removeItem("authUser");
            navigate("/login");
            dispatch(setAuthUser(null));
        } catch (error) {
            toast.error(error.message);
            console.log(error);
        }
    }


    return (
        <div className="w-[90%] md:w-[400px] h-[90%] bg-white text-black flex flex-col rounded-lg shadow-xl overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center gap-6 p-4">
                <button onClick={() => navigate(-1)} className="hover:bg-gray-100 p-2 rounded-full transition">
                    <BiArrowBack size={24} />
                </button>
                <h1 className="text-xl font-semibold">Edit profile</h1>
            </div>

            <div className="flex-1 overflow-y-auto">
                {/* Profile Photo */}
                <div className="flex justify-center mt-6">
                    <div className="relative">
                        <img 
                            src={profilePhoto || "https://avatar.iran.liara.run/public/boy?username=default"} 
                            alt="profile" 
                            className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-white"
                        />
                        <button 
                            onClick={handlePhotoEdit}
                            className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/4 bg-white text-green-600 px-4 py-2 rounded-full shadow-md flex items-center gap-2 border hover:bg-gray-50 transition"
                        >
                            <FaCamera /> <span className="font-semibold text-sm">Edit</span>
                        </button>
                        <input 
                            type="file" 
                            accept="image/*" 
                            className="hidden" 
                            ref={fileInputRef} 
                            onChange={handleFileChange} 
                        />
                    </div>
                </div>

                <div className="mt-16 px-6 flex flex-col gap-8 pb-10">

                    {/* Name */}
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-2">Name</p>
                        <div className="flex justify-between items-center border-b pb-2">
                            {editName ? (
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="w-full bg-transparent outline-none text-lg"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    onBlur={() => { setEditName(false); handleSave(); }}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { setEditName(false); handleSave(); } }}
                                />
                            ) : (
                                <p className="text-lg">{name}</p>
                            )}
                            {!editName && <button className="p-2 hover:bg-gray-100 rounded-full transition" onClick={() => setEditName(true)}><MdEdit className="text-gray-500" size={20} /></button>}
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <p className="text-gray-500 text-sm font-semibold mb-2">About</p>
                        <div className="flex justify-between items-center border-b pb-2">
                            {editAbout ? (
                                <input 
                                    autoFocus
                                    type="text" 
                                    className="w-full bg-transparent outline-none italic font-semibold"
                                    value={about}
                                    onChange={(e) => setAbout(e.target.value)}
                                    onBlur={() => { setEditAbout(false); handleSave(); }}
                                    onKeyDown={(e) => { if (e.key === 'Enter') { setEditAbout(false); handleSave(); } }}
                                />
                            ) : (
                                <p className="italic font-semibold">{about}</p>
                            )}
                            {!editAbout && <button className="p-2 hover:bg-gray-100 rounded-full transition" onClick={() => setEditAbout(true)}><MdEdit className="text-gray-500" size={20} /></button>}
                        </div>
                        <p className="text-gray-400 text-xs mt-1">Until I change it</p>
                    </div>

                    {/* Logout */}
                    <div className="mt-8 flex justify-center">
                        <button 
                            onClick={logoutHandler}
                            className="btn bg-sky-600 text-white hover:bg-sky-500 w-full"
                        >
                            Logout
                        </button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default EdithData;        