/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from "react-router";
import Navbar from "../../../core/components/Navbar";
import SaldoCard from "../../../core/components/SaldoCard";
import { useGetQuery } from "../../../../hooks/useApiRequest";
import { IUser } from "../../../../types/IUser";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../../../features/user/userSlice";
import { RootState } from "../../../../store";
import UserProfileImage from "../../../core/components/UserProfileImage";

const DashboardLayout = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);
  const { data, loading } = useGetQuery<IUser>("/profile", {
    Authorization: "Bearer " + localStorage.getItem("token"),
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setUser(data.data));
    }
  }, [data]);


  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto py-6">
        <section className="flex justify-between">
          {loading ? (
            <div className="user_info w-20">
              <div className="w-20 h-20 rounded-full mb-4 bg-gray-200 animate-pulse" />
              <div className="h-4 w-72 animate-pulse bg-gray-200"></div>
            </div>
          ) : (
            <div className="user_info space-y-2">
              <UserProfileImage profileImage={state.user.profile_image as string} />
              <h1 className="text-header-2 !font-normal">Selamat datang,</h1>
              <p className="text-header-1 !text-4xl !font-semibold">
                {state.user.first_name} {state.user.last_name}
              </p>
            </div>
          )}
          <SaldoCard />
        </section>
        <main className="py-6 max-w-7xl mx-auto">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
