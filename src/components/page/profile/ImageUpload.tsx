import React, { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";
import { config } from "@/config/env-config";

const ImageUpload = ({ setFile, user }) => {
  const [image, setImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string); // Set the base64 image
      };
      reader.readAsDataURL(file);
      setFile(file); // Update the file state
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative w-52 h-40 rounded-lg border-2 border-gray-300">
        <label
          htmlFor="image-upload"
          className="w-full h-full cursor-pointer flex items-center"
        >
          {/* Display Image or Placeholder */}
          <Image
            src={image || `${config.baseURL}${user.image}`} // Display uploaded image or default
            alt="Profile"
            width={350}
            height={300}
            className="w-full h-full object-cover rounded-lg"
          />
          <input
            type="file"
            id="image-upload"
            className="absolute inset-0 opacity-0 cursor-pointer"
            accept="image/*"
            onChange={handleImageChange}
          />
          <span className="absolute inset-0 flex flex-col justify-center items-center text-white font-semibold bg-black bg-opacity-30 rounded-lg">
            <ImageIcon size={36} />
            Upload Image
          </span>
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
