import ProductFilter from "@/components/Shopping-Vew/ProductFilter";
import React from "react";

const ShopingListing = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter />
    </div>
  );
};

export default ShopingListing;
