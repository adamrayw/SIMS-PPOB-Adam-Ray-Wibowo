import { useEffect, useState } from "react";
import Logo from "../../core/components/Logo";
import { AtSign, Eye, EyeOff, Lock, User } from "lucide-react";
import IllustrasiLogin from "../../../assets/Illustrasi Login.png";
import { Link, useNavigate } from "react-router";
import { INewUser } from "../../../types/INewUser";
import { usePostQuery } from "../../../hooks/useApiRequest";
import { useInputValidation } from "../../../utils/formValidation";
import Alert from "./Alert";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    konfirmasi_password: "",
  });
  const [errorField, setErrorField] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    konfirmasi_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [alert, setAlert] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const userData: INewUser = {
    email: formData.email,
    first_name: formData.first_name,
    last_name: formData.last_name,
    password: formData.password,
  };

  const { responseData, loading, post } = usePostQuery<INewUser, INewUser>(
    "/registration",
    {
      "Content-Type": "application/json",
    }
  );

  const { validateEmail, validatePassword, validateConfirmPassword } =
    useInputValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrorField = { ...errorField };

    // Validate email
    const emailError = validateEmail(formData.email);

    if (emailError) {
      newErrorField.email = emailError;
    }

    const passwordError = validatePassword(formData.password, "register");

    const konfirmasiPasswordError = validateConfirmPassword(
      formData.password,
      formData.konfirmasi_password
    );

    if (passwordError) {
      newErrorField.password = passwordError;
    }

    if (konfirmasiPasswordError) {
      newErrorField.konfirmasi_password = konfirmasiPasswordError;
    }

    if (!formData.first_name) {
      newErrorField.first_name = "Nama depan tidak boleh kosong";
    }

    if (!formData.last_name) {
      newErrorField.last_name = "Nama belakang tidak boleh kosong";
    }

    setErrorField(newErrorField);

    if (Object.values(newErrorField).some((error) => error !== "")) {
      return;
    }

    post(userData);
  };

  useEffect(() => {
    if (responseData?.status === 0) {
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        konfirmasi_password: "",
      });
    } else if (responseData?.status === 102) {
      setAlert(true);
    }
  }, [responseData]);

  const handleAlertTriggered = () => {
    setAlert(!alert);
  };

  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <div className="min-h-screen w-full flex">
      {/* Left Side - Login Form */}
      <div className="w-1/2 p-8 flex flex-col items-center justify-center ">
        <div className="w-full max-w-md space-y-12">
          <div className="flex justify-center items-center space-x-2">
            <Logo />
            <h2 className="text-header-1 !font-semibold">SIMS PPOB</h2>
          </div>
          <div className="text-center space-y-2 text-header-1 !font-semibold !text-4xl">
            <h1>Lengkapi data untuk</h1>
            <h2>membuat akun</h2>
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
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      errorField.first_name ? "color-primary" : "text-gray-400"
                    } w-5 h-5`}
                  />
                  <input
                    type="text"
                    placeholder="nama depan"
                    className={`input ${
                      errorField.first_name ? "!border-red-500" : ""
                    }`}
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                  />
                </div>
                {errorField.first_name && (
                  <p className="text-red-500 text-xs">
                    {errorField.first_name}
                  </p>
                )}
              </div>
              <div className="input_wrapper">
                <div className="relative">
                  <User
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      errorField.last_name ? "color-primary" : "text-gray-400"
                    } w-5 h-5`}
                  />
                  <input
                    type="text"
                    placeholder="nama belakang"
                    className={`input ${
                      errorField.last_name ? "!border-red-500" : ""
                    }`}
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                  />
                </div>
                {errorField.last_name && (
                  <p className="text-red-500 text-xs">{errorField.last_name}</p>
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
              <div className="input_wrapper">
                <div className="relative">
                  <Lock
                    className={`absolute left-3 top-1/2 -translate-y-1/2 ${
                      errorField.konfirmasi_password
                        ? "color-primary"
                        : "text-gray-400"
                    } w-5 h-5`}
                  />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="konfirmasi password"
                    className={`input ${
                      errorField.konfirmasi_password ? "!border-red-500" : ""
                    }`}
                    name="konfirmasi_password"
                    value={formData.konfirmasi_password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {errorField.konfirmasi_password && (
                  <p className="text-red-500 text-xs">
                    {errorField.konfirmasi_password}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="btn-primary disabled:btn-topup-disabled"
                disabled={loading}
              >
                Masuk
              </button>
            </div>
          </form>
          <p className="text-center text-sm text-secondary">
            sudah punya akun? login{" "}
            <Link to="/login" className="color-primary">
              di sini
            </Link>
          </p>
          {/* Alert */}
          {alert && (
            <Alert
              message={responseData?.message || ""}
              onAlertTriggered={handleAlertTriggered}
            />
          )}
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

export default Register;
