import LogoImage from "../../../assets/Logo.png";

interface LogoProps {
  w?: string;
  h?: string;
}

const Logo = ({w, h}: LogoProps) => {
  return (
    <div className="relative">
      <div className="absolute inset-0"></div>
      <img
        src={LogoImage}
        alt="Decorative illustration"
        className={`w-${w} h-${h} object-cover`}
      />
    </div>
  );
};

export default Logo;
