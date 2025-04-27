
"use client";
import React, { useState } from "react";
// import { GoogleButton } from "./GoogleButton";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

export const SignInForm = () => {
  const notify = () => {
    toast("Hello Geeks");
  };
 
  const navigate = useNavigate()

  const [selectedRole, setSelectedRole] = useState("student");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    agreeToTerms: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    formData.role = selectedRole;

    try {
      // const response = await axios.post("http://localhost:5000/api/auth/login", formData);
      const response = await fetch(`https://mindspark-backend.onrender.com/api/auth/login`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify(formData)
      })
      const data = await response.json();
      console.log(data)
      console.log(data.user._id)
      if (response.status === 200) {
        // alert('Signin successful');
        toast.success('Signin successful!');
                // alert('Signin successful');
// 
   
      

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user._id)
        localStorage.setItem("avatar", data.user.avatar)
        localStorage.setItem("bio", data.user.bio)

        localStorage.setItem("role", selectedRole)

        if (selectedRole === "student") {
          navigate('/StudentDashboard');

        } else {
          navigate('/InstructorDashboard');
        }
        // if (selectedRole === "student") {
        //   navigate('/ProfileSettings', { state: { "role": "student" } });

        // } else {
        //   navigate('/ProfileSettings', { state: { "role": "educator" } });
        // }


      } else if (response.status === 400) {
        alert('invalid credentials');
      }
    } catch (error) {
      alert('An error occurred');
    }

    // const response = fetch("http://localhost:5000/api/auth/login", {
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   method: "POST",
    //   body: JSON.stringify(formData)
    // })
    // const data = response.data;
    // response.then((res) => console.log(res)).catch((err) => alert(err))
    // axios.post("https://localhost/5000/api/auth/register",{formData}).then("submiiiiited").catch("notsubmitted")
  };

  const handleGoogleSignIn = () => {
    // Handle Google sign in
    console.log("Google sign in clicked");
  };

  return (<>
  <div></div><div className="flex gap-2 mb-3">
    <button
      onClick={() => setSelectedRole("student")}
      className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${selectedRole === "student"
        ? "bg-zinc-300"
        : "bg-white border border-zinc-200"
        }`}
    >
      Student
    </button>
    <button
      onClick={() => setSelectedRole("educator")}
      className={`flex-1 text-base rounded-lg h-[46px] text-zinc-600 ${selectedRole === "educator"
        ? "bg-zinc-300"
        : "bg-white border border-zinc-200"
        }`}
    >
      Educator
    </button>
  </div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {/* <input
        type="text"
        placeholder="First & Last Name"
        value={formData.name}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, name: e.target.value }))
        }
        className="px-4 w-full text-base rounded-lg border border-zinc-200 h-[55px] text-zinc-600"
      /> */}
      <input
        type="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, email: e.target.value }))
        }
        className="px-4 w-full text-base rounded-lg border border-zinc-200 h-[62px] text-zinc-600"
      />
      <input
        type="password"
        placeholder="Create Password"
        value={formData.password}
        onChange={(e) =>
          setFormData((prev) => ({ ...prev, password: e.target.value }))
        }
        className="px-2 w-full text-base rounded-lg border border-zinc-200 h-[61px] text-zinc-600"
      />

      <label className="flex gap-3 items-start mt-3 cursor-pointer">
        <input
          type="checkbox"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              agreeToTerms: e.target.checked,
            }))
          }
          className="mt-0.5 rounded-md border border-slate-400 h-[17px] w-[17px]"
        />
        <span className="text-sm leading-6">
          I agree with the{" "}
          <a href="#terms" className="text-blue-600">
            Terms & Conditions
          </a>{" "}
          of MicroLearn
        </span>
      </label>

      <button
        type="submit"
        className="mt-3 text-base font-bold text-white rounded-lg bg-slate-900 h-[50px]"
      >
        Sign In
      </button>

      {/* <GoogleButton onClick={handleGoogleSignIn} /> */}

      <p className="mt-2 text-sm text-center">
        <span className="text-zinc-500">Don't have an account? </span>
        <a href="/Signup" className="font-bold text-blue-600">
          Sign up
        </a>
      </p>
    </form>
  </>
  );
}