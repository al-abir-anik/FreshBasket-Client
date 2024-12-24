import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../contexts/AuthContext/AuthContext";

const Google = () => {
  const navigate = useNavigate();
  const { signinWithGoogle } = useContext(AuthContext);

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
    <div className="mt-4">
      <div className="divider">OR</div>
      <button
        onClick={handleGoogleLogin}
        className="w-full py-2 px-4 bg-[#456289] text-white font-semibold rounded-lg hover:bg-[#80A4C0] focus:outline-none focus:ring-2 focus:ring-[#80A4C0]"
      >
        Log in with Google
      </button>
    </div>
  );
};

export default Google;
