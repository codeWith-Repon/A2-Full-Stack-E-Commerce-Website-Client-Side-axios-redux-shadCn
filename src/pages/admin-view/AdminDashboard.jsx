import ProductImageUpload from "@/components/Admin-View/ProductImageUpload";
import { Button } from "@/components/ui/button";
import {
  addFeatureImages,
  deleteFeatureImage,
  getFeatureImages,
} from "@/store/CommonSlice/commonSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const dispatch = useDispatch();
  const { featureImageList } = useSelector((state) => state.commonFeature);

  console.log(uploadedImageUrl, "uploadedImageUrl");

  function handleUploadFeatureImage() {
    dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
        setImageFile(null);
        setUploadedImageUrl("")
      }
    });
  }

  function handleDelete(imageId){
    console.log("deleting image ", imageId)
    dispatch(deleteFeatureImage(imageId)).then((data)=>{
      console.log("delete", data)
      if (data?.payload?.success) {
        dispatch(getFeatureImages());
      }
    })
  }

  useEffect(() => {
    dispatch(getFeatureImages());
  }, [dispatch]);

  console.log(featureImageList, "featureimage");

  return (
    <div className="flex flex-col gap-4 mt-5">
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
      <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImageItem) => (
            <div>
              <img
                src={featureImageItem.image}
                alt=""
                className="w-full h-[300px] object-cover rounded-t-lg"
              />
              <Button className="mt-5" onClick={()=> handleDelete(featureImageItem?._id)}>Delete</Button>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default AdminDashboard;
