import React from "react";
import { DialogContent } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { Badge } from "../ui/badge";
import { useSelector } from "react-redux";

const ShoppingOrderDetailsView = ({ orderDetails }) => {
  console.log("orderDetails", orderDetails);

  const {user} = useSelector(state=> state.auth)
  

  return (
    <div>
      <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
          <div className="grid gap-2">
            <div className="flex mt-6 items-center justify-between">
              <p className="font-medium">Order ID</p>
              <Label>{orderDetails?.data?._id}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Date</p>
              <Label>{orderDetails?.data?.orderDate?.split("T")[0]}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Price</p>
              <Label>${orderDetails?.data?.totalAmount}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment method</p>
              <Label>{orderDetails?.data?.paymentMethod}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Payment Status</p>
              <Label>{orderDetails?.data?.paymentStatus}</Label>
            </div>
            <div className="flex mt-2 items-center justify-between">
              <p className="font-medium">Order Status</p>
              <Label>
                <Badge
                  className={`py-1 px-3 rounded-full ${
                    orderDetails?.data?.orderStatus === "confirmed"
                      ? "bg-green-500"
                      : "bg-black"
                  }`}
                >
                  {orderDetails?.data?.orderStatus}
                </Badge>
              </Label>
            </div>
          </div>
          <Separator />
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Order Details</div>
              <ul className="grid gap-3">
                {orderDetails?.data?.cartItems 
                  ? orderDetails?.data?.cartItems.map((item) => 
                      <li className="flex items-center justify-between">
                        <span>Title: {item.title}</span>
                        <span>Quantity: {item.quantity}</span>
                        <span>Price: ${item.price}</span>
                      </li>
                    )
                  : null}
              </ul>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <div className="font-medium">Shiping Info</div>
              <div className="grid gap-0.5 text-muted-foreground">
                <span>Name: {user.userName}</span>
                <span>Address: {orderDetails?.data?.addressInfo?.address}</span>
                <span>City: {orderDetails?.data?.addressInfo?.city}</span>
                <span>Pincode: {orderDetails?.data?.addressInfo?.pincode}</span>
                <span>Phone: {orderDetails?.data?.addressInfo?.phone}</span>
                <span>Notes: {orderDetails?.data?.addressInfo?.notes}</span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </div>
  );
};

export default ShoppingOrderDetailsView;
