import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResults } from "@/store/shop/Search-slice/searchSlice";
import ShopingProductTile from "./ShopingProductTile";

const SearchProducts = () => {
  const [keyword, setKeyword] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults } = useSelector((state) => state.shopSearch);
  console.log(keyword);

  useEffect(() => {
    if (keyword && keyword.trim() !== "" && keyword.trim().length > 3) {
      setTimeout(() => {
        setSearchParams(new URLSearchParams(`?keyword=${keyword}`));
        dispatch(getSearchResults(keyword))
      }, 1000);
    }
  }, [keyword]);

  console.log("search reasult", searchResults)

  return (
    <div className="container mx-auto md:px-6 px-4 py-8">
      <div className="flex justify-center mb-8">
        <div className="w-full flex items-center">
          <Input
            value={keyword}
            name={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            className="py-6"
            placeholder="Search Products..."
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {
          searchResults && searchResults.length ?
          searchResults.map(item => <ShopingProductTile product={item}/>) : <h1 className="text-5xl font-extrabold">No Result Found!!!</h1>
        }
      </div>
    </div>
  );
};

export default SearchProducts;
