import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/Order-Slice/OrderSlice";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

const PaypalReturn = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  console.log("location", location,params,paymentId,payerId);

  useEffect(() => {
    if (paymentId && payerId) {
      const getCurrentOrderId = JSON.parse(
        sessionStorage.getItem("CurrentOrderId")
      );

      dispatch(
        capturePayment({ paymentId, payerId, orderId:getCurrentOrderId })
      ).then((data) => {
        if(data?.payload?.data?.success){
          sessionStorage.removeItem("getCurrentOrderId")
          window.location.href = './payment-success'
        }
      });
    }
  }, [paymentId, payerId, dispatch]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing Payment... Please wait!</CardTitle>
      </CardHeader>
    </Card>
  );
};

export default PaypalReturn;
