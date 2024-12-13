/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import numberFormat from "../../dashboard/utils/numberFormat";
import Logo from "./Logo";
import { ITopUp } from "../../../types/ITopUp";
import { usePostQuery } from "../../../hooks/useApiRequest";
import { Link } from "react-router";
import { Check, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseBalance,
  updateBalance,
} from "../../../features/saldo/saldoSlice";
import { ServiceItem } from "../../../types/IService";
import { RootState } from "../../../store";

interface ModalProps {
  amount: number;
  type: string;
  title: string;
  trigger: () => void;
}

const Modal: React.FC<ModalProps> = ({ amount, type, title, trigger }) => {
  const [status, setStatus] = React.useState<string>("");
  const [mainTitle, setTitle] = React.useState<string>("");
  const state = useSelector((state: RootState) => state);
  const [jumlah, setJumlah] = React.useState<number>(amount);

  const dispatch = useDispatch();

  const { responseData, post } = usePostQuery<
    ITopUp | ServiceItem,
    ITopUp | ServiceItem
  >(type === "KONFIRMASI" ? "/topup" : "/transaction", {
    "Content-type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  });

  useEffect(() => {
    if (type === "KONFIRMASI") {
      setTitle(title);
    } else if (type === "LAYANAN") {
      setTitle(title);
    } else {
      setTitle("Top Up sebesar");
    }
  }, [type]);

  useEffect(() => {
    if (responseData?.status === 0) {
      if (type === "LAYANAN") {
        setTitle(`Pembayaran ${state.layanan.service_name} sebesar`);
        setStatus("berhasil!");
        if (!Array.isArray(responseData?.data)) {
          setJumlah(responseData?.data?.total_amount || 0);
          dispatch(decreaseBalance(responseData?.data?.total_amount || 0));
        }
      } else {
        setStatus("Top Up berhasil!");
        setTitle("Top Up sebesar");
        setStatus("berhasil!");
        dispatch(updateBalance(Number(amount)));
      }
    }

    if (responseData?.status === 102 || responseData?.status === 108) {
      setTitle("Top Up sebesar");
      setStatus(responseData?.message || "gagal");
    }
  }, [responseData]);

  const handleTrigger = () => {
    trigger();
  };

  const handlePost = () => {
    let data: ITopUp | ServiceItem = {} as ITopUp | ServiceItem;

    if (type === "LAYANAN") {
      if (state.saldo.balance < amount) {
        setStatus("saldo tidak cukup");
        return;
      }
      data = {
        service_code: state.layanan.service_code,
        service_tariff: amount,
      };
    } else if (type === "KONFIRMASI") {
      data = {
        top_up_amount: amount,
      };
    }

    post(data);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80 flex flex-col items-center space-y-6">
        {status === "gagal" ? (
          <div className="bg-primary rounded-full p-4">
            <X className="w-8 h-8 text-white" />
          </div>
        ) : status === "berhasil!" ? (
          <div className="bg-green-500 rounded-full p-4">
            <Check className="w-8 h-8 text-white" />
          </div>
        ) : (
          <Logo w="26" h="26" />
        )}
        <div className="text-center space-y-1">
          <h2 className="text-secondary">{mainTitle}</h2>
          {status === "gagal" ||
            (status === "berhasil!" ? (
              <p className="font-bold text-2xl">Rp{numberFormat(jumlah)}</p>
            ) : (
              <p className="font-bold text-2xl">Rp{numberFormat(amount)}</p>
            ))}
          <p className="text-secondary">{status}</p>
        </div>
        <div className="modal-actions flex flex-col space-y-3">
          {status === "gagal" || status === "berhasil!" ? (
            <Link to="/" className="color-primary !font-semibold">
              Kembali ke Beranda
            </Link>
          ) : (
            <>
              <button
                onClick={handlePost}
                className="color-primary !font-semibold"
              >
                {type === "LAYANAN"
                  ? "Ya, lanjutkan Bayar"
                  : "Ya, lanjutkan Top Up"}
              </button>
              <button
                onClick={() => handleTrigger()}
                className="text-secondary !font-semibold"
              >
                Batal
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
