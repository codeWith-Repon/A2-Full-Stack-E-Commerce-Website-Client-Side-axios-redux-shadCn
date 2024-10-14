import ProductImageUpload from "@/components/Admin-View/ProductImageUpload";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);

  console.log(uploadedImageUrl,"uploadedImageUrl")

  function handleUploadFeatureImage(){
    
  }

  return (
    <div>
      <ProductImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        setImageLoadingState={setImageLoadingState}
        imageLoadingState={imageLoadingState}
        isCustomStyle={true}
        // currentEditedId={currentEditedId !== null}
      />
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">Upload</Button>
    </div>
  );
};

export default AdminDashboard;
