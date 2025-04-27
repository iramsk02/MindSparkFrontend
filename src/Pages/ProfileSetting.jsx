import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function ProfileSetup() {
    const navigate = useNavigate();
    // const {role}=useParams
    const userId = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const avatar = localStorage.getItem("avatar");
    const role= localStorage.getItem("role");
    console.log(userId,token,role)

    const [formData, setFormData] = useState({
        bio: "",
        avatar: "",
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "avatar" && files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prev) => ({
                    ...prev,
                    avatar: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)

        try {
            const res = await fetch("https://mindspark-backend.onrender.com/api/users/createProfile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify({ ...formData, userId }),
            });

            const data = await res.json();
            console.log(data);
            localStorage.setItem("avatar",data.profile.avatar)
            localStorage.setItem("bio",data.profile.bio)

            toast.success("Profile saved!");
            
          if (role =="student") {
            navigate("/StudentDashboard") 
  
          }else if(role=="educator"){
            navigate('/InstructorDashboard');
          }

        } catch (error) {
            console.error("Error setting up profile:", error);
            toast.error("Something went wrong.");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-xl shadow-md max-w-md w-full space-y-6"
            >
                <h2 className="text-2xl font-bold text-primary text-center">Setup Profile</h2>

                <div className="flex flex-col items-center space-y-3">
                    <img
                        src={formData.avatar || "https://images.pexels.com/photos/1485894/pexels-photo-1485894.jpeg?auto=compress&cs=tinysrgb&w=1200"}
                        alt="Avatar Preview"
                        className="w-24 h-24 rounded-full object-cover border-2 border-indigo-500"
                    />
                    <p className="text-sm text-gray-600">Avatar Preview</p>
                </div>

                <div>
                    <label className="block mb-1 font-medium text-gray-700">Bio</label>
                    <input
                        type="text"
                        name="bio"
                        value={formData.bio}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-100"
                        placeholder="Tell us something about yourself"
                    />

                    <label className="block mt-4 mb-1 font-medium text-gray-700">Profile Image</label>
                    <input
                        type="file"
                        name="avatar"
                        accept="image/*"
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md bg-gray-100"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary text-white py-2 rounded-md hover:bg-indigo-700 transition"
                >
                    Save Profile
                </button>
            </form>
        </div>
    );
}
