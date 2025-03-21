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
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
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
        <h1 className="font-bold text-lg md:text-xl mb-5 text-center">Login</h1>

        {/* Email Field */}
        <div className="my-2">
          <Label>Email</Label>
          <Input
            type="email"
            value={input.email}
            name="email"
            onChange={changeEventHandler}
            placeholder="Enter your email"
            className="w-full"
          />
        </div>

        {/* Password Field */}
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
            <Label htmlFor="r1">Student</Label>
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
            <Label htmlFor="r2">Recruiter</Label>
          </div>
        </div>

        {/* Submit Button */}
        {loading ? (
          <Button className="w-full my-4">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
          </Button>
        ) : (
          <Button type="submit" className="w-full my-4">
            Login
          </Button>
        )}

        {/* Signup Link */}
        <p className="text-sm text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600">
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
