import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useGetQuery } from "../../../hooks/useApiRequest";
import { IBalance } from "../../../types/IBalance";
import numberFormat from "../../dashboard/utils/numberFormat";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../../../features/saldo/saldoSlice";
import { RootState } from "../../../store";

const SaldoCard = () => {
  const [showSaldo, setShowSaldo] = useState(false);
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state);

  const { data, loading } = useGetQuery<IBalance>("/balance", {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    if (data?.data) {
      dispatch(setBalance(data.data.balance));
    }
  }, [data]);

  return (
    <div className="saldo p-6 w-[40rem] space-y-2">
      <h1 className="text-header-3 !font-medium !text-white !text-sm">
        Saldo anda
      </h1>
      <p className="text-header-1 !text-4xl !font-semibold !text-white">
        {loading ? (
          <LoaderCircle className="h-8 w-8 animate-spin" />
        ) : (
          <>
            {"Rp "}
            <span>
              {showSaldo ? "●●●●●●" : numberFormat(state.saldo.balance)}
            </span>
          </>
        )}
      </p>
      <div className="pt-3">
        <button
          onClick={() => setShowSaldo(!showSaldo)}
          className="flex items-center  text-xs font-semibold text-white"
        >
          {showSaldo ? (
            <>
              Lihat Saldo
              <Eye className="w-4 h-4 text-white ml-2" />
            </>
          ) : (
            <>
              Sembunyikan Saldo
              <EyeOff className="w-4 h-4 text-white ml-2" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default SaldoCard;
