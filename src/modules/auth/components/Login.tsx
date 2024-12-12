import { AtSign, Eye, EyeOff, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import IllustrasiLogin from "../../../assets/Illustrasi Login.png";
import Logo from "../../core/components/Logo";
import { Link, useNavigate } from "react-router";
import { useInputValidation } from "../../../utils/formValidation";
import { usePostQuery } from "../../../hooks/useApiRequest";
import { ILoginUser } from "../../../types/ILoginUser";
import Alert from "./Alert";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorField, setErrorField] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  const { validateEmail, validatePassword } = useInputValidation();

  const { responseData, loading, post } = usePostQuery<ILoginUser, ILoginUser>(
    "/login",
    {
      "Content-type": "application/json",
    }
  );

  const newErrorField = { ...errorField };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);
    const passwordError = validatePassword(formData.password, "login");

    setErrorField({
      email: emailError,
      password: passwordError,
    });

    if (Object.values(newErrorField).some((error) => error !== "")) {
      return;
    }

    post(formData);
  };

  const handleInputChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrorField((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  useEffect(() => {
    if (responseData?.status === 103) {
      setAlert(true);
    }
  }, [responseData]);

  const handleAlertTriggered = () => {
    setAlert(!alert);
  };
  
  const navigate = useNavigate()
  useEffect(() => {
    if(localStorage.getItem("token")) {
      navigate('/')
    }
  }, [])

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center">
        <div className="w-full max-w-md space-y-12">
          <div className="flex justify-center items-center space-x-2">
            <Logo />
            <h2 className="text-header-1 !font-semibold">SIMS PPOB</h2>
          </div>
          <div className="text-center space-y-2 text-header-1 !font-semibold !text-4xl">
            <h1>Masuk atau buat akun</h1>
            <h2>untuk memulai</h2>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
            <div className="space-y-6">
              <div className="input_wrapper">
                <div className="relative">
                  <AtSign
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      errorField.email ? "color-primary" : "text-gray-400"
                    } w-5 h-5`}
                  />
                  <input
                    type="email"
                    placeholder="masukan email anda"
                    className={`input ${
                      errorField.email ? "!border-red-500" : ""
                    }`}
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                {errorField.email && (
                  <p className="text-red-500 text-xs">{errorField.email}</p>
                )}
              </div>
              <div className="input_wrapper">
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      errorField.password ? "color-primary" : "text-gray-400"
                    } w-5 h-5`}
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="buat password"
                    className={`input ${
                      errorField.password ? "!border-red-500" : ""
                    }`}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errorField.password && (
                  <p className="text-red-500 text-xs">{errorField.password}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="btn-primary disabled:btn-topup-disabled"
              disabled={loading}
            >
              Masuk
            </button>
          </form>
          <p className="text-center text-sm text-secondary">
            belum punya akun?{" "}
            <Link to="/register" className="color-primary">
              registrasi di sini
            </Link>
          </p>
          {alert && 
            <Alert
              message={responseData?.message || ""}
              onAlertTriggered={handleAlertTriggered}
            />
          }
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="w-1/2 bg-pink-50">
        <img
          src={IllustrasiLogin}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default Login;
