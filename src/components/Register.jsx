import { useState } from "react";
import { FcGoogle } from "react-icons/fc";

const Register = ({ setShowRegister }) => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div
      onClick={() => setShowRegister(false)}
      className="fixed top-0 bottom-0 left-0 right-0 z-99 flex items-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-3 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div className="w-full">
            <p>Name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder="type here"
              className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
              type="text"
              required
            />
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>

        <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 mt-1 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>

        {state === "register" ? (
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
              onClick={() => setState("register")}
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
