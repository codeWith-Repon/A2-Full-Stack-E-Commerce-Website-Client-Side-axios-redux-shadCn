import { Label } from "@radix-ui/react-label";
import React, { useRef } from "react";
import { Input } from "../ui/input";
import { UploadCloudIcon } from "lucide-react";

const ProductImageUpload = ({
  imageFile,
  setImageFile,
  uploadedImageUrl,
  setUploadedImageUrl,
}) => {
  const inputRef = useRef(null);

  function handleImageFileChange(event) {
    console.log(event.target.files);
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setImageFile(selectedFile);
  }

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      <Label className="text-lg font-semibold mb-2 block">Upload Image</Label>
      <div className="border-2 border-dashed rounded-lg p-4">
        <Input
          ref={inputRef}
          onChange={handleImageFileChange}
          id="image-upload"
          type="file"
          // className="hidden"
        />
        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className="flex flex-col items-center justify-center h-32 cursor-pointer"
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click upload image</span>
          </Label>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default ProductImageUpload;
