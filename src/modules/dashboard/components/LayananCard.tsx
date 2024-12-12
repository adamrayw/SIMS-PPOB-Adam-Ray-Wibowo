import { useNavigate } from "react-router";
import { currentLayanan } from "../../../features/layanan/layananSlice";
import { useGetQuery } from "../../../hooks/useApiRequest";
import { IService, ServiceItem } from "../../../types/IService";
import { useDispatch } from "react-redux";

const LayananCard = () => {
  const { data, loading } = useGetQuery<IService>("/services", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLayananPage = (item: ServiceItem) => {
    dispatch(currentLayanan(item));
    navigate("/pembayaran");
  };

  return (
    <div>
      {loading ? (
        <div className="flex justify-between h-20">
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
          <div className="mr-4 bg-gray-200 h-30 w-28 rounded-xl animate-pulse"></div>
        </div>
      ) : (
        <div className="flex justify-between flex-wrap">
          {data?.data.map((item: ServiceItem) => (
            <div className="card-item space-y-2 hover:cursor-pointer" onClick={() => handleLayananPage(item)}>
              <img src={item.service_icon} alt="" />
              <p className="text-center text-xs">{item.service_name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LayananCard;
