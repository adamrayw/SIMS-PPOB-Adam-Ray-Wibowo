import { Banknote } from "lucide-react";
import { useEffect, useState } from "react";
import numberFormat from "../../utils/numberFormat";
import parseRupiah from "../../utils/parseRupiah";
import { useSelector } from "react-redux";
import { RootState } from "../../../../store";
import { useNavigate } from "react-router";
import Modal from "../../../core/components/Modal";

const Pembayaran = () => {
  const [amount, setAmount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const state = useSelector((state: RootState) => state);
  const navigate = useNavigate();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseRupiah(e.target.value);
    setAmount(value);
  };

  useEffect(() => {
    if (state.layanan.service_code === "") {
      navigate("/");
    }
  }, [state.layanan]);

  const handlerModal = () => {
    setShowModal(!showModal);
  };

  return (
    <section className="mt-10">
      <div className="header_payment_info space-y-10">
        <div className="payment_info space-y-2">
          <h1 className="text-header-2 !font-normal">Pembayaran</h1>
          <div className="payment_info  flex items-center space-x-4">
            <img
              src={state.layanan.service_icon}
              alt="icon_payment"
              className="w-10 h-10"
            />
            <h2 className="text-header-2">{state.layanan.service_name}</h2>
          </div>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <Banknote className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Masukkan jumlah"
              className="input"
              value={numberFormat(amount)}
              onChange={handleChange}
            />
          </div>
          <button className="btn-primary" onClick={handlerModal}>
            Bayar
          </button>
        </div>
      </div>
      {showModal && <Modal amount={amount} type="LAYANAN" title={`Beli ${state.layanan.service_name} senilai`} trigger={handlerModal} />}
    </section>
  );
};

export default Pembayaran;
