import { Link } from "react-router";
import Logo from "../../../assets/Logo.png";

const Navbar = () => {
  return (
    <nav>
      <div className="border-b">
        <div className="max-w-7xl mx-auto flex py-6">
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <Link to="/" className="relative">
                <div className="absolute inset-0"></div>
                <img
                  src={Logo}
                  alt="Decorative illustration"
                  className="w-8 h-8 object-cover"
                />
              </Link>
              <span className="text-lg font-bold">SIMS PPOB</span>
            </div>
          </div>
          <div className="flex-1 flex justify-end items-center space-x-10">
            <Link to="/topup" className="text-link">Top Up</Link>
            <Link to="/transaction" className="text-link">Transaction</Link>
            <Link to='/akun' className="text-link">Akun</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
