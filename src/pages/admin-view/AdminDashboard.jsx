import ProductImageUpload from "@/components/Admin-View/ProductImageUpload";
import { Button } from "@/components/ui/button";
import { addFeatureImages, getFeatureImages } from "@/store/CommonSlice/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const {featureImageList} = useSelector(state => state.commonFeature)

  console.log(uploadedImageUrl,"uploadedImageUrl")

  function handleUploadFeatureImage(){
    dispatch(addFeatureImages(uploadedImageUrl)).then((data)=>{
      console.log("datax", data)
    })
  }

  useEffect(()=>{
    dispatch(getFeatureImages())
  },[dispatch])

  console.log(featureImageList,"featureimage")

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
