import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(); //formdata object
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);
  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <form
        onSubmit={submitHandler}
        className="w-full md:w-1/2 border border-gray-200 rounded-md p-6 md:p-8 my-10 bg-white shadow-md"
      >
        <h1 className="font-bold text-lg md:text-xl mb-5 text-center">
          Sign Up
        </h1>

        {/* Full Name */}
        <div className="my-2">
          <Label>Full Name</Label>
          <Input
            type="text"
            value={input.fullname}
            name="fullname"
            onChange={changeEventHandler}
            placeholder="Enter Your Name"
            className="w-full"
          />
        </div>

        {/* Email */}
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter E-mail"
            className="w-full"
          />
        </div>

        {/* Phone Number */}
        <div className="my-2">
          <Label>Phone Number</Label>
          <Input
            type="text"
            value={input.phoneNumber}
            name="phoneNumber"
            onChange={changeEventHandler}
            placeholder="Enter Phone"
            className="w-full"
          />
        </div>

        {/* Password */}
        <div className="my-2">
          <Label>Password</Label>
          <Input
            type="password"
            value={input.password}
            name="password"
            onChange={changeEventHandler}
            placeholder="Enter password"
            className="w-full"
          />
        </div>

        {/* Role Selection */}
        <div className="flex flex-col md:flex-row items-center gap-2 my-5">
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="student"
              checked={input.role === "student"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label>Student</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Input
              type="radio"
              name="role"
              value="recruiter"
              checked={input.role === "recruiter"}
              onChange={changeEventHandler}
              className="cursor-pointer"
            />
            <Label>Recruiter</Label>
          </div>
        </div>

        {/* Profile Upload */}
        <div className="flex flex-col md:flex-row items-center gap-2 my-4">
          <Label className="mb-2 md:mb-0">Profile Picture</Label>
          <Input
            accept="image/*"
            type="file"
            onChange={changeFileHandler}
            className="cursor-pointer w-full md:w-auto"
          />
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Signup
          </Button>
        )}

        {/* Login Link */}
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
