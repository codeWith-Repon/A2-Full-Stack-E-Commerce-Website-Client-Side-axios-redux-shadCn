import Address from "@/components/Shopping-Vew/Address";
import img from "../../assets/account.jpg";
import UserCartItemsContent from "@/components/Shopping-Vew/UserCartItemsContent";
import { useSelector } from "react-redux";

const ShopingCheckOut = () => {
  const { cartItems } = useSelector((state) => state.shopCart);
  console.log("reponX", cartItems);

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img
          src={img}
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address />
        <div className="flex flex-col gap-4">
          {cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items.map((item) => (
                <UserCartItemsContent cartItem={item} />
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default ShopingCheckOut;
