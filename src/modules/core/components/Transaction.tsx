import { useEffect, useState } from "react";
import { useGetQuery } from "../../../hooks/useApiRequest";
import { ITransaction } from "../../../types/ITransaction";
import numberFormat from "../../dashboard/utils/numberFormat";
import formatDate from "../../dashboard/utils/formatDate";

const Transaction = () => {
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const { data, loading } = useGetQuery<ITransaction>(
    `/transaction/history?offset=${offset}&limit=${limit}`,
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  );

  useEffect(() => {
    if(data?.status === 108) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    } 
  }, [data])

  return (
    <section className="mt-10 relative">
      <div className="header_payment_info space-y-10">
        <div className="payment_info space-y-2">
          <h1 className="text-header-2">Semua Transaksi</h1>
          <div className="all_transaksi  flex flex-col items-center space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : data?.data.records.length === 0 ? (
              <p>No transaction found</p>
            ) : (
              <>
                {data?.data.records.map((item) => (
                  <div className="border p-4 rounded-lg w-full">
                    <div className="flex justify-between">
                      <div className="">
                        <h3 className="text-header-3 !text-green-400 !font-semibold">
                          + Rp{numberFormat(item.total_amount)}
                        </h3>
                        <p className="text-secondary">
                          {formatDate(item.created_on)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm">{item.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="color-primary font-semibold"
                  onClick={() => {
                    setOffset(offset + 5);
                    setLimit(limit + 5);
                  }}
                >
                  Show More
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Transaction;
