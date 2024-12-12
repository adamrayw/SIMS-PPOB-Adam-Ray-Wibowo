import { AtSign, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import Navbar from "../../core/components/Navbar";
import { useGetQuery, usePutQuery } from "../../../hooks/useApiRequest";
import { IUser, UserItem } from "../../../types/IUser";
import { useInputValidation } from "../../../utils/formValidation";
import AkunImage from "./AkunImage";

const Akun = () => {
  const [formData, setFormData] = useState({
    profile_img: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [errorField, setErrorField] = useState({
    profile_img: "",
    email: "",
    first_name: "",
    last_name: "",
  });
  const [editProfileClicked, setEditProfileClicked] = useState(false);
  const [notification, setNotification] = useState(false);

  const { data, loading } = useGetQuery<IUser>("/profile", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const { responseUpdateData, update } = usePutQuery<string, Partial<UserItem>>(
    "/profile/update",
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    }
  );

  const newErrorField = { ...errorField };

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
    if (data?.status === 108) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    } else {
      setFormData({
        profile_img: data?.data?.profile_image || "",
        email: data?.data?.email || "",
        first_name: data?.data?.first_name || "",
        last_name: data?.data?.last_name || "",
      });
    }
  }, [data]);

  const { validateEmail } = useInputValidation();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emailError = validateEmail(formData.email);

    setErrorField((prevErrors) => ({
      ...prevErrors,
      email: emailError,
    }));

    if (Object.values(newErrorField).some((error) => error !== "")) {
      return;
    }

    const dataUser = {
      first_name: formData.first_name,
      last_name: formData.last_name,
    };

    update(JSON.stringify(dataUser));
  };

  useEffect(() => {
    if (responseUpdateData?.status === 0) {
      setEditProfileClicked(false);
      setNotification(true);
    }
  }, [responseUpdateData]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen w-full flex">
        <div className="w-full p-8">
          <div className="max-w-md mx-auto flex flex-col items-center justify-center h-full space-y-12">
            <form
              onSubmit={handleSubmit}
              className="w-full max-w-md space-y-10"
            >
              <div className="space-y-10">
                <AkunImage image={formData.profile_img} />
                {notification && (
                  <div className="bg-green-200 flex justify-between rounded-lg items-center text-green-600 p-3 text-center">
                    <p>Berhasil mengupdate profile!</p>
                    <X
                      className="w-5 h-5 text-green-500 hover:cursor-pointer"
                      onClick={() => setNotification(!notification)}
                    />
                  </div>
                )}
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
                      disabled={true}
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
                        errorField.first_name
                          ? "color-primary"
                          : "text-gray-400"
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
                    <p className="text-red-500 text-xs">
                      {errorField.last_name}
                    </p>
                  )}
                </div>
              </div>
              <div className="space-y-6">
                {editProfileClicked && (
                  <>
                    <button
                      type="submit"
                      className="btn-primary border !text-red-500 border-red-500 !bg-white disabled:btn-topup-disabled"
                      disabled={loading}
                    >
                      Simpan
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditProfileClicked(!editProfileClicked);
                        setFormData({
                          profile_img: data?.data?.profile_image || "",
                          email: data?.data?.email || "",
                          first_name: data?.data?.first_name || "",
                          last_name: data?.data?.last_name || "",
                        });
                      }}
                      className="btn-primary border disabled:btn-topup-disabled"
                      disabled={loading}
                    >
                      Batalkan
                    </button>
                  </>
                )}
              </div>
              {/* seharusnya bisa di dalam form namun masih tetap bisa ke submit */}
              {!editProfileClicked && (
                <div className="space-y-6">
                  <button
                    type="button"
                    onClick={() => setEditProfileClicked(!editProfileClicked)}
                    className="btn-primary border !text-red-500 border-red-500 !bg-white disabled:btn-topup-disabled"
                    disabled={loading}
                  >
                    Edit Profile
                  </button>
                  <button
                    type="button"
                    className="btn-primary border disabled:btn-topup-disabled"
                    disabled={loading}
                    onClick={() => {
                      localStorage.removeItem("token");
                      window.location.href = "/login";
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Akun;
