import { Pencil } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { usePutQuery } from "../../../hooks/useApiRequest";
import { UserItem } from "../../../types/IUser";
import UserProfileImage from "../../core/components/UserProfileImage";

interface AkunImageProps {
  image: string;
}

const AkunImage: React.FC<AkunImageProps> = ({ image }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { responseUpdateData, update } = usePutQuery<FormData, UserItem>(
    "/profile/image",
    {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    }
  );

  const handleChangeImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const [, setProfileImage] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    const maxSize = 100 * 1024; // 100 KB

    if (file) {
      if (file.size > maxSize) {
        alert("Ukuran file maksimal adalah 100 KB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }

    if (file) {
      const formFile = new FormData();
      formFile.append("file", file);
      update(formFile);
    }
  };

  useEffect(() => {
    setCurrentImage(image);
  }, [image]);

  useEffect(() => {
    if (responseUpdateData?.status === 0) {
      setCurrentImage(responseUpdateData.data?.profile_image || "");
    }
  }, [responseUpdateData]);

  return (
    <div className="relative flex items-center justify-center mx-auto w-36 h-36">
      <button
        type="button"
        onClick={handleChangeImage}
        className="shadow bg-white hover:bg-gray-50 active:bg-gray-200 absolute bottom-0 right-0 p-2 rounded-full"
      >
        <Pencil className="w-5 h-5 " />
      </button>

      <UserProfileImage profileImage={currentImage} />
      {/* <img
        src={currentImage}
        alt="img-profile"
        className="w-full h-full rounded-full object-cover"
      /> */}

      {/* Hidden file input for selecting an image */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};

export default AkunImage;
