import DefaulImage from "../../../assets/Profile Photo.png";

const checkImageProfileNull = (url: string) => {
  if (!url || url.split("/").pop() === "null") {
    return DefaulImage;
  }
  return url;
};

const UserProfileImage = ({ profileImage }: { profileImage: string }) => {
  return (
      <img src={checkImageProfileNull(profileImage)} className="w-32 h-32 rounded-full object-cover" alt="profile-img" />
  );
};

export default UserProfileImage;
