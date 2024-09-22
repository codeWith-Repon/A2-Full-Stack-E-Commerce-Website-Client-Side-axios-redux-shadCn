import AdminProductTile from "@/components/Admin-View/AdminProductTile";
import ProductImageUpload from "@/components/Admin-View/ProductImageUpload";
import CommonForm from "@/components/common/CommonForm";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { toast } from "@/hooks/use-toast";
import { addNewProduct, editProduct, fetchAllProducts } from "@/store/admin/products-slice/AdminProductSlice";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  brand: "",
  price: "",
  salePrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null)
  const [uploadedImageUrl, setUploadedImageUrl] = useState("")
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId,setCurrentEditedId] = useState(null)

  const {productList} = useSelector(state=>state.AdminProducts)
  const dispatch = useDispatch()
  
  function onSubmit(event) {
    event.preventDefault();

    currentEditedId !== null ? 
    dispatch(editProduct({
      id : currentEditedId, formData
    }))
    .then((data)=>{
      console.log("edit",data)

      if(data?.payload?.success){
        dispatch(fetchAllProducts());
        setFormData(initialFormData);
        setOpenCreateProductsDialog(false);
        setCurrentEditedId(null)
      }
    })
    :
    dispatch(
      addNewProduct({
        ...formData,
        image: uploadedImageUrl,
      })
    ).then((data) => {
      console.log(data);
      if(data?.payload?.success){
        dispatch(fetchAllProducts())
        setOpenCreateProductsDialog(false)
        setImageFile(null)
        setFormData(initialFormData)
        toast({
          title: "Product Add Successfully"
        })
      }
    });
  }

  function isFormValid () {
    return Object.keys(formData)
    // .filter(key => key !== "salePrice") //if ignore 
    .map(key => formData[key] !== "")
    .every(item=>item)
  }

  useEffect(()=>{
    dispatch(fetchAllProducts())
  },[dispatch])

  console.log("productList", formData)  

  return (
    <Fragment>
      <div className="mb-5 w-full flex justify-end">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          Add New Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
        {productList && productList.length > 0
          ? productList.map((productItem) => (
              <AdminProductTile
                setFormData={setFormData}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setCurrentEditedId={setCurrentEditedId}
                product={productItem}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData)
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
            {
              currentEditedId !== null ? 
              "Edit Product" : "Add New Product"
            }
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            uploadedImageUrl={uploadedImageUrl}
            setUploadedImageUrl={setUploadedImageUrl}
            setImageLoadingState={setImageLoadingState}
            imageLoadingState={imageLoadingState}
            currentEditedId={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              onSubmit={onSubmit}
              formData={formData}
              setFormData={setFormData}
              formControls={addProductFormElements}
              buttonText={currentEditedId !== null ? "Edit" : "add"}
              isButtonDisabled={!isFormValid() || imageFile === null}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
