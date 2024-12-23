import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const LogIn = () => {
  const { loginUser, signinWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onLoginSubmit = (data) => {
    console.log(data);
    const { email, password } = data;
    loginUser(email, password)
      .then((result) => {
        console.log(result.user);
        navigate("/");
      })
      .catch((error) => console.log(error.message));
  };

  const handleGoogleLogin = () => {
    signinWithGoogle()
      .then((result) => {
        console.log(result);
        navigate("/");

        // const Toast = Swal.mixin({
        //   toast: true,
        //   position: "top",
        //   showConfirmButton: false,
        //   timer: 3000,
        //   timerProgressBar: true,
        //   didOpen: (toast) => {
        //     toast.onmouseenter = Swal.stopTimer;
        //     toast.onmouseleave = Swal.resumeTimer;
        //   },
        // });
        // Toast.fire({
        //   icon: "success",
        //   title: "Signed In Successfully",
        // });
      })
      .catch((error) => {
        console.log("ERROR", error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center">
          Sign In
        </h2>

        <form onSubmit={handleSubmit(onLoginSubmit)}>
          {/* Email Input */}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              required
              {...register("email", {
                minLength: {
                  value: 2,
                  message: "Movie Title should be at least 2 characters.",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              required
              {...register("password", {
                minLength: {
                  value: 2,
                  message: "Movie Title should be at least 2 characters.",
                },
              })}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* {wrongPass && <p className="text-red-600">{wrongPass}</p>} */}
          </div>

          {/* Submit Button */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-700">
              Forgot Password?
            </a>
          </div>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <Link to={"/signUp"} className="text-blue-500 hover:text-blue-700">
            Sign Up
          </Link>
        </p>

        {/* Social Login */}
        <div className="mt-4">
          <button
            onClick={handleGoogleLogin}
            className="w-full py-2 px-4 bg-[#456289] text-white font-semibold rounded-lg hover:bg-[#80A4C0] focus:outline-none focus:ring-2 focus:ring-[#80A4C0]"
          >
            Log in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
