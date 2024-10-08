import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Table, TableBody, TableCell, TableHead, TableRow } from "../ui/table";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import ShoppingOrderDetailsView from "./ShoppingOrderDetailsView";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersByUserId } from "@/store/shop/Order-Slice/OrderSlice";

const ShopingOrders = () => {
  const [openDetailsDialog, setOpendetailsDialog] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const {orderList} = useSelector((state)=> state.shopOrder)

  useEffect(() => {
    dispatch(getAllOrdersByUserId(user?.id));
  }, [dispatch]);

  console.log("shopOrder List ", orderList)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order History</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Order Status</TableHead>
            <TableHead>Order Price</TableHead>
            <TableHead>
              <span className="sr-only">Details</span>
            </TableHead>
          </TableRow>
          <TableBody>
            <TableRow>
              <TableCell>123423</TableCell>
              <TableCell>10/10/24</TableCell>
              <TableCell>In Process</TableCell>
              <TableCell>$1000</TableCell>
              <TableCell>
                <Dialog
                  open={openDetailsDialog}
                  onOpenChange={setOpendetailsDialog}
                >
                  <Button onClick={() => setOpendetailsDialog(true)}>
                    View Details
                  </Button>
                  <ShoppingOrderDetailsView />
                </Dialog>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default ShopingOrders;
