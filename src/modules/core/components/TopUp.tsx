import { Banknote } from "lucide-react";
import numberFormat from "../../dashboard/utils/numberFormat";
import parseRupiah from "../../dashboard/utils/parseRupiah";
import React, { useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const TopUp = () => {
  const [amount, setAmount] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseRupiah(e.target.value);
    setAmount(value);
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      // Lewati eksekusi pertama
      firstRender.current = false;
      return;
    }
  
    if (amount < 10000) {
      setDisabled(true);
      setError("Nominal minimal Rp 10.000");
    } else if (amount > 1000000) {
      setDisabled(true);
      setError("Nominal maksimal Rp 1.000.000");
    } else {
      setDisabled(false);
      setError("");
    }
  }, [amount]);

  const handlerModal = () => {
    setShowModal(false);
  };

  return (
    <section className="mt-10 relative">
      <div className="header_payment_info space-y-10">
        <div className="payment_info space-y-2">
          <h1 className="text-header-2 !font-normal">Silahkan masukan</h1>
          <div className="payment_info  flex items-center space-x-4">
            <h2 className="text-header-2">Nominal Top Up</h2>
          </div>
        </div>
        <div className="flex items-center gap-x-4 w-full">
          <div className="space-y-4 w-full">
            <div className="relative">
              <div className="relative">
                <Banknote
                  className={`absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 ${
                    error ? "!text-red-500" : ""
                  }`}
                />
                <input
                  type="text"
                  placeholder="Masukkan jumlah"
                  className={`input ${error ? "!border-red-500" : ""}`}
                  value={numberFormat(amount)}
                  onChange={handleChange}
                />
              </div>
              {error && <p className="text-red-500 text-xs">{error}</p>}
            </div>
            <button
              className="btn-primary disabled:btn-topup-disabled"
              onClick={() => setShowModal(true)}
              disabled={disabled}
            >
              Bayar
            </button>
          </div>
          <div className="w-1/2">
            <div className="grid grid-cols-3 gap-4">
              <div className="btn-amount" onClick={() => setAmount(10000)}>
                Rp 10.000
              </div>
              <div className="btn-amount" onClick={() => setAmount(20000)}>
                Rp 20.000
              </div>
              <div className="btn-amount" onClick={() => setAmount(50000)}>
                Rp 50.000
              </div>
              <div className="btn-amount" onClick={() => setAmount(100000)}>
                Rp 100.000
              </div>
              <div className="btn-amount" onClick={() => setAmount(250000)}>
                Rp 250.000
              </div>
              <div className="btn-amount" onClick={() => setAmount(500000)}>
                Rp 500.000
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          amount={amount}
          type="KONFIRMASI"
          title="Apakah yakin untuk Top Up sebesar"
          trigger={handlerModal}
        />
      )}
    </section>
  );
};

export default TopUp;
