import { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import AuthContext from "../auth/AuthContext";
import { useForm } from "react-hook-form";
import { LuEye } from "react-icons/lu";
import { LuEyeOff } from "react-icons/lu";
import axios from "axios";
import toast from "react-hot-toast";

const Register = ({ setShowRegisterForm }) => {
  const { loginUser, setUser, createUser, updateUserProfile, setLoading } =
    useContext(AuthContext);
  const [state, setState] = useState("login");
  const [showPassword, setShowPassword] = useState(true);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = (email, password) => {
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        toast.success("Login Successful");
      })
      .catch((error) => {
        console.log(error.message);
        setLoading(false);
      });
  };
  const onSignupSubmit = (name, email, password) => {
    createUser(email, password)
      .then((result) => {
        console.log(result.user);
        const updateUser = result.user;
        setUser(updateUser);
        updateUserProfile({ displayName: name });
        toast.success("Signup Successful!");

        axios
          .post(`http://localhost:3000/new-user`, {
            email: updateUser?.email,
            phoneNumber: "",
            address: "",
            cartItems: [],
            orders: [],
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.error("Backend error:", err));
      })
      .catch((error) => {
        setLoading(false);
        console.log(error.message);
        toast.error("Signup Failed!");
      });
  };

  // Dynamic form submit handler
  const userRegister = (data) => {
    const { name, email, password } = data;
    if (state === "login") {
      onLoginSubmit(email, password);
    } else {
      onSignupSubmit(name, email, password);
    }
  };

  return (
    <div
      onClick={() => setShowRegisterForm(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-99 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={handleSubmit(userRegister)}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 m-auto items-start p-8 py-10 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <h2 className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Signup"}
        </h2>

        {/* name */}
        {state === "signup" && (
          <div className="w-full">
            <p>Name</p>
            <input
              placeholder="enter your name"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              {...register("name", {
                minLength: {
                  value: 3,
                  message: "name should be at least 3 char.",
                },
              })}
              type="text"
              required
            />
            {errors.name && (
              <p className="text-red-600">{errors.name.message}</p>
            )}
          </div>
        )}

        {/* email */}
        <div className="w-full">
          <p>Email</p>
          <input
            placeholder="enter your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            {...register("email", {
              minLength: {
                value: 9,
                message: "enter a valid email.",
              },
            })}
            type="email"
            required
          />
          {errors.email && (
            <p className="text-red-400 text-xs mt-2">{errors.email.message}</p>
          )}
        </div>

        {/* password */}
        <div className="w-full">
          <p>Password</p>
          <div className="relative">
            <input
              placeholder="enter your password"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              {...register("password", {
                minLength: {
                  value: 2,
                  message: "valid pass.",
                },
              })}
              type={showPassword ? "text" : "password"}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="p-2 absolute top-2 right-1 text-gray-400 cursor-pointer"
            >
              {showPassword ? <LuEyeOff /> : <LuEye />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-400 text-xs mt-2">
              {errors.password.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 mt-1 rounded-md cursor-pointer"
        >
          {state === "signup" ? "Create Account" : "Login"}
        </button>

        {state === "signup" ? (
          <p className="mx-auto">
            Already have an account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              Login
            </span>
          </p>
        ) : (
          <p className="mx-auto">
            Don&apos;t have an account?{" "}
            <span
              onClick={() => setState("signup")}
              className="text-primary cursor-pointer"
            >
              Signup
            </span>
          </p>
        )}

        <div className="flex items-center gap-4 w-full mt-3">
          <div className="w-full h-px bg-gray-300/90"></div>
          <p className="w-full text-nowrap text-sm text-gray-500/90">
            or sign in with email
          </p>
          <div className="w-full h-px bg-gray-300/90"></div>
        </div>

        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center bg-white border border-gray-500/30 py-2.5 rounded-md text-gray-800"
        >
          <FcGoogle className="text-lg" />
          Google
        </button>
      </form>
    </div>
  );
};

export default Register;
