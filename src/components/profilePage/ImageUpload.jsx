"use client";
import { useState } from "react";
import { UploadButton } from "@/utils/uploadthing";

const ImageUpload = ({ id }) => {
  const [imgUrl, setImgUrl] = useState("");

  const handleUploadComplete = async (res) => {
    try {
      const uploadedUrl = res[0].url;
      setImgUrl(uploadedUrl);

      const response = await fetch(`/api/register/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imgUrl: uploadedUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update image URL");
      }
    } catch (error) {
      console.error("Error updating image URL:", error);
    }
  };

  const handleUploadError = (error) => {
    alert(`ERROR! ${error.message}`);
  };

  return (
    <div>
      <UploadButton
        className="inputFields h-10 bg-neutral-300 rounded-sm"
        endpoint="imageUploader"
        onClientUploadComplete={handleUploadComplete}
        onUploadError={handleUploadError}
      />
    </div>
  );
};

export default ImageUpload;
